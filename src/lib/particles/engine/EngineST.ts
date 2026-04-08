import type { Callback } from '$lib/tsUtils';
import { attractionTableToMatrix } from '$lib/particles/attraction';
import type { AttractionTable } from '$lib/particles/attraction';
import { COLORS } from './colors';
import { cellsToParticles } from './particles';
import type { Particles } from './particles';
import { createSpatialGrid, rebuildSpatialGrid } from '$lib/particles/spatialGrid';
import type { SpatialGrid } from '$lib/particles/spatialGrid';
import type { Cell, PerfData, WorldSize } from './types';
import { SimulationStats } from './simulationStats';
import type { StatsResult } from './simulationStats';
import { computeForces } from './computeForces';

export const CELL_RADIUS = 3;

/* Single thread engine */
export class EngineST {
    _stepTimeout: ReturnType<typeof setTimeout> | undefined;
    _stepCb: Callback<Particles>;
    _running: boolean;
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
        this._stepCb = () => {};
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

    _frameCount = 0;
    _tGrid = 0;
    _tForce = 0;
    _tUpdate = 0;
    _lastStatsTs: number = performance.now();
    _stats = new SimulationStats();
    statsResult: StatsResult | null = null;
    perfData: Omit<PerfData, 'interleave'> | null = null;

    async step() {
        const { count, posX, posY, colors } = this.particles;
        const velX = this._velX;
        const velY = this._velY;

        const t0 = performance.now();

        // Rebuild spatial grid each frame (counting sort — no allocation after init)
        rebuildSpatialGrid({
            grid: this._grid,
            posX,
            posY,
            particleCount: count,
            worldWidth: this.worldSize.x,
            worldHeight: this.worldSize.y
        });

        const t1 = performance.now();

        const maxAttractionRadiusSqrd = this._maxAttractionRadius * this._maxAttractionRadius;
        const minDistanceSqrd = (2 * CELL_RADIUS) ** 2;
        const halfWorldX = this.worldSize.x / 2;
        const halfWorldY = this.worldSize.y / 2;

        const result = computeForces({
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
            startIdx: 0,
            endIdx: count,
            maxAttractionRadiusSqrd,
            minDistanceSqrd,
            halfWorldX,
            halfWorldY
        });

        const t2 = performance.now();

        const rVelX = result.velX;
        const rVelY = result.velY;
        const carry = 1 - this._friction;
        for (let j = 0; j < rVelX.length; j++) {
            velX[j] = velX[j] * carry + rVelX[j];
            velY[j] = velY[j] * carry + rVelY[j];
        }

        // Update positions with wrapping
        const wsx = this.worldSize.x;
        const wsy = this.worldSize.y;

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

        const t3 = performance.now();

        this._frameCount++;
        this._tGrid += t1 - t0;
        this._tForce += t2 - t1;
        this._tUpdate += t3 - t2;

        const now = performance.now();
        if (now - this._lastStatsTs > 3000) {
            this._lastStatsTs = now;
            this.statsResult = this._stats.compute(this._grid, this._frameCount);
        }

        if (this._frameCount % 120 === 0) {
            const n = 120;
            this.perfData = {
                grid: this._tGrid / n,
                force: this._tForce / n,
                update: this._tUpdate / n,
                particles: count,
                frame: this._frameCount
            };
            this._tGrid = 0;
            this._tForce = 0;
            this._tUpdate = 0;
        }
    }
}
