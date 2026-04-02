<script lang="ts">
    import { getZeroedAttractionTable } from '$lib/particles/attraction';
    import type Simulation from '$lib/particles/components/Simulation.svelte';
    import { generateSimulationParams, type SimulationConfig } from '$lib/particles/engine';

    export let simulationComponent: Simulation;

    const attractionTable = getZeroedAttractionTable();
    attractionTable.white.white = 1;

    const frictionPresets = [0.8, 0.42, 0.06, 0.0];
    let friction = frictionPresets[0];

    const startScreen = () => {
        const config: SimulationConfig = {
            horizontalResolution: 3,
            verticalResolution: 2,
            initialSpreadConfig: 'center',
            colorWeights: {
                white: 1,
                red: 0,
                green: 0,
                blue: 0
            },
            maxAttractionRadius: 32,
            attractionTable: attractionTable,
            nbParticles: 11,
            friction: friction
        };

        const simulationParams = generateSimulationParams(config);
        simulationComponent?.startSim(simulationParams);
    };

    const setFriction = (val: number) => {
        friction = val;
        startScreen();
    };

    $: if (simulationComponent) startScreen();
</script>

<div class="screen">
    <h2>Friction</h2>
    <!-- TODO: Write text about friction.
         Points to address:
         - Friction controls how quickly particles slow down
         - Low friction: particles overshoot, oscillate, bounce around
         - High friction: particles move slowly, converge smoothly
         - It's a velocity decay multiplier applied every frame
         - Try the slider and restart to see the difference
    -->
    <p>[Placeholder: explaining friction as velocity decay, low vs high friction behavior]</p>

    <div class="controls">
        <div class="btn-group">
            <span class="btn-group-label">Friction</span>
            {#each frictionPresets as val}
                <button
                    class="screen-btn"
                    class:active={friction === val}
                    on:click={() => setFriction(val)}
                >
                    {val}
                </button>
            {/each}
        </div>

        <div class="slider-row">
            <input
                type="range"
                bind:value={friction}
                on:change={startScreen}
                min="0"
                max="1"
                step="0.01"
            />
            <span class="slider-value">{friction.toFixed(2)}</span>
        </div>
    </div>
</div>
