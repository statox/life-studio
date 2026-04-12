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
    import AttractionTableComponent from '$lib/particles/components/AttractionTableComponent.svelte';

    interface Props {
        simulationComponent: Simulation;
        onNextScreen?: () => void;
        onPrevScreen?: () => void;
        onSectionChange?: (sectionIndex: number) => void;
    }

    let { simulationComponent, onNextScreen, onPrevScreen, onSectionChange }: Props = $props();

    const presets = [
        getUniverseById('crystal'),
        getUniverseById('crystal_stripes'),
        getUniverseById('reaction_diffusion'),
        getUniverseById('spatial_repartition')
    ];

    const SECTION_COUNT = presets.length;
    let sectionIndex = $state(0);
    let attractionTable = $state(presets[0].attractionTable);

    let spreadConfig: InitialConfig = $derived(
        presets[sectionIndex]?.preferredInitialConfig ?? presets[0].preferredInitialConfig
    );

    const loadPreset = (idx: number) => {
        spreadConfig = presets[idx].preferredInitialConfig;
        attractionTable = presets[idx].attractionTable;
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
    <h2>Space Paving</h2>
    {#if sectionIndex === 0}
        <p>
            In our universes everything is about balance: Some rules create a form of order and
            others create complete chaos.
        </p>
        <p>
            <b>Crystal</b> creates a world where <span class="cg">Green</span> and
            <span class="cw">White</span> chase <span class="cr">Red</span> which tries to fly away but
            gets trapped between them. This creates strongly bound small structures which slowly align
            into a stable crystal.
        </p>
    {:else if sectionIndex === 1}
        <p>
            With <b>Crystal stripes</b> <span class="cw">White</span>,
            <span class="cg">Green</span> and <span class="cb">Blue</span>
            form strong crystal-like structures and <span class="cr">Red</span> moves between them.
        </p>
    {:else if sectionIndex === 2}
        <p>
            This attraction table adds a lot of order. <span class="cb">Blue</span> and
            <span class="cg">Green</span> pack together, so do <span class="cw">White</span> and
            <span class="cr">Red</span>, but both clans repel each other creating very organic
            patterns.
        </p>
    {:else}
        <p>
            <b>Spatial repartition</b> creates a dynamic universe where some worm-like structures form
            before collapsing into wide areas of small clusters.
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
    <AttractionTableComponent {attractionTable} readonly compact />
</div>
