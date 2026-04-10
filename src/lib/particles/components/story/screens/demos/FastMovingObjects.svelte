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
        onNextScreen?: () => void;
        onPrevScreen?: () => void;
        onSectionChange?: (sectionIndex: number) => void;
    }

    let { simulationComponent, onNextScreen, onPrevScreen, onSectionChange }: Props = $props();

    const presets = [getUniverseById('fast_movers'), getUniverseById('moving_structures2')];

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
    <h2>Fast moving objects</h2>
    {#if sectionIndex === 0}
        <p>
            When we reduce the friction in the universe the energy in the system increases and
            things begin to move much faster. Clusters are much more dynamic and don't stabilize as
            well as before. And when the right species meet it can get explosive!
        </p>
    {:else}
        <p><b>{presets[sectionIndex]?.name}</b></p>
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
