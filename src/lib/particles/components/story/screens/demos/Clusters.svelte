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
        getUniverseById('3_colors_stable_islands'),
        getUniverseById('complex_islands'),
        getUniverseById('complex_islands2'),
        getUniverseById('complex_clusters'),
        getUniverseById('merging_circular_structures'),
        getUniverseById('three_layer_onion')
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
    <h2>Clusters</h2>
    <p>
        A lot of configurations tend to create clusters: The universe stabilizes into groups of
        several colors.
        <button class="screen-btn" class:active={activeIndex === 0} on:click={() => loadPreset(0)}>
            3 Colors - Stable islands
        </button> is a good example of that: The clusters form quickly and stop moving.
    </p>
    <p>
        In universes like
        <button class="screen-btn" class:active={activeIndex === 1} on:click={() => loadPreset(1)}>
            Complex islands
        </button> the clusters are slower to form and end up being more complex. We can also see some
        moving organisms briefly forming before collapsing into clusters.
    </p>
    <p>
        And complexity can keep increasing like in
        <button class="screen-btn" class:active={activeIndex === 4} on:click={() => loadPreset(4)}>
            Merging circular structures
        </button>
        where some clusters tend to form a triangular <span class="cg">Green</span>-<span class="cb"
            >Blue</span
        >
        core surrounded by a circle of alternating <span class="cr">Red</span> and
        <span class="cw">White</span> strips.
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
