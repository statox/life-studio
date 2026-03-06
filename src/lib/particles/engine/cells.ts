import type { Cell, Coordinates } from './types';
import { COLORS, type Color } from './colors';

const randColor = (): Color => {
    const randIndex = Math.floor(Math.random() * COLORS.length);
    return COLORS[randIndex];
};

export type ColorProportions = Record<Color, number>;

const buildColorThresholds = (proportions: ColorProportions): [Color, number][] => {
    const total = COLORS.reduce((s, c) => s + (proportions[c] ?? 1), 0);
    let cumulative = 0;
    return COLORS.map((c) => {
        cumulative += (proportions[c] ?? 1) / total;
        return [c, cumulative];
    });
};

const pickColor = (thresholds: [Color, number][]): Color => {
    const r = Math.random();
    for (const [color, threshold] of thresholds) {
        if (r < threshold) return color;
    }
    return thresholds[thresholds.length - 1][0];
};

export const getNewCells = (
    worldSize: Coordinates,
    nbParticles: number,
    proportions?: ColorProportions
): Cell[] => {
    const thresholds = proportions ? buildColorThresholds(proportions) : null;
    const cells = [] as Cell[];
    for (let i = 0; i < nbParticles; i++) {
        cells.push({
            id: i,
            pos: { x: Math.random() * worldSize.x, y: Math.random() * worldSize.y },
            vel: { x: 0, y: 0 },
            color: thresholds ? pickColor(thresholds) : randColor()
        });
    }
    return cells;
};

export const centerCellsInPlace = (cells: Cell[], worldSize: { x: number; y: number }) => {
    for (const cell of cells) {
        const r = 2 * Math.random();
        const theta = Math.random() * 2 * Math.PI;
        cell.pos = {
            x: worldSize.x / 2 + r * Math.cos(theta),
            y: worldSize.y / 2 + r * Math.sin(theta)
        };
    }
};

export const largeCenterCellsInPlace = (cells: Cell[], worldSize: { x: number; y: number }) => {
    for (const cell of cells) {
        const r = 200 * Math.random();
        const theta = Math.random() * 2 * Math.PI;
        cell.pos = {
            x: worldSize.x / 2 + r * Math.cos(theta),
            y: worldSize.y / 2 + r * Math.sin(theta)
        };
    }
};

export const rainbowCellsInPlace = (cells: Cell[], worldSize: { x: number; y: number }) => {
    const sectionWidth = worldSize.x / 4;
    for (const cell of cells) {
        cell.color = COLORS[Math.min(Math.floor(cell.pos.x / sectionWidth), 3)];
    }
};
