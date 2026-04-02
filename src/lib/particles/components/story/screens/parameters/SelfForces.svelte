<script lang="ts">
    import { getZeroedAttractionTable } from '$lib/particles/attraction';
    import type Simulation from '$lib/particles/components/Simulation.svelte';
    import { generateSimulationParams, type SimulationConfig } from '$lib/particles/engine';

    export let simulationComponent: Simulation;

    let attractionTable = getZeroedAttractionTable();
    attractionTable.white.white = 0;

    let forceValue: -1 | 0 | 1 = 0;

    const setForce = (val: -1 | 0 | 1) => {
        forceValue = val;
        attractionTable = getZeroedAttractionTable();
        attractionTable.white.white = val;
        startScreen();
    };

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
            nbParticles: 500,
            friction: 0.77
        };

        const simulationParams = generateSimulationParams(config);
        simulationComponent?.startSim(simulationParams);
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
        <div class="btn-group">
            <span class="btn-group-label">White → White</span>
            <button
                class="screen-btn"
                class:active={forceValue === -1}
                on:click={() => setForce(-1)}
            >
                -1 repulse
            </button>
            <button class="screen-btn" class:active={forceValue === 0} on:click={() => setForce(0)}>
                0 neutral
            </button>
            <button class="screen-btn" class:active={forceValue === 1} on:click={() => setForce(1)}>
                +1 attract
            </button>
        </div>
    </div>
</div>

