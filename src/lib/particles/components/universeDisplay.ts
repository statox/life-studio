import type { UniverseBehavior, UniverseStructure, EnergyLevel } from '$lib/particles/universe';

export const behaviorColor = (b: UniverseBehavior): string => {
    if (b === 'still') return '#546e7a';
    if (b === 'converges') return '#1565c0';
    if (b === 'cyclic') return '#2e7d32';
    return '#e65100';
};

export const structureColor = (s: UniverseStructure): string => {
    if (s === 'none') return '#546e7a';
    if (s === 'clusters') return '#6a1b9a';
    if (s === 'patterns') return '#00838f';
    return '#ef6c00';
};

export const energyColor = (e: EnergyLevel): string => {
    if (e === 'low') return '#78909c';
    if (e === 'medium') return '#c3e88d';
    return '#fc2a51';
};

export const stars = (n: number): string => '★'.repeat(n) + '☆'.repeat(3 - n);
