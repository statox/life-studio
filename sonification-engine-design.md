# Particle Simulation Sonification Engine

## Goal

Generate real-time ambient music from a 2D particle simulation running in the browser. The simulation contains thousands of particles of 4 different colors evolving in a bounded 2D space. The music should reflect the current state of the simulation: spatial distribution, clustering, movement, and inter-color relationships.

## Simulation Data Format

Particles are stored as Structure of Arrays:

```js
const posX = new Float32Array(n); // x positions, normalized to [0, 1]
const posY = new Float32Array(n); // y positions, normalized to [0, 1]
const colors = new Uint8Array(n); // color index: 0, 1, 2, 3
```

The simulation exhibits two main regimes:
- **Spread**: particles distributed uniformly across the space
- **Clustered**: particles concentrated into small, complex repeating structures

Particles sometimes move actively and sometimes are nearly still.

## Selected Approach: Per-Color Statistical Sonification

Rather than sonifying individual particles (too many) or using a spatial grid (uniform patterns would flatten out), we aggregate statistical features per color group and map them to 4 continuous synth voices.

### Why This Approach

- Scales to any particle count (only computes means and variances)
- Responds meaningfully to both spread and clustered states
- Responds to both active movement and stillness
- Produces inherently ambient output (continuous drones, no discrete triggers)
- Simple to implement with the Web Audio API

## How It Works

### Step 1: Feature Extraction (every ~100ms)

For each of the 4 color groups, compute:

| Feature | Computation | What it captures |
|---------|-------------|-----------------|
| **Center of mass** (meanX, meanY) | Mean of posX and posY for particles of this color | Where the group is located |
| **Spread** (stdX, stdY) | Standard deviation of posX and posY | How clustered vs dispersed the group is |
| **Activity** | Sum of absolute position deltas since last sample, normalized by particle count | How much the group is moving |

These are simple O(n) passes over the arrays, grouped by color.

### Step 2: Musical Mapping

| Feature | Sound parameter | Effect |
|---------|----------------|--------|
| meanY | Base pitch (quantized to pentatonic scale) | Vertical position controls which note the voice plays |
| meanX | Stereo panning | Horizontal position places the sound in the stereo field |
| spread | Oscillator detuning amount | Clustered = pure focused tone; spread = wide shimmery chord |
| activity | Lowpass filter cutoff | Still = dark/muffled; moving = bright/open |
| activity | Gain (volume) | Still = quiet; moving = louder |

**Pitch quantization**: meanY maps into a pentatonic scale (e.g. C, D, E, G, A across 2-3 octaves). This guarantees all 4 voices are always consonant with each other regardless of particle positions.

### Step 3: Smooth Interpolation

All audio parameter changes use `linearRampToValueAtTime()` with ~200ms ramp duration. This prevents clicks/glitches and produces the slow evolving character of ambient music.

## Architecture

```
+-------------------+       +--------------------+       +------------------+
| Particle          |       | Feature            |       | Audio Engine     |
| Simulation        | ----> | Extractor          | ----> | (Web Audio API)  | ---> speakers
| (posX, posY,      |       | (per-color stats)  |       | (4 synth voices) |
|  colors)          |       |                    |       |                  |
+-------------------+       +--------------------+       +------------------+
```

### Component: FeatureExtractor

Stateful — retains previous positions to compute activity deltas.

```ts
interface ColorFeatures {
  meanX: number;       // [0, 1]
  meanY: number;       // [0, 1]
  stdX: number;        // [0, ~0.5]
  stdY: number;        // [0, ~0.5]
  activity: number;    // [0, 1] normalized movement intensity
  count: number;       // number of particles of this color
}

interface FeatureExtractor {
  /**
   * Call this every sample interval (~100ms).
   * Returns features for each of the 4 color groups.
   */
  extract(
    posX: Float32Array,
    posY: Float32Array,
    colors: Uint8Array,
    n: number
  ): [ColorFeatures, ColorFeatures, ColorFeatures, ColorFeatures];
}
```

