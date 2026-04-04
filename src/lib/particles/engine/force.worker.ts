import { computeForces, type ComputeForcesParams } from './computeForces';

onmessage = (event: MessageEvent<ComputeForcesParams>) => {
    const { velX, velY, startIdx } = computeForces(event.data);
    postMessage({ velX, velY, startIdx }, { transfer: [velX.buffer, velY.buffer] });
};
