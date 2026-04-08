# Particles Engine

The engine simulates N-body particle attraction on a toroidal (wrapping) 2-D world. Each particle has a position and a color; color pairs have configurable attraction values that drive emergent clustering behavior.

---

## File map

```
engine/
  types.ts              — shared types (Cell, WorldSize, PerfData, StatsResult, …)
  colors.ts             — color definitions and colorToIndex helper
  cells.ts              — Cell[] factory functions and spread utilities
  particles.ts          — Cell[] → Particles SoA conversion (one-time at startup)
  computeForces.ts      — pure, dependency-free force computation (runs anywhere)
  force.worker.ts       — thin Worker wrapper: onmessage → computeForces → postMessage
  Engine.ts             — multi-threaded engine, dispatches force.workers in parallel
  EngineST.ts           — single-threaded engine, calls computeForces directly
  simulation.worker.ts  — simulation Web Worker; owns Engine or EngineST
  simulationWorker.ts   — main-thread handle; spawns simulation.worker, typed API
  simulationStats.ts    — SimulationStats helper and StatsResult type
  simulationService.ts  — helper functions for building SimulationParams from presets
```

---

## High-level architecture

Two engine variants share the same physics (`computeForces.ts`) and the same outer wrapper (`simulation.worker.ts`), differing only in how force computation is parallelised.

### Multi-threaded (`Engine`)

```
Main Thread
└── Simulation Worker  (simulation.worker.ts)
      └── Engine  (Engine.ts)
            ├── Force Worker 1  (force.worker.ts)
            ├── Force Worker 2  (force.worker.ts)
            └── Force Worker N  (force.worker.ts)
                [N = min(hardwareConcurrency − 1, 8)]
```

The simulation runs off the main thread entirely. The main thread only receives finished position arrays.

### Single-threaded (`EngineST`)

```
Main Thread
└── Simulation Worker  (simulation.worker.ts)
      └── EngineST  (EngineST.ts)
            └── computeForces()  [called inline, no sub-workers]
```

Used when `useWorkers: false` is passed to `start()`, or on environments where nested workers are unavailable.

---

## Data structures

### `Cell[]` → `Particles` (SoA)

Input cells are converted once at engine construction from an Array-of-Structs to a Struct-of-Arrays layout (`particles.ts`):

```
Cell[]                    Particles (SoA)
──────────────────────    ────────────────────────────────
[{ pos, vel, color }]  →  posX:   Float32Array  [x0, x1, …]
                          posY:   Float32Array  [y0, y1, …]
                          colors: Uint8Array    [c0, c1, …]
```

This layout is cache-friendly for the inner force loop, which iterates over all particles accessing position and color sequentially.

### `AttractionTable` → `attractionMatrix`

The `AttractionTable` (a nested object keyed by color pair) is flattened into a `Float32Array` matrix at construction and on every `updateAttractionTable` call. Entry `[i * numColors + j]` holds the attraction value from color `i` toward color `j`.

### `SpatialGrid`

