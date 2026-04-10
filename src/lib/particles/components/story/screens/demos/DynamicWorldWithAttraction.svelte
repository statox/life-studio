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
        getUniverseById('4_colors_worms_single_stage'),
        getUniverseById('4_colors_infinite_moving_low_cohesion_groups'),
        getUniverseById('blue_islands')
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
    <h2>Dynamic worlds — Attraction</h2>
    {#if sectionIndex === 0}
        <p>
            When we add back attraction we can see more structure emerging in the middle of chaos.
        </p>
    {:else}
        <p><b>{presets[sectionIndex]?.name}</b></p>
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
