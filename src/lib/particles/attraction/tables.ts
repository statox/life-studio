import { COLORS, type Color } from '../engine';
import type { AttractionTable, StoredTable } from './types';

export const getRandomAttractionTable = (): AttractionTable => {
    const table = {} as AttractionTable;
    COLORS.forEach((c) => {
        table[c] = {} as Record<Color, number>;
        COLORS.forEach((c2) => {
            table[c][c2] = Math.floor(Math.random() * 4 - 1);
        });
    });

    return table;
};

export const getZeroedAttractionTable = (): AttractionTable => {
    const table = {} as AttractionTable;
    COLORS.forEach((c) => {
        table[c] = {} as Record<Color, number>;
        COLORS.forEach((c2) => {
            table[c][c2] = 0;
        });
    });

    return table;
};

export const getMutatedAttractionTable = (original: AttractionTable): AttractionTable => {
    const mutated = Object.fromEntries(
        Object.entries(original).map(([k, v]) => [k, { ...v }])
    ) as AttractionTable;
    const sc = COLORS[Math.floor(Math.random() * 4)];
    const oc = COLORS[Math.floor(Math.random() * 4)];
    const originalValue = mutated[sc][oc];

    while (mutated[sc][oc] === originalValue) {
        mutated[sc][oc] = Math.floor(Math.random() * 5) - 2;
    }

    return mutated;
};

export const getCycledUpAttractionTable = (
    original: AttractionTable,
    selfColor: Color,
    otherColor: Color
): AttractionTable => {
    const mutated = Object.fromEntries(
        Object.entries(original).map(([k, v]) => [k, { ...v }])
    ) as AttractionTable;

    let val = mutated[selfColor][otherColor];
    val = val >= 2 ? -2 : val + 1;
    mutated[selfColor][otherColor] = val;

    return mutated;
};

export const getIncreasedAttractionTable = (
    original: AttractionTable,
    selfColor: Color,
    otherColor: Color
): AttractionTable => {
    const mutated = Object.fromEntries(
        Object.entries(original).map(([k, v]) => [k, { ...v }])
    ) as AttractionTable;

    const val = mutated[selfColor][otherColor];
    if (val < 2) mutated[selfColor][otherColor] = val + 1;

    return mutated;
};

export const getDecreasedAttractionTable = (
    original: AttractionTable,
    selfColor: Color,
    otherColor: Color
): AttractionTable => {
    const mutated = Object.fromEntries(
        Object.entries(original).map(([k, v]) => [k, { ...v }])
    ) as AttractionTable;

    const val = mutated[selfColor][otherColor];
    if (val > -2) mutated[selfColor][otherColor] = val - 1;

    return mutated;
};

