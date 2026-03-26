import type { Callback } from '$lib/tsUtils';
import { attractionTableToMatrix } from '$lib/particles/attraction';
import type { AttractionTable } from '$lib/particles/attraction';
import { COLORS } from './colors';
import { cellsToParticles } from './particles';
import type { Particles } from './particles';
import { createSpatialGrid, rebuildSpatialGrid } from '$lib/particles/spatialGrid';
import type { SpatialGrid } from '$lib/particles/spatialGrid';
import type { Cell, WorldSize } from './types';

export const CELL_RADIUS = 3;

/* Web worker based engine */
export class Engine {
    _stepTimeout: ReturnType<typeof setTimeout> | undefined;
    _stepCb: Callback<Particles>;
    _running: boolean;
    _forceWorkers: Worker[];
    _grid: SpatialGrid;
    _velX: Float32Array;
    _velY: Float32Array;
    _maxAttractionRadius: number;
    _friction: number;
    attractionTable: AttractionTable;
    attractionMatrix: Float32Array;
    worldSize: WorldSize;
    particles: Particles;

    constructor(
        cells: Cell[],
        attractionTable: AttractionTable,
        worldSize: WorldSize,
        maxAttractionRadius: number,
        friction: number
    ) {
        this._stepTimeout = undefined;
        this._stepCb = console.log;
        this._running = false;
        this.worldSize = worldSize;
        this.attractionTable = attractionTable;
        this.attractionMatrix = attractionTableToMatrix(attractionTable);
        this._maxAttractionRadius = maxAttractionRadius;
        this._friction = friction;

        // Convert Cell[] to Struct-of-Arrays (one-time cost)
        this.particles = cellsToParticles(cells);

        // Velocity scratch buffers (only used within step())
        this._velX = new Float32Array(this.particles.count);
        this._velY = new Float32Array(this.particles.count);

        // Create flat spatial grid
        const gridCols = worldSize.x / maxAttractionRadius;
        const gridRows = worldSize.y / maxAttractionRadius;
        this._grid = createSpatialGrid({
            cols: gridCols,
            rows: gridRows,
            particleCount: this.particles.count
        });

        // Build initial grid
        rebuildSpatialGrid({
            grid: this._grid,
            posX: this.particles.posX,
            posY: this.particles.posY,
            particleCount: this.particles.count,
            worldWidth: worldSize.x,
            worldHeight: worldSize.y
        });

        // Spawn force sub-workers
        const numWorkers = Math.max(1, Math.min((self.navigator?.hardwareConcurrency ?? 4) - 1, 8));
        this._forceWorkers = Array.from(
            { length: numWorkers },
            () => new Worker(new URL('./force.worker.ts', import.meta.url), { type: 'module' })
        );
    }

    async run(stepCallback: Callback<Particles>) {
        this._stepCb = stepCallback;
        this._running = true;

        const runSteps = async () => {
            if (this._running) {
                await this.step();
                this._stepCb(undefined, this.particles);
            }
            this._stepTimeout = setTimeout(runSteps);
        };
        runSteps();
    }

    destroy() {
        clearTimeout(this._stepTimeout);
        for (const w of this._forceWorkers) {
            w.terminate();
        }
        this._forceWorkers = [];
    }

    pause() {
        if (this._running) {
            this._running = false;
        }
    }

    unpause() {
        if (!this._running) {
            this._running = true;
        }
    }

    updateAttractionTable(newAttractionTable: AttractionTable) {
        this.attractionTable = newAttractionTable;
        this.attractionMatrix = attractionTableToMatrix(newAttractionTable);
    }

    async step() {
        const { count, posX, posY, colors } = this.particles;
        const velX = this._velX;
        const velY = this._velY;
        const numWorkers = this._forceWorkers.length;

        // Rebuild spatial grid each frame (counting sort — no allocation after init)
        rebuildSpatialGrid({
            grid: this._grid,
            posX,
            posY,
            particleCount: count,
            worldWidth: this.worldSize.x,
            worldHeight: this.worldSize.y
        });

        const maxAttractionRadiusSqrd = this._maxAttractionRadius * this._maxAttractionRadius;
        const minDistanceSqrd = (2 * CELL_RADIUS) ** 2;
        const halfWorldX = this.worldSize.x / 2;
        const halfWorldY = this.worldSize.y / 2;

        // Dispatch slices to force workers
        const chunkSize = Math.ceil(count / numWorkers);
        const promises = this._forceWorkers.map((worker, idx) => {
            const startIdx = idx * chunkSize;
            const endIdx = Math.min(startIdx + chunkSize, count);
            if (startIdx >= count) return Promise.resolve(null);

            return new Promise<{ velX: Float32Array; velY: Float32Array; startIdx: number }>(
                (resolve) => {
                    worker.onmessage = (e) => resolve(e.data);
                    worker.postMessage({
                        posX,
                        posY,
                        colors,
                        gridOffsets: this._grid.cellOffsets,
                        gridIndices: this._grid.particleIndices,
                        gridCols: this._grid.cols,
                        gridRows: this._grid.rows,
                        worldSizeX: this.worldSize.x,
                        worldSizeY: this.worldSize.y,
                        attractionMatrix: this.attractionMatrix,
                        numColors: COLORS.length,
                        startIdx,
                        endIdx,
                        maxAttractionRadiusSqrd,
                        minDistanceSqrd,
                        halfWorldX,
                        halfWorldY
                    });
                }
            );
        });

        const results = await Promise.all(promises);

        // Apply velocities and update positions in one pass
        const wsx = this.worldSize.x;
        const wsy = this.worldSize.y;

        const carry = 1 - this._friction;
        for (const result of results) {
            if (!result) continue;
            const rVelX = result.velX;
            const rVelY = result.velY;
            const start = result.startIdx;
            for (let j = 0; j < rVelX.length; j++) {
                velX[start + j] = velX[start + j] * carry + rVelX[j];
                velY[start + j] = velY[start + j] * carry + rVelY[j];
            }
        }

        // Update positions with wrapping
        for (let i = 0; i < count; i++) {
            let px = posX[i] + velX[i];
            let py = posY[i] + velY[i];
            if (px <= 0) px += wsx;
            else if (px >= wsx) px -= wsx;
            if (py <= 0) py += wsy;
            else if (py >= wsy) py -= wsy;
            posX[i] = px;
            posY[i] = py;
        }
    }
}
