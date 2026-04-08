<script lang="ts">
    import { onDestroy, onMount } from 'svelte';

    import Simulation from '$lib/particles/components/Simulation.svelte';
    import { getRandomAttractionTable } from '$lib/particles/attraction';
    import { getNewCells } from '$lib/particles/engine/cells';
    import type { SimulationParams } from '../engine';

    let simulationComponent: Simulation | undefined = $state();

    const MAX_ATTRACTION_RADIUS = 32;
    const BASE_ROWS = 20;
    let simulationParams: SimulationParams | undefined;
    let updateTimer: ReturnType<typeof setTimeout> | undefined;

    const updatePage = () => {
        if (!simulationParams) {
            return;
        }

        updateAttractionTable();

        if (Math.random() < 0.1) {
            updateSimulationParams();
        }

        updateTimer = setTimeout(updatePage, 10_000);
    };

    const updateAttractionTable = () => {
        if (!simulationParams) {
            return;
        }

        simulationParams.attractionTable = getRandomAttractionTable();
        simulationComponent?.updateAttractionTable(simulationParams.attractionTable);
    };

    const updateSimulationParams = () => {
        if (!simulationParams) {
            return;
        }
        simulationParams.friction = 0.1 + Math.random() * 0.4;

        simulationComponent?.startSim(simulationParams);
    };

    onMount(() => {
        const cols = Math.round(BASE_ROWS * (window.innerWidth / window.innerHeight));
        const worldSize = {
            x: MAX_ATTRACTION_RADIUS * cols,
            y: MAX_ATTRACTION_RADIUS * BASE_ROWS
        };
        simulationParams = {
            cells: getNewCells(worldSize, 4000, { white: 500, red: 500, green: 500, blue: 500 }),
            worldSize,
            maxAttractionRadius: MAX_ATTRACTION_RADIUS,
            attractionTable: getRandomAttractionTable(),
            friction: 0.5
        };
        simulationComponent?.startSim(simulationParams);

        updatePage();
    });

    onDestroy(() => {
        clearTimeout(updateTimer);
    });
</script>

<div class="infinite-wrap">
    <Simulation bind:this={simulationComponent} fillContainer hideTimeline={true} />
</div>

<style>
    .infinite-wrap {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
    }

    .infinite-wrap :global(.sim) {
        height: 100%;
    }

    .infinite-wrap :global(.canvas-wrap) {
        flex: 1;
        min-height: 0;
        display: flex;
    }

    .infinite-wrap :global(canvas) {
        width: 100% !important;
        height: 100% !important;
        max-width: none !important;
        aspect-ratio: unset !important;
    }
</style>
