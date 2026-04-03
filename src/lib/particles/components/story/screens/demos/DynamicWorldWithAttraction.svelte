<script lang="ts">
    import UniformSpreadButton from '$lib/particles/components/buttons/UniformSpreadButton.svelte';
    import CenteredCircleButton from '$lib/particles/components/buttons/CenteredCircleButton.svelte';
    import RainbowButton from '$lib/particles/components/buttons/RainbowButton.svelte';
    import { generateSimulationParams } from '$lib/particles/engine';
    import type Simulation from '$lib/particles/components/Simulation.svelte';
    import { getUniverseById } from '$lib/particles/universe';
    import type { InitialConfig } from '$lib/particles/universe';

    export let simulationComponent: Simulation;

    const presets = [
        getUniverseById('4_colors_worms_single_stage'),
        getUniverseById('4_colors_inifnite_moving_low_cohesion_groups'),
        getUniverseById('blue_islands')
    ];

    let activeIndex = 0;
    let spreadConfig: InitialConfig = presets[0].preferredInitialConfig;

    const loadPreset = (idx: number) => {
        activeIndex = idx;
        spreadConfig = presets[idx].preferredInitialConfig;
        startScreen();
    };

    const startScreen = () => {
        const simulationParams = generateSimulationParams({
            ...presets[activeIndex],
            initialSpreadConfig: spreadConfig
        });
        simulationComponent?.startSim(simulationParams);
    };

    const uniformSpread = () => {
        spreadConfig = 'uniform';
        startScreen();
    };
    const centerSpread = () => {
        spreadConfig = 'center';
        startScreen();
    };
    const rainbowSpread = () => {
        spreadConfig = 'rainbow';
        startScreen();
    };

    $: if (simulationComponent) startScreen();
</script>

<div class="screen">
    <h2>Dynamic worlds - Attraction</h2>
    <p>When we add back attraction we can see more structure emerging in the middle of chaos.</p>
    <div class="controls">
        <div class="control-section">
            {#each presets as p, idx}
                <button
                    class="screen-btn"
                    class:active={activeIndex === idx}
                    on:click={() => loadPreset(idx)}
                >
                    {p.name}
                </button>
            {/each}
        </div>
        <div class="control-section spread-btns">
            <UniformSpreadButton onClick={uniformSpread} />
            <CenteredCircleButton onClick={centerSpread} />
            <RainbowButton onClick={rainbowSpread} />
        </div>
    </div>
</div>
