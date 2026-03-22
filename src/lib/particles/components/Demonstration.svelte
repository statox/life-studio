<script lang="ts">
    import { onMount } from 'svelte';

    import AttractionTableComponent from '$lib/particles/components/AttractionTableComponent.svelte';
    import type { AttractionTable } from '$lib/particles/attraction';
    import { COLORS, PARTICLE_COLORS } from '$lib/particles/engine';
    import {
        getNewCells,
        largeCenterCellsInPlace,
        rainbowCellsInPlace
    } from '$lib/particles/engine/cells';
    import type { ColorProportions } from '$lib/particles/engine/cells';
    import type { Cell } from '$lib/particles/engine';
    import Simulation from './Simulation.svelte';
    import {
        getAllDemoUniverses,
        getAllUniverses,
        type StoredUniverse
    } from '$lib/particles/universe';

    let simulationComponent: Simulation;

    const universes: StoredUniverse[] = getAllUniverses();
    const demoUniverses: StoredUniverse[] = getAllDemoUniverses();

    let cells: Cell[] = [];
    let attractionTable: AttractionTable = universes[0].attractionTable;
    let colorWeights: ColorProportions = universes[0].colorWeights;
    let nbParticles = universes[0].nbParticles;
    let maxAttractionRadius = universes[0].maxAttractionRadius;

    const worldSize = { x: 0, y: 0 };

    const startSim = () => {
        simulationComponent?.startSim({ cells, worldSize, maxAttractionRadius, attractionTable });
    };

    const loadUniverse = (u: StoredUniverse) => {
        attractionTable = u.attractionTable;
        colorWeights = u.colorWeights;
        nbParticles = u.nbParticles;
        maxAttractionRadius = u.maxAttractionRadius;
        worldSize.x = u.maxAttractionRadius * u.horizontalResolution;
        worldSize.y = u.maxAttractionRadius * u.verticalResolution;
        cells = getNewCells(worldSize, u.nbParticles, u.colorWeights);
        if (u.preferredInitialConfig === 'center') largeCenterCellsInPlace(cells, worldSize);
        if (u.preferredInitialConfig === 'rainbow') rainbowCellsInPlace(cells, worldSize);
        startSim();
    };

    const loadByName = (name: string) => {
        const u = demoUniverses.find((u) => u.name === name);
        if (u) loadUniverse(u);
    };

    const loadRandomUniverse = () => {
        const randI = Math.floor(Math.random() * universes.length);
        const u = universes[randI];
        if (u) loadUniverse(u);
    };

    const updateAttractionTable = (newTable: AttractionTable) => {
        attractionTable = newTable;
        simulationComponent?.updateAttractionTable(newTable);
    };

    const uniformSpread = () => {
        cells = getNewCells(worldSize, nbParticles, colorWeights);
        simulationComponent?.updateCells(cells);
    };

    const centerSpread = () => {
        cells = getNewCells(worldSize, nbParticles, colorWeights);
        largeCenterCellsInPlace(cells, worldSize);
        simulationComponent?.updateCells(cells);
    };

    const rainbowSpread = () => {
        cells = getNewCells(worldSize, nbParticles, colorWeights);
        rainbowCellsInPlace(cells, worldSize);
        simulationComponent?.updateCells(cells);
    };

    onMount(() => {
        loadRandomUniverse();
    });
</script>

