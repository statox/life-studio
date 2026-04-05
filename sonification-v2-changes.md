# Sonification Engine v2 — From Global Stats to Local Structure Analysis

This document describes changes to the existing sonification engine (see `sonification-engine-design.md` for the original design). The engine architecture (FeatureExtractor, SonificationEngine, SonificationController) remains the same. What changes is how features are extracted and how they map to sound.

## Problem with v1

The v1 approach computes global statistics per color (mean position, std dev, activity). In practice this produces poor results because:

- The simulation world is large and patterns repeat uniformly, so all 4 colors end up with nearly identical global averages
- Averaging destroys the local structure that makes the simulation visually interesting
- The result is 4 voices doing roughly the same thing: a monotonous, harsh drone

## New Approach: Nearest-Neighbor Local Structure Analysis

Instead of summarizing the entire space, **sample a subset of particles and analyze their local neighborhoods**. This captures the texture and shape of local structures rather than their position.

### Feature Extraction

Each sample interval (~200-500ms, slower than v1 since local texture evolves slowly):

1. **Sample** ~50-100 particles per color at random from the arrays
2. For each sampled particle, find its K nearest neighbors (K = 5-10) using the spatial partitioning system already in the simulation (see below)
3. Compute per-color aggregate features from the neighborhood analysis

### Features to Extract Per Color

| Feature | How to compute | What it captures |
|---------|---------------|-----------------|
| **Segregation** | Among K nearest neighbors of sampled particles, ratio of same-color to other-color neighbors, averaged over all samples of that color | Whether this color clusters with itself or mixes with others |
| **Local density** | Average distance to nearest neighbors across sampled particles | How tightly packed the local structures are |
| **Regularity** | Variance (or coefficient of variation) of neighbor distances across sampled particles | Whether structures are ordered (lattice-like) or chaotic |

These 3 features per color (12 values total) replace the 5 per-color values from v1 (meanX, meanY, stdX, stdY, activity).

### Reuse the Existing Spatial Partitioning

The simulation app already uses a spatial partitioning structure (grid hash, quadtree, or similar) for neighbor lookups during the simulation step. The FeatureExtractor must reuse this structure rather than building its own.

The `feed()` method on the controller should accept the spatial partitioning structure as an additional parameter:

```ts
interface SonificationController {
  feed(
    posX: Float32Array,
    posY: Float32Array,
    colors: Uint8Array,
    n: number,
    spatialIndex: SpatialIndex
  ): void;
}
```

Where `SpatialIndex` is a minimal interface that wraps whatever the simulation uses:

```ts
interface SpatialIndex {
  /** Return indices of particles within `radius` of the point (x, y). */
  queryRadius(x: number, y: number, radius: number): number[];
}
```

The simulation's existing spatial partitioning structure should be wrapped to satisfy this interface. This avoids duplicating spatial indexing work and keeps the sonification engine decoupled from the simulation's specific implementation.

If the simulation's structure doesn't support radius queries directly, an alternative interface using K-nearest-neighbors is acceptable:

```ts
interface SpatialIndex {
  /** Return indices of the K nearest particles to the point (x, y). */
  queryKNearest(x: number, y: number, k: number): number[];
}
```

The extractor can work with either — it just needs a way to find nearby particles for a given position.

## New Musical Mapping

### Segregation → Harmony

- **High segregation** (color clusters alone): the voice plays its own independent note from the scale. The 4 voices move independently, creating counterpoint.
- **Low segregation** (colors mixed together): voices that are mixed together converge to shared notes or harmonized intervals (thirds, fifths). Colors that co-exist locally should sound consonant together.

Implementation: when two colors have low segregation relative to each other, bias their pitch selection toward intervals that are consonant. When segregation is high, let each voice pick its note freely from the scale.

### Local Density → Rhythm and Envelope

- **High density** (tight clusters): short, defined notes. Staccato. The voice has rhythmic pulsing.
- **Low density** (sparse, spread out): long sustained tones. Legato pads. The voice drones smoothly.

