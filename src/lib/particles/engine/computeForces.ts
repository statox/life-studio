import { getAttractionForceNumeric } from '$lib/particles/attraction';

export type ComputeForcesParams = {
    posX: Float32Array;
    posY: Float32Array;
    colors: Uint8Array;
    gridOffsets: Uint32Array;
    gridIndices: Uint32Array;
    gridCols: number;
    gridRows: number;
    worldSizeX: number;
    worldSizeY: number;
    attractionMatrix: Float32Array;
    numColors: number;
    startIdx: number;
    endIdx: number;
    maxAttractionRadiusSqrd: number;
    minDistanceSqrd: number;
    halfWorldX: number;
    halfWorldY: number;
};

export function computeForces(params: ComputeForcesParams): {
    velX: Float32Array;
    velY: Float32Array;
    startIdx: number;
} {
    const {
        posX,
        posY,
        colors,
        gridOffsets,
        gridIndices,
        gridCols,
        gridRows,
        worldSizeX,
        worldSizeY,
        attractionMatrix,
        numColors,
        startIdx,
        endIdx,
        maxAttractionRadiusSqrd,
        minDistanceSqrd,
        halfWorldX,
        halfWorldY
    } = params;

    const count = endIdx - startIdx;
    const velX = new Float32Array(count);
    const velY = new Float32Array(count);

    for (let i = startIdx; i < endIdx; i++) {
        const ix = posX[i];
        const iy = posY[i];
        const iColor = colors[i];

        // Grid cell of this particle
        const sx = Math.min(Math.floor((ix * gridCols) / worldSizeX), gridCols - 1);
        const sy = Math.min(Math.floor((iy * gridRows) / worldSizeY), gridRows - 1);

        let vx = 0;
        let vy = 0;

        // Iterate 3x3 neighbor cells (inlined, no object allocation)
        const prevX = sx === 0 ? gridCols - 1 : sx - 1;
        const nextX = sx === gridCols - 1 ? 0 : sx + 1;
        const prevY = sy === 0 ? gridRows - 1 : sy - 1;
        const nextY = sy === gridRows - 1 ? 0 : sy + 1;

        const nxArr = [prevX, sx, nextX];
        const nyArr = [prevY, sy, nextY];

        for (let ny = 0; ny < 3; ny++) {
            const row = nyArr[ny];
            for (let nx = 0; nx < 3; nx++) {
                const cellIdx = row * gridCols + nxArr[nx];
                const cellStart = gridOffsets[cellIdx];
                const cellEnd = gridOffsets[cellIdx + 1];

                for (let k = cellStart; k < cellEnd; k++) {
                    const j = gridIndices[k];
                    if (i === j) continue;

                    const jx = posX[j];
                    const jy = posY[j];

                    const dx = jx - ix;
                    const dy = jy - iy;

                    // Check if wrapping is shorter (inlined, no object allocation)
                    let wrapped = false;
                    const noWrapDistSqrd = dx * dx + dy * dy;

                    let distSqrd: number;
                    if (noWrapDistSqrd <= halfWorldX * halfWorldX + halfWorldY * halfWorldY) {
                        distSqrd = noWrapDistSqrd;
                    } else {
                        // Wrapped distance
                        let wdx = Math.abs(dx);
                        if (wdx > halfWorldX) wdx = worldSizeX - wdx;
                        let wdy = Math.abs(dy);
                        if (wdy > halfWorldY) wdy = worldSizeY - wdy;
                        distSqrd = wdx * wdx + wdy * wdy;
                        wrapped = true;
                    }

                    let force = getAttractionForceNumeric(
                        attractionMatrix,
                        numColors,
                        maxAttractionRadiusSqrd,
                        minDistanceSqrd,
                        distSqrd,
                        iColor,
                        colors[j]
                    );

                    if (wrapped) force *= -1;

                    const dirMag = Math.sqrt(dx * dx + dy * dy);
                    if (dirMag === 0) continue;

                    vx += (dx / dirMag) * force;
                    vy += (dy / dirMag) * force;
                }
            }
        }

        // Clamp velocity magnitude to 1
        const velMag = Math.sqrt(vx * vx + vy * vy);
        if (velMag > 1) {
            vx /= velMag;
            vy /= velMag;
        }

        velX[i - startIdx] = vx;
        velY[i - startIdx] = vy;
    }

    return { velX, velY, startIdx };
}
