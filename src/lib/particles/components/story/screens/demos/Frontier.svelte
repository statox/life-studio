<script lang="ts">
    import RainbowButton from '$lib/particles/components/buttons/RainbowButton.svelte';
    import { generateSimulationParams } from '$lib/particles/engine';
    import type Simulation from '$lib/particles/components/Simulation.svelte';
    import { getUniverseById } from '$lib/particles/universe';

    export let simulationComponent: Simulation;

    const preset = getUniverseById('competing_predators');

    const startScreen = () => {
        const simulationParams = generateSimulationParams({
            ...preset,
            initialSpreadConfig: 'rainbow'
        });
        simulationComponent?.startSim(simulationParams);
    };

    $: if (simulationComponent) startScreen();
</script>

<div class="screen">
    <h2>Frontier</h2>
    <p>
        Sometimes chaos and order fight against each other and initially grouping the species gives
        interesting results.
    </p>
    <p>
        How long do you think the frontier between <span class="cw">White</span> and
        <span class="cr">Red</span> will hold?
    </p>
    <div class="controls">
        <div class="control-section spread-btns">
            <RainbowButton onClick={startScreen} />
        </div>
    </div>
</div>
