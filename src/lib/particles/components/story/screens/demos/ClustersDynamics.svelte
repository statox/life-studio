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
    }

    let { simulationComponent }: Props = $props();

    const presets = [
        getUniverseById('spinning_structures'),
        getUniverseById('dynamic_islands'),
        getUniverseById('diverse_collapsing_organisms')
    ];

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

    $effect(() => {
        if (!simulationComponent) return;
        untrack(startScreen);
    });
</script>

<div class="screen">
    <h2>Dynamic Clusters</h2>
    <p>
        Some clusters start spinning like in
        <ScreenBtn active={activeIndex === 0} onclick={() => loadPreset(0)}>
            {presets[0].name}
        </ScreenBtn>. You might have to restart the simulation a few times to see it happening but
        eventually you'll find clusters with a <span class="cw">White</span> core surrounded by a
        spinning triangular system of <span class="cr">Red</span> pushed by
        <span class="cg">Green</span>.
    </p>
    <p>
        This opens a new family of dynamic clusters.
        <ScreenBtn active={activeIndex === 1} onclick={() => loadPreset(1)}>
            {presets[1].name}
        </ScreenBtn> produces fascinating clusters where the outer border seems to oscillate with a period
        of 2. This is one of my favorite universes and I am currently looking for oscillators with a
        higher period.
    </p>
    <p>
        Then
        <ScreenBtn active={activeIndex === 2} onclick={() => loadPreset(2)}>
            {presets[2].name}
        </ScreenBtn> produces configurations that start to move away from simple clusters towards moving
        organisms. We will find more of them in the next pages but for that we need more motion.
    </p>
    <div class="controls">
        <div class="control-section">
            {#each presets as p, idx}
                <ScreenBtn active={activeIndex === idx} onclick={() => loadPreset(idx)}>
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
