<script lang="ts">
    import { untrack } from 'svelte';

    import RainbowButton from '$lib/particles/components/buttons/RainbowButton.svelte';
    import { generateSimulationParams } from '$lib/particles/engine';
    import type Simulation from '$lib/particles/components/Simulation.svelte';
    import { getUniverseById } from '$lib/particles/universe';

    interface Props {
        simulationComponent: Simulation;
        sectionIndex?: number;
    }

    let { simulationComponent }: Props = $props();

    const preset = getUniverseById('competing_predators');

    const startScreen = () => {
        simulationComponent?.startSim(
            generateSimulationParams({ ...preset, initialSpreadConfig: 'rainbow' })
        );
    };

    $effect(() => {
        if (!simulationComponent) return;
        untrack(startScreen);
    });
</script>

<div class="screen">
    <h2>Frontier</h2>
    <p>
        Sometimes chaos and order fight against each other and initially grouping the species by
        color gives interesting results.
    </p>
    <p>
        How long do you think the vertical frontier between <span class="cw">White</span> and
        <span class="cr">Red</span> will hold?
    </p>
    <div class="section-btns">
        <RainbowButton onClick={startScreen} />
    </div>
</div>
