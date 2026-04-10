<script lang="ts">
    import { untrack } from 'svelte';

    import ScreenBtn from '../ScreenBtn.svelte';
    import { getZeroedAttractionTable } from '$lib/particles/attraction';
    import {
        COLORS,
        generateSimulationParams,
        PARTICLE_COLORS,
        type SimulationConfig
    } from '$lib/particles/engine';
    import type Simulation from '$lib/particles/components/Simulation.svelte';

    interface Props {
        simulationComponent: Simulation;
        onNextScreen?: () => void;
        onPrevScreen?: () => void;
        onSectionChange?: (sectionIndex: number) => void;
    }

    let { simulationComponent, onNextScreen, onPrevScreen, onSectionChange }: Props = $props();

    const SECTION_COUNT = 2;
    let sectionIndex = $state(0);

    const attractionTable = getZeroedAttractionTable();
    attractionTable.red.red = -0.1;
    attractionTable.red.white = 0.1;
    attractionTable.white.red = -0.2;
    attractionTable.white.white = -0.1;

    const colorWeights = { white: 500, red: 500, green: 0, blue: 0 };

    const startSim = () => {
        const cfg: SimulationConfig = {
            horizontalResolution: 30,
            verticalResolution: 20,
            initialSpreadConfig: 'rainbow',
            colorWeights,
            maxAttractionRadius: 32,
            attractionTable,
            nbParticles: 1000,
            friction: 0.5
        };
        simulationComponent?.startSim(generateSimulationParams(cfg));
    };

    $effect(() => {
        if (!simulationComponent) return;
        untrack(() => {
            startSim();
        });
    });

    $effect(() => {
        onSectionChange?.(sectionIndex);
    });

    export function next() {
        onNextScreen?.();
    }

    export function prev() {
        onPrevScreen?.();
    }

    export function jumpToSection(idx: number) {
        if (idx >= 0 && idx < SECTION_COUNT) sectionIndex = idx;
    }
</script>

<div class="screen">
    <h2>Meet <span class="cr">Red</span></h2>
    <p>
        <span class="cw">White</span> has a friend now:
        <span class="cr">Red</span>!
    </p>
</div>
