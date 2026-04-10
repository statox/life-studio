import type Simulation from '$lib/particles/components/Simulation.svelte';

export type StoryScreenProps = {
    simulationComponent: Simulation;
};

export interface StoryScreenInstance {
    next(): void;
    prev(): void;
    /** Jump directly to a specific section index (used by the global nav slider). */
    jumpToSection?(idx: number): void;
}
