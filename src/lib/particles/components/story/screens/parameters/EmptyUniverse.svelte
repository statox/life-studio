<script lang="ts">
    import type Simulation from '$lib/particles/components/Simulation.svelte';
    import { getZeroedAttractionTable } from '$lib/particles/attraction';
    import { generateSimulationParams, type SimulationConfig } from '$lib/particles/engine';

    export let simulationComponent: Simulation;

    const startScreen = () => {
        const config: SimulationConfig = {
            horizontalResolution: 30,
            verticalResolution: 20,
            initialSpreadConfig: 'center',
            colorWeights: {
                white: 0,
                red: 0,
                green: 0,
                blue: 0
            },
            maxAttractionRadius: 32,
            attractionTable: getZeroedAttractionTable(),
            nbParticles: 0,
            friction: 0.5
        };

        const simulationParams = generateSimulationParams(config);
        simulationComponent?.startSim(simulationParams);
    };

    $: if (simulationComponent) startScreen();
</script>

<div class="screen">
    <h2>Empty universe</h2>
    <p>This is a universe. It is empty.</p>
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
</style>
