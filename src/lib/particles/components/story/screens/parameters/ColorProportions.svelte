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

    const weightPresets: Record<string, ColorProportions> = {
        all_white: { white: 500, red: 0, green: 0, blue: 0 },
        equal: { white: 500, red: 500, green: 500, blue: 500 },
        no_white: { white: 0, red: 500, green: 500, blue: 500 },
        no_red: { white: 500, red: 0, green: 500, blue: 500 },
        no_green: { white: 500, red: 500, green: 0, blue: 500 },
        no_blue: { white: 500, red: 500, green: 500, blue: 0 }
    };
    let currentPreset: string | undefined = 'all_white';
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
            horizontalResolution: 30,
            verticalResolution: 20,
            initialSpreadConfig: 'rainbow',
            colorWeights,
            maxAttractionRadius: 32,
            attractionTable: attractionTable,
            nbParticles: 1000,
            friction: 0.5
        };

        const simulationParams = generateSimulationParams(config);
        simulationComponent?.startSim(simulationParams);
    };

    $: if (simulationComponent) startScreen();
</script>

<div class="screen">
    <h2>Species</h2>
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
        A world is always more beautiful when it has multiples colors, our universes are no
        exception. Let's give White some friends: Red, Green and Blue

        <button
            class="screen-btn"
            class:active={currentPreset === 'equal'}
            on:click={() => setProportions('equal')}
        >
            Equal
        </button>
    </p>

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

    <p>
        We can control in which proportion we want to introduce each species in our universes. The
        total number of particles doesn't change but some species get more common than others.
    </p>
    <p>Let's see the impact of these uneven numbers in a universe.</p>
</div>
