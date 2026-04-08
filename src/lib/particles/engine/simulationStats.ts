import type { SpatialGrid } from '$lib/particles/spatialGrid';

export type StatsResult = {
    changeScore: number | null; // null on first call (no previous snapshot to compare)
    frameCount: number;
    timestamp: number; // performance.now() at computation time
};

export class SimulationStats {
    private _prevSnapshot: Uint16Array | null = null;

    /**
     * Computes a snapshot of the current particle distribution and compares it
     * to the previous snapshot to produce a `changeScore`.
     *
     * ## Snapshot
     * The spatial grid divides the world into a cols×rows array of cells.
     * `cellOffsets` is a prefix-sum array where the particle count for cell i
     * is `cellOffsets[i+1] - cellOffsets[i]`. The snapshot is simply that
     * array of per-cell counts, stored as Uint16 (max 65535 particles per cell).
     *
     * ## changeScore
     * The score is the RMS (root mean square) difference between the current
     * and previous snapshots:
     *
     *   changeScore = sqrt( Σ (count[i] - prevCount[i])² / cellCount )
     *
     * Dividing by cellCount normalises the score so it represents the average
     * per-cell change rather than a raw sum, making scores comparable between
     * worlds of different resolutions. A score near 0 means the particle
     * distribution has barely changed since the last call (settled simulation);
     * a high score means significant redistribution is still happening.
     *
     * Returns null on the first call since there is no previous snapshot yet.
     */
    compute(grid: SpatialGrid, frameCount: number): StatsResult {
        const cellCount = grid.cols * grid.rows;
        const snapshot = new Uint16Array(cellCount);
        for (let i = 0; i < cellCount; i++) {
            snapshot[i] = grid.cellOffsets[i + 1] - grid.cellOffsets[i];
        }

        let changeScore: number | null = null;
        if (this._prevSnapshot !== null) {
            let sum = 0;
            for (let i = 0; i < cellCount; i++) {
                const d = snapshot[i] - this._prevSnapshot[i];
                sum += d * d;
            }
            changeScore = Math.sqrt(sum / cellCount);
        }
        this._prevSnapshot = snapshot;

        // TODO Maybe we'd prefer getting the timestamp in the parameters
        return { changeScore, frameCount, timestamp: performance.now() };
    }

    reset() {
        this._prevSnapshot = null;
    }
}
