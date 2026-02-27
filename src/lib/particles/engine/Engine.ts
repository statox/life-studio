import type { Callback } from '$lib/tsUtils';
import { getZeroedAttractionTable } from '$lib/particles/attraction';
import type { AttractionTable } from '$lib/particles/attraction';
import { CellsMap } from '$lib/particles/cellsMap';
import { updateCells } from './cells';
import { updateCellPos } from './math';
import type { Cell, Coordinates, WorldSize } from './types';

import { COLORS } from './types';

const colorToIndex = (color: string): number => {
    const idx = COLORS.indexOf(color as typeof COLORS[number]);
    return idx === -1 ? 0 : idx;
};

export class Engine {
    _stepTimeout: ReturnType<typeof setTimeout> | undefined;
    _stepCb: Callback<Cell[]>;
    _running: boolean;
    _cellsMap: CellsMap;
    _forceWorkers: Worker[];
    attractionTable: AttractionTable;
    worldSize: WorldSize;
    cells: Cell[];

    constructor(
        cells: Cell[],
        attractionTable: AttractionTable,
        worldSize: WorldSize,
        maxAttractionRadius: number,
        params: {
            pullAppartAtStart: boolean;
        }
    ) {
        this._stepTimeout = undefined;
        this._stepCb = console.log; // The actual function is provided to run()
        this._running = false;
        this.cells = cells;
        this.attractionTable = attractionTable;
        this.worldSize = worldSize;

        this._cellsMap = new CellsMap({ worldSize: this.worldSize, maxAttractionRadius });

        for (const cell of this.cells) {
            this._cellsMap.insert(cell);
        }

        // Spawn force sub-workers (leave one thread for the simulation coordinator)
        const numWorkers = Math.max(1, Math.min((self.navigator?.hardwareConcurrency ?? 4) - 1, 8));
        this._forceWorkers = Array.from(
            { length: numWorkers },
            () => new Worker(new URL('./force.worker.ts', import.meta.url), { type: 'module' })
        );

        if (params.pullAppartAtStart) {
            for (let i = 0; i < 100; i++) {
                updateCells(
                    getZeroedAttractionTable(),
                    this._cellsMap.maxAttractionRadius,
                    this.cells,
                    this._cellsMap
                );
            }
        }
    }

    run(stepCallback: Callback<Cell[]>) {
        this._stepCb = stepCallback;
        const runSteps = async () => {
            if (this._running) {
                await this.step();
                this._stepCb(undefined, this.cells);
            }
            this._stepTimeout = setTimeout(runSteps);
        };
        this._running = true;
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
    }

    async step() {
        const n = this.cells.length;
        const numWorkers = this._forceWorkers.length;

        // Serialize cell data into flat typed arrays for fast transfer
        const positions = new Float32Array(n * 2);
        const colors = new Uint8Array(n);
        for (let i = 0; i < n; i++) {
            positions[i * 2] = this.cells[i].pos.x;
            positions[i * 2 + 1] = this.cells[i].pos.y;
            colors[i] = colorToIndex(this.cells[i].color);
        }

        // Serialize CellsMap squares as plain arrays (structured-cloned to each worker)
        const squaresFlat = this._cellsMap.squares.map((row) => row.map((set) => [...set]));
        const squareCols = this._cellsMap.squares[0].length;
        const squareRows = this._cellsMap.squares.length;

        const smallestDimension = Math.min(this.worldSize.x, this.worldSize.y);
        const halfWorldDistance = (smallestDimension * smallestDimension) / 2;
        const maxAttractionRadius = this._cellsMap.maxAttractionRadius;
        const maxAttractionRadiusSqrd = maxAttractionRadius * maxAttractionRadius;
        const cellRadius = 3;
        const minDistanceSqrd = (2 * cellRadius) ** 2;

        // Dispatch each slice to a force worker in parallel
        const chunkSize = Math.ceil(n / numWorkers);
        const promises = this._forceWorkers.map((worker, idx) => {
            const startIdx = idx * chunkSize;
            const endIdx = Math.min(startIdx + chunkSize, n);
            if (startIdx >= n) return Promise.resolve(null);

            return new Promise<{ velX: Float32Array; velY: Float32Array; startIdx: number }>(
                (resolve) => {
                    worker.onmessage = (e) => resolve(e.data);
                    worker.postMessage({
                        positions,
                        colors,
                        squaresFlat,
                        squareCols,
                        squareRows,
                        worldSize: this.worldSize,
                        attractionTable: this.attractionTable,
                        startIdx,
                        endIdx,
                        maxAttractionRadiusSqrd,
                        minDistanceSqrd,
                        halfWorldDistance
                    });
                }
            );
        });

        const results = await Promise.all(promises);

        // Apply velocities from all workers
        for (const result of results) {
            if (!result) continue;
            const { velX, velY, startIdx } = result;
            for (let j = 0; j < velX.length; j++) {
                this.cells[startIdx + j].vel.x = velX[j];
                this.cells[startIdx + j].vel.y = velY[j];
            }
        }

        // Update all positions and CellsMap after all forces are computed
        for (const cell of this.cells) {
            updateCellPos(this.worldSize, cell);
            this._cellsMap.updateCell(cell);
        }
    }
}
