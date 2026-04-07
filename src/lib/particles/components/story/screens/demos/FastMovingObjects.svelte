<script lang="ts">
    import { run } from 'svelte/legacy';

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
    }

    let { simulationComponent }: Props = $props();

    const presets = [getUniverseById('fast_movers'), getUniverseById('moving_structures2')];

    let activeIndex = $state(0);
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

    run(() => {
        if (simulationComponent) startScreen();
    });
</script>

<div class="screen">
    <h2>Fast moving objects</h2>
    <p>
        When we reduce the friction in the universe the energy in the system increases and things
        begin to move much faster.
    </p>
    <p>
        Here we can see that clusters are much more dynamic and don't stabilize as well as before.
        And when the right species meet it can get explosive!
    </p>
    <div class="controls">
        <div class="control-section">
            {#each presets as p, idx}
                <ScreenBtn active={activeIndex === idx} on:click={() => loadPreset(idx)}>
                    {p.name}
                </ScreenBtn>
            {/each}
        </div>
        <div class="control-section spread-btns">
            <UniformSpreadButton onClick={uniformSpread} />
            <CenteredCircleButton onClick={centerSpread} />
            <RainbowButton onClick={rainbowSpread} />
        </div>
    </div>
</div>
