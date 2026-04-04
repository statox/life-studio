# Performance Improvements Plan

Documenting work done around the commit ec9e06725d4b7ed80dd5ebe45c3526caaf627c96
regarding perf improvements

Goal: double particle count (4K-6K -> 8K-12K) at 60fps, CPU only.

Key insight: doubling particles quadruples force computation (density doubles,
each particle sees 2x more neighbors in its grid cell).

## Improvements by priority

### 1. Inline force function (est. 20-40%)

Done in e65a394205f132db65cc78938e2a6f7cb4e523ee

File: `src/lib/particles/engine/computeForces.ts`

`getAttractionForceNumeric` -> `triangleMap` -> `linearMap` -> `constrain` is
4 levels of function calls executed 500K-2M times per frame.

-   Inline the entire chain into `computeForces`
-   This allows using `continue` to skip `Math.sqrt` early. Currently
    `getAttractionForceNumeric` returns 0 for out-of-range or zero-attraction
    pairs, but the caller still computes `Math.sqrt(distSqrd)` and two
    divisions before multiplying by that 0. Inlining turns those return-0
    paths into `continue` statements that skip the sqrt entirely.
-   `force.worker.ts` imports `computeForces` so the fix applies to both

### 2. Canvas rendering (est. 15-25%)

Done in ec9e06725d4b7ed80dd5ebe45c3526caaf627c96
Impact is basically zero

File: `src/lib/particles/components/Canvas.svelte`

`linearMap` (with constrain/Math.max/Math.min) called 2x per particle.

-   Pre-compute scale factors: `sx = canvasWidth / worldSizeX`
-   Replace `Math.floor(linearMap(...))` with `(pos * sx) | 0`

### 3. Worker transfer (est. 5-10%)

Not done: Doesn't seem worth it

File: `src/lib/particles/engine/simulation.worker.ts`

Per-frame `new Float32Array(n*2)` + copy from separate posX/posY arrays.

-   Pre-allocate interleaved buffer once
-   Write positions directly during the position update step

### 4. Spatial grid (est. 3-5%)

Not done: Doesn't seem worth it

File: `src/lib/particles/spatialGrid/spatialGrid.ts`

Cell index computed twice (pass 1 and pass 3) with `Math.floor` + multiply + divide.

-   Cache cell indices in a Uint32Array during pass 1
-   Reuse cached indices in pass 3
