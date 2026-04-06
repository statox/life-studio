<script lang="ts">
    import ScreenBtn from '../ScreenBtn.svelte';
    import { base } from '$app/paths';
    import UniformSpreadButton from '$lib/particles/components/buttons/UniformSpreadButton.svelte';
    import CenteredCircleButton from '$lib/particles/components/buttons/CenteredCircleButton.svelte';
    import RainbowButton from '$lib/particles/components/buttons/RainbowButton.svelte';
    import { generateSimulationParams } from '$lib/particles/engine';
    import type Simulation from '$lib/particles/components/Simulation.svelte';
    import { getUniverseById } from '$lib/particles/universe';
    import type { InitialConfig } from '$lib/particles/universe';

    export let simulationComponent: Simulation;

    const presets = [
        getUniverseById('cellular_strips_inner_islands'),
        getUniverseById('cellular_strips2'),
        getUniverseById('stripe_patterns'),
        getUniverseById('4_colors_spreading_pattern')
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
    <h2>Spreading Patterns</h2>
    <p>
        When our universes have low energy, strong order can appear and create very organic
        patterns.
    </p>
    <p>
        <ScreenBtn active={activeIndex === 0} on:click={() => loadPreset(0)}>
            {presets[0].name}
        </ScreenBtn>
        and
        <ScreenBtn active={activeIndex === 1} on:click={() => loadPreset(1)}>
            {presets[1].name}
        </ScreenBtn>
        are some of the first patterns I found and some of my favorite. They remind me of some patterns
        I found when implementing
        <a target="_blank" rel="noopener noreferrer" href="{base}/reaction-diffusion"
            >the Gray-Scott reaction-diffusion model</a
        > which look like cells.
    </p>
    <p>
        <ScreenBtn active={activeIndex === 2} on:click={() => loadPreset(2)}>
            {presets[2].name}
        </ScreenBtn>
        create even more complex patterns which remind me of
        <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://duckduckgo.com/?q=aboriginal+dot+painting&ia=images&iax=images"
            >Aboriginal dot painting</a
        >
    </p>
    <p>
        Of course, not all patterns have the same level of order.
        <ScreenBtn active={activeIndex === 3} on:click={() => loadPreset(3)}>
            {presets[3].name}
        </ScreenBtn> creates something a bit less structured than the previous examples.
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