<div class="demo">
    <!-- Left column: narrative -->
    <div class="narrative">
        <!-- Hero -->
        <section class="hero">
            <h1>Particle Life</h1>
            <p>
                This is Particles Life. This is the simulation of a small universe where a few
                thoushands particles move freely and interract with each other.
            </p>
            <p>Press the next button a few times and observe these new universes coming to life.</p>
            <button on:click={() => loadRandomUniverse()}>Try a random universe</button>
            <p>
                While all these universes follow a small set of physicial rules applied with
                different parameters they produce a wide range of emergent behaviors. I made this
                page to explain how this type of simulation works and provide some insights to
                better understand how different parameters affect the outcomme in a reproducible
                way.
            </p>
            <p>
                This whole page is a less performent and less polished version of <a
                    rel="noopener noreferrer"
                    target="none"
                    href="https://sandbox-science.com/particle-life">this tool</a
                >. You should definitely check it out because it makes everything you will see here
                more spectacular. And reading this page first will allow you to better appreciate
                how truly amazing this other tool is.
            </p>
        </section>

        <!-- The Basics -->
        <section>
            <h2>The Basics</h2>
            <p>Let's start by making a cleaner universe.</p>
            <button on:click={() => loadByName('1 color still')}>Click me 1</button>
            <p>
                Here we have a bunch of white particles initially spread in a circle and without any
                force applied to them. Notice that at the very begining the cells in the center push
                each other until everyone is far enough to not bother its neighbor. Then nothing
                more happens...
            </p>
            <p>So let's add our first force: Repulsion!</p>
            <button on:click={() => loadByName('1 color repulsion circle')}>Click me 2</button>
            <p>
                Now every particle is repulsed by its neighbors, that makes the specie covering as
                much space as need to have sufficient space between each individual so that no one
                repulse the other.
            </p>
            <p>
                Notice that this setup creates clusters: Some particles get repulsed into small
                groups which keep expanding. This is also visible when particles are initially
                spread uniformly.
            </p>
            <button on:click={() => loadByName('1 color repulsion uniform')}>Click me 3</button>
            <p>Inversely we can make particles attract each other</p>
            <button on:click={() => loadByName('1 color attraction uniform')}>Click me 4</button>
            <p>
                Here clusters are much bigger and more compact as particles are grouped because they
                attract each other and not because they are pushed against each other into a group.
                Everything stabilize once all groups have attracted all the particles in they
                attraction radius.
            </p>
        </section>

        <!-- The Basics -->
        <section>
            <h2>The Basics</h2>
            <p>Let's start by making a cleaner universe.</p>
            <button on:click={() => loadByName('1 color still')}>Click me 1</button>
            <p>
                Here we have a bunch of white particles initially spread in a circle and without any
                force applied to them. Notice that at the very begining the cells in the center push
                each other until everyone is far enough to not bother its neighbor. Then nothing
                more happens...
            </p>
            <p>So let's add our first force: Repulsion!</p>
            <button on:click={() => loadByName('1 color repulsion circle')}>Click me 2</button>
            <p>
                Now every particle is repulsed by its neighbors, that makes the specie covering as
                much space as need to have sufficient space between each individual so that no one
                repulse the other.
            </p>
            <p>
                Notice that this setup creates clusters: Some particles get repulses into small
                groups which keep expanding. This is also visible when particles are initially
                spread uniformly.
            </p>
            <button on:click={() => loadByName('1 color repulsion uniform')}>Click me 3</button>
            <p>Inversely we can make particles attract each other</p>
            <button on:click={() => loadByName('1 color attraction uniform')}>Click me 4</button>
            <p>
                Here clusters are much bigger and more compact as particles are groupes because they
                attract each other and not because they are pushed against each other into a group.
                Everything stabilize once all groups have attracted all the particles in they
                attraction radius.
            </p>
        </section>

        <!-- Species -->
        <section>
            <h2>Species</h2>
            <p>
                To make all of this more interesting we need to add more particle species we
                differenciate with their color. Click to introduce red!
            </p>
            <button on:click={() => loadByName('2 colors still')}>Click me 5</button>
            <p>
                To begin, particles will only actively interact with other particles of the same
                specy. White gets attracted by white by red is repulsed by red.
            </p>
            <button on:click={() => loadByName('2 colors inverse forces')}>Click me 6</button>
            <p>
                We find the same white clusters forming as seen before but this time they move
                through masses of self repulsing red.
            </p>
            <p>
                Now let's create inter-species attraction! Here red is attracted by white and white
                is attracted by red but particles don't interact with their own specie. This create
                filament-like structure which quickly converge into bi-color clusters: Inter-species
                rules can create more complex structures.
            </p>
            <button on:click={() => loadByName('2 colors stable attraction')}>Click me 7</button>
            <p>
                And if we combine inter-species attraction with intra-specie repulsion the particles
                will pave the space trying to get as close as possible to their prefered color while
                pushing away their siblings.
            </p>
            <button on:click={() => loadByName('2 colors stable attraction inner repulsion')}
                >Click me 9</button
            >
            <p>
                But let's add some motion here! If white is very attracted to red but red is
                strongly repulsed by white we create a trusting force: When a binome of cells of
                different colors is close to each other the chasing starts! And with enough
                particles we see appearing waves of white chasing waves of red. While everythings
                looks pretty random we can still clearly see a common pattern.
            </p>
            <button on:click={() => loadByName('2 colors chase')}>Click me 8</button>
            <p>
                Let's add some order in this chaos by enabling intra-species attraction: We keep the
                white-red trusting force we created because but we add clusters of self-attracting
                species. And we end up with our most simple moving structures!
            </p>
            <button on:click={() => loadByName('2 colors structured chase')}>Click me 9</button>
            <p>
                See these small, inefficient white-red organism moving around their universe and
                gobbling each other. Since everything is strongly attracted the universe shortly
                stabilize as the red-white groups get sufficiently faw away from each other.
            </p>
            <p>
                But this is the very begining of what we want to obverse with this tool: Complex
                behaviors emerging of simple rules
            </p>
        </section>

        <!-- Emergent Complexity -->
        <section>
            <h2>Emergent Complexity</h2>
            <p class="placeholder">[Complexity explanation goes here]</p>
            <div class="preset-btns">
                <button on:click={() => loadByName('2 colors own repulsion')}
                    >2 colors own repulsion</button
                >
                <button on:click={() => loadByName('Central circle spread')}
                    >Central circle spread</button
                >
            </div>
        </section>

        <!-- The Attraction Table -->
        <section>
            <h2>The Attraction Table</h2>
            <p class="placeholder">[Attraction table explanation goes here]</p>
            <div class="card">
                <AttractionTableComponent {attractionTable} onUpdateTable={updateAttractionTable} />
            </div>
        </section>

        <!-- Tuning the Mix -->
        <section>
            <h2>Tuning the Mix</h2>
            <p class="placeholder">[Mix explanation goes here]</p>
            <div class="card">
                <div class="card-title">Color proportions</div>
                <div class="proportion-list">
                    {#each COLORS as c}
                        <div class="field">
                            <span class="pdot" style="background:{PARTICLE_COLORS[c]}" />
                            <input
                                type="range"
                                bind:value={colorWeights[c]}
                                min="0"
                                max="1000"
                                step="1"
                            />
                            <span class="dim" style="width:28px;text-align:right"
                                >{colorWeights[c]}</span
                            >
                        </div>
                    {/each}
                </div>
                <div class="preset-btns">
                    <button on:click={uniformSpread}>↺ Uniform spread</button>
                    <button on:click={centerSpread}>◎ Centered circle</button>
                    <button on:click={rainbowSpread}>≋ Rainbow</button>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <section class="footer">
            <p class="placeholder">[Footer — link to /particles/dev for the full sandbox]</p>
        </section>
    </div>

    <!-- Right column: sticky canvas -->
    <div class="canvas-col">
        <div class="canvas-sticky">
            <Simulation bind:this={simulationComponent} />
        </div>
    </div>
</div>

<style>
    /* ── Layout ─────────────────────────────── */
    .demo {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 32px;
        max-width: 1400px;
        margin: 0 auto;
        padding: 32px 24px 64px;
        box-sizing: border-box;
    }

    @media (max-width: 768px) {
        .demo {
            grid-template-columns: 1fr;
            padding: 16px 12px 48px;
            gap: 16px;
        }
    }

    /* ── Narrative column ────────────────────── */
    .narrative {
        display: flex;
        flex-direction: column;
        gap: 0;
    }

    .narrative section {
        padding: 48px 0;
        border-bottom: 1px solid #37474f22;
    }

    .narrative section:first-child {
        padding-top: 0;
    }

    .narrative section:last-child {
        border-bottom: none;
    }

    .narrative h1 {
        font-size: 1.8rem;
        color: #eceff1;
        margin: 0 0 16px;
        font-weight: 700;
    }

    .narrative h2 {
        font-size: 1.2rem;
        color: #eceff1;
        margin: 0 0 12px;
        font-weight: 600;
    }

    .narrative p {
        color: #90a4ae;
        font-size: 0.9rem;
        line-height: 1.6;
        margin: 0 0 16px;
    }

    /* ── Sticky canvas column ────────────────── */
    .canvas-col {
        min-width: 0;
    }

    .canvas-sticky {
        position: sticky;
        top: 16px;
        align-self: start;
    }

    @media (max-width: 768px) {
        .canvas-col {
            order: -1;
        }

        .canvas-sticky {
            position: sticky;
            top: 0;
            z-index: 10;
            background: #1a2327;
            padding: 8px 0;
        }
    }

    /* ── Preset buttons ──────────────────────── */
    .preset-btns {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-bottom: 16px;
    }

    /* ── Placeholder text ────────────────────── */
    .placeholder {
        background: #1a232744;
        border-left: 3px solid #546e7a;
        padding: 12px 16px;
        border-radius: 0 6px 6px 0;
        font-style: italic;
        color: #546e7a;
    }

    /* ── Card ────────────────────────────────── */
    .card {
        background: #263238;
        border: 1px solid #37474f;
        border-radius: 8px;
        padding: 14px 16px;
    }

    .card-title {
        font-size: 0.68rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: #78909c;
        margin-bottom: 12px;
        font-weight: 600;
        display: block;
    }

    /* ── Fields ──────────────────────────────── */
    .field {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 7px;
    }

    .field:last-child {
        margin-bottom: 0;
    }

    .dim {
        font-size: 0.7rem;
        color: #aeafb0;
    }

    /* ── Buttons ─────────────────────────────── */
    button {
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

    button:hover {
        background: #2e3c43;
        border-color: #546e7a;
        color: #eceff1;
    }

    /* ── Particle dots ───────────────────────── */
    .pdot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        flex-shrink: 0;
    }

    .proportion-list {
        margin-bottom: 10px;
    }

    .proportion-list .field input[type='range'] {
        flex: 1;
        min-width: 0;
        accent-color: #c3e88d;
    }
</style>
