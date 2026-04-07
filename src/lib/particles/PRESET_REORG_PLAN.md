# Preset Reorganization Plan

## Context

The 66 universe presets in `src/lib/particles/universe/presets/` are in a flat directory with no category system. As the collection grows, we need: categories for grouping in the UI, directory organization, auto-generated IDs on export, and creation date tracking. The existing metadata fields (behavior, structure, energy, complexity, convergenceSpeed) stay -- the new `category` field is additive, and we'll prune unused fields over time.

## Decisions

- **Categories**: One primary category per preset + optional tags array
- **Initial categories**: worms, islands, clusters, waves, crystals, movers, chase, chaos, stripes, other
- **Directories**: `presets/<category>/` subdirectories
- **UI**: Collapsible sections in UniverseSelector grouped by category
- **Variations**: Deferred to later

## Known issues to fix along the way

- `anthill_2.json` and `anthill_3.json` are missing `id` fields

---

## Phase 1: Schema + backfill (no UI changes)

### 1.1 Update types

**File**: `src/lib/particles/universe/index.ts`

- Add `UNIVERSE_CATEGORIES` const array and `UniverseCategory` type
- Add to `UniverseMetadata`: `category: UniverseCategory`, `tags?: string[]`, `createdAt?: string`

### 1.2 Backfill script

Create `scripts/backfill-presets.mjs` (one-time, run manually):

- For each JSON in `presets/`:
    - Get creation date via `git log --diff-filter=A --format=%aI -- <path>`
    - Add `createdAt` field
    - Add `category` from a hardcoded mapping (review before running)
    - Add missing `id` for `anthill_2`, `anthill_3`
    - Write file back

**Category mapping** (to review manually):

| Category | Presets                                                                                                                                                                                                                                                                                                                                                                                                             |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| worms    | 4_colors_worms, 4_colors_worms_single_stage, slow_moving_worms, wraping_bug_worm                                                                                                                                                                                                                                                                                                                                    |
| islands  | 3_colors_stable_islands, 4_colors_islands, complex_islands, complex_islands2, blue_islands, islands, dynamic_islands, stable_multi_stage_islands, cellular_strips_inner_islands                                                                                                                                                                                                                                     |
| clusters | complexe_clusters, slowly_merging_clusters, slowly_merging_clusters2, 4_colors_slowly_merging2_colors_blobs, merging_circular_structures, three_layer_onion, bounded_territories, bubble_exclusion_zones                                                                                                                                                                                                            |
| waves    | 4_colors_waves, rotation_cells                                                                                                                                                                                                                                                                                                                                                                                      |
| crystals | crystal, crystal_stripes, faction_civil_war, spatial_repartition                                                                                                                                                                                                                                                                                                                                                    |
| movers   | compact_moving_structures, comple_moving_structures, complexe_moving_structures, complexe_moving_structures2, complex_structures, moving_structures, moving_structures2, single_compact_moving_structure, various_moving_organisms, fast_movers, zoom4_stages_mover, weakly_bounded_moving_structures, moving_to_filaments, 4_colors_inifnite_moving_low_cohesion_groups, infinite_moving_mass, spinning_structures |
| chase    | 2_colors_chase, 2_colors_chase_white_attraction, linear_predator_chain, competing_predators, rock_paper_scissors, self_cohesive_rps, two_independent_chase_pairs                                                                                                                                                                                                                                                    |
| chaos    | stable_chaos                                                                                                                                                                                                                                                                                                                                                                                                        |
| stripes  | cellular_strips, cellular_strips2, cellular_strips3, stripe_patterns, 4_colors_spreading_pattern                                                                                                                                                                                                                                                                                                                    |
| other    | 1_color_repulsion, 1_color_still, 2_colors_own_attraction, 2_colors_own_repulsion, 2_colors_red_self_repulsion, 2_colors_white_self_repulsion, 2_colors_vessels, anthill, anthill_2, anthill_3                                                                                                                                                                                                                      |

### Verification

- `npm run check` passes
- App runs identically (no consumer reads the new fields yet)

