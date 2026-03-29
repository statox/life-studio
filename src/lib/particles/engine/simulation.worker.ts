import type { Callback } from '$lib/tsUtils';
import { Engine } from './Engine';
import { EngineST } from './EngineST';
import type { EngineRequest } from './types';
import type { Particles } from './particles';

let engine: Engine | EngineST;
onmessage = (request: MessageEvent<EngineRequest>) => {
    const { msg } = request.data;

    if (msg === 'start') {
        const { cells, attractionTable, worldSize, maxAttractionRadius, useWorkers, friction } =
            request.data;
        if (engine) {
            engine.destroy();
        }
        if (useWorkers === false) {
            engine = new EngineST(cells, attractionTable, worldSize, maxAttractionRadius, friction);
        } else {
            engine = new Engine(cells, attractionTable, worldSize, maxAttractionRadius, friction);
        }
        engine.run(onUpdatedParticles);
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

const onUpdatedParticles: Callback<Particles> = (error, particles) => {
    if (error) throw error;
    if (!particles) throw new Error('No particles in engine step cb');

    // Send interleaved positions as Float32Array [x0,y0,x1,y1,...]
    const n = particles.count;
    const positions = new Float32Array(n * 2);
    for (let i = 0; i < n; i++) {
        positions[i * 2] = particles.posX[i];
        positions[i * 2 + 1] = particles.posY[i];
    }
    postMessage({ positions }, { transfer: [positions.buffer] });
};
