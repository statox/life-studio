<script lang="ts">
    import { untrack } from 'svelte';

    import ScreenBtn from '../ScreenBtn.svelte';
    import { base } from '$app/paths';
    import UniformSpreadButton from '$lib/particles/components/buttons/UniformSpreadButton.svelte';
    import CenteredCircleButton from '$lib/particles/components/buttons/CenteredCircleButton.svelte';
    import RainbowButton from '$lib/particles/components/buttons/RainbowButton.svelte';
    import { generateSimulationParams } from '$lib/particles/engine';
    import type Simulation from '$lib/particles/components/Simulation.svelte';
    import { getUniverseById } from '$lib/particles/universe';
    import type { InitialConfig } from '$lib/particles/universe';

    interface Props {
        simulationComponent: Simulation;
        onNextScreen?: () => void;
        onPrevScreen?: () => void;
        onSectionChange?: (sectionIndex: number) => void;
    }

    let { simulationComponent, onNextScreen, onPrevScreen, onSectionChange }: Props = $props();

    const presets = [
        getUniverseById('cellular_strips_inner_islands'),
        getUniverseById('cellular_strips2'),
        getUniverseById('stripe_patterns'),
        getUniverseById('4_colors_spreading_pattern')
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
    <h2>Spreading Patterns</h2>
    {#if sectionIndex === 0}
        <p>
            When our universes have low energy, strong order can appear and create very organic
            patterns. These are some of the first patterns I found and some of my favorites — they
            remind me of patterns from
            <a target="_blank" rel="noopener noreferrer" href="{base}/reaction-diffusion"
                >the Gray-Scott reaction-diffusion model</a
            >.
        </p>
    {:else if sectionIndex === 1}
        <p><b>{presets[1].name}</b> — another cell-like pattern.</p>
    {:else if sectionIndex === 2}
        <p>
            <b>{presets[2].name}</b> creates even more complex patterns which remind me of
            <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://duckduckgo.com/?q=aboriginal+dot+painting&ia=images&iax=images"
                >Aboriginal dot painting</a
            >.
        </p>
    {:else}
        <p>
            Not all patterns have the same level of order. <b>{presets[3].name}</b> creates something
            a bit less structured than the previous examples.
        </p>
    {/if}
    <div class="section-btns">
        <ScreenBtn onclick={() => loadPreset(sectionIndex)}>{presets[sectionIndex]?.name}</ScreenBtn
        >
    </div>
    <div class="spread-btns">
        <UniformSpreadButton onClick={() => reSpread('uniform')} />
        <CenteredCircleButton onClick={() => reSpread('center')} />
        <RainbowButton onClick={() => reSpread('rainbow')} />
    </div>
</div>
