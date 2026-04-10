<script lang="ts">
    import { onDestroy, onMount } from 'svelte';

    import Simulation from '$lib/particles/components/Simulation.svelte';
    import { getRandomAttractionTable } from '$lib/particles/attraction';
    import { base } from '$app/paths';
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

    let showInfo = $state(true);
</script>

<div class="infinite-wrap">
    <Simulation bind:this={simulationComponent} fillContainer hideTimeline={true} />
</div>

{#if showInfo}
    <!-- svelte-ignore a11y_click_events_have_key_events -->
    <!-- svelte-ignore a11y_no_static_element_interactions -->
    <div class="overlay" onclick={() => (showInfo = false)}>
        <div class="info-frame" onclick={(e) => e.stopPropagation()}>
            <button class="close-btn" onclick={() => (showInfo = false)}>✕</button>
            <div class="info-content">
                <p>
                    This page generates new universes every few seconds. Try to count how many
                    different patterns you can recognize.
                </p>
                <p>
                    Once you are done <a href="{base}/particles-life/story"
                        >read the interactive story →</a
                    >
                </p>
                <br />
                <p style="font-size: small">
                    <em
                        >You can reopen this window by clicking the button at the bottom of the
                        screen</em
                    >
                </p>
            </div>
        </div>
    </div>
{/if}

<button class="reopen-btn" class:hidden={showInfo} onclick={() => (showInfo = true)}>🛈</button>

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

    /* ── Info overlay ─────────────────────── */
    .overlay {
        position: fixed;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10;
        background: rgba(0, 0, 0, 0.45);
        backdrop-filter: blur(3px);
    }

    .info-frame {
        position: relative;
        background: #1a2327ee;
        border: 1px solid #37474f;
        border-radius: 10px;
        padding: 32px 36px;
        max-width: 480px;
        width: calc(100% - 40px);
        color: #cfd8dc;
        font-size: 0.95rem;
        line-height: 1.6;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
    }

    .close-btn {
        position: absolute;
        top: 10px;
        right: 12px;
        background: none;
        border: none;
        color: #546e7a;
        font-size: 1rem;
        cursor: pointer;
        line-height: 1;
        padding: 4px 6px;
    }

    .close-btn:hover {
        color: #cfd8dc;
    }

    .info-content a {
        display: inline-block;
        margin-top: 16px;
        color: #c3e88d;
        text-decoration: none;
        font-size: 0.9rem;
    }

    .info-content a:hover {
        text-decoration: underline;
    }

    /* ── Reopen button ────────────────────── */
    .reopen-btn {
        position: fixed;
        bottom: 14px;
        right: 14px;
        z-index: 10;
        background: #1a2327cc;
        border: 1px solid #37474f;
        border-radius: 6px;
        color: #cfd8dc;
        font-size: 1.1rem;
        padding: 4px 8px;
        cursor: pointer;
        line-height: 1;
        opacity: 0.7;
        transition: opacity 0.15s;
    }

    .reopen-btn:hover {
        opacity: 1;
    }

    .reopen-btn.hidden {
        display: none;
    }
</style>
