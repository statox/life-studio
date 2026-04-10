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

    const presets = [
        getUniverseById('compact_merging_movers_with_several_phases'),
        getUniverseById('compact_moving_structures')
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
    <h2>Merging Moving Organisms</h2>
    {#if sectionIndex === 0}
        <p>
            When we remove free-floating species we find small and dense moving organisms which
            wander across the universe and merge with other organisms they meet.
        </p>
        <p>They take various forms reminiscent of small living organisms moving in a Petri dish.</p>
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
