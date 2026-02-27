import { getAttractionForce } from '$lib/particles/attraction';
import type { AttractionTable } from '$lib/particles/attraction';
import { getNeighborCoords } from '$lib/particles/cellsMap';
import { COLORS } from './Engine';
import { wrappedDistance } from './math';
import type { Color } from './types';

type ForceWorkerRequest = {
    positions: Float32Array; // [x0, y0, x1, y1, ...]
    colors: Uint8Array; // color index per cell
    squaresFlat: number[][][]; // squaresFlat[row][col] = array of cell IDs
    squareCols: number;
    squareRows: number;
    worldSize: { x: number; y: number };
    attractionTable: AttractionTable;
    startIdx: number;
    endIdx: number;
    maxAttractionRadiusSqrd: number;
    minDistanceSqrd: number;
    halfWorldDistance: number;
};

onmessage = (event: MessageEvent<ForceWorkerRequest>) => {
    const {
        positions,
        colors,
        squaresFlat,
        squareCols,
        squareRows,
        worldSize,
        attractionTable,
        startIdx,
        endIdx,
        maxAttractionRadiusSqrd,
        minDistanceSqrd,
        halfWorldDistance
    } = event.data;

    const count = endIdx - startIdx;
    const velX = new Float32Array(count);
    const velY = new Float32Array(count);

    for (let i = startIdx; i < endIdx; i++) {
        const ix = positions[i * 2];
        const iy = positions[i * 2 + 1];
        const iColor: Color = COLORS[colors[i]];

        // Find which square this cell occupies
        const sx = Math.min(Math.floor((ix * squareCols) / worldSize.x), squareCols - 1);
        const sy = Math.min(Math.floor((iy * squareRows) / worldSize.y), squareRows - 1);

        const neighborSquares = getNeighborCoords(sx, sy, squareCols, squareRows).map(
            ({ x, y }) => squaresFlat[y][x]
        );

        let vx = 0;
        let vy = 0;

        for (const square of neighborSquares) {
            for (const j of square) {
                if (i === j) continue;

                const jx = positions[j * 2];
                const jy = positions[j * 2 + 1];
                const jColor: Color = COLORS[colors[j]];

                const dx = jx - ix;
                const dy = jy - iy;

                const { distSqrd, wrapped } = wrappedDistance(
                    worldSize,
                    { x: ix, y: iy },
                    { x: jx, y: jy },
                    halfWorldDistance
                );

                let force = getAttractionForce(
                    attractionTable,
                    maxAttractionRadiusSqrd,
                    minDistanceSqrd,
                    distSqrd,
                    iColor,
                    jColor
                );

                if (wrapped) force *= -1;

                const dirMag = Math.sqrt(dx * dx + dy * dy);
                if (dirMag === 0) continue;

                vx += (dx / dirMag) * force;
                vy += (dy / dirMag) * force;
            }
        }

        // Clamp velocity magnitude to 1 (matches attractionForce in forces.ts)
        const velMag = Math.sqrt(vx * vx + vy * vy);
        if (velMag > 1) {
            vx /= velMag;
            vy /= velMag;
        }

        velX[i - startIdx] = vx;
        velY[i - startIdx] = vy;
    }

    postMessage({ velX, velY, startIdx }, { transfer: [velX.buffer, velY.buffer] });
};
