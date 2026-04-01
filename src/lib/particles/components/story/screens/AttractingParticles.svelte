<script lang="ts">
    import AttractionTableComponent from '$lib/particles/components/AttractionTableComponent.svelte';
    import { getZeroedAttractionTable, type AttractionTable } from '$lib/particles/attraction';
    import { getNewCells, largeCenterCellsInPlace } from '$lib/particles/engine/cells';
    import { getUniverseById } from '$lib/particles/universe';
    import type Simulation from '$lib/particles/components/Simulation.svelte';

    export let simulationComponent: Simulation;

    const preset = getUniverseById('1_colors_repulsion');
    let attractionTable: AttractionTable = getZeroedAttractionTable();
    attractionTable.white.white = -1;

    let forceValue: -1 | 0 | 1 = -1;

    const worldSize = {
        x: preset.maxAttractionRadius * preset.horizontalResolution,
        y: preset.maxAttractionRadius * preset.verticalResolution
    };

    const setForce = (val: -1 | 0 | 1) => {
        forceValue = val;
        attractionTable = getZeroedAttractionTable();
        attractionTable.white.white = val;
        startScreen();
    };

    const startScreen = () => {
        const cells = getNewCells(worldSize, preset.nbParticles, preset.colorWeights);
        largeCenterCellsInPlace(cells, worldSize);

        simulationComponent?.startSim({
            cells,
            worldSize,
            maxAttractionRadius: preset.maxAttractionRadius,
            attractionTable,
            friction: preset.friction
        });
    };

    $: if (simulationComponent) startScreen();
</script>

<div class="screen">
    <h2>Forces</h2>
    <!-- TODO: Write text about introducing forces.
         Points to address:
         - The core mechanic: particles can attract or repel each other
         - White→White = -1 means repulsion: particles push away
         - White→White = 0 means no force: particles ignore each other
         - White→White = +1 means attraction: particles pull together
         - Try each value and observe the dramatically different outcomes
         - Same particles, same world, only the sign of the force changes
    -->
    <p>[Placeholder: introducing self-attraction/repulsion, effect of -1, 0, +1]</p>

    <div class="controls">
        <div class="force-btns">
            <span class="force-label">White → White</span>
            <button
                class="force-btn"
                class:active={forceValue === -1}
                on:click={() => setForce(-1)}
            >
                -1 repulse
            </button>
            <button class="force-btn" class:active={forceValue === 0} on:click={() => setForce(0)}>
                0 neutral
            </button>
            <button class="force-btn" class:active={forceValue === 1} on:click={() => setForce(1)}>
                +1 attract
            </button>
        </div>

        <div class="control-section">
            <h3>Attraction Table</h3>
            <AttractionTableComponent {attractionTable} readonly />
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

    .force-btns {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-wrap: wrap;
    }

    .force-label {
        font-size: 0.8rem;
        color: #90a4ae;
        margin-right: 4px;
    }

    .force-btn {
        background: #1a2327;
        border: 1px solid #37474f;
        color: #cfd8dc;
        border-radius: 6px;
        padding: 6px 12px;
        font-size: 0.82rem;
        cursor: pointer;
        transition: background 0.13s, border-color 0.13s;
    }

    .force-btn:hover {
        background: #2e3c43;
        border-color: #546e7a;
        color: #eceff1;
    }

    .force-btn.active {
        border-color: #c3e88d;
        color: #c3e88d;
        background: #1e2e1a;
    }
</style>
