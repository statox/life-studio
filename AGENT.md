# Particles Life — Codebase Analysis

> Reference document for AI context and planning. Focus: the Particles Life simulation only.

---

## 1. Overview

**Particles Life** is a browser-based emergent simulation. A set of coloured particles float on a 2-D toroidal world (wrap-around edges). Each particle's colour determines how it attracts or repulses every other particle colour. Tiny pairwise interaction rules (the "attraction table") give rise to rich macro-behaviours: gliders, galaxies, snakes, static clusters, etc.

The stack is **SvelteKit + TypeScript + Vite**, rendered on a raw HTML5 `<canvas>`. The physics loop runs in a **Web Worker** so it never blocks the UI thread.

---

## 2. Directory Layout (particles only)

```
src/
├── routes/
│   └── +page.svelte              # App entry point – mounts <Simulation />
└── lib/
    └── particles/
        ├── attraction/
        │   ├── types.ts           # AttractionTable, StoredTable types
        │   ├── computer.ts        # Force scalar computation (triangle map)
        │   ├── tables.ts          # getRandomAttractionTable, preset tables
        │   └── index.ts           # re-exports
        ├── cellsMap/
        │   ├── README.md          # Algorithm explanation
        │   ├── cellsMap.ts        # CellsMap class + getNeighborsIds
        │   └── index.ts
        ├── engine/
        │   ├── types.ts           # Cell, Coordinates, WorldSize, message types
        │   ├── math.ts            # distanceSqrd (toroidal), distanceSqaredNoWrap
        │   ├── cells.ts           # getNewCells, updateCells, pullCellsAppart
        │   ├── forces.ts          # attractionForce (per-cell velocity)
        │   ├── Engine.ts          # Engine class – drives the simulation loop
        │   ├── simulation.worker.ts # Web Worker entry – wraps Engine
        │   └── index.ts
        └── components/
            ├── Simulation.svelte  # Orchestrator component (UI + worker glue)
            ├── Canvas.svelte      # Canvas renderer
            ├── AttractionTableComponent.svelte  # Interactive table editor
            └── AttractionTableChoice.svelte     # Preset table selector
```

---

## 3. Data Model

### 3.1 Types (`engine/types.ts`)

| Type              | Fields                                      | Notes                                          |
| ----------------- | ------------------------------------------- | ---------------------------------------------- |
| `Coordinates`     | `x: number, y: number`                      | Used for positions, velocities, world size     |
| `WorldSize`       | alias of `Coordinates`                      |                                                |
| `Color`           | `'white' \| 'red' \| 'green' \| 'blue'`     | Exactly 4 colours                              |
| `Cell`            | `id, pos, nextPos, vel, color`              | `nextPos` exists but is unused in current code |
| `AttractionTable` | `{ [selfColor]: { [otherColor]: number } }` | 4×4 matrix of integers in **[-2, 2]**          |

### 3.2 AttractionTable semantics

```
attractionTable[A][B] > 0  →  particles of colour A are attracted toward colour B
attractionTable[A][B] < 0  →  particles of colour A are repulsed from colour B
attractionTable[A][B] = 0  →  no interaction
```

The table is **asymmetric**: A attracted to B does NOT imply B attracted to A.  
Values used in practice: `-2, -1, 0, 1, 2`.

---

## 4. Physics Pipeline (per frame)

```
Engine.step()
  └─ updateCells(attractionTable, maxAttractionRadius, cells, cellsMap)
        for each cell i:
          1. cell.vel = {0, 0}
          2. neighbors ← getNeighborsIds(cellsMap, cell)   // O(1) spatial lookup
          3. for each neighbor j ≠ i:
               a. distSqrdNoWrap ← Euclidean² (no wrap)
               b. if distSqrdNoWrap > halfWorldDistance:    // particle is across the seam
                    distSqrd ← toroidal distance²
                    wrapped = true
               c. force ← getAttractionForce(table, maxR², minDist², distSqrd, colorA, colorB)
               d. if wrapped: force *= -1                   // flip direction for wrap
               e. accumulate normalized direction × force → vel
          4. clamp |vel| to maxVelMag = 1
          5. updateCellPos: pos += vel, wrap if out of bounds
          6. cellsMap.updateCell(cell)                      // keep spatial index current
```

**Important design choice**: position is updated _during_ the loop (not after all forces are computed). This produces richer emergent patterns compared to a strict "gather then update" approach, at the cost of order-dependency.

### 4.1 Force scalar (`attraction/computer.ts`)

```
getAttractionForce(table, maxR², minDist², distSqrd, colorA, colorB):
  if distSqrd > maxR²       → return 0          (out of range)
  if distSqrd < minDist²    → return -1          (hard repulsion, collision)
  attractionValue = table[colorA][colorB]
  if attractionValue == 0   → return 0
  return triangleMap(distSqrd, maxR²/2, maxR², 0, attractionValue)
```

`triangleMap` is a piecewise linear function that:

