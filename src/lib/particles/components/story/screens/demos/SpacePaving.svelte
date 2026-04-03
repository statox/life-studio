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
        getUniverseById('crystal'),
        getUniverseById('crystal_stripes'),
        getUniverseById('faction_civil_war'),
        getUniverseById('spatial_repartition')
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
    <h2>Space Paving</h2>
    <p>
        In our universes everything is about balance: Some rules create a form of order and other
        create complete chaos.
    </p>
    <p>
        We start with a compilation of universes where the particles tend to repel each other and
        spray across the whole world.
    </p>

    <p>
        <button class="screen-btn" class:active={activeIndex === 0} on:click={() => loadPreset(0)}>
            Crystal
        </button>
        creates a world where groups of <span class="cr">Red</span>-<span class="cw">White</span>
        fight against <span class="cg">Green</span> and never settle.
    </p>
    <p>
        With <button
            class="screen-btn"
            class:active={activeIndex === 1}
            on:click={() => loadPreset(1)}
        >
            Crystal stripes
        </button> <span class="cw">White</span>, <span class="cg">Green</span> and
        <span class="cb">Blue</span>
        form strong crystal-like structures and <span class="cr">Red</span> moves between them.
    </p>
    <p>
        <button class="screen-btn" class:active={activeIndex === 2} on:click={() => loadPreset(2)}>
            Faction civil war
        </button>
        adds a lot of order. <span class="cb">Blue</span> and <span class="cg">Green</span> pack
        together, so do <span class="cw">White</span> and <span class="cr">Red</span>, but both
        clans repel each other creating very organic patterns.
    </p>
    <p>
        Finally <button
            class="screen-btn"
            class:active={activeIndex === 3}
            on:click={() => loadPreset(3)}
        >
            Spatial repartition
        </button> creates a dynamic universe where some worm-like structures form before collapsing into
        wide areas of small clusters.
    </p>

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
