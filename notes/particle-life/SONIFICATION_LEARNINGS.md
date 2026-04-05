# Sonification Engine - Learnings and Observations

This document captures what we learned from our experimentation with sonifying the particle simulation. The engine is not in a state that produces convincing results, but the work laid useful groundwork for a future attempt.

The engine POC was implemented in commit 1060e694ef02e5ac385fe95d0ad360b95843ac51
and reverted by to make other features before starting this one for real 859615aca62ba5d3e7ecff0b76f4ed8c3a828959

## Architecture Overview

The engine follows a three-component pipeline:

```
Simulation  -->  FeatureExtractor  -->  SonificationEngine  -->  speakers
(positions,      (per-color stats:      (Web Audio API:
 colors)          segregation,           4 synth voices,
                  local density,         oscillator banks,
                  regularity)            LFO, filters)
```

Orchestrated by a **SonificationController** that throttles simulation data and feeds it through the pipeline.

### Implementation choices

-   **4 voices**, one per particle color, each built from two oscillator banks (clean sine/triangle + noisy sawtooth) with 3 unison oscillators each for chorus.
-   **Feature-to-sound mapping**: segregation controls pitch/harmony, local density controls rhythm via LFO gain modulation, regularity controls timbre blend between clean and noisy oscillators.
-   **Pentatonic scale** (C, E, G, A across 2 octaves) guarantees consonance between voices regardless of state.
-   **Static stereo panning** per voice (-0.6, -0.2, 0.2, 0.6) since spatial position data was dropped in v2.
-   Parameters update via `linearRampToValueAtTime()` for click-free transitions.

### Two iterations

-   **v1** used global statistics (mean position, spread, activity). Failed because the simulation world is large and patterns repeat uniformly, so all colors produce nearly identical averages. Result: 4 voices doing the same thing.
-   **v2** switched to local neighborhood analysis (K-nearest-neighbor sampling). Better in principle but still not convincing in practice. Probably a similar issue of averaging values not creating enough complexity.

## Spatial Partitioning: Duplicated Work

The simulation already has a spatial grid (`src/lib/particles/spatialGrid/spatialGrid.ts`) used for neighbor lookups during force computation. However, this grid lives inside the web worker (`simulation.worker.ts`), and only interleaved positions are sent back to the main thread via `postMessage`.

The sonification extractor had to **rebuild its own spatial grid** on the main thread from the raw positions. This means:

-   Duplicate spatial indexing work every sample interval.
-   The extractor's grid may not perfectly match the simulation's grid timing.
-   Extra CPU cost on the main thread, which also handles rendering.

### Recommendation

Explore running the sonification feature extraction inside the web worker, where the spatial grid is already available. The worker could compute the features and post them alongside positions, or a dedicated sonification worker could share the grid data. At minimum, the heavy part (spatial queries + neighbor analysis) should run off the main thread.

## Current Results: Not Convincing

### Repetitive 150 BPM pattern

There is a very noticeable rhythmic pulsing at roughly 150 BPM. The LFO that modulates gain based on local density is the most likely source (a 2.5 Hz LFO = 150 beats/min), but it could also be an artifact of the discrete sampling interval (600ms between feature updates) creating perceptible steps. The exact source needs more investigation.

### Feature choice is probably wrong

The three features we extract (segregation, local density, regularity) describe macro-level statistical properties of color groups. But the visual interest of the simulation comes from **complex micro patterns**: small repeating structures, oscillating clusters, particles chasing each other in loops, emergent lattices.

These micro patterns are not well captured by averaging statistics over 80 random samples per color. What might work better:

-   Detecting specific pattern types (orbiting pairs, lattices, streams) and mapping them to distinct sound events.
-   Tracking temporal dynamics: how fast structures form, dissolve, or oscillate, rather than just their current shape.
-   Per-cluster analysis rather than per-color: identifying individual clusters and giving each one a voice or sound event.

### Sound design limitations

The Web Audio API's built-in oscillators and filters are quite limited for ambient sound design. The current output sounds like raw synth waves rather than interesting ambient textures. Possible improvements:

-   Use a library like Tone.js for higher-level synthesis (granular, FM, reverb, delay).
-   Add reverb and delay effects to create space and blur the discrete parameter changes.
-   Use noise sources and granular techniques instead of pure oscillators.
-   Consider sample-based approaches: trigger and modulate short audio samples rather than generating everything from oscillators.

## What Worked Well in the Existing Architecture

-   **Clean separation of concerns**: Simulation, rendering, and sonification are fully independent. The simulation doesn't know about sound. The controller's `feed()` method is a simple one-liner in the component. Adding/removing sonification required no changes to the simulation or rendering code.
-   **Callback-based position data**: The `onPositions` callback in `Simulation.svelte` provides positions every frame with zero coupling. This made it trivial to hook in the sonification controller.
-   **Throttling in the controller**: The controller handles its own sampling interval internally, so the caller can just fire `feed()` every frame without worrying about performance. Clean API.
-   **Interleaved position format**: Having positions as a flat `Float32Array` is efficient and easy to work with for spatial computations.

## What Could Have Made the Work Easier

-   **Spatial grid access from the main thread**: The biggest friction point. If the spatial grid were accessible outside the worker (via SharedArrayBuffer, or by computing features inside the worker), we wouldn't have needed to rebuild it.
-   **Velocity data**: The simulation computes forces and updates velocities, but only positions are posted back to the main thread. Having velocity data would enable activity/movement features without tracking position deltas across frames.
-   **Cluster identity**: The simulation doesn't track which particles belong to which cluster. If it did, sonification could assign sounds to individual clusters rather than entire color groups, which would be far more musically interesting.
-   **Richer data from the worker**: Currently the worker posts only `{positions, perf}`. A more general approach would allow subscribing to additional computed data (spatial grid, per-particle velocities, cluster membership) without modifying the core simulation loop.
