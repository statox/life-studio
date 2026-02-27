export const COLORS = ['white', 'red', 'green', 'blue'] as const;

export type Color = typeof COLORS[number];

export const PARTICLE_COLORS: Record<Color, string> = {
    white: '#ffedff',
    red: '#fc2a51',
    green: '#8ff97c',
    blue: '#77cfff'
};

export const colorToIndex = (color: string): number => {
    const idx = COLORS.indexOf(color as Color);
    return idx === -1 ? 0 : idx;
};
