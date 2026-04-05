import { CONFIG, NUM_COLORS, type ColorFeatures, type FeaturesPerColor } from './types';

/**
 * Extracts per-color features (segregation, local density, regularity) by
 * sampling particles and analyzing their local neighborhoods via a spatial index.
 *
 * Builds a lightweight grid on the main thread from interleaved positions
 * since the simulation's spatial grid lives inside the web worker.
 */
export class FeatureExtractor {
    // Reusable grid buffers — allocated once, resized as needed
    private gridCols = 0;
    private gridRows = 0;
    private cellOffsets: Uint32Array = new Uint32Array(0);
    private particleIndices: Uint32Array = new Uint32Array(0);
    private cellCounts: Uint32Array = new Uint32Array(0);

    // Separate position arrays extracted from interleaved input
    private posX: Float32Array = new Float32Array(0);
    private posY: Float32Array = new Float32Array(0);

    /**
     * Extract features from interleaved positions.
     * positions: [x0, y0, x1, y1, ...] in world coordinates
     */
    extract(
        positions: Float32Array,
        colors: Uint8Array,
        n: number,
        worldW: number,
        worldH: number
    ): FeaturesPerColor {
        // De-interleave positions
        if (this.posX.length < n) {
            this.posX = new Float32Array(n);
            this.posY = new Float32Array(n);
        }
        for (let i = 0; i < n; i++) {
            this.posX[i] = positions[i * 2];
            this.posY[i] = positions[i * 2 + 1];
        }

        // Build spatial grid
        this.rebuildGrid(n, worldW, worldH);

        // Collect particle indices per color
        const colorParticles: number[][] = [];
        for (let c = 0; c < NUM_COLORS; c++) colorParticles.push([]);
        for (let i = 0; i < n; i++) {
            if (colors[i] < NUM_COLORS) colorParticles[colors[i]].push(i);
        }

        const features: ColorFeatures[] = [];
        const radius = CONFIG.NEIGHBOR_RADIUS;
        const k = CONFIG.K_NEIGHBORS;
        const samplesTarget = CONFIG.SAMPLES_PER_COLOR;

        for (let c = 0; c < NUM_COLORS; c++) {
            const particles = colorParticles[c];
            if (particles.length === 0) {
                features.push({ segregation: 0.5, localDensity: 0, regularity: 0.5 });
                continue;
            }

            const sampleCount = Math.min(samplesTarget, particles.length);

            let totalSameRatio = 0;
            let totalAvgDist = 0;
            let totalDistVariance = 0;
            let validSamples = 0;

            for (let s = 0; s < sampleCount; s++) {
                // Random sample
                const idx =
                    sampleCount === particles.length
                        ? particles[s]
                        : particles[Math.floor(Math.random() * particles.length)];

                const px = this.posX[idx];
                const py = this.posY[idx];

                // Query neighbors from grid
                const neighbors = this.queryNeighbors(px, py, radius, idx, n, worldW, worldH);
                if (neighbors.length < 2) continue;

                // Take K closest
                // Compute distances and partial-sort to find K nearest
                const dists: { j: number; d: number }[] = [];
                for (const j of neighbors) {
                    const dx = this.posX[j] - px;
                    const dy = this.posY[j] - py;
                    dists.push({ j, d: Math.sqrt(dx * dx + dy * dy) });
                }
                dists.sort((a, b) => a.d - b.d);
                const kNearest = dists.slice(0, k);

                if (kNearest.length < 2) continue;

                // Segregation: ratio of same-color neighbors
                let sameCount = 0;
                for (const { j } of kNearest) {
                    if (colors[j] === c) sameCount++;
                }
                totalSameRatio += sameCount / kNearest.length;

                // Local density: average distance to neighbors
                let sumDist = 0;
                for (const { d } of kNearest) sumDist += d;
                const avgDist = sumDist / kNearest.length;
                totalAvgDist += avgDist;

                // Regularity: coefficient of variation of neighbor distances
                let sumSqDiff = 0;
                for (const { d } of kNearest) {
                    const diff = d - avgDist;
                    sumSqDiff += diff * diff;
                }
                const stdDist = Math.sqrt(sumSqDiff / kNearest.length);
                const cv = avgDist > 0 ? stdDist / avgDist : 0;
                totalDistVariance += cv;

                validSamples++;
            }

            if (validSamples === 0) {
                features.push({ segregation: 0.5, localDensity: 0, regularity: 0.5 });
                continue;
            }

            // Segregation: raw same-color ratio. Baseline for random mixing is 1/NUM_COLORS.
            // Normalize so that random mixing → 0, fully segregated → 1
            const rawSeg = totalSameRatio / validSamples;
            const baseline = 1 / NUM_COLORS;
            const segregation = Math.max(0, Math.min(1, (rawSeg - baseline) / (1 - baseline)));

            // Local density: map avg distance to [0,1]. Small distance = high density.
            const avgDist = totalAvgDist / validSamples;
            const densityRaw =
                1 -
                Math.max(
                    0,
                    Math.min(
                        1,
                        (avgDist - CONFIG.DENSE_DISTANCE) /
                            (CONFIG.SPARSE_DISTANCE - CONFIG.DENSE_DISTANCE)
                    )
                );

            // Regularity: low CV = regular (lattice), high CV = chaotic
            // Typical CV ranges: ~0 (perfect lattice) to ~0.8+ (chaotic)
            const avgCV = totalDistVariance / validSamples;
            const regularity = Math.max(0, Math.min(1, 1 - avgCV / 0.8));

            features.push({
                segregation,
                localDensity: densityRaw,
                regularity
            });
        }

        return features as FeaturesPerColor;
    }

