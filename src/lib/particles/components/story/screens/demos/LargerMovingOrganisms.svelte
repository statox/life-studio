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
        getUniverseById('complex_moving_structures_3'),
        getUniverseById('complex_structures'),
        getUniverseById('complex_moving_structures'),
        getUniverseById('moving_structures'),
        getUniverseById('various_moving_organisms')
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
    <h2>Larger Moving Organisms</h2>
    {#if sectionIndex === 0}
        <p>Our universes can also create larger and more complex moving structures.</p>
        <p>
            Some are chaotic and their dynamics are not always easy to understand, while others are
            much more structured.
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
