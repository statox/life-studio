<script lang="ts">
    import { getZeroedAttractionTable } from '$lib/particles/attraction';
    import { getNewCells, largeCenterCellsInPlace } from '$lib/particles/engine/cells';
    import type Simulation from '$lib/particles/components/Simulation.svelte';

    export let simulationComponent: Simulation;

    const attractionTable = getZeroedAttractionTable();
    const maxAttractionRadius = 32;
    const horizontalResolution = 3;
    const verticalResolution = 2;
    const worldSize = {
        x: maxAttractionRadius * horizontalResolution,
        y: maxAttractionRadius * verticalResolution
    };

    const startScreen = () => {
        const cells = getNewCells(worldSize, 10, { white: 1, red: 0, green: 0, blue: 0 });
        largeCenterCellsInPlace(cells, worldSize);

        simulationComponent?.startSim({
            cells,
            worldSize,
            maxAttractionRadius,
            attractionTable,
            friction: 0.5
        });
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
