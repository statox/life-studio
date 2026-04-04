# Preset API Refactor

## Context

`generateSimulationParams` in `engine/simulationService.ts` already does the right thing:
it takes a universe config + spread override and returns ready-to-use `SimulationParams`.
But only Story screens use it. Gallery, WorkBench, Classifier, and Demonstration all
manually inline the same logic (~15 lines each): compute worldSize, create cells,
apply spread config, call startSim. The spread button pattern (uniform/center/rainbow)
is also duplicated 4 times.

## Changes

### 1. Add `loadPresetParams` and `respreadParams` to `engine/simulationService.ts`

```typescript
/** Load a preset into SimulationParams, optionally overriding the spread. */
export const loadPresetParams = (
    preset: StoredUniverse,
    spreadOverride?: InitialConfig
): SimulationParams =>
    generateSimulationParams({
        ...preset,
        initialSpreadConfig: spreadOverride ?? preset.preferredInitialConfig
    });

/** Re-spread particles without reloading the full preset. */
export const respreadParams = (
    current: SimulationParams,
    spread: InitialConfig,
    nbParticles: number,
    colorWeights: ColorProportions
): SimulationParams => {
    const cells = getNewCells(current.worldSize, nbParticles, colorWeights);
    if (spread === 'center') largeCenterCellsInPlace(cells, current.worldSize);
    else if (spread === 'rainbow') rainbowCellsInPlace(cells, current.worldSize, colorWeights);
    return { ...current, cells };
};
```

### 2. Refactor each component

**Gallery.svelte** -- replace `loadUniverse` + 3 spread functions with:

-   `loadPresetParams(u)` -> `startSim(params)`
-   Spread buttons: `respreadParams(lastParams, 'uniform', ...)` -> `startSim`

**Classifier.svelte** -- same pattern as Gallery.

**WorkBench.svelte** -- uses `loadPresetParams` for preset loading. Keeps `ws` state
for editing. Spread buttons use `respreadParams`. The `onWorldSettingsChange` path
stays custom (it rebuilds params from edited `ws` values).

**Demonstration.svelte** -- replace `loadByName(name)` with `getUniverseById(id)` +
`loadPresetParams`. Remove manual worldSize/cell creation.

**Story screens** -- no change (already use `generateSimulationParams`).

### 3. Export new functions from engine barrel

Add `loadPresetParams` and `respreadParams` to `engine/index.ts` exports.

## Files to modify

-   `src/lib/particles/engine/simulationService.ts` -- add 2 functions
-   `src/lib/particles/engine/index.ts` -- export new functions
-   `src/lib/particles/components/Gallery.svelte` -- simplify
-   `src/lib/particles/components/Classifier.svelte` -- simplify
-   `src/lib/particles/components/WorkBench.svelte` -- simplify
-   `src/lib/particles/components/Demonstration.svelte` -- simplify

## Verification

-   `npm run check` passes
-   Gallery: select preset -> simulation starts, spread buttons work
-   WorkBench: load preset, edit world settings, spread buttons, export all work
-   Classifier: load preset, change metadata, save, spread buttons work
-   Story: all demo screens still load correctly
