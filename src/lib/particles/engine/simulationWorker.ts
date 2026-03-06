import type { AttractionTable } from '$lib/particles/attraction';
import type { Cell, Coordinates, UpdateCellsResponse } from './types';

export type SimulationParameters = {
    worldSize: Coordinates;
    maxAttractionRadius: number;
    attractionTable: AttractionTable;
    cells: Cell[];
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
        onFrame: (positions: Coordinates[]) => void
    ) => {
        await loadWorker();
        const { worldSize, maxAttractionRadius, attractionTable, cells } = params;

        if (!WorkerConstructor) throw new Error('Worker is not initialized');
        worker?.postMessage({ msg: 'destroy' });
        worker?.terminate();
        worker = new WorkerConstructor();
        worker.onmessage = (e: MessageEvent<UpdateCellsResponse>) => onFrame(e.data.positions);
        worker.postMessage({
            msg: 'start',
            cells,
            attractionTable,
            worldSize,
            maxAttractionRadius
        });
    };

    const updateAttractionTable = (table: AttractionTable) => {
        worker?.postMessage({ msg: 'updateTable', attractionTable: table });
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

    return { loadWorker, start, updateAttractionTable, pause, unpause, destroy };
}
