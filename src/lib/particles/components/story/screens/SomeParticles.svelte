<script lang="ts">
    import { getZeroedAttractionTable } from '$lib/particles/attraction';
    import type Simulation from '$lib/particles/components/Simulation.svelte';
    import { generateSimulationParams, type SimulationConfig } from '$lib/particles/engine';

    export let simulationComponent: Simulation;

    const startScreen = () => {
        const config: SimulationConfig = {
            horizontalResolution: 30,
            verticalResolution: 20,
            initialSpreadConfig: 'uniform',
            colorWeights: { white: 1, red: 0, green: 0, blue: 0 },
            maxAttractionRadius: 32,
            attractionTable: getZeroedAttractionTable(),
            nbParticles: 100,
            friction: 0.5
        };

        const simulationParams = generateSimulationParams(config);
        simulationComponent?.startSim(simulationParams);
    };

    $: if (simulationComponent) startScreen();
</script>

<div class="screen">
    <h2>Some Particles</h2>
    <!-- TODO: Write text about adding particles to the empty world.
         Points to address:
         - We added 10 white particles to the universe
         - They start in the center
         - No forces are defined yet (attraction table is all zeros)
         - The particles just sit there, nothing happens
    -->
    <p>[Placeholder: adding particles, no forces, nothing happens]</p>
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
