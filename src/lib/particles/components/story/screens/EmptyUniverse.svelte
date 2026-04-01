<script lang="ts">
    import { getNewCells, largeCenterCellsInPlace } from '$lib/particles/engine/cells';
    import { getUniverseById, type StoredUniverse } from '$lib/particles/universe';
    import type Simulation from '$lib/particles/components/Simulation.svelte';

    export let simulationComponent: Simulation;

    const preset: StoredUniverse = getUniverseById('1_color_still');

    const startScreen = () => {
        const worldSize = {
            x: preset.maxAttractionRadius * preset.horizontalResolution,
            y: preset.maxAttractionRadius * preset.verticalResolution
        };
        const cells = getNewCells(worldSize, 0, preset.colorWeights);
        if (preset.preferredInitialConfig === 'center') largeCenterCellsInPlace(cells, worldSize);

        simulationComponent?.startSim({
            cells,
            worldSize,
            maxAttractionRadius: preset.maxAttractionRadius,
            attractionTable: preset.attractionTable,
            friction: preset.friction
        });
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
