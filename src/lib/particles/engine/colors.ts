export const COLORS = ['white', 'red', 'green', 'blue'] as const;

export type Color = typeof COLORS[number];

// export const PARTICLE_COLORS: Record<Color, string> = {
//     white: '#ffedff',
//     red: '#fc2a51',
//     green: '#8ff97c',
//     blue: '#77cfff'
// };

// export const PARTICLE_COLORS: Record<Color, string> = {
//     white: '#EA2B1F',
//     red: '#EDAE49',
//     green: '#F9DF74',
//     blue: '#61210F'
// };

export const PARTICLE_COLORS: Record<Color, string> = {
    white: '#729EA1',
    red: '#B5BD89',
    green: '#EC9192',
    blue: '#DB5375'
};

export const colorToIndex = (color: string): number => {
    const idx = COLORS.indexOf(color as Color);
    return idx === -1 ? 0 : idx;
};
