<script lang="ts">
    import AttractionTableComponent from '$lib/particles/components/AttractionTableComponent.svelte';
    import { getZeroedAttractionTable, type AttractionTable } from '$lib/particles/attraction';
    import {
        getNewCells,
        largeCenterCellsInPlace,
        rainbowCellsInPlace
    } from '$lib/particles/engine/cells';
    import type { Cell } from '$lib/particles/engine';
    import type Simulation from '$lib/particles/components/Simulation.svelte';

    export let simulationComponent: Simulation;

    let attractionTable: AttractionTable = getZeroedAttractionTable();
    attractionTable.red.red = 1;
    attractionTable.white.white = -1;

    const maxAttractionRadius = 32;
    const horizontalResolution = 3;
    const verticalResolution = 2;
    const worldSize = {
        x: maxAttractionRadius * horizontalResolution,
        y: maxAttractionRadius * verticalResolution
    };
    const colorWeights = { white: 500, red: 500, green: 0, blue: 0 };

    const startSim = (cells: Cell[]) => {
        simulationComponent?.startSim({
            cells,
            worldSize,
            maxAttractionRadius,
            attractionTable,
            friction: 0.5
        });
    };

    const uniformSpread = () => {
        startSim(getNewCells(worldSize, 50, colorWeights));
    };

    const centerSpread = () => {
        const cells = getNewCells(worldSize, 50, colorWeights);
        largeCenterCellsInPlace(cells, worldSize);
        startSim(cells);
    };

    const rainbowSpread = () => {
        const cells = getNewCells(worldSize, 50, colorWeights);
        rainbowCellsInPlace(cells, worldSize);
        startSim(cells);
    };

    const onUpdateTable = (newTable: AttractionTable) => {
        attractionTable = newTable;
        simulationComponent?.updateAttractionTable(newTable);
    };

    const startScreen = () => {
        centerSpread();
    };

    $: if (simulationComponent) startScreen();
</script>

<div class="screen">
    <h2>Experiment</h2>
    <!-- TODO: Write text about experimenting with the attraction table.
         Points to address:
         - Now the attraction table is fully interactive
         - Click the colored cells to cycle values, or use +/- buttons
         - Use Randomize, Zero, Mutate buttons to quickly change the whole table
         - Restart buttons reset particle positions without changing the rules
         - This is the core of particle life: explore what emerges from simple rules
    -->
    <p>[Placeholder: the table is now interactive, experiment freely]</p>

    <div class="controls">
        <div class="control-section">
            <h3>Attraction Table</h3>
            <AttractionTableComponent {attractionTable} {onUpdateTable} />
        </div>

        <div class="spread-btns">
            <button class="restart-btn" on:click={uniformSpread}>↺ Uniform spread</button>
            <button class="restart-btn" on:click={centerSpread}>◎ Centered circle</button>
            <button class="restart-btn" on:click={rainbowSpread}>≋ Rainbow</button>
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

    h3 {
        font-size: 0.85rem;
        color: #b0bec5;
        margin: 0 0 8px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.06em;
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

    .control-section {
        background: #263238;
        border: 1px solid #37474f;
        border-radius: 8px;
        padding: 14px 16px;
    }

    .spread-btns {
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
    }

    .restart-btn {
        background: #1a2327;
        border: 1px solid #37474f;
        color: #cfd8dc;
        border-radius: 6px;
        padding: 6px 11px;
        font-size: 0.82rem;
        cursor: pointer;
        transition: background 0.13s, border-color 0.13s;
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .restart-btn:hover {
        background: #2e3c43;
        border-color: #546e7a;
        color: #eceff1;
    }
</style>
