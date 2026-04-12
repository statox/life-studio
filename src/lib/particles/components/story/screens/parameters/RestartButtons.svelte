<script lang="ts">
    import { untrack } from 'svelte';

    import type { InitialConfig } from '$lib/particles/universe';
    import { generateSimulationParams, type SimulationConfig } from '$lib/particles/engine';
    import type Simulation from '$lib/particles/components/Simulation.svelte';
    import { getZeroedAttractionTable } from '$lib/particles/attraction';

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

    const startSim = (config: InitialConfig) => {
        const cfg: SimulationConfig = {
            horizontalResolution: 30,
            verticalResolution: 20,
            initialSpreadConfig: config,
            colorWeights: { white: 1, red: 0, green: 0, blue: 0 },
            maxAttractionRadius: 32,
            attractionTable,
            nbParticles: 2000,
            friction: 0.5
        };
        simulationComponent?.startSim(generateSimulationParams(cfg));
    };

    $effect(() => {
        if (!simulationComponent) return;
        const idx = sectionIndex;
        untrack(() => {
            if (idx === 0) startSim('uniform');
            else startSim('center');
        });
    });

    $effect(() => {
        onSectionChange?.(sectionIndex);
    });

    export function next() {
        if (sectionIndex < SECTION_COUNT - 1) {
            sectionIndex++;
        } else {
            onNextScreen?.();
        }
    }

    export function prev() {
        if (sectionIndex > 0) {
            sectionIndex--;
        } else {
            onPrevScreen?.();
        }
    }

    export function jumpToSection(idx: number) {
        if (idx >= 0 && idx < SECTION_COUNT) sectionIndex = idx;
    }
</script>

<div class="screen">
    <h2>Meet <span class="cw">White</span></h2>
    {#if sectionIndex === 0}
        <p>Let's add a few particles.</p>
        <p>
            Meet our first species: <span class="cw">White</span>. For now it does nothing. That is
            going to change soon.
        </p>
    {:else}
        <p>Look at what happens when we pack our particles a bit more tightly.</p>
        <p>We get some motion! Let's zoom in on that.</p>
    {/if}
</div>
