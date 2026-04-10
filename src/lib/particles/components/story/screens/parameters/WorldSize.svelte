<script lang="ts">
    import { untrack } from 'svelte';

    import ScreenBtn from '../ScreenBtn.svelte';
    import { generateSimulationParams, type SimulationConfig } from '$lib/particles/engine';
    import type Simulation from '$lib/particles/components/Simulation.svelte';
    import { getUniverseById } from '$lib/particles/universe';
    import AttractionTableComponent from '../../../AttractionTableComponent.svelte';

    interface Props {
        simulationComponent: Simulation;
        sectionIndex?: number;
    }

    let { simulationComponent, sectionIndex = 0 }: Props = $props();

    const preset = getUniverseById('4_colors_worms');

    const sizePresets = [
        { name: 'medium', horizontalResolution: 30, verticalResolution: 20, nbParticles: 4000 },
        { name: 'large', horizontalResolution: 90, verticalResolution: 60, nbParticles: 4000 },
        { name: 'small', horizontalResolution: 10, verticalResolution: 7, nbParticles: 1000 }
    ] as const;

    const loadSize = (idx: number) => {
        const s = sizePresets[idx];
        const cfg: SimulationConfig = {
            horizontalResolution: s.horizontalResolution,
            verticalResolution: s.verticalResolution,
            initialSpreadConfig: 'center',
            colorWeights: preset.colorWeights,
            maxAttractionRadius: 32,
            attractionTable: preset.attractionTable,
            nbParticles: s.nbParticles,
            friction: preset.friction
        };
        simulationComponent?.startSim(generateSimulationParams(cfg));
    };

    $effect(() => {
        if (!simulationComponent) return;
        untrack(() => loadSize(sectionIndex));
    });
</script>

<div class="screen">
    <h2>World size</h2>
    {#if sectionIndex === 0}
        <p>
            The last parameter we can control is the size of our universe. Here we keep the same
            amount of particles but vary the size of the "box" they live in.
        </p>
        <p>
            Start with a <b>Medium</b> size to observe the base behavior: Each color is attracted to the
            next one which creates moving worm-like structures. Sometimes the worm eats its own tail.
            When structures get close, they tend to merge and split.
        </p>
    {:else if sectionIndex === 1}
        <p>
            With a <b>Large</b> world the particles have more room to move. Worms take more time to travel
            across the world and interact less often, which allows more of them to form.
        </p>
    {:else}
        <p>
            In a <b>Small</b> world the particles don't have enough room to create several structures
            and most merge into a single worm. This view also lets you better see how the world wraps
            on itself: top and bottom borders are connected, as are left and right.
        </p>
    {/if}
    <div class="section-btns">
        <ScreenBtn onclick={() => loadSize(sectionIndex)}>
            {sizePresets[sectionIndex]?.name}
        </ScreenBtn>
    </div>
    <AttractionTableComponent attractionTable={preset.attractionTable} readonly compact />
</div>
