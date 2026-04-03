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
        getUniverseById('4_colors_waves'),
        getUniverseById('rock_paper_scissors'),
        getUniverseById('competing_predators'),
        getUniverseById('infinite_moving_mass')
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
    <h2>Dynamic Worlds</h2>
    <p>
        When we release some attraction forces we end up with more dynamic worlds:
        <button class="screen-btn" class:active={activeIndex === 0} on:click={() => loadPreset(0)}>
            {presets[0].name}
        </button>
        has <span class="cw">White</span> chasing the other colors so we get a universe which shows
        some cyclical aspects, waves of <span class="cw">White</span> appear after a few seconds.
    </p>
    <p>
        <button class="screen-btn" class:active={activeIndex === 1} on:click={() => loadPreset(1)}>
            {presets[1].name}
        </button>
        creates dramatic waves of <span class="cr">Red</span> chasing <span class="cw">White</span>
        chasing <span class="cg">Green</span> chasing <span class="cr">Red</span>. The universe
        quickly starts looking like ripples in still water.
    </p>
    <p>The other universes in this page also show a blend of order and chaos.</p>
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