    /**
     * Build a counting-sort spatial grid from the de-interleaved positions.
     * Uses the same algorithm as the simulation's spatialGrid but with a coarser
     * cell size tuned for the neighbor query radius.
     */
    private rebuildGrid(n: number, worldW: number, worldH: number) {
        // Cell size ~= neighbor radius so a 3x3 cell neighborhood covers queries
        const cellSize = CONFIG.NEIGHBOR_RADIUS;
        const cols = Math.max(1, Math.ceil(worldW / cellSize));
        const rows = Math.max(1, Math.ceil(worldH / cellSize));
        const totalCells = cols * rows;

        // Reallocate if grid size changed
        if (cols !== this.gridCols || rows !== this.gridRows) {
            this.gridCols = cols;
            this.gridRows = rows;
            this.cellOffsets = new Uint32Array(totalCells + 1);
            this.cellCounts = new Uint32Array(totalCells);
        }
        if (this.particleIndices.length < n) {
            this.particleIndices = new Uint32Array(n);
        }

        this.cellCounts.fill(0);

        // Pass 1: count
        for (let i = 0; i < n; i++) {
            const cx = Math.min(Math.floor((this.posX[i] * cols) / worldW), cols - 1);
            const cy = Math.min(Math.floor((this.posY[i] * rows) / worldH), rows - 1);
            this.cellCounts[cy * cols + cx]++;
        }

        // Pass 2: prefix sum
        this.cellOffsets[0] = 0;
        for (let c = 0; c < totalCells; c++) {
            this.cellOffsets[c + 1] = this.cellOffsets[c] + this.cellCounts[c];
        }

        // Pass 3: place
        this.cellCounts.fill(0);
        for (let i = 0; i < n; i++) {
            const cx = Math.min(Math.floor((this.posX[i] * cols) / worldW), cols - 1);
            const cy = Math.min(Math.floor((this.posY[i] * rows) / worldH), rows - 1);
            const cellIdx = cy * cols + cx;
            this.particleIndices[this.cellOffsets[cellIdx] + this.cellCounts[cellIdx]] = i;
            this.cellCounts[cellIdx]++;
        }
    }

    /**
     * Query the grid for particle indices near (px, py) within radius,
     * excluding the particle itself.
     */
    private queryNeighbors(
        px: number,
        py: number,
        radius: number,
        selfIdx: number,
        n: number,
        worldW: number,
        worldH: number
    ): number[] {
        const cols = this.gridCols;
        const rows = this.gridRows;
        const cellW = worldW / cols;
        const cellH = worldH / rows;

        const cx = Math.min(Math.floor(px / cellW), cols - 1);
        const cy = Math.min(Math.floor(py / cellH), rows - 1);

        // How many cells to check in each direction
        const spanX = Math.ceil(radius / cellW);
        const spanY = Math.ceil(radius / cellH);
        const r2 = radius * radius;

        const result: number[] = [];

        for (let dy = -spanY; dy <= spanY; dy++) {
            const ny = cy + dy;
            if (ny < 0 || ny >= rows) continue;
            for (let dx = -spanX; dx <= spanX; dx++) {
                const nx = cx + dx;
                if (nx < 0 || nx >= cols) continue;

                const cellIdx = ny * cols + nx;
                const start = this.cellOffsets[cellIdx];
                const end = this.cellOffsets[cellIdx + 1];

                for (let k = start; k < end; k++) {
                    const j = this.particleIndices[k];
                    if (j === selfIdx) continue;
                    const ddx = this.posX[j] - px;
                    const ddy = this.posY[j] - py;
                    if (ddx * ddx + ddy * ddy <= r2) {
                        result.push(j);
                    }
                }
            }
        }

        return result;
    }

    reset() {
        // No state to reset in v2 (no previous positions)
    }
}
