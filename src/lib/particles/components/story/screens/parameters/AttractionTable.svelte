<script lang="ts">
    import { untrack } from 'svelte';

    import ScreenBtn from '../ScreenBtn.svelte';
    import AttractionTableComponent from '$lib/particles/components/AttractionTableComponent.svelte';
    import { getZeroedAttractionTable, type AttractionTable } from '$lib/particles/attraction';
    import type Simulation from '$lib/particles/components/Simulation.svelte';
    import { generateSimulationParams, type SimulationConfig } from '$lib/particles/engine';
    import { Media } from '$lib/components/Media';

    interface Props {
        simulationComponent: Simulation;
        onNextScreen?: () => void;
        onPrevScreen?: () => void;
        onSectionChange?: (sectionIndex: number) => void;
    }

    let { simulationComponent, onNextScreen, onPrevScreen, onSectionChange }: Props = $props();

    const SECTION_COUNT = 3;
    let sectionIndex = $state(0);

    type Preset = { label: string; table: { ww: number; wr: number; rw: number; rr: number } };

    const presets: Preset[] = [
        { label: '1', table: { ww: 0.5, wr: -0.3, rw: -0.3, rr: 0.5 } },
        { label: '2', table: { ww: 0.5, wr: -0.3, rw: 0.3, rr: 0.5 } },
        { label: 'White repulses + attracts Red', table: { ww: -1, wr: 1, rw: 0, rr: 1 } }
    ];

    const buildTable = (p: Preset['table']): AttractionTable => {
        const t = getZeroedAttractionTable();
        t.white.white = p.ww;
        t.white.red = p.wr;
        t.red.white = p.rw;
        t.red.red = p.rr;
        return t;
    };

    let attractionTable: AttractionTable = $derived(
        buildTable(presets[sectionIndex]?.table ?? presets[0].table)
    );

    const selectPreset = (idx: number) => {
        attractionTable = buildTable(presets[idx].table);
        const cfg: SimulationConfig = {
            horizontalResolution: 10,
            verticalResolution: 7,
            initialSpreadConfig: 'center',
            colorWeights: { white: 1, red: 1, green: 0, blue: 0 },
            maxAttractionRadius: 32,
            attractionTable,
            nbParticles: 500,
            friction: 0.77
        };
        simulationComponent?.startSim(generateSimulationParams(cfg));
    };

    $effect(() => {
        if (!simulationComponent) return;
        const idx = sectionIndex;
        untrack(() => selectPreset(idx));
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
    <h2>The Attraction Table</h2>
    {#if sectionIndex === 0}
        <p>
            The attraction table is our way to summarize the forces involved in our universe. It is
            a matrix showing how each row color reacts when it gets close to a particle of the
            column color.
        </p>
        <p>
            Here we have a small self-attraction force for
            <span class="cw">White</span> and
            <span class="cr">Red</span> but each species is repulsed by the other.
        </p>
    {:else if sectionIndex === 1}
        <p>
            Now <span class="cr">Red</span> is attracted to
            <span class="cw">White</span>. Since <span class="cw">White</span>
            is still repulsed by <span class="cr">Red</span>, an infinite chase takes place.
        </p>
    {:else}
        <p>
            Even with only two species, the number of possible attraction tables is enormous.
            Cross-species interactions can also stabilized into clusters.
        </p>
        <div class="illustration">
            <Media path="/particles-life/story_attraction_table/structures.png" />
        </div>
    {/if}
    <div class="section-btns">
        <ScreenBtn onclick={() => selectPreset(sectionIndex)}>Restart</ScreenBtn>
    </div>
    <div class="attraction-table-container">
        <AttractionTableComponent {attractionTable} readonly hiddenColors={['green', 'blue']} />
    </div>
</div>

<style>
    .attraction-table-container {
        max-width: 400px;
    }

    .illustration {
        max-width: 400px;
    }
</style>