See [Spatial partitioning](#spatial-partitioning) below.

---

## Physics step

Each step follows four stages:

### 1. Rebuild spatial grid

The grid is rebuilt from scratch every frame via a three-pass counting sort (O(n), no allocation after init — all buffers are pre-allocated at construction).

### 2. Compute forces

For each particle, the algorithm checks the 3×3 block of grid cells surrounding the particle's own cell. Only particles within those 9 cells can be within `maxAttractionRadius`, so the candidate set is small regardless of total particle count.

The force between two particles follows a **triangle curve** as a function of squared distance:

```
force
  │        ╭──╮
  │       /    \
  0 ─────╯      ╰──── distance
       half    max
        R       R
  ├───── dead ─┤
     zone at
     short range: hard repulsion (force = −1)
```

- Below `minDist`: hard repulsion pushing particles apart
- `halfR → ¾R`: attraction ramps up linearly from 0 to `attractionValue`
- `¾R → maxR`: attraction ramps back down to 0
- The resulting velocity delta is clamped to magnitude 1

In the multi-threaded engine, the particle array is split into equal slices, one per force worker. Workers run `computeForces.ts` in parallel and return velocity delta arrays via transferable `ArrayBuffer`s.

### 3. Integrate velocities

Velocity carries over from the previous frame with friction applied, then the force delta is added:

```
vel[i] = vel[i] * (1 − friction) + forceDelta[i]
```

### 4. Update positions (toroidal wrapping)

Positions are updated and wrapped to keep particles inside the world boundaries:

```
pos[i] = (pos[i] + vel[i] + worldSize) % worldSize
```

---

## Spatial partitioning

The world is divided into a uniform `cols × rows` grid where each cell has side length `maxAttractionRadius`. This means any particle can only interact with particles in its own cell or the 8 immediately neighboring cells (the 3×3 neighborhood), reducing the force computation from O(n²) to approximately O(n × k) where k is the average number of particles per cell.

The grid is stored as two flat arrays (the CSR / prefix-sum format):

```
cellOffsets   Uint32Array  length = cols × rows + 1
particleIndices Uint32Array  length = particleCount
```

Particles in cell `c` are at indices:

```ts
for (let j = cellOffsets[c]; j < cellOffsets[c + 1]; j++) {
    const particleIdx = particleIndices[j];
}
```

The grid is rebuilt each frame via a three-pass counting sort — no dynamic memory allocation occurs after the initial `createSpatialGrid` call.

Cell dimensions are chosen so that `gridCols = worldSize.x / maxAttractionRadius` is always an integer, ensuring the neighborhood check never misses a potential interaction.

---

## Lifecycle

### Multi-threaded flow

```
simulationWorker.ts (main thread)
│
│  createSimulationWorker()
│    → loads simulation.worker lazily (once, shared across sims)
│
│  sim.start(params, onFrame, onStats?)
│    → worker.postMessage({ msg: 'start', ...params })
│         simulation.worker.ts creates Engine, calls engine.run(callback)
│         Engine spawns N force workers
│         Engine loop: step() → callback(particles)
│           → worker.postMessage({ positions, perf?, stats? })
│    → worker.onmessage:
│         if stats present → onStats(stats)
│         onFrame(positions, perf?)
│
│  sim.updateAttractionTable(table)
│    → worker.postMessage({ msg: 'updateTable', attractionTable })
│         Engine updates attractionMatrix in-place; next step uses new values
│
│  sim.pause() / sim.unpause()
│    → worker.postMessage({ msg: 'pause' | 'unpause' })
│         Engine stops/resumes its setTimeout loop
│
│  sim.destroy()
│    → worker.terminate()
```

### Single-threaded flow

Identical from the outside. The simulation worker creates `EngineST` instead of `Engine`. `EngineST` calls `computeForces` directly in its step loop with no sub-workers.

### Stats flow

Both engines compute stats every 3 seconds (wall-clock) using `SimulationStats`:

```
Engine._stats.compute(grid, frameCount)
  → stored on engine.statsResult
  → polled in simulation.worker's onUpdatedParticles callback
  → piggybacked on the next frame postMessage ({ positions, perf?, stats? })
  → arrives on main thread via the optional onStats callback
```

The stats layer does not maintain history — it owns only the previous snapshot needed to compute one delta. History and interpretation are the caller's responsibility.

---

## Example usage

### Basic simulation

```ts
import { createSimulationWorker } from '$lib/particles/engine/simulationWorker';
import { getRandomAttractionTable } from '$lib/particles/attraction';
import { getNewCells } from '$lib/particles/engine/cells';

const sim = createSimulationWorker();

const maxAttractionRadius = 32;
const worldSize = { x: 960, y: 640 };

const params = {
    cells: getNewCells(worldSize, 4000, { white: 500, red: 500, green: 500, blue: 500 }),
    worldSize,
    maxAttractionRadius,
    attractionTable: getRandomAttractionTable(),
    friction: 0.5
};

await sim.start({ ...params, useWorkers: true }, (positions: Float32Array) => {
    // positions is an interleaved [x0, y0, x1, y1, …] Float32Array
    // transferred (not copied) from the worker — do not hold a reference
    renderParticles(positions);
});
```

### Hot-swapping the attraction table

```ts
// Updates the attraction rules without restarting the simulation.
// Takes effect on the next physics step; no frame discontinuity.
sim.updateAttractionTable(getRandomAttractionTable());
```

### Receiving stats

```ts
await sim.start(
    { ...params, useWorkers: true },
    (positions) => renderParticles(positions),
    (stats) => {
        // Called every ~3 seconds
        // changeScore is null on the first call (no previous snapshot yet)
        if (stats.changeScore !== null) {
            console.log(`frame ${stats.frameCount}: changeScore = ${stats.changeScore.toFixed(2)}`);
        }
    }
);
```

### Pause and resume

```ts
sim.pause(); // engine stops computing; last frame remains on screen
sim.unpause(); // engine resumes from where it left off
```

### Teardown

```ts
sim.destroy(); // terminates the simulation worker and all force workers
```
