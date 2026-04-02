<script lang="ts">
    import AttractionTableComponent from '$lib/particles/components/AttractionTableComponent.svelte';
    import { getZeroedAttractionTable, type AttractionTable } from '$lib/particles/attraction';
    import { generateSimulationParams, type SimulationConfig } from '$lib/particles/engine';
    import type Simulation from '$lib/particles/components/Simulation.svelte';
    import type { InitialConfig } from '$lib/particles/universe';

    export let simulationComponent: Simulation;

    let attractionTable: AttractionTable = getZeroedAttractionTable();
    attractionTable.red.red = 1;
    attractionTable.white.white = -1;

    let initialSpreadConfig: InitialConfig = 'uniform';
    const uniformSpread = () => {
        initialSpreadConfig = 'uniform';
        startScreen();
    };

    const centerSpread = () => {
        initialSpreadConfig = 'center';
        startScreen();
    };

    const rainbowSpread = () => {
        initialSpreadConfig = 'rainbow';
        startScreen();
    };

    const onUpdateTable = (newTable: AttractionTable) => {
        attractionTable = newTable;
        simulationComponent?.updateAttractionTable(newTable);
    };

    const startScreen = () => {
        const config: SimulationConfig = {
            horizontalResolution: 3,
            verticalResolution: 2,
            initialSpreadConfig: initialSpreadConfig,
            colorWeights: {
                white: 1,
                red: 1,
                green: 0,
                blue: 0
            },
            maxAttractionRadius: 32,
            attractionTable: attractionTable,
            nbParticles: 500,
            friction: 0.5
        };

        const simulationParams = generateSimulationParams(config);
        simulationComponent?.startSim(simulationParams);
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
