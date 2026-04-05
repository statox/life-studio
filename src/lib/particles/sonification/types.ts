export interface ColorFeatures {
    segregation: number; // [0, 1] — 0 = fully mixed, 1 = fully segregated
    localDensity: number; // [0, 1] — normalized, 0 = sparse, 1 = tightly packed
    regularity: number; // [0, 1] — 0 = chaotic, 1 = perfectly regular
}

export type FeaturesPerColor = [ColorFeatures, ColorFeatures, ColorFeatures, ColorFeatures];

export const NUM_COLORS = 4;

/** Minimal interface for spatial neighbor lookups. */
export interface SpatialIndex {
    /** Return indices of particles within `radius` of the point (x, y). */
    queryRadius(x: number, y: number, radius: number): number[];
}

// Home notes for each color voice (pentatonic: C, E, G, A)
const C3 = 130.81;
const E3 = 164.81;
const G3 = 196.0;
const A3 = 220.0;
const C4 = 261.63;
const E4 = 329.63;
const G4 = 392.0;
const A4 = 440.0;

export const CONFIG = {
    SAMPLE_INTERVAL_MS: 600,
    RAMP_TIME_S: 0.8,
    SAMPLES_PER_COLOR: 80,
    K_NEIGHBORS: 8,
    NEIGHBOR_RADIUS: 40, // world-coordinate radius for neighbor queries

    // Pentatonic scale frequencies across octaves
    SCALE: [C3, E3, G3, A3, C4, E4, G4, A4],

    // Each color's home note index into SCALE
    HOME_NOTES: [0, 1, 2, 3] as [number, number, number, number],

    // Consonant intervals (in scale steps) for convergence when segregation is low
    CONSONANT_OFFSETS: [0, 2, 4],

    VOICES: [{ octaveOffset: -1 }, { octaveOffset: 0 }, { octaveOffset: 0 }, { octaveOffset: 1 }],

    // Stereo positions per color (static spread)
    PAN: [-0.6, -0.2, 0.2, 0.6] as [number, number, number, number],

    MIN_FILTER_FREQ: 300,
    MAX_FILTER_FREQ: 5000,
    MAX_DETUNE_CENTS: 60,
    MIN_GAIN: 0.02,
    MAX_GAIN: 0.15,

    // LFO for density-driven pulsing
    LFO_MIN_DEPTH: 0, // gain modulation depth when density is low (no pulsing)
    LFO_MAX_DEPTH: 0.3, // gain modulation depth when density is high
    LFO_RATES: [0.4, 0.55, 0.7, 0.85] as [number, number, number, number], // Hz per voice — slow, varied

    // Feature smoothing (exponential moving average)
    SMOOTHING_FACTOR: 0.3, // 0 = no smoothing, 1 = no change. Higher = smoother but laggier

    // Density normalization: distances below this are "max density"
    DENSE_DISTANCE: 5,
    SPARSE_DISTANCE: 35
};
