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
        <div class="friction-btns">
            <span class="friction-label">Friction</span>
            {#each frictionPresets as val}
                <button
                    class="friction-btn"
                    class:active={friction === val}
                    on:click={() => setFriction(val)}
                >
                    {val}
                </button>
            {/each}
        </div>

        <div class="friction-slider">
            <input
                type="range"
                bind:value={friction}
                on:change={startScreen}
                min="0"
                max="1"
                step="0.01"
            />
            <span class="friction-value">{friction.toFixed(2)}</span>
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

    .friction-btns {
        display: flex;
        align-items: center;
        gap: 6px;
        flex-wrap: wrap;
    }

    .friction-label {
        font-size: 0.8rem;
        color: #90a4ae;
        margin-right: 4px;
    }

    .friction-btn {
        background: #1a2327;
        border: 1px solid #37474f;
        color: #cfd8dc;
        border-radius: 6px;
        padding: 6px 12px;
        font-size: 0.82rem;
        cursor: pointer;
        transition: background 0.13s, border-color 0.13s;
    }

    .friction-btn:hover {
        background: #2e3c43;
        border-color: #546e7a;
        color: #eceff1;
    }

    .friction-btn.active {
        border-color: #c3e88d;
        color: #c3e88d;
        background: #1e2e1a;
    }

    .friction-slider {
        display: flex;
        align-items: center;
        gap: 12px;
    }

    .friction-slider input[type='range'] {
        flex: 1;
        accent-color: #c3e88d;
    }

    .friction-value {
        font-size: 0.82rem;
        color: #b0bec5;
        min-width: 32px;
        text-align: right;
    }
</style>