Internally stores a copy of `posX`/`posY` from the previous call to compute per-particle deltas for the activity metric.

### Component: SonificationEngine

Owns the Web Audio graph. Created once, updated each sample interval.

```ts
interface SonificationEngine {
  /** Initialize the audio context and build the audio graph. Must be called from a user gesture. */
  start(): void;

  /** Update all 4 voices from extracted features. Call every ~100ms. */
  update(features: [ColorFeatures, ColorFeatures, ColorFeatures, ColorFeatures]): void;

  /** Suspend audio output. */
  stop(): void;

  /** Set master volume [0, 1]. */
  setVolume(volume: number): void;
}
```

### Audio Graph Per Voice

```
OscillatorNode (saw/triangle) --\
OscillatorNode (detuned +N)  ----+--> GainNode --> BiquadFilterNode (lowpass) --> StereoPannerNode --> masterGain
OscillatorNode (detuned -N)  --/
```

- 3 oscillators per voice provide a unison/chorus effect
- Detune amount controlled by spread
- Filter cutoff controlled by activity
- Gain controlled by activity
- Pan controlled by meanX
- Oscillator frequency controlled by meanY (quantized to scale)

Master gain node sums all 4 voices and connects to `AudioContext.destination`.

### Component: SonificationController

Ties everything together. This is what the Svelte app interacts with.

```ts
interface SonificationController {
  /** Create the controller. Does not start audio. */
  constructor();

  /** Start audio (call from user gesture like button click). */
  start(): void;

  /** Stop audio. */
  stop(): void;

  /** Call from the simulation loop or on a setInterval. */
  feed(posX: Float32Array, posY: Float32Array, colors: Uint8Array, n: number): void;

  /** Master volume control [0, 1]. */
  setVolume(volume: number): void;

  /** Whether audio is currently running. */
  readonly running: boolean;
}
```

### Integration with Svelte App

Minimal integration surface:

```svelte
<script>
  import { SonificationController } from './sonification';

  const sonification = new SonificationController();

  function toggleAudio() {
    if (sonification.running) {
      sonification.stop();
    } else {
      sonification.start(); // must be in click handler for autoplay policy
    }
  }

  // In your simulation loop / requestAnimationFrame:
  // sonification.feed(posX, posY, colors, n);
  // (internally throttled to ~100ms sample rate)
</script>

<button on:click={toggleAudio}>Toggle Music</button>
```

The controller internally throttles `feed()` calls so it can be called every frame without waste.

## Configuration Constants

These should be easy to tune:

```ts
const CONFIG = {
  SAMPLE_INTERVAL_MS: 100,       // how often to re-extract features
  RAMP_TIME_S: 0.2,             // audio parameter interpolation time
  SCALE: [261.6, 293.7, 329.6, 392.0, 440.0],  // C4 pentatonic, extend across octaves
  VOICES: [
    { waveform: 'sawtooth', octaveOffset: -1 },  // color 0: low saw pad
    { waveform: 'triangle', octaveOffset: 0 },   // color 1: mid triangle
    { waveform: 'sine', octaveOffset: 0 },        // color 2: mid sine drone
    { waveform: 'sawtooth', octaveOffset: 1 },   // color 3: high saw shimmer
  ],
  MIN_FILTER_FREQ: 200,         // filter cutoff when activity = 0
  MAX_FILTER_FREQ: 4000,        // filter cutoff when activity = 1
  MAX_DETUNE_CENTS: 50,         // detuning when spread is maximum
  MIN_GAIN: 0.02,               // volume floor (never fully silent)
  MAX_GAIN: 0.2,                // volume ceiling per voice
};
```

## File Structure

```
src/
  sonification/
    index.ts                  # re-exports SonificationController
    controller.ts             # SonificationController — orchestration + throttling
    extractor.ts              # FeatureExtractor — per-color statistics
    engine.ts                 # SonificationEngine — Web Audio graph + parameter updates
    types.ts                  # ColorFeatures interface, config constants
```
