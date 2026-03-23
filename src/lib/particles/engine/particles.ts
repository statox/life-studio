import type { Cell } from './types';
import { colorToIndex } from './colors';

export interface Particles {
    count: number;
    posX: Float32Array;
    posY: Float32Array;
    colors: Uint8Array;
}

export const cellsToParticles = (cells: Cell[]): Particles => {
    const n = cells.length;
    const posX = new Float32Array(n);
    const posY = new Float32Array(n);
    const colors = new Uint8Array(n);

    for (let i = 0; i < n; i++) {
        posX[i] = cells[i].pos.x;
        posY[i] = cells[i].pos.y;
        colors[i] = colorToIndex(cells[i].color);
    }

    return { count: n, posX, posY, colors };
};
