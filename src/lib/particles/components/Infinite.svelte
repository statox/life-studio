<script lang="ts">
    import { onDestroy, onMount } from 'svelte';

    import Simulation from '$lib/particles/components/Simulation.svelte';
    import { getRandomAttractionTable } from '$lib/particles/attraction';
    import { getNewCells, largeCenterCellsInPlace } from '$lib/particles/engine/cells';
    import type { SimulationParams } from '../engine';

    let simulationComponent: Simulation | undefined = $state();

    const MAX_ATTRACTION_RADIUS = 32;
    const BASE_ROWS = 20;
    const ROWS_OPTIONS = [7, 20, 60];
    let rowOptionsIndex = 2;
    let updatesCounter = 0;
    let simulationParams: SimulationParams | undefined;
    let updateTimer: ReturnType<typeof setTimeout> | undefined;

    const updatePage = () => {
        if (!simulationParams) {
            return;
        }

        updateAttractionTable();

        if (updatesCounter % 5 === 0) {
            updateSimulationParams();
        }
        updatesCounter++;

        // Iterate faster on the first rotation
        let timeout = 5 * 1000;
        if (updatesCounter >= 15) {
            timeout = 1000 * (8 + Math.random() * 8);
        }
        updateTimer = setTimeout(updatePage, timeout);
    };

    const updateAttractionTable = () => {
        if (!simulationParams) {
            return;
        }

        simulationParams.attractionTable = getRandomAttractionTable();
        simulationComponent?.updateAttractionTable(simulationParams.attractionTable);
    };

    const updateSimulationParams = () => {
        rowOptionsIndex = (rowOptionsIndex + 1) % ROWS_OPTIONS.length;
        const rows = ROWS_OPTIONS[rowOptionsIndex];
        const cols = Math.round(rows * (window.innerWidth / window.innerHeight));
        const worldSize = { x: MAX_ATTRACTION_RADIUS * cols, y: MAX_ATTRACTION_RADIUS * rows };
        const isLarge = rows === 60;
        const nbParticles = isLarge ? 8000 : 4000;
        const cells = getNewCells(worldSize, nbParticles, {
            white: 500,
            red: 500,
            green: 500,
            blue: 500
        });
        if (isLarge || Math.random() < 0.5) {
            largeCenterCellsInPlace(cells, worldSize);
        }
        simulationParams = {
            cells,
            worldSize,
            maxAttractionRadius: MAX_ATTRACTION_RADIUS,
            attractionTable: getRandomAttractionTable(),
            friction: 0.1 + Math.random() * 0.4
        };
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

        updateTimer = setTimeout(updatePage, 1);
    });

    onDestroy(() => {
        clearTimeout(updateTimer);
    });

    interface Props {
        disableStoryButton?: boolean;
        onStoryClick?: () => void;
    }

    let { disableStoryButton = false, onStoryClick }: Props = $props();


</script>

<div class="infinite-wrap">
    <Simulation bind:this={simulationComponent} fillContainer hideTimeline={true} />
</div>

{#if !disableStoryButton}
    <button class="story-btn" onclick={onStoryClick}>Read the story</button>
{/if}

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

    /* ── Story button ─────────────────────── */
    .story-btn {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
        background: #1a2327dd;
        border: 1px solid #546e7a;
        border-radius: 8px;
        color: #c3e88d;
        font-size: 0.95rem;
        font-weight: 600;
        letter-spacing: 0.04em;
        padding: 10px 24px;
        cursor: pointer;
        backdrop-filter: blur(6px);
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.5);
        transition:
            background 0.15s,
            border-color 0.15s,
            color 0.15s;
    }

    .story-btn:hover {
        background: #2e3c43dd;
        border-color: #c3e88d;
        color: #eceff1;
    }
</style>
