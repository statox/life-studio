<script lang="ts">
    import { untrack } from 'svelte';

    import ScreenBtn from '../ScreenBtn.svelte';
    import { getZeroedAttractionTable } from '$lib/particles/attraction';
    import {
        COLORS,
        generateSimulationParams,
        PARTICLE_COLORS,
        type SimulationConfig
    } from '$lib/particles/engine';
    import type { ColorProportions } from '$lib/particles/engine';
    import type Simulation from '$lib/particles/components/Simulation.svelte';

    interface Props {
        simulationComponent: Simulation;
        onNextScreen?: () => void;
        onPrevScreen?: () => void;
        onSectionChange?: (sectionIndex: number) => void;
    }

    let { simulationComponent, onNextScreen, onPrevScreen, onSectionChange }: Props = $props();

    const SECTION_COUNT = 2;
    let sectionIndex = $state(0);

    const attractionTable = getZeroedAttractionTable();

    const presets: Record<string, ColorProportions> = {
        all_white: { white: 500, red: 0, green: 0, blue: 0 },
        equal: { white: 500, red: 500, green: 500, blue: 500 }
    };

    let currentPreset = $derived(sectionIndex === 0 ? 'all_white' : 'equal');
    let colorWeights: ColorProportions = $derived({ ...presets[currentPreset] });

    const setPreset = (name: string) => {
        currentPreset = name;
        colorWeights = { ...presets[name] };
        startSim();
    };

    const startSim = () => {
        const cfg: SimulationConfig = {
            horizontalResolution: 30,
            verticalResolution: 20,
            initialSpreadConfig: 'rainbow',
            colorWeights,
            maxAttractionRadius: 32,
            attractionTable,
            nbParticles: 1000,
            friction: 0.5
        };
        simulationComponent?.startSim(generateSimulationParams(cfg));
    };

    $effect(() => {
        if (!simulationComponent) return;
        const idx = sectionIndex;
        untrack(() => {
            currentPreset = idx === 0 ? 'all_white' : 'equal';
            colorWeights = { ...presets[currentPreset] };
            startSim();
        });
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
    <h2>Species</h2>
    {#if sectionIndex === 0}
        <p>
            A world is always more beautiful when it has multiple colors, our universes are no
            exception. Let's give <span class="cw">White</span> some friends:
            <span class="cr">Red</span>, <span class="cg">Green</span> and
            <span class="cb">Blue</span>.
        </p>
        <div class="section-btns">
            <ScreenBtn active={currentPreset === 'equal'} onclick={() => setPreset('equal')}>
                Create diversity
            </ScreenBtn>
        </div>
    {:else}
        <p>
            We can control in which proportion we want to introduce each species. The total number
            of particles doesn't change but some species get more common than others.
        </p>
        <p>Let's see the impact of these uneven numbers in a universe.</p>
        <div class="proportion-list">
            {#each COLORS as c}
                <div class="field">
                    <span class="pdot" style="background:{PARTICLE_COLORS[c]}"></span>
                    <input
                        type="range"
                        bind:value={colorWeights[c]}
                        onchange={startSim}
                        min="0"
                        max="1000"
                        step="1"
                    />
                    <span class="dim">{colorWeights[c]}</span>
                </div>
            {/each}
        </div>
    {/if}
</div>
