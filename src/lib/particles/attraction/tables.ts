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
        name: 'all_negative',
        description: 'Only -1',
        table: {
            white: { white: -1, red: -1, green: -1, blue: -1 },
            red: { white: -1, red: -1, green: -1, blue: -1 },
            green: { white: -1, red: -1, green: -1, blue: -1 },
            blue: { white: -1, red: -1, green: -1, blue: -1 }
        }
    },
    {
        name: 'all_positive',
        description: 'Only +1',
        table: {
            white: { white: +1, red: +1, green: +1, blue: +1 },
            red: { white: +1, red: +1, green: +1, blue: +1 },
            green: { white: +1, red: +1, green: +1, blue: +1 },
            blue: { white: +1, red: +1, green: +1, blue: +1 }
        }
    },
    {
        name: 'all_zero',
        description: 'No interaction',
        table: {
            white: { white: 0, red: 0, green: 0, blue: 0 },
            red: { white: 0, red: 0, green: 0, blue: 0 },
            green: { white: 0, red: 0, green: 0, blue: 0 },
            blue: { white: 0, red: 0, green: 0, blue: 0 }
        }
    },
    {
        name: 'self_positive',
        description: 'Only diagonal +1',
        table: {
            white: { white: +1, red: 0, green: 0, blue: 0 },
            red: { white: 0, red: +1, green: 0, blue: 0 },
            green: { white: 0, red: 0, green: +1, blue: 0 },
            blue: { white: 0, red: 0, green: 0, blue: +1 }
        }
    },
    {
        name: 'self_negative',
        description: 'Only diagonal -1',
        table: {
            white: { white: -1, red: 0, green: 0, blue: 0 },
            red: { white: 0, red: -1, green: 0, blue: 0 },
            green: { white: 0, red: 0, green: -1, blue: 0 },
            blue: { white: 0, red: 0, green: 0, blue: -1 }
        }
    },
    {
        name: 'inverse_diagonal',
        description: 'Opposite corners attract',
        table: {
            white: { white: 0, red: 0, green: 0, blue: +1 },
            red: { white: 0, red: 0, green: +1, blue: 0 },
            green: { white: 0, red: +1, green: 0, blue: 0 },
            blue: { white: +1, red: 0, green: 0, blue: 0 }
        }
    },
    {
        name: 'checkerboard',
        description: 'Alternating +/- pattern',
        table: {
            white: { white: +1, red: -1, green: +1, blue: -1 },
            red: { white: -1, red: +1, green: -1, blue: +1 },
            green: { white: +1, red: -1, green: +1, blue: -1 },
            blue: { white: -1, red: +1, green: -1, blue: +1 }
        }
    },
    {
        name: 'horizontal_stripes',
        description: 'Rows alternate sign',
        table: {
            white: { white: +1, red: +1, green: +1, blue: +1 },
            red: { white: -1, red: -1, green: -1, blue: -1 },
            green: { white: +1, red: +1, green: +1, blue: +1 },
            blue: { white: -1, red: -1, green: -1, blue: -1 }
        }
    },
    {
        name: 'vertical_stripes',
        description: 'Columns alternate sign',
        table: {
            white: { white: +1, red: -1, green: +1, blue: -1 },
            red: { white: +1, red: -1, green: +1, blue: -1 },
            green: { white: +1, red: -1, green: +1, blue: -1 },
            blue: { white: +1, red: -1, green: +1, blue: -1 }
        }
    },
    {
        name: 'upper_positive_lower_negative',
        description: 'Upper triangle +1, lower -1',
        table: {
            white: { white: 0, red: +1, green: +1, blue: +1 },
            red: { white: -1, red: 0, green: +1, blue: +1 },
            green: { white: -1, red: -1, green: 0, blue: +1 },
            blue: { white: -1, red: -1, green: -1, blue: 0 }
        }
    },
    {
        name: 'ring_attraction',
        description: 'Each attracts next color',
        table: {
            white: { white: 0, red: +1, green: 0, blue: 0 },
            red: { white: 0, red: 0, green: +1, blue: 0 },
            green: { white: 0, red: 0, green: 0, blue: +1 },
            blue: { white: +1, red: 0, green: 0, blue: 0 }
        }
    },
    {
        name: 'ring_repulsion',
        description: 'Each repels next color',
        table: {
            white: { white: 0, red: -1, green: 0, blue: 0 },
            red: { white: 0, red: 0, green: -1, blue: 0 },
            green: { white: 0, red: 0, green: 0, blue: -1 },
            blue: { white: -1, red: 0, green: 0, blue: 0 }
        }
    },
    {
        name: 'two_groups',
        description: 'White/Red vs Green/Blue',
        table: {
            white: { white: +1, red: +1, green: -1, blue: -1 },
            red: { white: +1, red: +1, green: -1, blue: -1 },
            green: { white: -1, red: -1, green: +1, blue: +1 },
            blue: { white: -1, red: -1, green: +1, blue: +1 }
        }
    },
    {
        name: 'only_white_active',
        description: 'White interacts, others neutral',
        table: {
            white: { white: +1, red: -1, green: +1, blue: -1 },
            red: { white: 0, red: 0, green: 0, blue: 0 },
            green: { white: 0, red: 0, green: 0, blue: 0 },
            blue: { white: 0, red: 0, green: 0, blue: 0 }
        }
    },
    {
        name: 'only_cross',
        description: 'No self interaction',
        table: {
            white: { white: 0, red: +1, green: -1, blue: +1 },
            red: { white: +1, red: 0, green: +1, blue: -1 },
            green: { white: -1, red: +1, green: 0, blue: +1 },
            blue: { white: +1, red: -1, green: +1, blue: 0 }
        }
    },
    {
        name: 'gradient_like',
        description: 'Increasing attraction across',
        table: {
            white: { white: -1, red: 0, green: +1, blue: +1 },
            red: { white: -1, red: 0, green: +1, blue: +1 },
            green: { white: -1, red: 0, green: +1, blue: +1 },
            blue: { white: -1, red: 0, green: +1, blue: +1 }
        }
    },
    {
        name: 'anti_symmetric',
        description: 'A→B opposite of B→A',
        table: {
            white: { white: 0, red: +1, green: -1, blue: +1 },
            red: { white: -1, red: 0, green: +1, blue: -1 },
            green: { white: +1, red: -1, green: 0, blue: +1 },
            blue: { white: -1, red: +1, green: -1, blue: 0 }
        }
    },
    {
        name: 'center_zero_edges_active',
        description: 'Diagonal zero, edges active',
        table: {
            white: { white: 0, red: +1, green: +1, blue: +1 },
            red: { white: +1, red: 0, green: +1, blue: +1 },
            green: { white: +1, red: +1, green: 0, blue: +1 },
            blue: { white: +1, red: +1, green: +1, blue: 0 }
        }
    },
    {
        name: 'alternating_diagonal',
        description: 'Diagonal alternates +1/-1',
        table: {
            white: { white: +1, red: 0, green: 0, blue: 0 },
            red: { white: 0, red: -1, green: 0, blue: 0 },
            green: { white: 0, red: 0, green: +1, blue: 0 },
            blue: { white: 0, red: 0, green: 0, blue: -1 }
        }
    }
];
