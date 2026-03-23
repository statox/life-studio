import { COLORS } from '$lib/particles/engine';
import type { AttractionTable } from './types';

const triangleMap = function (
    n: number,
    start1: number,
    stop1: number,
    start2: number,
    stop2: number
) {
    const middle = start1 + (stop1 - start1) / 2;
    if (n < middle) {
        return linearMap(n, start1, middle, start2, stop2);
    }
    return linearMap(n, middle, stop1, stop2, start2);
};

export const linearMap = function (
    n: number,
    start1: number,
    stop1: number,
    start2: number,
    stop2: number
) {
    const newval = ((n - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
    if (start2 < stop2) {
        return constrain(newval, start2, stop2);
    } else {
        return constrain(newval, stop2, start2);
    }
};

const constrain = function (n: number, low: number, high: number) {
    return Math.max(Math.min(n, high), low);
};

/**
 * Convert string-keyed AttractionTable to a flat Float32Array(16) for fast numeric lookup.
 * Layout: matrix[selfColor * 4 + otherColor]
 */
export const attractionTableToMatrix = (table: AttractionTable): Float32Array => {
    const n = COLORS.length;
    const matrix = new Float32Array(n * n);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            matrix[i * n + j] = table[COLORS[i]][COLORS[j]] ?? 0;
        }
    }
    return matrix;
};

/**
 * Force calculation using numeric color indices and flat matrix.
 * Avoids string property lookups in the hot loop.
 */
export const getAttractionForceNumeric = (
    matrix: Float32Array,
    numColors: number,
    maxAttractionRadiusSqrd: number,
    minDistanceSqrd: number,
    distSqrd: number,
    colorA: number,
    colorB: number
): number => {
    if (distSqrd > maxAttractionRadiusSqrd) return 0;
    if (distSqrd < minDistanceSqrd) return -1;

    const attractionValue = matrix[colorA * numColors + colorB];
    if (attractionValue === 0) return 0;

    return triangleMap(
        distSqrd,
        maxAttractionRadiusSqrd / 2,
        maxAttractionRadiusSqrd,
        0,
        attractionValue
    );
};
