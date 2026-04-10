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
    import { Media } from '$lib/components/Media';

    interface Props {
        simulationComponent: Simulation;
        onNextScreen?: () => void;
        onPrevScreen?: () => void;
        onSectionChange?: (sectionIndex: number) => void;
    }

    let { simulationComponent, onNextScreen, onPrevScreen, onSectionChange }: Props = $props();

    const presets = [
        getUniverseById('spinning_structures'),
        getUniverseById('dynamic_islands'),
        getUniverseById('diverse_collapsing_organisms')
    ];

    const SECTION_COUNT = presets.length;
    let sectionIndex = $state(0);

    let spreadConfig: InitialConfig = $derived(
        presets[sectionIndex]?.preferredInitialConfig ?? presets[0].preferredInitialConfig
    );

    const loadPreset = (idx: number) => {
        spreadConfig = presets[idx].preferredInitialConfig;
        simulationComponent?.startSim(
            generateSimulationParams({
                ...presets[idx],
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
        const idx = sectionIndex;
        untrack(() => loadPreset(idx));
    });

    $effect(() => {
        onSectionChange?.(sectionIndex);
    });

    export function next() {
        if (sectionIndex < SECTION_COUNT - 1) {
            sectionIndex++;
        } else {
            onNextScreen?.();
        }
    }

    export function prev() {
        if (sectionIndex > 0) {
            sectionIndex--;
        } else {
            onPrevScreen?.();
        }
    }

    export function jumpToSection(idx: number) {
        if (idx >= 0 && idx < SECTION_COUNT) sectionIndex = idx;
    }
</script>

<div class="screen">
    <h2>Dynamic Clusters</h2>
    {#if sectionIndex === 0}
        <p>
            Some clusters start spinning. You might have to restart the simulation a few times to
            see it happening but eventually you'll find clusters with a <span class="cw">White</span
            >
            core surrounded by a spinning triangular system of <span class="cr">Red</span> pushed by
            <span class="cg">Green</span>.
        </p>
        <div style="max-width: 200px;">
            <Media path="/particles-life/story_clusters_dynamics/spinning_structures_1.gif" />
        </div>
    {:else if sectionIndex === 1}
        <p>
            <b>{presets[1].name}</b> produces fascinating clusters where the outer border seems to oscillate
            with a period of 2. This is one of my favorite universes.
        </p>
        <div style="max-width: 200px;">
            <Media path="/particles-life/story_clusters_dynamics/dynamic_islands_1.gif" />
        </div>
        <div style="max-width: 200px;">
            <Media path="/particles-life/story_clusters_dynamics/dynamic_islands_2.gif" />
        </div>
    {:else}
        <p>
            <b>{presets[2].name}</b> produces configurations that start to move away from simple clusters
            towards moving organisms. We will find more of them in the next pages but for that we need
            more motion.
        </p>
    {/if}
    <div class="section-btns">
        <ScreenBtn onclick={() => loadPreset(sectionIndex)}>Restart</ScreenBtn>
    </div>
    <div class="spread-btns">
        <UniformSpreadButton onClick={() => reSpread('uniform')} />
        <CenteredCircleButton onClick={() => reSpread('center')} />
        <RainbowButton onClick={() => reSpread('rainbow')} />
    </div>
</div>
