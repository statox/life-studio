import type { AttractionTable } from '$lib/particles/attraction';
import type { Cell, PerfData, UpdateCellsResponse } from './types';
import type { StatsResult } from './simulationStats';

export type SimulationParameters = {
    worldSize: { x: number; y: number };
    maxAttractionRadius: number;
    attractionTable: AttractionTable;
    cells: Cell[];
    useWorkers?: boolean;
    friction?: number;
};

export function createSimulationWorker() {
    let worker: Worker | undefined;
    let WorkerConstructor: (new () => Worker) | undefined;

    const loadWorker = async () => {
        if (worker) return; // Worker already loaded
        const mod = await import('$lib/particles/engine/simulation.worker?worker');
        WorkerConstructor = mod.default;
    };

    const start = async (
        params: SimulationParameters,
        onFrame: (positions: Float32Array, perf?: PerfData) => void,
        onStats?: (stats: StatsResult) => void
    ) => {
        await loadWorker();
        const { worldSize, maxAttractionRadius, attractionTable, cells, useWorkers, friction } =
            params;

        if (!WorkerConstructor) throw new Error('Worker is not initialized');
        worker?.postMessage({ msg: 'destroy' });
        worker?.terminate();
        worker = new WorkerConstructor();
        worker.onmessage = (e: MessageEvent<UpdateCellsResponse>) => {
            if (e.data.stats && onStats) onStats(e.data.stats);
            onFrame(e.data.positions, e.data.perf);
        };
        worker.postMessage({
            msg: 'start',
            cells,
            attractionTable: JSON.parse(JSON.stringify(attractionTable)),
            worldSize,
            maxAttractionRadius,
            useWorkers,
            friction
        });
    };

    const updateAttractionTable = (table: AttractionTable) => {
        worker?.postMessage({
            msg: 'updateTable',
            attractionTable: JSON.parse(JSON.stringify(table))
        });
    };

    const pause = () => {
        worker?.postMessage({ msg: 'pause' });
    };

    const unpause = () => {
        worker?.postMessage({ msg: 'unpause' });
    };

    const destroy = () => {
        worker?.terminate();
    };

    return { loadWorker, start, updateAttractionTable, pause, unpause, destroy } as const;
}
