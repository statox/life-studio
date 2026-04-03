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
    <p>Let's add a few particles.</p>
    <!-- TODO Use class="cw" from Demonstration.svelte  -->
    <p>
        Meet <span class="cw">White</span>. This is our first species. For now it is doing nothing.
        That is going to change soon.
    </p>
</div>
