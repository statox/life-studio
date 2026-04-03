<script lang="ts">
    import { getZeroedAttractionTable } from '$lib/particles/attraction';
    import type Simulation from '$lib/particles/components/Simulation.svelte';
    import { generateSimulationParams, type SimulationConfig } from '$lib/particles/engine';

    export let simulationComponent: Simulation;

    let attractionTable = getZeroedAttractionTable();
    attractionTable.white.white = 0;

    let forceValue: -1 | 0 | 1 = 0;
    let horizontalResolution = 6;
    let verticalResolution = 4;
    let nbParticles = 500;

    const setForce = (val: -1 | 0 | 1) => {
        forceValue = val;
        attractionTable = getZeroedAttractionTable();
        attractionTable.white.white = val;
        if (val === -1) {
            horizontalResolution = 12;
            verticalResolution = 8;
            nbParticles = 100;
        } else {
            horizontalResolution = 6;
            verticalResolution = 4;
            nbParticles = 500;
        }
        startScreen();
    };

    const startScreen = () => {
        const config: SimulationConfig = {
            horizontalResolution,
            verticalResolution,
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
            friction: 0.77
        };

        const simulationParams = generateSimulationParams(config);
        simulationComponent?.startSim(simulationParams);
    };

    $: if (simulationComponent) startScreen();
</script>

<div class="screen">
    <h2>Forces</h2>
    <p>
        If we zoom in on the center of the previous universe we get something like this. All
        particles start tighly packed and slowy move away from each other.
    </p>
    <div class="controls">
        <div class="btn-group">
            <button class="screen-btn" class:active={forceValue === 0} on:click={() => setForce(0)}>
                neutral
            </button>
        </div>
    </div>
    <p>
        That shows their default behavior: If they are too close from a neighbor they get repulsed
        by it and try to move away from it. If no neighbor is close enough they just rest and do
        nothing.
    </p>
    <p>But they can also attract each other</p>
    <div class="controls">
        <div class="btn-group">
            <button class="screen-btn" class:active={forceValue === 1} on:click={() => setForce(1)}>
                attract
            </button>
        </div>
    </div>
    <p>
        In this case their natural repulsion force has to fight a new attraction force: When a
        neighbor is close enough, the particle is now attracted by it. They pack as closely as
        possible from each other and their natural repulsion force push them into clusters.
    </p>
    <p>
        Finally, they can also repulse each other and in this case clusters form because groups are
        repulsed against each other.
    </p>
    <div class="controls">
        <div class="btn-group">
            <button
                class="screen-btn"
                class:active={forceValue === -1}
                on:click={() => setForce(-1)}
            >
                repulse
            </button>
        </div>
    </div>
</div>