- rises from 0 → `attractionValue` over `[maxR²/2, midpoint]`
- falls back from `attractionValue` → 0 over `[midpoint, maxR²]`

This means the force peaks at ¾ of `maxAttractionRadius` (in squared-distance space) and tapers to 0 at the boundary. Short-range hard repulsion (`distSqrd < minDist²`) always overrides.

`minDist` is hardcoded as `2 * cellRadius` where `cellRadius = 3` → `minDistSqrd = 36`.

### 4.2 Toroidal world & wrapped-distance trick

The world wraps. `distanceSqrd` computes the shortest path on a torus. However to avoid calling the more expensive toroidal formula for every pair, the code first checks `distanceSqaredNoWrap`. If the Euclidean² exceeds `halfWorldDistance = (smallestDimension / 2)²`, the two particles are on opposite sides of a seam, so toroidal distance is used and the direction vector is inverted (`wrapped = true → force *= -1`).

---

## 5. Spatial Acceleration: CellsMap

The naive O(N²) all-pairs loop would be too slow for thousands of particles. `CellsMap` is a custom grid-based spatial index (see `cellsMap/README.md`).

**Structure**:

- The world is divided into a grid of squares, each of size `maxAttractionRadius × maxAttractionRadius`.
- Grid dimensions: `(worldSize.x / maxAttractionRadius) × (worldSize.y / maxAttractionRadius)`.
- Each square stores a `Set<number>` of cell IDs.
- A reverse map `squareByCellId: Map<number, Coordinates>` gives O(1) square lookup by cell ID.

**Constraint**: `worldSize` must be an exact multiple of `maxAttractionRadius` in both dimensions. The UI enforces this by computing `worldSize = { x: maxAttractionRadius * horizontalResolution, y: maxAttractionRadius * verticalResolution }`.

**Neighbor query** (`getNeighborsIds`): returns all IDs in the 3×3 neighbourhood of a cell's square (with toroidal wrapping on borders). Because each square has side = `maxAttractionRadius`, this guarantees all possible interaction partners are found.

**Complexity**: insert O(1), update O(1), neighbor query O(k) where k = average cells per square (≈ N / total squares).

---

## 6. Web Worker Architecture

```
Main thread (Simulation.svelte)
  │
  ├─ postMessage({ msg: 'start', cells, attractionTable, worldSize, maxAttractionRadius })
  │       ↓
  │  simulation.worker.ts
  │       └─ new Engine(...)
  │              └─ engine.run(onUpdatedCells)
  │                   loop: Engine.step() → postMessage({ positions: Coordinates[] })
  │       ↑
  └─ worker.onmessage → buffer.push(positions)
```

Other messages supported by the worker:

| Message       | Effect                                                           |
| ------------- | ---------------------------------------------------------------- |
| `start`       | Destroys any existing engine, creates a new one, starts the loop |
| `pause`       | Sets `Engine._running = false`                                   |
| `unpause`     | Sets `Engine._running = true`                                    |
| `updateTable` | Swaps the attraction table mid-simulation                        |
| `destroy`     | Clears the `setTimeout` loop                                     |

The engine's run loop uses `setTimeout` (with no delay) rather than `requestAnimationFrame`, meaning it runs as fast as possible, decoupled from the render rate.

The worker sends only `positions: Coordinates[]` per frame (not the full `Cell[]`), keeping message payload small.

---

## 7. Frame Buffer & Render Loop

`Simulation.svelte` maintains a `buffer: Coordinates[][]` — an ordered array of position snapshots. The worker pushes frames into it asynchronously. The render side reads from `buffer[frameIndex]`.

- `frameIndex` advances by 1 each time `Canvas.svelte` calls `drewFrame()` (= `updateFrame()`).
- If the worker is faster than the renderer, the buffer grows and acts as a time-shifting queue.
- A slider lets the user scrub to any buffered frame.
- `renderPaused` freezes `frameIndex`, letting the worker keep filling the buffer.
- "Replay from start" resets `frameIndex = 0`.
- "Catchup last frame" jumps to the most recent computed frame.

> ⚠️ The buffer is never trimmed — it grows indefinitely. Long-running simulations will consume significant memory.

---

## 8. Renderer: Canvas.svelte

- Fixed canvas resolution: **1600 × 960** logical pixels, displayed at **1000 × 700** CSS pixels.
- Uses an **offscreen canvas** as a sprite sheet: 4 pre-drawn circles (one per colour) at `cellSize * 2` diameter. Each frame, particles are drawn with `ctx.drawImage(off, ...)` which is faster than re-issuing arc commands per particle.
- Particle positions are mapped from world coordinates to canvas coordinates with `linearMap`.
- FPS is capped (default **25 FPS**) via the `elapsed / fpsInterval` pattern on `requestAnimationFrame`.
- `showColors` toggle: when false, all particles use sprite index 0 (white).
- `cellSize = 1` in current config → circles are 2px diameter.

---

## 9. UI Controls (Simulation.svelte)

