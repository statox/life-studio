<script lang="ts">
    import { getZeroedAttractionTable } from '$lib/particles/attraction';
    import type Simulation from '$lib/particles/components/Simulation.svelte';
    import { generateSimulationParams, type SimulationConfig } from '$lib/particles/engine';

    export let simulationComponent: Simulation;

    const attractionTable = getZeroedAttractionTable();
    attractionTable.white.white = 1;

    const frictionPresets = [0.8, 0.25, 0.06, 0.0];
    let friction = 0.5;
    let nbParticles = 0; // Start with an empty screen

    const startScreen = () => {
        const config: SimulationConfig = {
            horizontalResolution: 6,
            verticalResolution: 4,
            initialSpreadConfig: 'center',
            colorWeights: {
                white: 1,
                red: 0,
                green: 0,
                blue: 0
            },
            maxAttractionRadius: 32,
            attractionTable: attractionTable,
            nbParticles,
            friction: friction ?? 0.5
        };

        const simulationParams = generateSimulationParams(config);
        simulationComponent?.startSim(simulationParams);
    };

    const setFriction = (val: number) => {
        friction = val;
        nbParticles = 11;
        startScreen();
    };

    $: if (simulationComponent) startScreen();
</script>

<div class="screen">
    <h2>Friction</h2>
    <p>
        Another force governing our particles is friction. Friction controls how quickly particles
        slow down. Picture trying to roll a marble on a table covered in soda or in mud: You can
        push the marble but it will not roll too far. The stickier the universe, the higher the
        friction, the quicker the particles slow down. Here all the particles are attracted by each
        other.
    </p>

    <p>
        At
        <button
            class="screen-btn"
            class:active={friction === frictionPresets[0]}
            on:click={() => setFriction(frictionPresets[0])}
        >
            {frictionPresets[0]}
        </button>
        the friction is high and particles quickly find an equilibrium.
    </p>

    <p>
        At
        <button
            class="screen-btn"
            class:active={friction === frictionPresets[1]}
            on:click={() => setFriction(frictionPresets[1])}
        >
            {frictionPresets[1]}
        </button>
        the friction is lower. The particles wiggle a bit longer before finding their final position.
    </p>

    <p>
        At
        <button
            class="screen-btn"
            class:active={friction === frictionPresets[2]}
            on:click={() => setFriction(frictionPresets[2])}
        >
            {frictionPresets[2]}
        </button>
        we crossed a threshold where friction is no longer keeping the attraction forces in check. The
        particles keep bouncing into each other in a structure which could start looking like something
        organic.
    </p>

    <p>
        Finally, when the friction gets to
        <button
            class="screen-btn"
            class:active={friction === frictionPresets[3]}
            on:click={() => setFriction(frictionPresets[3])}
        >
            {frictionPresets[3]}
        </button>
        the particles never slow down and their motion is bound only by the maximal velocity of the universe.
        Chaos is created.
    </p>

    <p>
        Using the slider, can you find the lowest friction which stabilizes the universe in less
        than 10 seconds?
    </p>
    <div class="controls">
        <div class="control-section">
            <div class="btn-group">
                {#each frictionPresets as preset}
                    <button
                        class="screen-btn"
                        class:active={friction === preset}
                        on:click={() => setFriction(preset)}
                    >
                        {preset}
                    </button>
                {/each}
            </div>
        </div>
        <div class="slider-row">
            <label for="friction-slider">Friction:</label>
            <input
                id="friction-slider"
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
