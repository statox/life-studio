/**
 * Flat spatial grid for fast neighbor lookups, rebuilt each frame via counting sort.
 *
 * The world is divided into a uniform grid of `cols × rows` cells.
 * Each cell holds a contiguous slice of the `particleIndices` array, so iterating
 * all particles in a cell is a simple range loop with no indirection:
 *
 *   const grid = createSpatialGrid({ cols, rows, particleCount });
 *   rebuildSpatialGrid({ grid, posX, posY, particleCount, worldWidth, worldHeight });
 *
 *   // All particles in grid cell `c` are at:
 *   //   for (let j = grid.cellOffsets[c]; j < grid.cellOffsets[c + 1]; j++)
 *   //       const particleIdx = grid.particleIndices[j];
 */

export interface SpatialGrid {
    cols: number;
    rows: number;
    /**
     * Start index into `particleIndices` for each grid cell (length = cols * rows + 1).
     * Particles in cell `c` span `particleIndices[cellOffsets[c] .. cellOffsets[c+1])`.
     */
    cellOffsets: Uint32Array;
    /** Particle indices sorted by their grid cell (length = particle count). */
    particleIndices: Uint32Array;
    /** Internal scratch buffer used during counting sort (length = cols * rows). */
    _cellCounts: Uint32Array;
}

export const createSpatialGrid = (params: {
    cols: number;
    rows: number;
    particleCount: number;
}): SpatialGrid => ({
    cols: params.cols,
    rows: params.rows,
    cellOffsets: new Uint32Array(params.cols * params.rows + 1),
    particleIndices: new Uint32Array(params.particleCount),
    _cellCounts: new Uint32Array(params.cols * params.rows)
});

export const rebuildSpatialGrid = (params: {
    grid: SpatialGrid;
    posX: Float32Array;
    posY: Float32Array;
    particleCount: number;
    worldWidth: number;
    worldHeight: number;
}): void => {
    const { grid, posX, posY, particleCount, worldWidth, worldHeight } = params;
    const { cols, rows, cellOffsets, particleIndices, _cellCounts } = grid;
    const totalCells = cols * rows;

    _cellCounts.fill(0);

    // Pass 1: count how many particles fall into each grid cell
    for (let i = 0; i < particleCount; i++) {
        const cellX = Math.min(Math.floor((posX[i] * cols) / worldWidth), cols - 1);
        const cellY = Math.min(Math.floor((posY[i] * rows) / worldHeight), rows - 1);
        _cellCounts[cellY * cols + cellX]++;
    }

    // Pass 2: prefix sum over counts to build cellOffsets
    cellOffsets[0] = 0;
    for (let c = 0; c < totalCells; c++) {
        cellOffsets[c + 1] = cellOffsets[c] + _cellCounts[c];
    }

    // Pass 3: place each particle index into its cell's slice of particleIndices
    _cellCounts.fill(0); // reuse as per-cell cursors
    for (let i = 0; i < particleCount; i++) {
        const cellX = Math.min(Math.floor((posX[i] * cols) / worldWidth), cols - 1);
        const cellY = Math.min(Math.floor((posY[i] * rows) / worldHeight), rows - 1);
        const cellIdx = cellY * cols + cellX;
        particleIndices[cellOffsets[cellIdx] + _cellCounts[cellIdx]] = i;
        _cellCounts[cellIdx]++;
    }
};
