import type { AttractionTable } from '$lib/particles/attraction';
import type { ColorProportions } from '$lib/particles/engine/cells';
import { tables } from '$lib/particles/attraction';

export type Preset = {
    name: string;
    description: string;
    table: AttractionTable;
    nbParticles: number;
    colorWeights: ColorProportions;
    resetType: 'uniform' | 'centered';
};

const DEFAULT_NB_PARTICLES = 4000;
const DEFAULT_COLOR_WEIGHTS: ColorProportions = { white: 500, red: 500, green: 500, blue: 500 };

const preset = (
    name: string,
    overrides: Partial<Omit<Preset, 'name' | 'table' | 'description'>> = {}
): Preset => {
    const stored = tables.find((t) => t.name === name)!;
    return {
        name: stored.name,
        description: stored.description,
        table: stored.table,
        nbParticles: DEFAULT_NB_PARTICLES,
        colorWeights: DEFAULT_COLOR_WEIGHTS,
        resetType: 'uniform',
        ...overrides,
    };
};

export const presets: Preset[] = [
    // Section 2 — Basics
    preset('Spray around'),
    preset('Bubbles'),
    preset('Simple snake'),
    // Section 3 — Emergent Complexity
    preset('Fishes'),
    preset('Worms'),
    preset('Universe'),
    preset('Large vessels'),
    preset('Wall crawlers'),
    preset('Two tribes'),
    preset('Predator-prey'),
];
