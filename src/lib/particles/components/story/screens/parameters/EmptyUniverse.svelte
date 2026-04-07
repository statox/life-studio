<script lang="ts">
    import { untrack } from 'svelte';

    import type Simulation from '$lib/particles/components/Simulation.svelte';
    import { getZeroedAttractionTable } from '$lib/particles/attraction';
    import { generateSimulationParams, type SimulationConfig } from '$lib/particles/engine';

    interface Props {
        simulationComponent: Simulation;
    }

    let { simulationComponent }: Props = $props();

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

    $effect(() => {
        if (!simulationComponent) return;
        untrack(startScreen);
    });
</script>

<div class="screen">
    <h2>Empty universe</h2>
    <p>This is a universe. It is empty.</p>
</div>
