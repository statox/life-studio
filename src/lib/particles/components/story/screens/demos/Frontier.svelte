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
    <p>[Placeholder: How long do you think the frontier between white and red will hold?]</p>
    <div class="controls">
        <div class="spread-btns">
            <RainbowButton onClick={startScreen} />
        </div>
    </div>
</div>
