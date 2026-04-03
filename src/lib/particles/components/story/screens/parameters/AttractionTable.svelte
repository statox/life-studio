<script lang="ts">
    import AttractionTableComponent from '$lib/particles/components/AttractionTableComponent.svelte';
    import { getZeroedAttractionTable, type AttractionTable } from '$lib/particles/attraction';
    import type Simulation from '$lib/particles/components/Simulation.svelte';
    import { generateSimulationParams, type SimulationConfig } from '$lib/particles/engine';

    export let simulationComponent: Simulation;

    type Preset = { label: string; table: { ww: number; wr: number; rw: number; rr: number } };

    const presets: Preset[] = [
        { label: 'White repulses, Red attracts', table: { ww: -1, wr: 0, rw: 0, rr: 1 } },
        { label: 'Both attract themselves', table: { ww: 1, wr: 0, rw: 0, rr: 1 } },
        { label: 'White repulses + attracts Red', table: { ww: -1, wr: 1, rw: 0, rr: 1 } }
    ];

    let activePreset = 0;

    const buildTable = (p: Preset['table']): AttractionTable => {
        const t = getZeroedAttractionTable();
        t.white.white = p.ww;
        t.white.red = p.wr;
        t.red.white = p.rw;
        t.red.red = p.rr;
        return t;
    };

    let attractionTable: AttractionTable = buildTable(presets[0].table);

    const selectPreset = (idx: number) => {
        activePreset = idx;
        attractionTable = buildTable(presets[idx].table);
        startScreen();
    };

    const startScreen = () => {
        const config: SimulationConfig = {
            horizontalResolution: 3,
            verticalResolution: 2,
            initialSpreadConfig: 'center',
            colorWeights: {
                white: 1,
                red: 1,
                green: 0,
                blue: 0
            },
            maxAttractionRadius: 32,
            attractionTable: attractionTable,
            nbParticles: 500,
            friction: 0.77
        };

        const simulationParams = generateSimulationParams(config);
        simulationComponent?.startSim(simulationParams);
    };

    $: if (simulationComponent) startScreen();
</script>

<div class="screen">
    <h2>The Attraction Table</h2>
    <!-- TODO: Write text about the attraction table with two colors.
         Points to address:
         - Now we have two species: white and red
         - The attraction table defines rules for every pair
         - Try each preset to see how different rules create different behaviors
         - Cross-species interactions (white→red) add another dimension
    -->
    <p>
        The attraction table is our way to summarize the forces involved in our universe. This is a
        matrix showing how each row color reacts when it gets close to another particles in of the
        column color.
    </p>

    <p>
        This is the most important setting we have because these conflicting forces are at the heart
        of any form of motion in our universe. Each force can take 1 of 5 possible values from <code
            >-2</code
        >
        (Strong repulsion) to <code>2</code> (Strong attraction). <code>0</code> makes the particles
        not interact with each other. With only two species we already have 5⁴ = 625 possible different
        attraction tables.
    </p>

    <div class="controls">
        <div class="preset-btns">
            {#each presets as p, idx}
                <button
                    class="screen-btn"
                    class:active={activePreset === idx}
                    on:click={() => selectPreset(idx)}
                >
                    {p.label}
                </button>
            {/each}
        </div>

        <div class="control-section attraction-table-container">
            <h3>Attraction Table</h3>
            <AttractionTableComponent {attractionTable} readonly hiddenColors={['green', 'blue']} />
        </div>
    </div>
</div>

<style>
    .preset-btns {
        display: flex;
        flex-direction: column;
        gap: 6px;
    }

    .preset-btns :global(.screen-btn) {
        text-align: left;
    }

    .attraction-table-container {
        max-width: 400px;
    }
</style>
