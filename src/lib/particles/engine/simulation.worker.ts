import type { Callback } from '$lib/tsUtils';
import { Engine } from './Engine';
import type { Cell, EngineRequest } from './types';

let engine: Engine;
onmessage = (request: MessageEvent<EngineRequest>) => {
    const { msg } = request.data;

    if (msg === 'start') {
        const { cells, attractionTable, worldSize, maxAttractionRadius } = request.data;
        if (engine) {
            engine.destroy();
        }
        engine = new Engine(cells, attractionTable, worldSize, maxAttractionRadius, {
            pullAppartAtStart: false
        });
        engine.run(onUpdatedCells);
    }

    if (msg === 'pause') {
        engine.pause();
    }

    if (msg === 'unpause') {
        engine.unpause();
    }

    if (msg === 'updateTable') {
        engine.updateAttractionTable(request.data.attractionTable);
    }

    if (msg === 'destroy') {
        if (engine) {
            engine.destroy();
        }
    }
};

const onUpdatedCells: Callback<Cell[]> = (error, cells) => {
    if (error) {
        throw error;
    }
    if (!cells) {
        throw new Error('No cells in engine step cb');
    }

    const positions = cells.map((c) => c.pos);
    postMessage({ positions });
};