Implementation: density controls the amplitude envelope. High density → the gain node applies a slow LFO or tremolo effect creating pulsing. Low density → gain is steady, producing a continuous pad sound.

### Regularity → Timbre

- **High regularity** (low variance in neighbor distances — lattice-like): clean, pure tones. Use sine or triangle oscillators. Less detuning between the unison oscillators.
- **Low regularity** (high variance — chaotic): noisy, textured tones. Use sawtooth oscillators. More detuning. Optionally mix in noise.

Implementation: regularity controls waveform blending (crossfade between a clean and a noisy oscillator bank) and the detune amount.

### Summary Table

| Feature | Sound parameter | Low value | High value |
|---------|----------------|-----------|------------|
| Segregation | Harmonic independence | Voices converge to shared harmony | Voices play independent notes |
| Local density | Envelope / rhythm | Sustained pad | Pulsing / staccato |
| Regularity | Timbre | Noisy, textured, detuned | Clean, pure, focused |

## Changes to Existing Components

### types.ts

- Remove `ColorFeatures` interface (meanX, meanY, stdX, stdY, activity, count)
- Add new `ColorFeatures` interface:

```ts
interface ColorFeatures {
  segregation: number;   // [0, 1] — 0 = fully mixed, 1 = fully segregated
  localDensity: number;  // [0, 1] — normalized, 0 = sparse, 1 = tightly packed
  regularity: number;    // [0, 1] — 0 = chaotic, 1 = perfectly regular
}
```

- Add `SpatialIndex` interface
- Update config constants:

```ts
const CONFIG = {
  SAMPLE_INTERVAL_MS: 300,        // slower sampling — local texture evolves slowly
  RAMP_TIME_S: 0.5,              // longer ramps for smoother transitions
  SAMPLES_PER_COLOR: 80,         // particles to sample per color
  K_NEIGHBORS: 8,                // neighbors to examine per sampled particle
  NEIGHBOR_RADIUS: ...,          // radius for queryRadius — tune to simulation scale
  // ... keep scale, voice waveforms, gain range etc
};
```

### extractor.ts

Full rewrite. The new extractor:

1. No longer stores previous positions (activity metric is gone)
2. Takes a `SpatialIndex` as input alongside the particle arrays
3. For each color, randomly samples `SAMPLES_PER_COLOR` particle indices
4. For each sampled particle, queries the spatial index for neighbors
5. Computes segregation, local density, regularity from the neighbor results
6. Returns the normalized features

### engine.ts

Rework the `update()` method to map the new features:

- Remove panning from meanX (no longer available — could keep a simple static pan per color for stereo separation)
- Remove pitch from meanY — instead, assign each voice a base pitch from the scale and use segregation to decide whether to shift toward shared intervals
- Regularity controls oscillator type blending and detune
- Density controls gain envelope (steady vs LFO modulation)
- Keep the smoothed parameter ramping with `linearRampToValueAtTime()`

### controller.ts

- Update `feed()` signature to accept the spatial index
- Increase throttle interval to match `SAMPLE_INTERVAL_MS` (~300ms)

## Pitch Assignment Strategy

Since we no longer derive pitch from position, assign pitches differently:

- Each color has a **home note** from the pentatonic scale (e.g. color 0 = C, color 1 = E, color 2 = G, color 3 = A)
- When segregation is high, the voice stays on or near its home note (possibly shifting octaves slowly over time based on density or regularity for subtle variation)
- When segregation drops between two colors, both voices drift toward a consonant shared interval
- This creates a harmonic system where the simulation's spatial mixing directly drives the musical harmony

## Performance Considerations

- Sampling 80 particles per color × 4 colors = 320 spatial queries per sample interval
- At 300ms intervals this is ~1000 queries/second, which should be negligible given the simulation is already doing many more neighbor lookups per frame
- The random sampling introduces slight variation between intervals, which is musically desirable (avoids perfectly repeating patterns in the audio)
- If performance is a concern, reduce `SAMPLES_PER_COLOR` to 30-50 — the statistical features are robust with fewer samples
