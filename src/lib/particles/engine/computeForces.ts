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

    // Pre-computed thresholds for the triangle force curve.
    // The force is a triangle function of distSqrd:
    //   0 below halfR2, ramps to attractionValue at threeQuarterR2,
    //   ramps back to 0 at maxR2. The ramp width is quarterR2.
    const halfR2 = maxAttractionRadiusSqrd * 0.5;
    const quarterR2 = maxAttractionRadiusSqrd * 0.25;
    const threeQuarterR2 = halfR2 + quarterR2;

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

                    let dx = jx - ix;
                    let dy = jy - iy;

                    // Shortest toroidal displacement per axis
                    if (dx > halfWorldX) dx -= worldSizeX;
                    else if (dx < -halfWorldX) dx += worldSizeX;
                    if (dy > halfWorldY) dy -= worldSizeY;
                    else if (dy < -halfWorldY) dy += worldSizeY;

                    const distSqrd = dx * dx + dy * dy;

                    // Too far to interact
                    if (distSqrd > maxAttractionRadiusSqrd) continue;

                    // Close-range repulsion (force = -1)
                    if (distSqrd < minDistanceSqrd) {
                        const dirMag = Math.sqrt(distSqrd);
                        if (dirMag === 0) continue;
                        vx -= dx / dirMag;
                        vy -= dy / dirMag;
                        continue;
                    }

                    // Below the triangle onset: force is 0
                    if (distSqrd < halfR2) continue;

                    // Attraction value for this color pair
                    const attractionValue = attractionMatrix[iColor * numColors + colors[j]];
                    if (attractionValue === 0) continue;

                    // Triangle ramp: up from halfR2 to threeQuarterR2,
                    // down from threeQuarterR2 to maxR2
                    const force =
                        distSqrd < threeQuarterR2
                            ? ((distSqrd - halfR2) / quarterR2) * attractionValue
                            : ((maxAttractionRadiusSqrd - distSqrd) / quarterR2) * attractionValue;

                    const dirMag = Math.sqrt(distSqrd);
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
