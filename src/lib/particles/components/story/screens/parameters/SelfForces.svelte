<script lang="ts">
    import { untrack } from 'svelte';

    import { getZeroedAttractionTable } from '$lib/particles/attraction';
    import type Simulation from '$lib/particles/components/Simulation.svelte';
    import { generateSimulationParams, type SimulationConfig } from '$lib/particles/engine';

    interface Props {
        simulationComponent: Simulation;
        onNextScreen?: () => void;
        onPrevScreen?: () => void;
        onSectionChange?: (sectionIndex: number) => void;
    }

    let { simulationComponent, onNextScreen, onPrevScreen, onSectionChange }: Props = $props();

    const SECTION_COUNT = 3;
    let sectionIndex = $state(0);

    // sectionIndex 0 → force 0 (zoom), 1 → force 1 (attract), 2 → force -1 (repulse)
    const forceForSection = [0, 1, -1] as const;

    const setForce = (val: -1 | 0 | 1) => {
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
        const idx = sectionIndex;
        untrack(() => setForce(forceForSection[idx] ?? 0));
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
    <h2>Forces</h2>
    {#if sectionIndex === 0}
        <p>
            All particles start tightly packed and slowly move away from each other. <b
                >This is their default behavior:</b
            > If a particle is too close to a neighbor it gets repulsed and tries to move away. If no
            neighbor is close enough it just rests and does nothing.
        </p>
    {:else if sectionIndex === 1}
        <p>Particles can attract each other.</p>
        <p>
            Their natural repulsion force has to fight a new force: When a neighbor is close enough,
            the particle is now attracted. They pack as closely as possible to each other and their
            natural repulsion force pushes them into clusters.
        </p>
    {:else}
        <p>
            Finally, they can also repel each other, which causes clusters to form as groups push
            against one another.
        </p>
    {/if}
</div>
