import type { AttractionTable } from '../attraction';
import type { ColorProportions } from '../engine/cells';
import demoPresets from './demo_presets.json';

const presetModules = import.meta.glob('./presets/*.json', { eager: true }) as Record<
    string,
    { default: StoredUniverse }
>;

export type Universe = {
    attractionTable: AttractionTable;
    colorWeights: ColorProportions;
    nbParticles: number;
    maxAttractionRadius: number;
    horizontalResolution: number;
    verticalResolution: number;
    friction: number;
};

type UniverseMetadata = {
    id: string;
    name: string;
    description: string;
    /** Which initial particle placement best showcases this universe. */
    preferredInitialConfig: InitialConfig;
    /** Overall dynamics — does it settle or keep moving forever? */
    behavior: UniverseBehavior;
    /** Spatial organisation visible in the characteristic state. */
    structure: UniverseStructure;
    /** Number of colours with a non-zero weight in `colorWeights`. */
    activeColors: 1 | 2 | 3 | 4;
    /** How quickly the universe reaches its final state. Use `never` for cyclic/chaotic. */
    convergenceSpeed: ConvergenceSpeed;
    /** Typical particle velocity in the characteristic state. */
    energyLevel: EnergyLevel;
    /**
     * How many distinct interaction rules drive the universe.
     * - `1` — trivial (zero forces or a single same-colour rule)
     * - `2` — a few rules between 2–4 colours
     * - `3` — rich multi-colour dynamics with emergent structures
     */
    complexity: 1 | 2 | 3;
};

export type InitialConfig = 'uniform' | 'center' | 'rainbow';

/**
 * Overall dynamics of the universe — does it settle or keep moving forever?
 * - `still`     — zero forces; particles never move at all
 * - `converges` — the system reaches a stable resting state
 * - `cyclic`    — persistent dynamic patterns that never fully settle
 * - `chaotic`   — unpredictable high-energy motion, no structure emerges
 */
export type UniverseBehavior = 'still' | 'converges' | 'cyclic' | 'chaotic';

/**
 * Spatial organisation visible once the universe reaches its characteristic state.
 * - `none`      — particles spread uniformly, no discernible grouping
 * - `clusters`  — distinct blobs or groups of same/paired colours
 * - `patterns`  — repeating geometric motifs: strips, rings, islands
 * - `organisms` — moving, self-maintaining structures (worms, vessels, …)
 */
export type UniverseStructure = 'none' | 'clusters' | 'patterns' | 'organisms';

/**
 * How quickly the universe reaches its final state.
 * Only meaningful when `behavior` is `still` or `converges`; use `never` otherwise.
 * - `instant` — stable within a few frames
 * - `fast`    — stable within ~100 frames
 * - `medium`  — stable within ~500–1 000 frames
 * - `slow`    — takes thousands of frames or more
 * - `never`   — never converges (cyclic or chaotic universes)
 */
export type ConvergenceSpeed = 'instant' | 'fast' | 'medium' | 'slow' | 'never';

/**
 * Typical particle velocity once the universe reaches its characteristic state.
 * - `low`    — particles barely move or are still
 * - `medium` — moderate sustained motion
 * - `high`   — fast, turbulent motion
 */
export type EnergyLevel = 'low' | 'medium' | 'high';

export type StoredUniverse = Universe & UniverseMetadata;

const cachedPresets: StoredUniverse[] = Object.values(presetModules).map(
    (mod) => mod.default as StoredUniverse
);

export const getAllUniverses = (): StoredUniverse[] => cachedPresets;
export const getAllDemoUniverses = (): StoredUniverse[] => demoPresets as StoredUniverse[];
