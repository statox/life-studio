<script lang="ts">
    import { untrack } from 'svelte';

    import ScreenBtn from '../ScreenBtn.svelte';
    import UniformSpreadButton from '$lib/particles/components/buttons/UniformSpreadButton.svelte';
    import CenteredCircleButton from '$lib/particles/components/buttons/CenteredCircleButton.svelte';
    import RainbowButton from '$lib/particles/components/buttons/RainbowButton.svelte';
    import { Media } from '$lib/components/Media';
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
        getUniverseById('3_colors_stable_islands'),
        getUniverseById('complex_islands'),
        getUniverseById('complex_islands2'),
        getUniverseById('merging_circular_structures')
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
    <h2>Clusters</h2>
    {#if sectionIndex === 0}
        <p>
            A lot of configurations tend to create clusters: The universe stabilizes into groups of
            several colors.
        </p>
        <div style="max-width: 200px;">
            <Media path="/particles-life/story_clusters/3_colors_stable_islands.png" />
        </div>
        <p>
            <b>3 Colors - Stable islands</b> is a good example: The clusters form quickly and stop moving.
        </p>
    {:else if sectionIndex === 1}
        <p>
            In universes like <b>Complex islands</b> the clusters are slower to form and end up being
            more complex. We can also see some moving organisms briefly forming before collapsing into
            clusters.
        </p>
        <div style="max-width: 200px;">
            <Media path="/particles-life/story_clusters/complex_islands.png" />
        </div>
    {:else if sectionIndex === 2}
        <p>And this is a similar variation with longer and more structured clusters</p>
        <div style="max-width: 200px;">
            <Media path="/particles-life/story_clusters/complex_islands_2_1.png" />
        </div>
        <div style="max-width: 200px;">
            <Media path="/particles-life/story_clusters/complex_islands_2_2.png" />
        </div>
    {:else if sectionIndex === 3}
        <p>Clusters can also remaing circular but with different layers structures.</p>
        <div style="max-width: 200px;">
            <Media path="/particles-life/story_clusters/merging_circular_structures_1.png" />
        </div>
        <div style="max-width: 200px;">
            <Media path="/particles-life/story_clusters/merging_circular_structures_2.gif" />
        </div>
    {:else}
        <p><b>{presets[sectionIndex]?.name}</b></p>
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
