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
        getUniverseById('4_colors_waves'),
        getUniverseById('rock_paper_scissors'),
        getUniverseById('competing_predators'),
        getUniverseById('infinite_moving_mass')
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
    <h2>Dynamic Worlds</h2>
    {#if sectionIndex === 0}
        <p>
            When we release some attraction forces we end up with more dynamic worlds.
            <b>{presets[0].name}</b> has <span class="cw">White</span> chasing the other colors so
            we get a universe which shows some cyclical aspects: waves of
            <span class="cw">White</span> appear after a few seconds.
        </p>
    {:else if sectionIndex === 1}
        <p>
            <b>{presets[1].name}</b> creates dramatic waves of <span class="cr">Red</span> chasing
            <span class="cw">White</span> chasing <span class="cg">Green</span> chasing
            <span class="cr">Red</span>. The universe quickly starts looking like ripples in still
            water.
        </p>
    {:else}
        <p>The other universes in this page also show a blend of order and chaos.</p>
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
