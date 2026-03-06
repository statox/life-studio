<script lang="ts">
    // TO KEEP
    // 4000 particles¶
    // even proportions¶
    // uniform spread¶
    // ¶
    // {¶
    //     name: '',¶
    //     description: '',¶
    //     table: {¶
    //         white: { white: 0, red: 0, green: -1, blue: -1 },¶
    //         red: { white: -1, red: 0, green: 0, blue: -1 },¶
    //         green: { white: -1, red: -1, green: 0, blue: 0 },¶
    //         blue: { white: 0, red: -1, green: -1, blue: 0 }¶
    //     }¶
    // },¶
    // ¶
    // World:.¶
    // H Cells 12¶
    // V Cells 12¶
    // Max radius 32¶
    // FPS 60¶

    import { onDestroy, onMount } from 'svelte';

    import AttractionTableComponent from '$lib/particles/components/AttractionTableComponent.svelte';
    import Canvas from '$lib/particles/components/Canvas.svelte';
    import Timeline from '$lib/particles/components/Timeline.svelte';
    import type { AttractionTable } from '$lib/particles/attraction';
    import { getMutatedAttractionTable, getRandomAttractionTable } from '$lib/particles/attraction';
    import { presets } from '$lib/particles/presets';
    import { COLORS, PARTICLE_COLORS } from '$lib/particles/engine';
    import { getNewCells } from '$lib/particles/engine/cells';
    import type { ColorProportions } from '$lib/particles/engine/cells';
    import { createSimulationWorker } from '$lib/particles/engine/simulationWorker';
    import type { Cell, Coordinates } from '$lib/particles/engine';

    const MAX_BUFFER_SIZE = 1000;
    const sim = createSimulationWorker();

    let cells: Cell[] = [];
    let attractionTable: AttractionTable = getRandomAttractionTable();
    let buffer: Coordinates[][] = [];
    let frameIndex = 0;

    let colorWeights: ColorProportions = { white: 500, red: 500, green: 500, blue: 500 };

    let showColors = true;
    let maxFPS = 60;

    const cellSize = 3;

    let maxAttractionRadius = 32;
    let nbParticles = 4000;
    let horizontalResolution = 30;
    let verticalResolution = 20;

    const worldSize = {
        x: maxAttractionRadius * horizontalResolution,
        y: maxAttractionRadius * verticalResolution
    };

    const startSim = (keepCells = false, keepTable = false) => {
        if (!keepCells) cells = getNewCells(worldSize, nbParticles, colorWeights);
        if (!keepTable) attractionTable = getRandomAttractionTable();
        buffer = [];
        frameIndex = 0;
        sim.start(
            { worldSize, nbParticles, maxAttractionRadius },
            cells,
            attractionTable,
            (positions) => {
                buffer.push(positions);
                if (buffer.length >= MAX_BUFFER_SIZE) {
                    buffer.shift();
                    frameIndex = Math.max(frameIndex - 1, 0);
                }
                buffer = buffer;
            }
        );
    };

    const updateAttractionTable = (newTable: AttractionTable) => {
        attractionTable = newTable;
        sim.updateAttractionTable(newTable);
        buffer = [cells.map((c) => c.pos)];
        frameIndex = 0;
    };

    const updateWorldSettings = () => {
        worldSize.x = maxAttractionRadius * horizontalResolution;
        worldSize.y = maxAttractionRadius * verticalResolution;
        startSim();
    };

    const centerCells = () => {
        for (const cell of cells) {
            const r = 2 * Math.random();
            const theta = Math.random() * 2 * Math.PI;
            cell.pos = {
                x: worldSize.x / 2 + r * Math.cos(theta),
                y: worldSize.y / 2 + r * Math.sin(theta)
            };
        }
        startSim(true, true);
    };

    const largeCenterCells = () => {
        for (const cell of cells) {
            const r = 200 * Math.random();
            const theta = Math.random() * 2 * Math.PI;
            cell.pos = {
                x: worldSize.x / 2 + r * Math.cos(theta),
                y: worldSize.y / 2 + r * Math.sin(theta)
            };
        }
        startSim(true, true);
    };

    const rainbowCells = () => {
        const sectionWidth = worldSize.x / 4;
        for (const cell of cells) {
            cell.color = COLORS[Math.min(Math.floor(cell.pos.x / sectionWidth), 3)];
        }
        startSim(true, true);
    };

    const loadPreset = (name: string) => {
        const p = presets.find((p) => p.name === name);
        if (!p) return;
        nbParticles = p.nbParticles;
        colorWeights = { ...p.colorWeights };
        attractionTable = p.table;
        cells = getNewCells(worldSize, p.nbParticles, p.colorWeights);
        if (p.resetType === 'centered') {
            centerCells();
        } else {
            largeCenterCells();
        }
        startSim(true, true);
    };

    let canvasWrap: HTMLElement;
    let isFullscreen = false;
    let timeline: Timeline;

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            canvasWrap.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    const onFullscreenChange = () => {
        isFullscreen = !!document.fullscreenElement;
    };

    onMount(async () => {
        await sim.loadWorker();
        const fishesPreset = presets.find((p) => p.name === 'Fishes');
        if (fishesPreset) {
            nbParticles = fishesPreset.nbParticles;
            colorWeights = { ...fishesPreset.colorWeights };
            attractionTable = fishesPreset.table;
        }
        startSim(false, true);
        document.addEventListener('fullscreenchange', onFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', onFullscreenChange);
    });
    onDestroy(() => sim.destroy());
</script>

<div class="demo">
    <!-- Left column: narrative -->
    <div class="narrative">
        <!-- Section 1: Hero -->
        <section class="hero">
            <h1>Particle Life</h1>
            <p class="placeholder">[Introduction text goes here]</p>
        </section>

        <!-- Section 2: The Basics -->
        <section>
            <h2>The Basics</h2>
            <p class="placeholder">[Basics explanation goes here]</p>
            <div class="preset-btns">
                <button on:click={() => loadPreset('Spray around')}>Spray around</button>
                <button on:click={() => loadPreset('Bubbles')}>Bubbles</button>
                <button on:click={() => loadPreset('Simple snake')}>Simple snake</button>
            </div>
            <p class="placeholder">[Reset explanation goes here]</p>
            <div class="preset-btns">
                <button on:click={() => startSim(false, true)}>↺ Uniform spread</button>
                <button on:click={largeCenterCells}>◎ Centered circle</button>
            </div>
        </section>

        <!-- Section 3: Emergent Complexity -->
        <section>
            <h2>Emergent Complexity</h2>
            <p class="placeholder">[Complexity explanation goes here]</p>
            <div class="preset-btns">
                <button on:click={() => loadPreset('Fishes')}>Fishes</button>
                <button on:click={() => loadPreset('Worms')}>Worms</button>
                <button on:click={() => loadPreset('Universe')}>Universe</button>
                <button on:click={() => loadPreset('Large vessels')}>Large vessels</button>
                <button on:click={() => loadPreset('Wall crawlers')}>Wall crawlers</button>
                <button on:click={() => loadPreset('Two tribes')}>Two tribes</button>
                <button on:click={() => loadPreset('Predator-prey')}>Predator-prey</button>
            </div>
        </section>

        <!-- Section 4: The Attraction Table -->
        <section>
            <h2>The Attraction Table</h2>
            <p class="placeholder">[Attraction table explanation goes here]</p>
            <div class="card">
                <AttractionTableComponent {attractionTable} onUpdateTable={updateAttractionTable} />
            </div>
        </section>

        <!-- Section 5: Tuning the Mix -->
        <section>
            <h2>Tuning the Mix</h2>
            <p class="placeholder">[Mix explanation goes here]</p>
            <div class="card">
                <div class="card-title">Particles</div>
                <div class="field">
                    <label for="nb-particles">Count</label>
                    <input
                        id="nb-particles"
                        type="number"
                        bind:value={nbParticles}
                        on:change={updateWorldSettings}
                        min="1"
                    />
                </div>
                <div class="card-title" style="margin-top:12px">Color proportions</div>
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
                    <button on:click={() => startSim(false, true)}>↺ Uniform spread</button>
                    <button on:click={largeCenterCells}>◎ Centered circle</button>
                    <button on:click={rainbowCells}>≋ Rainbow</button>
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
            <div class="canvas-wrap" bind:this={canvasWrap}>
                <Canvas
                    {cells}
                    {worldSize}
                    {cellSize}
                    {showColors}
                    drewFrame={() => timeline?.updateFrame()}
                    {maxFPS}
                />
            </div>
            <Timeline
                bind:this={timeline}
                bind:buffer
                bind:frameIndex
                {cells}
                {isFullscreen}
                onToggleFullscreen={toggleFullscreen}
            />
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
        display: flex;
        flex-direction: column;
        gap: 8px;
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

    .canvas-wrap {
        width: 100%;
    }

    .canvas-wrap:fullscreen {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #1a2327;
        width: 100vw;
        height: 100vh;
    }

    .canvas-wrap:fullscreen :global(canvas) {
        width: auto;
        height: 100%;
        max-width: 100%;
        max-height: 100vh;
        border-radius: 0;
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

    .field input {
        flex-grow: 2;
    }

    .field label {
        font-size: 0.8rem;
        color: #90a4ae;
        width: 60px;
        flex-shrink: 0;
    }

    .field input[type='number'] {
        width: 62px;
        background: #1a2327;
        border: 1px solid #37474f;
        border-radius: 5px;
        color: #eceff1;
        padding: 4px 7px;
        font-size: 0.82rem;
    }

    .field input[type='number']:focus {
        outline: 1px solid #c3e88d;
        border-color: #c3e88d;
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