---

## Phase 2: Directory reorganization

### 2.1 Move files

Move each preset into `presets/<category>/` based on the category assigned in Phase 1. Can be scripted.

### 2.2 Update glob

**File**: `src/lib/particles/universe/index.ts` (line 5)

```diff
-const presetModules = import.meta.glob('./presets/*.json', { eager: true })
+const presetModules = import.meta.glob('./presets/**/*.json', { eager: true })
```

Note: `demo_presets.json` is at `src/lib/particles/universe/demo_presets.json` (outside `presets/`), so the recursive glob won't accidentally pick it up.

### 2.3 Update save API

**File**: `src/hooks.server.ts`

Currently writes to `presets/${id}.json`. After reorg, needs to write to `presets/${category}/${id}.json`:

- Validate `category` from POST body against `UNIVERSE_CATEGORIES`
- When category changes for an existing preset, delete the old file (scan subdirectories by ID)

### Verification

- `npm run check` passes
- Story screens still load (they use `getUniverseById` which searches by `id` field, not path)
- Gallery/WorkBench/Classifier all load presets normally
- Classifier save writes to correct subdirectory

---

## Phase 3: Export modal enhancements

**File**: `src/lib/particles/components/UniverseExportModal.svelte`

### 3.1 Auto-generate ID

- Add slugify helper: `name.toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '')`
- Reactive `id` field auto-derived from `name`, editable (once manually edited, stops auto-updating)

### 3.2 Add category selector

- Import `UNIVERSE_CATEGORIES`
- Add `<select>` dropdown in the Classification section

### 3.3 Auto-populate createdAt

- `new Date().toISOString().slice(0, 10)` included in generated JSON

### Verification

- Open WorkBench, click Export, type a name -> ID auto-populates
- Category dropdown shows all options
- Generated JSON includes id, category, createdAt

---

## Phase 4: UniverseSelector category grouping

**File**: `src/lib/particles/components/UniverseSelector.svelte`

### 4.1 Add category filter

- New `fCategory` state variable
- Add to filter chain in `$: visible`
- Add chip row in filters section

### 4.2 Group by category

- Derive `$: grouped` from `visible`: array of `{ category, items }` ordered by `UNIVERSE_CATEGORIES`
- Track `collapsedCategories` as a `Set<string>` for toggle state
- Default: all sections expanded

### 4.3 Update template

Replace flat `{#each visible as u}` with nested loop:

```svelte
{#each grouped as group (group.category)}
    <li class="category-header" on:click={() => toggleCategory(group.category)}>
        <span class="arrow">{collapsed ? '>' : 'v'}</span>
        <span>{group.category}</span>
        <span class="count">({group.items.length})</span>
    </li>
    {#if !collapsed}
        {#each group.items as u (u.id)}
            ...
        {/each}
    {/if}
{/each}
```

### 4.4 Styles

- Category header: distinct background, uppercase, sticky within scroll if feasible
- Tap target >= 44px for mobile

### Verification

- Gallery shows presets grouped by category with collapsible headers
- Filters still work within/across categories
- Search narrows categories (empty categories hidden)
- Mobile layout works

---

## Phase 5: Classifier updates

**File**: `src/lib/particles/components/Classifier.svelte`

- Add category `<select>` dropdown (using `UNIVERSE_CATEGORIES`)
- Add tags as comma-separated text input
- Include category and tags in `buildStoredUniverse()` output
- Save API already handles category-based paths (Phase 2.3)

### Verification

- Open Classifier, select a preset -> category and tags shown
- Change category, save -> file moves to new subdirectory
- Tags round-trip correctly

---

## Dependency graph

```
Phase 1 (schema + backfill)
    |
    v
Phase 2 (directory move + glob + save API)
    |
    +--> Phase 3 (export modal) --- can run in parallel
    |
    +--> Phase 4 (UniverseSelector grouping)
    |         |
    |         v
    |    Phase 5 (Classifier)
```

Phases 3 and 4 are independent of each other.
