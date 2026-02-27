import type { AttractionTable } from '$lib/particles/attraction';
import type { Cell, Coordinates, UpdateCellsResponse } from './types';

export function createSimulationWorker() {
    let worker: Worker | undefined;
    let WorkerConstructor: (new () => Worker) | undefined;

    const loadWorker = async () => {
        const mod = await import('$lib/particles/engine/simulation.worker?worker');
        WorkerConstructor = mod.default;
    };

    const start = (
        params: { worldSize: Coordinates; nbParticles: number; maxAttractionRadius: number },
        cells: Cell[],
        attractionTable: AttractionTable,
        onFrame: (positions: Coordinates[]) => void
    ) => {
        if (!WorkerConstructor) throw new Error('Worker is not initialized');
        worker?.postMessage({ msg: 'destroy' });
        worker?.terminate();
        worker = new WorkerConstructor();
        worker.onmessage = (e: MessageEvent<UpdateCellsResponse>) => onFrame(e.data.positions);
        worker.postMessage({
            msg: 'start',
            cells,
            attractionTable,
            worldSize: params.worldSize,
            maxAttractionRadius: params.maxAttractionRadius
        });
    };

    const updateAttractionTable = (table: AttractionTable) => {
        worker?.postMessage({ msg: 'updateTable', attractionTable: table });
    };

    const destroy = () => {
        worker?.terminate();
    };

    return { loadWorker, start, updateAttractionTable, destroy };
}
