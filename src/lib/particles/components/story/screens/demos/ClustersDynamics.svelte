<script lang="ts">
    import { untrack } from 'svelte';

    import ScreenBtn from '../ScreenBtn.svelte';
    import UniformSpreadButton from '$lib/particles/components/buttons/UniformSpreadButton.svelte';
    import CenteredCircleButton from '$lib/particles/components/buttons/CenteredCircleButton.svelte';
    import RainbowButton from '$lib/particles/components/buttons/RainbowButton.svelte';
    import { generateSimulationParams } from '$lib/particles/engine';
    import type Simulation from '$lib/particles/components/Simulation.svelte';
    import { getUniverseById } from '$lib/particles/universe';
    import type { InitialConfig } from '$lib/particles/universe';

    interface Props {
        simulationComponent: Simulation;
        sectionIndex?: number;
    }

    let { simulationComponent, sectionIndex = 0 }: Props = $props();

    const presets = [
        getUniverseById('spinning_structures'),
        getUniverseById('dynamic_islands'),
        getUniverseById('diverse_collapsing_organisms')
    ];

    let spreadConfig: InitialConfig = $state(
        presets[sectionIndex]?.preferredInitialConfig ?? presets[0].preferredInitialConfig
    );

    const loadPreset = () => {
        spreadConfig = presets[sectionIndex].preferredInitialConfig;
        simulationComponent?.startSim(
            generateSimulationParams({
                ...presets[sectionIndex],
                initialSpreadConfig: spreadConfig
            })
        );
    };

    const reSpread = (config: InitialConfig) => {
        spreadConfig = config;
        simulationComponent?.startSim(
            generateSimulationParams({ ...presets[sectionIndex], initialSpreadConfig: config })
        );
    };

    $effect(() => {
        if (!simulationComponent) return;
        untrack(loadPreset);
    });
</script>

<div class="screen">
    <h2>Dynamic Clusters</h2>
    {#if sectionIndex === 0}
        <p>
            Some clusters start spinning. You might have to restart the simulation a few times to
            see it happening but eventually you'll find clusters with a <span class="cw">White</span
            >
            core surrounded by a spinning triangular system of <span class="cr">Red</span> pushed by
            <span class="cg">Green</span>.
        </p>
    {:else if sectionIndex === 1}
        <p>
            <b>{presets[1].name}</b> produces fascinating clusters where the outer border seems to oscillate
            with a period of 2. This is one of my favorite universes.
        </p>
    {:else}
        <p>
            <b>{presets[2].name}</b> produces configurations that start to move away from simple clusters
            towards moving organisms. We will find more of them in the next pages but for that we need
            more motion.
        </p>
    {/if}
    <div class="section-btns">
        <ScreenBtn onclick={loadPreset}>{presets[sectionIndex]?.name}</ScreenBtn>
    </div>
    <div class="spread-btns">
        <UniformSpreadButton onClick={() => reSpread('uniform')} />
        <CenteredCircleButton onClick={() => reSpread('center')} />
        <RainbowButton onClick={() => reSpread('rainbow')} />
    </div>
</div>
