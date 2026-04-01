<script lang="ts">
    import AttractionTableComponent from '$lib/particles/components/AttractionTableComponent.svelte';
    import { getZeroedAttractionTable, type AttractionTable } from '$lib/particles/attraction';
    import { getNewCells, largeCenterCellsInPlace } from '$lib/particles/engine/cells';
    import { COLORS, PARTICLE_COLORS } from '$lib/particles/engine';
    import type { ColorProportions } from '$lib/particles/engine/cells';
    import type Simulation from '$lib/particles/components/Simulation.svelte';

    export let simulationComponent: Simulation;

    const attractionTable: AttractionTable = getZeroedAttractionTable();
    attractionTable.red.red = 1;
    attractionTable.white.white = -1;

    const maxAttractionRadius = 32;
    const horizontalResolution = 3;
    const verticalResolution = 2;
    const worldSize = {
        x: maxAttractionRadius * horizontalResolution,
        y: maxAttractionRadius * verticalResolution
    };
    let colorWeights: ColorProportions = { white: 500, red: 500, green: 0, blue: 0 };

    const startScreen = () => {
        const cells = getNewCells(worldSize, 50, colorWeights);
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
    <h2>Colors</h2>
    <!-- TODO: Write text about introducing species/colors.
         Points to address:
         - Particles can have different colors (species)
         - Each pair of colors can have its own rule
         - Here: red attracts red, white repulses white
         - Red forms a cluster while white spreads out
         - Same simple rules, but now applied per-species
    -->
    <p>[Placeholder: introducing species/colors, different rules per pair]</p>

    <div class="controls">
        <div class="control-section">
            <h3>Color Proportions</h3>
            <div class="proportion-list">
                {#each COLORS as c}
                    <div class="field">
                        <span class="pdot" style="background:{PARTICLE_COLORS[c]}" />
                        <input
                            type="range"
                            bind:value={colorWeights[c]}
                            on:change={startScreen}
                            min="0"
                            max="1000"
                            step="1"
                        />
                        <span class="dim">{colorWeights[c]}</span>
                    </div>
                {/each}
            </div>
        </div>

        <button class="restart-btn" on:click={startScreen}>◎ Centered circle</button>

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

    .field {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 7px;
    }

    .field:last-child {
        margin-bottom: 0;
    }

    .field input[type='range'] {
        flex: 1;
        accent-color: #c3e88d;
    }

    .pdot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        flex-shrink: 0;
    }

    .dim {
        font-size: 0.7rem;
        color: #aeafb0;
        min-width: 28px;
        text-align: right;
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
