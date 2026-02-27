import { COLORS, type Cell, type Color, type Coordinates } from './types';

const randColor = (): Color => {
    const randIndex = Math.floor(Math.random() * COLORS.length);
    return COLORS[randIndex];
};

export const getNewCells = (worldSize: Coordinates, nbParticles: number): Cell[] => {
    const cells = [] as Cell[];
    for (let i = 0; i < nbParticles; i++) {
        const cell = {
            id: i,
            pos: {
                x: Math.random() * worldSize.x,
                y: Math.random() * worldSize.y
            },
            vel: { x: 0, y: 0 },
            color: randColor()
        };
        cells.push(cell);
    }
    return cells;
};
