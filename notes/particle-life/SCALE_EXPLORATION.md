# Finding New Emergent Behavior at Scale

## Problem

With 40K particles, most configurations produce either finer-grained versions of
known patterns or uniform repetition of small-scale motifs. The goal is to find
genuinely new behavior that only emerges at higher particle counts.

## Why "more of the same" happens

Increasing particle count with the same world size increases **density**. More
particles in the same space means shorter average distances, so existing patterns
get finer-grained. This scales the resolution, not the complexity.

New scale-dependent behavior comes from changing the **ratios** (radius/world,
density, force magnitudes) not just the absolute particle count.

---

## Methodology

### 1. Scale the world, not just the particle count

Keep density roughly constant but increase the world size. Large worlds allow
long-range spatial organization that can't physically fit in small ones: traveling
fronts that take hundreds of units to form, territories with buffer zones,
multi-layered structures with 5+ shells instead of 2-3.

Try: 40K particles with `horizontalResolution: 60, verticalResolution: 40`
(4x area, same density as 10K in 30x20).

### 2. Explore asymmetric attraction matrices

Most presets use attraction values in {-2, -1, 0, 1, 2}. At low particle counts,
subtle forces get lost in noise. At 40K, try:

-   Very weak asymmetric forces (0.1, -0.3, 0.5) -- these create slow gradients and
    phase transitions that only manifest with enough statistical mass.
-   Mixed-sign chains: A attracts B, B attracts C, C repels A -- at scale these can
    create rotating macro-structures or traveling waves with internal structure.

### 3. Vary the attraction radius relative to world size

`maxAttractionRadius` is typically 32. At 40K particles in a large world, try:

-   **Small radius (16-24)** with high density: forces local clustering, but the
    clusters themselves can form meta-patterns (clusters of clusters).
-   **Large radius (48-64)** with large world: particles feel distant neighbors,
    enabling coordinated behavior across the whole world (flocking, global
    oscillations).

The ratio `maxAttractionRadius / worldSize` is a critical parameter that hasn't
been varied much so far.

### 4. Look for phase transitions, not just final states

New behavior at scale often appears **transiently** -- during the convergence
process, not in the final state. Run a universe and watch the first 2000-5000
frames carefully. Look for:

-   Spinodal decomposition (uniform mix suddenly separating into domains)
-   Coarsening (small clusters merging into fewer large ones over time)
-   Defect propagation (a single disruption rippling across an ordered structure)

These are scale-dependent phenomena that genuinely don't happen at 4K.

### 5. Systematic parameter sweep

Instead of random tweaking, do a structured sweep:

-   Fix 2 colors, fix one attraction pair (e.g. A->B = 1)
-   Sweep A->A from -2 to 2 in steps of 0.5, and B->A from -2 to 2
-   At each point, run 500 frames and visually classify (or screenshot)
-   The interesting behaviors live at **phase boundaries** -- where a small
    parameter change causes a qualitative shift

### 6. Break symmetry deliberately

The 4-color chase/RPS presets have high symmetry (cyclic matrices). At scale, try
breaking that symmetry slightly: one color 10% more particles, one attraction 0.3
stronger. Symmetry-broken systems at scale can produce:

-   Dominant-minority coexistence
-   Traveling ecological fronts
-   Oscillating predator-prey waves that need a critical population size to sustain