export const tables: StoredTable[] = [
    {
        name: 'Negs',
        description: 'Only -1',
        table: {
            white: { white: -1, red: -1, green: -1, blue: -1 },
            red: { white: -1, red: -1, green: -1, blue: -1 },
            green: { white: -1, red: -1, green: -1, blue: -1 },
            blue: { white: -1, red: -1, green: -1, blue: -1 }
        }
    },
    {
        name: 'Infinite motion',
        description:
            'Some very simple patterns of reds chasing whites in a seemlingly infinite randomness',
        table: {
            white: { white: -1, red: -1, green: 0, blue: -1 },
            red: { white: 2, red: -1, green: 1, blue: -1 },
            green: { white: 0, red: 0, green: -1, blue: -1 },
            blue: { white: -1, red: -1, green: -1, blue: -1 }
        }
    },
    {
        name: 'No cohesion',
        description: 'Cells of the same color repulse each other',
        table: {
            white: { white: -1, red: 0, green: 0, blue: 0 },
            red: { white: 0, red: -1, green: 0, blue: 0 },
            green: { white: 0, red: 0, green: -1, blue: 0 },
            blue: { white: 0, red: 0, green: 0, blue: -1 }
        }
    },
    {
        name: 'Spray around',
        description:
            'All the cells repulse each others, resulting in an even repartition of the cells',
        table: {
            white: { white: -1, red: -1, green: -1, blue: -1 },
            red: { white: -1, red: -1, green: -1, blue: -1 },
            green: { white: -1, red: -1, green: -1, blue: -1 },
            blue: { white: -1, red: -1, green: -1, blue: -1 }
        }
    },
    {
        name: 'Simple snake',
        description:
            'The colors attract each other in a circular manner creating some moving snakes',
        table: {
            white: { white: -1, red: 1, green: 0, blue: 0 },
            red: { white: 0, red: -1, green: 1, blue: 0 },
            green: { white: 0, red: 0, green: -1, blue: 1 },
            blue: { white: 1, red: 0, green: 0, blue: -1 }
        }
    },
    {
        name: 'Fishes',
        description:
            'The cells regroup in moving structures with white/red head and blue/green tail swimming through the world.',
        table: {
            white: { white: 0, red: 1, green: -1, blue: -2 },
            red: { white: 2, red: 0, green: 1, blue: -1 },
            green: { white: -2, red: -2, green: -2, blue: 1 },
            blue: { white: 2, red: -1, green: 1, blue: -2 }
        }
    },
    {
        name: 'Movers and stills',
        description:
            'Create some moving objects mainly drivent by green and red and some living but still objects made by white, blue and red. Sometimes the movers grab still objects.',
        table: {
            white: { white: 1, red: -1, green: 0, blue: 1 },
            red: { white: 2, red: 1, green: 2, blue: -1 },
            green: { white: -1, red: -1, green: 1, blue: -1 },
            blue: { white: 1, red: 2, green: 0, blue: 0 }
        }
    },
    {
        name: 'White pushers',
        description: 'Create movers propelled by groups of white cells',
        table: {
            white: { white: 1, red: 1, green: 2, blue: -1 },
            red: { white: 0, red: -1, green: 2, blue: 2 },
            green: { white: -1, red: 0, green: -1, blue: 2 },
            blue: { white: -1, red: 1, green: 1, blue: -1 }
        }
    },
    {
        name: 'Large vessels',
        description:
            'Create large gliders with branches. The cells are ordered white, blue, red green',
        table: {
            white: { white: 0, red: 1, green: 0, blue: 2 },
            red: { white: 0, red: 1, green: 1, blue: -1 },
            green: { white: -1, red: 1, green: 0, blue: 1 },
            blue: { white: -1, red: 2, green: 2, blue: 2 }
        }
    },
    {
        name: 'Universe',
        description:
            'Galaxies with blue center, red and white rings turning around evolving in a green goo',
        table: {
            white: { white: -1, red: 1, green: 1, blue: 1 },
            red: { white: -1, red: -1, green: -1, blue: 2 },
            green: { white: -2, red: -1, green: 0, blue: -1 },
            blue: { white: 1, red: 2, green: -2, blue: 2 }
        }
    },
    {
        name: 'Infinite vessels',
        description: 'Do not converge. Create fast moving vessels which grow until they explode.',
        table: {
            white: { white: 1, red: 0, green: 0, blue: -1 },
            red: { white: 1, red: 1, green: -1, blue: -1 },
            green: { white: -1, red: -1, green: 0, blue: 1 },
            blue: { white: 2, red: 2, green: -1, blue: -1 }
        }
    },
    {
        name: 'Infinite vessels 2',
        description:
            'Do not converge. Some stable green, red, blue structures and some green, red, blue white vessels',
        table: {
            white: { white: 1, red: -1, green: -1, blue: -2 },
            red: { white: -1, red: 0, green: -1, blue: 1 },
            green: { white: 0, red: 2, green: -1, blue: -1 },
            blue: { white: 1, red: 1, green: -1, blue: -1 }
        }
    },
    {
        name: 'Petry Dish',
        description:
            'Stable chaos - Islands of white, semi stable blue, red, green star-like structures, many single green red and blue floaters',
        table: {
            white: { white: 0, red: -1, green: -2, blue: -2 },
            red: { white: -2, red: 0, green: -1, blue: 0 },
            green: { white: -1, red: 1, green: -2, blue: -1 },
            blue: { white: 0, red: 1, green: -1, blue: 0 }
        }
    },
    {
        name: 'Wall crawlers',
        description:
            'Stable chaos - White islands pushed by blob vessels of red green and blue. When a blob vessel reaches a border it keeps following it indefinitely',
        table: {
            white: { white: 0, red: 0, green: 0, blue: -1 },
            red: { white: 1, red: 2, green: 1, blue: -1 },
            green: { white: -2, red: 1, green: 2, blue: 2 },
            blue: { white: 0, red: 1, green: 0, blue: 0 }
        }
    },
    {
        name: 'Worms-ish',
        description:
            'Large moving worm-like structures converging to a big blob of blue, white and red',
        table: {
            white: { white: -1, red: 1, green: 1, blue: 0 },
            red: { white: 0, red: -1, green: 1, blue: 1 },
            green: { white: 0, red: -1, green: -1, blue: 1 },
            blue: { white: 1, red: 0, green: 0, blue: -1 }
        }
    },
    {
        name: 'Worms',
        description: 'Produces long worms which wrap around the edges and cut through each other',
        table: {
            white: { white: -1, red: 2, green: 1, blue: 0 },
            red: { white: 0, red: -1, green: 1, blue: 1 },
            green: { white: 0, red: -1, green: -2, blue: 1 },
            blue: { white: 2, red: 0, green: -1, blue: -1 }
        }
    },
    {
        name: 'Spliting gliders',
        description:
            'Islands of blue moved by gliders. Gliders are pushed by red chasing white which pushes fluid-like green',
        table: {
            white: { white: 0, red: 0, green: 1, blue: 0 },
            red: { white: 2, red: 0, green: 1, blue: -1 },
            green: { white: 0, red: -2, green: 0, blue: -1 },
            blue: { white: -2, red: 0, green: 0, blue: 0 }
        }
    },
    {
        // Generated by AI
        name: 'Bubbles',
        description:
            'Each color forms a tight self-cohesive blob. The four blobs bounce off each other due to inter-color repulsion.',
        table: {
            white: { white: 2, red: -1, green: -1, blue: -1 },
            red: { white: -1, red: 2, green: -1, blue: -1 },
            green: { white: -1, red: -1, green: 2, blue: -1 },
            blue: { white: -1, red: -1, green: -1, blue: 2 }
        }
    },
    {
        // Generated by AI
        name: 'Two tribes',
        description:
            'White and red form one super-organism, green and blue form another. The two factions attract internally and strongly repel each other.',
        table: {
            white: { white: 1, red: 2, green: -2, blue: -2 },
            red: { white: 2, red: 1, green: -2, blue: -2 },
            green: { white: -2, red: -2, green: 1, blue: 2 },
            blue: { white: -2, red: -2, green: 2, blue: 1 }
        }
    },
    {
        // Generated by AI
        name: 'Predator-prey',
        description:
            'Rock-paper-scissors cycle: each color hunts the next and flees from its own predator. Produces dynamic chasing wavefronts.',
        table: {
            white: { white: -1, red: 2, green: -1, blue: -2 },
            red: { white: -2, red: -1, green: 2, blue: -1 },
            green: { white: -1, red: -2, green: -1, blue: 2 },
            blue: { white: 2, red: -1, green: -2, blue: -1 }
        }
    },
    {
        // Generated by AI
        name: 'Lazy hunters',
        description:
            'One-sided circular pursuit: each color chases the next but the prey is completely unaware. Produces asymmetric herding.',
        table: {
            white: { white: -1, red: 2, green: 0, blue: 0 },
            red: { white: 0, red: -1, green: 2, blue: 0 },
            green: { white: 0, red: 0, green: -1, blue: 2 },
            blue: { white: 2, red: 0, green: 0, blue: -1 }
        }
    },
    {
        // Generated by AI
        name: 'Nucleus',
        description:
            'White forms dense stable nuclei. Red, green and blue are drawn to white but repel each other strongly — like electrons in shells.',
        table: {
            white: { white: 2, red: -1, green: -1, blue: -1 },
            red: { white: 1, red: -2, green: 0, blue: 0 },
            green: { white: 1, red: 0, green: -2, blue: 0 },
            blue: { white: 1, red: 0, green: 0, blue: -2 }
        }
    },
    {
        // Generated by AI
        name: 'Parasites',
        description:
            'Red and green are both attracted to white clusters but strongly repel each other — they feed on white without white noticing.',
        table: {
            white: { white: 2, red: 0, green: 0, blue: 1 },
            red: { white: 2, red: -2, green: -2, blue: -1 },
            green: { white: 2, red: -2, green: -2, blue: -1 },
            blue: { white: 1, red: -1, green: -1, blue: 1 }
        }
    },
    {
        // Generated by AI
        name: 'Membrane',
        description:
            'Alternating attraction and repulsion in a cyclic pattern, designed to produce thin boundary layers between color regions.',
        table: {
            white: { white: -1, red: 2, green: -2, blue: 1 },
            red: { white: 2, red: -1, green: 1, blue: -2 },
            green: { white: -2, red: 1, green: -1, blue: 2 },
            blue: { white: 1, red: -2, green: 2, blue: -1 }
        }
    },
    {
        // Generated by AI
        name: 'Stratification',
        description:
            'White and red attract each other and repel green and blue, which do the same among themselves — produces natural layer separation.',
        table: {
            white: { white: 1, red: 1, green: -1, blue: -2 },
            red: { white: 1, red: 1, green: -1, blue: -1 },
            green: { white: -1, red: -1, green: 1, blue: 1 },
            blue: { white: -2, red: -1, green: 1, blue: 1 }
        }
    },
    {
        // Generated by AI
        name: 'Cannibals',
        description:
            'Each color is self-attracted but also repels its neighbours in the cycle, creating tension that breaks clusters into many small oscillating groups.',
        table: {
            white: { white: 2, red: -1, green: 1, blue: -1 },
            red: { white: -1, red: 2, green: -1, blue: 1 },
            green: { white: 1, red: -1, green: 2, blue: -1 },
            blue: { white: -1, red: 1, green: -1, blue: 2 }
        }
    },
    {
        name: 'Infinite waves',
        description: '4000 particles - even props - World 12x12, radius 32, FPS 60',
        // 4000 particles¶
        // even proportions¶
        // uniform spread¶
        // World:.¶
        // H Cells 12¶
        // V Cells 12¶
        // Max radius 32¶
        // FPS 60¶
        table: {
            white: { white: 0, red: 0, green: -1, blue: -1 },
            red: { white: -1, red: 0, green: 0, blue: -1 },
            green: { white: -1, red: -1, green: 0, blue: 0 },
            blue: { white: 0, red: -1, green: -1, blue: 0 }
        }
    },
    {
        name: 'tmp',
        description: '',
        table: {
            white: { white: 1, red: -1, green: 0, blue: 0 },
            red: { white: -1, red: -1, green: -1, blue: 2 },
            green: { white: 1, red: 1, green: -1, blue: 1 },
            blue: { white: 1, red: 1, green: 2, blue: 1 }
        }
    }
];
