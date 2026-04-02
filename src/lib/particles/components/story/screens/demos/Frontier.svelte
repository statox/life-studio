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

<style>
    .screen {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }

    h2 {
        font-size: 1.2rem;
        color: #eceff1;
        margin: 0;
        font-weight: 600;
    }

    p {
        color: #90a4ae;
        font-size: 0.9rem;
        line-height: 1.6;
        margin: 0;
    }

    .controls {
        display: flex;
        flex-direction: column;
        gap: 16px;
        margin-top: 8px;
    }
</style>
