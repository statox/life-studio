# Universe Presets

Each preset is a JSON file describing a particle-life universe: its physics parameters, metadata, and classification.

## Directory structure

Presets are organized into category subdirectories:

```
presets/
  worms/        -- elongated moving structures
  islands/      -- static or slowly evolving isolated groups
  clusters/     -- blobs that merge, split, or stay bounded
  waves/        -- propagating patterns, rotation cells
  crystals/     -- stable geometric lattices and meshes
  movers/       -- self-propelled compact structures
  chase/        -- predator-prey and rock-paper-scissors dynamics
  chaos/        -- high-energy turbulent systems
  stripes/      -- repeating linear/cellular strip patterns
  other/        -- simple demos, edge cases, uncategorized
```

The directory must match the `category` field inside the JSON file.

## Adding a new preset

1. In **WorkBench**, tune the parameters until you find an interesting universe.
2. Click **Export** -- the modal auto-generates `id` (from name), `category`, and `createdAt`.
3. Review the fields, copy the JSON, and save it as `presets/<category>/<id>.json`.

Alternatively, use the **Classifier** page (`/particles-life/classifier/`) to edit metadata and save directly (dev mode only).

## JSON schema

Every preset file must conform to `StoredUniverse` (defined in `../index.ts`):

| Field                    | Type                                         | Notes                                                                       |
| ------------------------ | -------------------------------------------- | --------------------------------------------------------------------------- |
| `id`                     | `string`                                     | Unique, lowercase, underscores only. Must match filename (without `.json`). |
| `name`                   | `string`                                     | Human-readable display name.                                                |
| `description`            | `string`                                     | What the universe does and why it's interesting.                            |
| `category`               | `UniverseCategory`                           | Must match the parent directory name.                                       |
| `tags`                   | `string[]` (optional)                        | Freeform tags for filtering.                                                |
| `createdAt`              | `string` (optional)                          | ISO date `YYYY-MM-DD`.                                                      |
| `preferredInitialConfig` | `uniform \| center \| rainbow`               | Which particle spread best showcases this universe.                         |
| `behavior`               | `still \| converges \| cyclic \| chaotic`    | Overall dynamics.                                                           |
| `structure`              | `none \| clusters \| patterns \| organisms`  | Spatial organization in characteristic state.                               |
| `activeColors`           | `1 \| 2 \| 3 \| 4`                           | Number of colors with non-zero weight.                                      |
| `convergenceSpeed`       | `instant \| fast \| medium \| slow \| never` | How quickly it settles. Use `never` for cyclic/chaotic.                     |
| `energyLevel`            | `low \| medium \| high`                      | Typical particle velocity once settled.                                     |
| `complexity`             | `1 \| 2 \| 3`                                | 1 = trivial, 2 = a few rules, 3 = rich emergent dynamics.                   |
| `attractionTable`        | `AttractionTable`                            | 4x4 color interaction matrix (values -2 to 2).                              |
| `colorWeights`           | `ColorProportions`                           | `{ white, red, green, blue }` particle counts.                              |
| `nbParticles`            | `number`                                     | Total particle count.                                                       |
| `maxAttractionRadius`    | `number`                                     | Interaction radius.                                                         |
| `horizontalResolution`   | `number`                                     | World width = `maxAttractionRadius * horizontalResolution`.                 |
| `verticalResolution`     | `number`                                     | World height = `maxAttractionRadius * verticalResolution`.                  |
| `friction`               | `number`                                     | Velocity damping factor (typically 0.5).                                    |

## Adding a new category

1. Add the name to `UNIVERSE_CATEGORIES` in `src/lib/particles/universe/index.ts`.
2. Create the directory `presets/<name>/`.
3. The new category automatically appears in the UniverseSelector filters, Classifier dropdown, and Export modal.

## How presets are loaded

`import.meta.glob('./presets/**/*.json', { eager: true })` in `index.ts` loads all JSON files at build time. The file path doesn't matter for lookup -- `getUniverseById()` searches by the `id` field inside the JSON, not the filename. However, keeping `id` and filename in sync is a convention that helps avoid confusion.

## Save API (dev mode)

The Classifier saves presets via `POST /api/presets` (handled in `src/hooks.server.ts`). It writes to `presets/<category>/<id>.json` and automatically removes the old file if the category changed.
