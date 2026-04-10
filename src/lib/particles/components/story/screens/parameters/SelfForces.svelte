<script lang="ts">
    import { untrack } from 'svelte';

    import ScreenBtn from '../ScreenBtn.svelte';
    import { getZeroedAttractionTable } from '$lib/particles/attraction';
    import type Simulation from '$lib/particles/components/Simulation.svelte';
    import { generateSimulationParams, type SimulationConfig } from '$lib/particles/engine';

    interface Props {
        simulationComponent: Simulation;
        sectionIndex?: number;
    }

    let { simulationComponent, sectionIndex = 0 }: Props = $props();

    // sectionIndex 0 → force 0 (zoom), 1 → force 1 (attract), 2 → force -1 (repulse)
    const forceForSection = [0, 1, -1] as const;
    let activeForce: -1 | 0 | 1 = $state(forceForSection[sectionIndex] ?? 0);

    const setForce = (val: -1 | 0 | 1) => {
        activeForce = val;
        const table = getZeroedAttractionTable();
        table.white.white = val;
        const isRepulse = val === -1;
        const cfg: SimulationConfig = {
            horizontalResolution: isRepulse ? 12 : 6,
            verticalResolution: isRepulse ? 8 : 4,
            initialSpreadConfig: 'center',
            colorWeights: { white: 1, red: 0, green: 0, blue: 0 },
            maxAttractionRadius: 32,
            attractionTable: table,
            nbParticles: isRepulse ? 100 : 500,
            friction: 0.77
        };
        simulationComponent?.startSim(generateSimulationParams(cfg));
    };

    $effect(() => {
        if (!simulationComponent) return;
        untrack(() => setForce(forceForSection[sectionIndex] ?? 0));
    });
</script>

<div class="screen">
    <h2>Forces</h2>
    {#if sectionIndex === 0}
        <p>Let's zoom in on the center of the previous universe.</p>
        <p>
            All particles start tightly packed and slowly move away from each other. <b
                >This is their default behavior:</b
            > If a particle is too close to a neighbor it gets repulsed and tries to move away. If no
            neighbor is close enough it just rests and does nothing.
        </p>
        <div class="section-btns">
            <ScreenBtn active={activeForce === 0} onclick={() => setForce(0)}>Zoooom</ScreenBtn>
        </div>
    {:else if sectionIndex === 1}
        <p>Particles can attract each other.</p>
        <p>
            Their natural repulsion force has to fight a new force: When a neighbor is close enough,
            the particle is now attracted. They pack as closely as possible to each other and their
            natural repulsion force pushes them into clusters.
        </p>
        <div class="section-btns">
            <ScreenBtn active={activeForce === 1} onclick={() => setForce(1)}>
                Create attraction force
            </ScreenBtn>
        </div>
    {:else}
        <p>
            Finally, they can also repel each other, which causes clusters to form as groups push
            against one another.
        </p>
        <div class="section-btns">
            <ScreenBtn active={activeForce === -1} onclick={() => setForce(-1)}>
                Create repulsion force
            </ScreenBtn>
        </div>
    {/if}
</div>
