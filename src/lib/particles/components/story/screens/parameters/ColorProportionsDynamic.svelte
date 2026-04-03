<script lang="ts">
    import { getZeroedAttractionTable } from '$lib/particles/attraction';
    import {
        COLORS,
        generateSimulationParams,
        PARTICLE_COLORS,
        type SimulationConfig
    } from '$lib/particles/engine';
    import type { ColorProportions } from '$lib/particles/engine';
    import type Simulation from '$lib/particles/components/Simulation.svelte';

    export let simulationComponent: Simulation;

    const attractionTable = getZeroedAttractionTable();
    attractionTable.white.white = 2;
    attractionTable.white.red = 2;
    attractionTable.white.green = 1;
    attractionTable.white.blue = 0;
    attractionTable.red.white = -1;
    attractionTable.red.red = 1;
    attractionTable.red.green = 1;
    attractionTable.red.blue = -1;
    attractionTable.green.white = 2;
    attractionTable.green.red = -1;
    attractionTable.green.green = 1;
    attractionTable.green.blue = 2;
    attractionTable.blue.white = 0;
    attractionTable.blue.red = 0;
    attractionTable.blue.green = 2;
    attractionTable.blue.blue = 1;

    const weightPresets: Record<string, ColorProportions> = {
        equal: { white: 500, red: 500, green: 500, blue: 500 },
        no_white: { white: 0, red: 500, green: 500, blue: 500 },
        no_red: { white: 500, red: 0, green: 500, blue: 500 },
        no_green: { white: 500, red: 500, green: 0, blue: 500 },
        no_blue: { white: 500, red: 500, green: 500, blue: 0 }
    };
    let currentPreset: string | undefined = 'equal';
    let colorWeights: ColorProportions = weightPresets[currentPreset];

    const setProportions = (preset: string) => {
        if (!Object.keys(weightPresets).includes(preset)) {
            throw new Error('Unknown preset name ' + preset);
        }
        currentPreset = preset;
        colorWeights = weightPresets[currentPreset];
        startScreen();
    };

    const onWeightsChange = () => {
        startScreen();
    };

    const startScreen = () => {
        const config: SimulationConfig = {
            horizontalResolution: 3,
            verticalResolution: 2,
            initialSpreadConfig: 'uniform',
            colorWeights,
            maxAttractionRadius: 32,
            attractionTable: attractionTable,
            nbParticles: 100,
            friction: 0.5
        };

        const simulationParams = generateSimulationParams(config);
        simulationComponent?.startSim(simulationParams);
    };

    $: if (simulationComponent) startScreen();
</script>

<div class="screen">
    <h2>Changing species proportions</h2>
    <!-- TODO: Write text about color proportions and 4 colors.
         Points to address:
         - Up to 4 species can coexist in the simulation
         - Color weights control how many particles of each color are created
         - Set a weight to 0 to remove a species entirely
         - More species = more possible interactions = more complex emergent behavior
         - 4 colors x 4 colors = 16 rules in the attraction table
         - Try different proportions and table values to see what emerges
    -->
    <p>
        For now our 4 species all have the same number of individuals. We can see that the universe
        quickly converges into a cyclic structure of four layers: a Red pack being chased by a
        White-Green-Blue core.
    </p>
    <p>
        Now, use the buttons to observe what happens when you remove one specie all together. Can
        you predict what will happen when you remove White?
    </p>

    <div class="controls">
        <div class="control-section">
            <div class="btn-group">
                <button
                    class="screen-btn"
                    class:active={currentPreset === 'equal'}
                    on:click={() => setProportions('equal')}
                >
                    Equal
                </button>
                <button
                    class="screen-btn"
                    class:active={currentPreset === 'no_white'}
                    on:click={() => setProportions('no_white')}
                >
                    No White
                </button>
                <button
                    class="screen-btn"
                    class:active={currentPreset === 'no_red'}
                    on:click={() => setProportions('no_red')}
                >
                    No Red
                </button>
                <button
                    class="screen-btn"
                    class:active={currentPreset === 'no_green'}
                    on:click={() => setProportions('no_green')}
                >
                    No Green
                </button>
                <button
                    class="screen-btn"
                    class:active={currentPreset === 'no_blue'}
                    on:click={() => setProportions('no_blue')}
                >
                    No Blue
                </button>
            </div>
        </div>
    </div>

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
                            on:change={onWeightsChange}
                            min="0"
                            max="1000"
                            step="1"
                        />
                        <span class="dim">{colorWeights[c]}</span>
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>