### World settings (trigger full restart)

| Control               | Variable               | Default | Effect                                        |
| --------------------- | ---------------------- | ------- | --------------------------------------------- |
| Simulation definition | `maxAttractionRadius`  | 32      | Controls interaction range & grid granularity |
| Horizontal resolution | `horizontalResolution` | 30      | World width = resolution × radius             |
| Vertical resolution   | `verticalResolution`   | 20      | World height = resolution × radius            |
| Number of particles   | `nbParticles`          | 4000    | Total particle count                          |

Default world size: **960 × 640** (32×30, 32×20).

### Simulation controls

| Button             | Action                                                                          |
| ------------------ | ------------------------------------------------------------------------------- |
| Replay from start  | `frameIndex = 0`                                                                |
| Catchup last frame | `frameIndex = buffer.length - 1`                                                |
| Play / Pause       | Toggles `renderPaused`                                                          |
| Show / Hide colors | Toggles `showColors`                                                            |
| Reset cells        | Re-generates cells & table, restarts worker                                     |
| Center cells       | Re-positions all cells in a tiny circle at world centre (r ≤ 2)                 |
| Large Center cells | Re-positions all cells in a circle at world centre (r ≤ 200)                    |
| Rainbow cells      | Re-assigns colours by X position (4 vertical bands: white / red / green / blue) |

### Attraction table controls

- **AttractionTableChoice**: dropdown to select preset tables or "Random".
- **AttractionTableComponent**: 4×4 interactive grid showing current values. Each cell has `+` / `−` / click-to-cycle buttons. Values cycle in `[-2, 2]`.
    - "Randomize table": fills all 16 values from `[-2, 2]` uniformly at random.
    - "Zero table": sets all values to 0.
    - "Mutate table": changes a single random entry to a random value.

---

## 10. Initialization

When the worker starts, `Engine` runs **100 iterations with a zeroed attraction table** (`pullAppartAtStart: true`). This pre-disperses particles that were randomly placed, preventing initial overlaps from dominating the early dynamics.

`getNewCells` places particles uniformly at random over the world with random colours (~equal split across 4 colours).

---

## 11. Preset Attraction Tables

10 curated presets are stored in `attraction/tables.ts`. Each has a `name` and `description`:

| Name              | Description                                                    |
| ----------------- | -------------------------------------------------------------- |
| Negs              | All -1: maximum repulsion                                      |
| Infinite motion   | Reds chase whites in seemingly infinite randomness             |
| No cohesion       | Same-colour repulsion only                                     |
| Spray around      | All mutual repulsion → even spatial spread                     |
| Simple snake      | Circular attraction chain → moving snakes                      |
| Fishes            | White/red heads + blue/green tails forming gliders             |
| Movers and stills | Moving objects + static living clusters                        |
| White pushers     | Movers propelled by groups of white cells                      |
| Large vessels     | Large gliders with branches                                    |
| Universe          | Galaxy-like structures with rotating rings in green background |

---

## 12. Known Limitations & TODOs in Code

1. **`cell.nextPos`** — defined in the `Cell` type but never assigned or read.
2. **`pullCellsAppart` post-step loop** — commented out in `updateCells` (too slow). The function exists and is used in the Engine constructor pre-pass only.
3. **Buffer delay on table update** — when the attraction table changes, frames already computed under the old table are still in the buffer. The code resets `buffer` and `frameIndex` but a comment acknowledges the delay is not fully eliminated.
4. **Hard-coded canvas resolution** — 1600×960 logical / 1000×700 CSS. Scaling via CSS was attempted but caused blur.
5. **`distanceSqaredNoWrap` typo** in `math.ts` — should be `distanceSquaredNoWrap`.
6. **`halfWorldDistance` formula** — computed as `(smallestDimension * smallestDimension) / 2` in `cells.ts`, used as a threshold to detect cross-seam pairs (squared half-dimension).
7. **Commented-out config presets** at the top of `Simulation.svelte` — evidence of past experiments with different resolutions and particle counts.
8. **Cell sort by color** in `Canvas.svelte` (line 82) — commented out. Would reduce `fillStyle` changes but the sort overhead was not worth it.

---

## 13. Key Invariants for Future Development

- `worldSize.x % maxAttractionRadius === 0` and `worldSize.y % maxAttractionRadius === 0` — enforced in `CellsMap` constructor; violating this throws.
- Cell IDs are array indices (0 to N-1), stable for the lifetime of a simulation run.
- All force values in `AttractionTable` should stay in `[-2, 2]` — the UI cycles and colours are mapped at those discrete values.
- The worker must be terminated before creating a new one: `postMessage({ msg: 'destroy' })` then `worker.terminate()`.
- `cellsMap.updateCell()` must be called after every `updateCellPos()` to keep the spatial index consistent.
- Positions updated _mid-loop_ (not double-buffered) — this is intentional and affects emergent behaviour. Changing to a double-buffer approach would alter the dynamics.
