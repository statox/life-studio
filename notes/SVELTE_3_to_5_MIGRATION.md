# Svelte 3 + SvelteKit 1 → Svelte 5 + SvelteKit 2 Migration

## Overview

This document describes the full migration of this project from Svelte 3 + SvelteKit 1 to Svelte 5 + SvelteKit 2. The structural migration was performed with the official migration tools:

```bash
npx svelte-migrate@latest svelte-4
npx svelte-migrate@latest svelte-5
```

Those tools updated the component syntax (props, events, reactivity) but left behind a number of issues that required manual resolution. This document catalogues every problem category, its root cause, and how it was fixed, along with known remaining caveats and suggestions for future improvement.

The migration happened in the following commits:

```
commit bd94ae3adb91ad845ff0346df31ad5eb33e2c370 - Format after migration
commit 2770d8d745f77c37b092af800dc759204c95c189 - Fix Svelte5 migration errors
commit 7b55114f25d9da7700f9d2faa846cde113326946 - Migrate to Svelte 5
commit e22fe1565711b0cd4dfeba0c8669f45e137cc6ee - Migrate to SvelteKi2 2
commit f9b6a46ccef13c37427429da780feb141a7076c4 - Migrate to Svelte 4
```

---

## Table of Contents

1. [ESLint Configuration](#1-eslint-configuration)
2. [Prettier Configuration](#2-prettier-configuration)
3. [TypeScript: Uninitialized `$state()` DOM Bindings](#3-typescript-uninitialized-state-dom-bindings)
4. [TypeScript: Event Handler Signature Mismatches](#4-typescript-event-handler-signature-mismatches)
5. [TypeScript: `ScreenBtn` Missing `onclick` Prop](#5-typescript-screenbtn-missing-onclick-prop)
6. [TypeScript: Reactive State in Non-Derived Context](#6-typescript-reactive-state-in-non-derived-context)
7. [TypeScript: `Component<any>` vs `typeof SvelteComponent<any>`](#7-typescript-componentany-vs-typeof-sveltecomponentany)
8. [TypeScript: `$derived()` Narrowing to `never`](#8-typescript-derived-narrowing-to-never)
9. [Deprecated `createEventDispatcher`](#9-deprecated-createeventdispatcher)
10. [Deprecated `on:event` Directives](#10-deprecated-onevent-directives)
11. [Runtime: Proxy Object Could Not Be Cloned](#11-runtime-proxy-object-could-not-be-cloned)
12. [Runtime: Infinite Effect Loop via `run()` / `$effect()`](#12-runtime-infinite-effect-loop-via-run--effect)
13. [Potential Future Issues](#13-potential-future-issues)

---

## 1. ESLint Configuration

### Problem

`npx eslint .` crashed entirely with a circular JSON serialisation error. The `.eslintrc.cjs` legacy config referenced `eslint-plugin-svelte3`, which is incompatible with Svelte 5 and no longer maintained.

Additionally, the installed version of `eslint` (8.x) and `eslint-config-prettier` (v8) were incompatible with `eslint-plugin-svelte` v3, which requires flat config.

### Fix

1. Replaced `eslint-plugin-svelte3` with `eslint-plugin-svelte` (the official Svelte 5-compatible plugin).
2. Upgraded `eslint` to 8.57.1 and `eslint-config-prettier` to v9.
3. Created `eslint.config.cjs` (ESLint flat config format) and deleted the legacy `.eslintrc.cjs`.
4. Updated `package.json` lint/format scripts to pass `ESLINT_USE_FLAT_CONFIG=true`.
5. Disabled two rules globally:
    - `svelte/no-navigation-without-resolve`: SvelteKit handles routing; the rule creates false positives on plain `href` links.
    - `svelte/require-each-key`: The existing codebase uses unkeyed `{#each}` blocks throughout and adding keys would require a separate refactor pass.

**Files changed:** `.eslintrc.cjs` (deleted), `eslint.config.cjs` (created), `package.json`

---

## 2. Prettier Configuration

### Problem

`.prettierrc` contained `"pluginSearchDirs": ["."]`, a configuration key that was removed in Prettier v3. It caused a warning on every format run.

### Fix

Removed the `"pluginSearchDirs"` key. Prettier v3 auto-discovers plugins without it.

**Files changed:** `.prettierrc`

---

## 3. TypeScript: Uninitialized `$state()` DOM Bindings

### Problem

The migration tool generated patterns like:

```ts
let canvas: HTMLCanvasElement = $state();
```

In Svelte 5, `$state()` with no argument returns `undefined`. TypeScript's `strict` mode correctly flagged the type mismatch: `undefined` is not assignable to `HTMLCanvasElement`.

**Affected files:**

- `src/lib/particles/components/Canvas.svelte` — `canvas`
- `src/lib/particles/components/Simulation.svelte` — `canvasWrap`, `timeline`

### Fix

Added `| undefined` to the declared types and added explicit guards at every use site instead of non-null assertions (`!`):

```ts
// Before
let canvas: HTMLCanvasElement = $state();

// After
let canvas: HTMLCanvasElement | undefined = $state();
```

Every downstream usage site was updated to guard with `if (!canvas) return;` or optional chaining (`canvas?.method()`).

**Files changed:** `Canvas.svelte`, `Simulation.svelte`

---

## 4. TypeScript: Event Handler Signature Mismatches

### Problem

The migration tool wrapped existing handlers with `preventDefault()` and `stopPropagation()` from `svelte/legacy`. These wrappers expect `(event: Event) => void`, but many existing handlers were typed as `(event: MouseEvent) => void` or `(event: KeyboardEvent) => void`. TypeScript rejected the narrower types.

A related case: `stopPropagation(undefined)` was generated for click handlers with no body — `undefined` is not a valid argument.

**Affected files:**

- `src/lib/components/Media/Main.svelte`
- `src/lib/ReactionDiffusion/v8/components/Manual.svelte`
- `src/lib/ReactionDiffusion/v7/Main.svelte`
- `src/lib/ReactionDiffusion/parametersMap/Main.svelte`
- `src/lib/ReactionDiffusion/v6/Main.svelte`

### Fix

Removed the legacy wrappers entirely and inlined the handler logic with correct event types:

```ts
// Before (generated)
onclick={preventDefault(handleMouseButton)}

// After
onclick={(e) => { e.preventDefault(); handleMouseButton(e); }}
```

For `stopPropagation(undefined)`:

```ts
// Before
onclick={stopPropagation(undefined)}

// After
onclick={(e) => e.stopPropagation()}
```

**Files changed:** `Media/Main.svelte`, `v8/Manual.svelte`, `v7/Main.svelte`, `parametersMap/Main.svelte`, `v6/Main.svelte`

---

## 5. TypeScript: `ScreenBtn` Missing `onclick` Prop

### Problem

The migration tool converted `ScreenBtn.svelte` to use `createBubbler()` to bubble click events, but the component's `Props` interface defined only `active?: boolean` and `children`. When parent components passed `onclick={...}` to `<ScreenBtn>`, TypeScript reported 15+ errors across the story screens ("Property 'onclick' does not exist on type 'Props'").

### Fix

Extended `HTMLButtonAttributes` from `svelte/elements` instead of using a minimal custom interface:

```ts
// Before
interface Props {
    active?: boolean;
    children?: import('svelte').Snippet;
}

// After
import type { HTMLButtonAttributes } from 'svelte/elements';
interface Props extends HTMLButtonAttributes {
    active?: boolean;
    children?: import('svelte').Snippet;
}
```

This makes `onclick` (and all other native button attributes) valid props. No changes were required in any of the 15+ parent files.

**Files changed:** `src/lib/particles/components/story/screens/ScreenBtn.svelte`

---

## 6. TypeScript: Reactive State in Non-Derived Context

### Problem

`Playground.svelte` and `WorkBench.svelte` computed `worldSize` as a plain object literal that referenced `$state` variables:

```ts
const worldSize = {
    x: ws.maxAttractionRadius * ws.horizontalResolution,
    y: ws.maxAttractionRadius * ws.verticalResolution
};
```

In Svelte 5, a plain object literal captures the initial value of `$state` variables at construction time — it does not track subsequent changes. The Svelte compiler emitted a warning (`state_referenced_locally`).

### Fix

Converted to `$derived()` so the value recomputes whenever the referenced state changes:

```ts
const worldSize = $derived({
    x: ws.maxAttractionRadius * ws.horizontalResolution,
    y: ws.maxAttractionRadius * ws.verticalResolution
});
```

The old `syncWorldSize()` helper function (which manually kept `worldSize` in sync) was also deleted.

**Files changed:** `Playground.svelte`, `WorkBench.svelte`

---

## 7. TypeScript: `Component<any>` vs `typeof SvelteComponent<any>`

### Problem

`Story.svelte` used `typeof SvelteComponent<any>` as the type for screen component constructors. Svelte 5 replaced the class-based component model with a function-based one, so `typeof SvelteComponent` no longer describes a component correctly.

### Fix

Changed to `Component<any>` from the `svelte` package:

```ts
import type { Component } from 'svelte';

type ScreenConfig = {
    component: Component<any>;
    noSimulation?: boolean;
    cellSize?: number;
};
```

**Files changed:** `Story.svelte`, `Classifier.svelte`

---

## 8. TypeScript: `$derived()` Narrowing to `never`

### Problem

`Classifier.svelte` had a `$derived()` expression whose conditional logic caused TypeScript to narrow the type to `never` in one branch, because the inline `$derived` block lacked enough context for TypeScript to widen back. `svelte-check` reported a type error on the derived value.

### Fix

Converted to `$derived.by()` (the function-form of derived), which supports regular `if`/`else` and lets TypeScript correctly infer the return type:

```ts
// Before
const hasChanges = $derived(/* complex conditional */);

// After
const hasChanges = $derived.by(() => {
    if (...) return true;
    return false;
});
```

**Files changed:** `Classifier.svelte`

---

## 9. Deprecated `createEventDispatcher`

### Problem

Nine components still used the Svelte 3/4 `createEventDispatcher` API, which was deprecated in Svelte 5. Svelte 5's ESLint plugin flagged these with `svelte/no-deprecated-svelte-component-api` warnings.

**Affected emitter components:**

- `UniverseExportModal.svelte` — `dispatch('close')`
- `TableExportModal.svelte` — `dispatch('close')`
- `AttractionTablePanel.svelte` — `dispatch('updateTable', table)`
- `ReactionDiffusion/v8/FKSelector.svelte` — `dispatch('fkupdated', params)`
- `ReactionDiffusion/v8/FKRandomizer.svelte` — `dispatch('fkupdated', params)`
- `ReactionDiffusion/v7/FKSelector.svelte`
- `ReactionDiffusion/parametersMap/FKSelector.svelte`
- `ReactionDiffusion/autoVisualizer/FKSelector.svelte`
- `ReactionDiffusion/autoVisualizer/FKRandomizer.svelte`

### Fix

Replaced event dispatch with typed callback props:

```ts
// Before (emitter)
const dispatch = createEventDispatcher();
dispatch('close');

// After (emitter)
interface Props {
    onclose?: () => void;
}
let { onclose }: Props = $props();
onclose?.();
```

For events carrying data (`fkupdated`, `updateTable`):

```ts
interface Props {
    onfkupdated?: (params: { f: number; k: number }) => void;
}
let { onfkupdated }: Props = $props();
onfkupdated?.({ f, k });
```

Parent components were updated from `on:close={handler}` to `onclose={handler}` and from `(event: CustomEvent<{f,k}>) => void` to `(params: {f,k}) => void`.

**Files changed:** 9 emitters + 7 parent components

---

## 10. Deprecated `on:event` Directives

### Problem

After the `createEventDispatcher` migration, many story screen files still used `on:click` instead of the Svelte 5 `onclick` syntax. These generated ESLint warnings from `svelte/no-deprecated-event-directive`.

### Fix

Performed a bulk replacement of `on:click=` → `onclick=` across all affected story screen files using `sed`.

**Files changed:** ~15 files in `src/lib/particles/components/story/screens/`

---

## 11. Runtime: Proxy Object Could Not Be Cloned

### Problem

After navigating to certain story screens (e.g. `AttractionTable.svelte`) and in `Playground.svelte` and `WorkBench.svelte`, the browser threw:

```
DOMException: Proxy object could not be cloned
    at simulationWorker.ts
```

**Root cause:** In Svelte 5, all objects wrapped with `$state()` become ES `Proxy` objects for deep reactivity tracking. The browser's structured clone algorithm (used by `postMessage` to transfer data to Web Workers) does not support `Proxy` objects.

In `simulationWorker.ts`, both `postMessage` calls for `attractionTable` were passing the raw `$state` proxy:

```ts
worker.postMessage({
    msg: 'start',
    attractionTable,          // ← Svelte 5 Proxy, cannot be cloned
    ...
});

worker?.postMessage({ msg: 'updateTable', attractionTable: table });  // ← same
```

Early story screens (e.g. `EmptyUniverse.svelte`) were unaffected because they pass the result of `getZeroedAttractionTable()` directly — a plain object never wrapped in `$state`.

### Fix

Convert `attractionTable` to a plain object before posting, using `JSON.parse(JSON.stringify(...))` which strips the Proxy wrapper:

```ts
worker.postMessage({
    msg: 'start',
    attractionTable: JSON.parse(JSON.stringify(attractionTable)),
    ...
});

worker?.postMessage({
    msg: 'updateTable',
    attractionTable: JSON.parse(JSON.stringify(table))
});
```

This fix is applied at the single boundary between the UI thread and the Worker, so no changes are needed in any component.

**Note:** `$state.snapshot(attractionTable)` is an alternative approach (it also produces a plain copy) but was ruled out to avoid bringing Svelte rune semantics into a pure TypeScript file.

**Files changed:** `src/lib/particles/engine/simulationWorker.ts`

---

## 12. Runtime: Infinite Effect Loop via `run()` / `$effect()`

### Problem

After navigating past the first few screens, some story screens (`SelfForces`, `ColorProportions`, `AttractionTable`, and many others) caused an infinite reactive loop:

```
[svelte] Cycle detected: updated at:
    startSim Simulation.svelte:49
    startScreen SelfForces.svelte:57
    SelfForces SelfForces.svelte:61   ← inside run()
    SelfForces SelfForces.svelte:60   ← run() itself
    Story Story.svelte:94
    next Story.svelte:98
```

**Root cause:** The migration tool replaced `onMount` calls with `run()` from `svelte/legacy`, which is a direct wrapper around Svelte 5's `$effect()`. In Svelte 5, `$effect()` tracks **all reactive reads** made during its execution — including reads performed inside functions it calls.

Each screen component had this pattern:

```ts
run(() => {
    if (simulationComponent) startScreen();
});
```

`simulationComponent` is the `Simulation` component instance obtained via `bind:this`. In Svelte 5, component instances are themselves reactive proxy objects. When `startScreen()` calls `simulationComponent.startSim(...)`, and `startSim` writes to `$state` variables inside Simulation.svelte (`buffer = []`, `displayIndex = 0`, etc.), those writes flow through the component proxy. Since the effect had read from the proxy, Svelte considers it stale and reschedules it — creating an infinite loop.

### Fix

Replace `run()` with `$effect()` + `untrack()`. The effect needs to watch `simulationComponent` to detect when it first becomes available, but should **not** subscribe to anything Simulation's internal state exposes:

```ts
// Before
import { run } from 'svelte/legacy';

run(() => {
    if (simulationComponent) startScreen();
});

// After
import { untrack } from 'svelte';

$effect(() => {
    if (!simulationComponent) return;
    untrack(startScreen);
});
```

`untrack(startScreen)` executes `startScreen()` without registering any reactive dependencies. The effect now only has `simulationComponent` in its dependency set — it fires once when the component becomes available and never again from Simulation's internal state changes.

This fix was applied to all 20 affected story screen files. One file (`AttractionTable.svelte`) already used `$effect()` directly but was missing `untrack`, making it equally affected.

**Files changed:** All 20 files in `src/lib/particles/components/story/screens/` that called `startScreen()` from a reactive context.

---

## 13. Potential Future Issues

### 13.1 `svelte/legacy` `run` still imported in ScreenBtn

`ScreenBtn.svelte` imports `createBubbler` and `handlers` from `svelte/legacy`. These are migration-compatibility shims. Long-term, ScreenBtn should be rewritten to use the native Svelte 5 event delegation model (`onclick` on the button directly, passed as a prop via `HTMLButtonAttributes`).

### 13.2 `svelte-markdown` Svelte 5 type incompatibility

`src/lib/ReactionDiffusion/v8/components/About.svelte` uses `svelte-markdown`, which still expects Svelte 4 class constructors for custom renderers. This was worked around with an `as any` cast:

```ts
const renderers = { image: ImageRenderer as any, link: LinkRenderer as any };
```

Once `svelte-markdown` releases a Svelte 5-compatible version, this cast should be removed and the types used properly.

### 13.3 `JSON.parse(JSON.stringify(...))` for Worker data transfer

The Proxy-stripping fix in `simulationWorker.ts` uses JSON round-tripping. This is safe for the current `AttractionTable` structure (plain numbers), but would silently drop any non-JSON-serialisable values (e.g. `undefined`, `Date`, typed arrays, class instances) if the schema were ever extended. A more robust alternative is `$state.snapshot()` (from the `svelte` package), which is designed exactly for this use case and handles the full reactive-to-plain-object conversion.

### 13.4 `createEventDispatcher` in GameOfLife components

`GameOfLife/v1/Main.svelte` and `v2/Main.svelte` still have patterns related to the old event system. They were partially updated but should be reviewed for full Svelte 5 idiomatic compliance.

### 13.5 ESLint warnings: `no-unused-vars` and accessibility

Running `npx eslint .` produces ~420 warnings, the vast majority being:

- `@typescript-eslint/no-unused-vars` — variables named without `_` prefix that are legitimately unused
- `svelte/a11y-*` — accessibility warnings on interactive elements lacking `aria-label`

Neither category causes runtime issues, but both should be addressed in a dedicated cleanup pass. The accessibility warnings in particular may affect screen-reader users.

### 13.6 `state_referenced_locally` warnings in `ColorProportions` and `AttractionTableInteractive`

`svelte-check` still emits two warnings about `$state` variables referenced in non-derived contexts:

- `ColorProportions.svelte:32` — `currentPreset` captured in the initial `colorWeights` definition
- `AttractionTableInteractive.svelte:20-21` — similar pattern

These are pre-existing architectural patterns that work correctly at runtime (the initial value is intentional) but would benefit from being rewritten with `$derived` for clarity.

### 13.7 `dat.gui` dependency still present

`package.json` still lists `dat.gui` and `@types/dat.gui` as devDependencies. If this library is no longer used, it should be removed to keep the dependency graph clean.

---

## Summary of Changes by File Count

| Category                          | Files Modified                                           |
| --------------------------------- | -------------------------------------------------------- |
| ESLint flat config                | 2 (`eslint.config.cjs` created, `.eslintrc.cjs` deleted) |
| Prettier config                   | 1                                                        |
| `$state()` DOM binding types      | 2                                                        |
| Event handler signatures          | 5                                                        |
| ScreenBtn props                   | 1                                                        |
| `$derived()` for reactive objects | 2                                                        |
| `Component<any>` type fix         | 2                                                        |
| `$derived.by()` for narrowing     | 1                                                        |
| `createEventDispatcher` removal   | 16 (9 emitters + 7 parents)                              |
| `on:click` → `onclick`            | ~15                                                      |
| Worker Proxy cloning fix          | 1                                                        |
| Effect infinite loop fix          | 20                                                       |
| **Total (approx.)**               | **~60**                                                  |

## Final State

After all fixes:

- `npm run check` — 0 errors, 18 warnings (pre-existing, non-blocking)
- `npx eslint .` — 0 errors, ~420 warnings (pre-existing no-unused-vars and a11y)
- `npm run build` — success
- `npm run dev` — all features functional, no runtime errors
