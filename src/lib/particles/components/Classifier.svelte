<script lang="ts">
    import { base } from '$app/paths';
    import { dev } from '$app/environment';
    import { onMount } from 'svelte';

    import type { AttractionTable } from '$lib/particles/attraction';
    import {
        getNewCells,
        largeCenterCellsInPlace,
        rainbowCellsInPlace
    } from '$lib/particles/engine/cells';
    import type { Cell } from '$lib/particles/engine';
    import Simulation from './Simulation.svelte';
    import UniverseSelector from './UniverseSelector.svelte';
    import WorldSettingsSelector from './WorldSettingsSelector.svelte';
    import type { WorldSettings } from '$lib/particles/engine/types';
    import {
        getAllUniverses,
        type StoredUniverse,
        type InitialConfig,
        type UniverseBehavior,
        type UniverseStructure,
        type ConvergenceSpeed,
        type EnergyLevel
    } from '$lib/particles/universe';

    // ── State ──────────────────────────────────
    let simulationComponent: Simulation;
    let universes: StoredUniverse[] = [...getAllUniverses()];
    let selected: StoredUniverse | null = null;

    let cells: Cell[] = [];
    let attractionTable: AttractionTable;

    let ws: WorldSettings = {
        nbParticles: 0,
        horizontalResolution: 0,
        verticalResolution: 0,
        maxAttractionRadius: 0,
        friction: 0,
        colorWeights: { white: 0, red: 0, green: 0, blue: 0 }
    };

    const worldSize = { x: 0, y: 0 };

    // ── Editable metadata ──────────────────────
    let editName = '';
    let editDescription = '';
    let editPreferredInitialConfig: InitialConfig = 'uniform';
    let editBehavior: UniverseBehavior = 'cyclic';
    let editStructure: UniverseStructure = 'none';
    let editActiveColors: 1 | 2 | 3 | 4 = 4;
    let editConvergenceSpeed: ConvergenceSpeed = 'never';
    let editEnergyLevel: EnergyLevel = 'medium';
    let editComplexity: 1 | 2 | 3 = 2;

    let saveStatus: 'idle' | 'saving' | 'saved' | 'error' = 'idle';
    let saveTimeout: ReturnType<typeof setTimeout>;

    // ── Hint dictionaries ──────────────────────
    const behaviorHints: Record<UniverseBehavior, string> = {
        still: 'Zero forces — particles never move',
        converges: 'Reaches a stable resting state',
        cyclic: 'Persistent dynamic patterns, never fully settles',
        chaotic: 'Turbulent, unpredictable motion'
    };
    const structureHints: Record<UniverseStructure, string> = {
        none: 'No visible grouping or patterns',
        clusters: 'Distinct blobs or groups of same/paired colours',
        patterns: 'Repeating geometric motifs: strips, rings, islands',
        organisms: 'Moving, self-maintaining structures (worms, vessels…)'
    };
    const convergenceHints: Record<ConvergenceSpeed, string> = {
        instant: 'Stable within a few frames',
        fast: 'Stable within ~100 frames',
        medium: 'Stable within ~500–1 000 frames',
        slow: 'Takes thousands of frames or more',
        never: 'Never converges — use for cyclic or chaotic universes'
    };
    const energyHints: Record<EnergyLevel, string> = {
        low: 'Particles barely move once settled',
        medium: 'Moderate sustained motion',
        high: 'Fast, turbulent motion'
    };
    const complexityHints: Record<1 | 2 | 3, string> = {
        1: 'Trivial — zero forces or a single same-colour rule',
        2: 'A few interaction rules between 2–4 colours',
        3: 'Rich multi-colour dynamics with emergent structures'
    };

    // ── Reactive: unsaved changes ──────────────
    $: hasChanges =
        selected != null &&
        (editName !== selected.name ||
            editDescription !== selected.description ||
            editPreferredInitialConfig !== selected.preferredInitialConfig ||
            editBehavior !== selected.behavior ||
            editStructure !== selected.structure ||
            editActiveColors !== selected.activeColors ||
            editConvergenceSpeed !== selected.convergenceSpeed ||
            editEnergyLevel !== selected.energyLevel ||
            editComplexity !== selected.complexity);

    // ── Actions ────────────────────────────────
    const loadFormFromUniverse = (u: StoredUniverse) => {
        editName = u.name;
        editDescription = u.description;
        editPreferredInitialConfig = u.preferredInitialConfig;
        editBehavior = u.behavior;
        editStructure = u.structure;
        editActiveColors = u.activeColors;
        editConvergenceSpeed = u.convergenceSpeed;
        editEnergyLevel = u.energyLevel;
        editComplexity = u.complexity;
        saveStatus = 'idle';
    };

    const startSim = () => {
        simulationComponent?.startSim({
            cells,
            worldSize,
            maxAttractionRadius: ws.maxAttractionRadius,
            attractionTable,
            friction: ws.friction
        });
    };

    const restartWithCells = (newCells: Cell[]) => {
        cells = newCells;
        startSim();
    };

    const loadUniverse = (u: StoredUniverse) => {
        attractionTable = u.attractionTable;
        ws = {
            colorWeights: u.colorWeights,
            nbParticles: u.nbParticles,
            maxAttractionRadius: u.maxAttractionRadius,
            horizontalResolution: u.horizontalResolution,
            verticalResolution: u.verticalResolution,
            friction: u.friction
        };
        worldSize.x = u.maxAttractionRadius * u.horizontalResolution;
        worldSize.y = u.maxAttractionRadius * u.verticalResolution;
        cells = getNewCells(worldSize, u.nbParticles, u.colorWeights);
        if (u.preferredInitialConfig === 'center') largeCenterCellsInPlace(cells, worldSize);
        if (u.preferredInitialConfig === 'rainbow') rainbowCellsInPlace(cells, worldSize, u.colorWeights);
        startSim();
    };

    const selectUniverse = (u: StoredUniverse) => {
        selected = u;
        loadFormFromUniverse(u);
        loadUniverse(u);
    };

    const uniformSpread = () => {
        restartWithCells(getNewCells(worldSize, ws.nbParticles, ws.colorWeights));
    };

    const centerSpread = () => {
        const newCells = getNewCells(worldSize, ws.nbParticles, ws.colorWeights);
        largeCenterCellsInPlace(newCells, worldSize);
        restartWithCells(newCells);
    };

    const rainbowSpread = () => {
        const newCells = getNewCells(worldSize, ws.nbParticles, ws.colorWeights);
        rainbowCellsInPlace(newCells, worldSize, ws.colorWeights);
        restartWithCells(newCells);
    };

    const buildStoredUniverse = (): StoredUniverse => ({
        ...selected!,
        name: editName,
        description: editDescription,
        preferredInitialConfig: editPreferredInitialConfig,
        behavior: editBehavior,
        structure: editStructure,
        activeColors: editActiveColors,
        convergenceSpeed: editConvergenceSpeed,
        energyLevel: editEnergyLevel,
        complexity: editComplexity
    });

    const save = async () => {
        if (!selected) return;
        saveStatus = 'saving';
        clearTimeout(saveTimeout);

        try {
            const updated = buildStoredUniverse();
            const res = await fetch(`${base}/api/presets`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updated)
            });

            if (!res.ok) {
                saveStatus = 'error';
                return;
            }

            // Update in-memory list so UniverseSelector reflects changes
            const idx = universes.findIndex((u) => u.id === selected!.id);
            if (idx !== -1) {
                universes[idx] = updated;
                universes = universes;
            }
            selected = updated;
            saveStatus = 'saved';
            saveTimeout = setTimeout(() => (saveStatus = 'idle'), 2000);
        } catch {
            saveStatus = 'error';
        }
    };

    onMount(() => {
        if (universes.length > 0) {
            selectUniverse(universes[0]);
        }
    });
</script>

<div class="classifier">
    <!-- Universe selector -->
    <UniverseSelector {universes} {selected} onSelect={selectUniverse} />

    <!-- Simulation -->
    <Simulation bind:this={simulationComponent} />

    <div class="spread-btns">
        <button on:click={uniformSpread}>↺ Uniform spread</button>
        <button on:click={centerSpread}>◎ Centered circle</button>
        <button on:click={rainbowSpread}>≋ Rainbow</button>
    </div>

    {#if selected}
        <div class="panels">
            <!-- Classification editor -->
            <div class="card">
                <div class="card-title">Classification</div>

                <div class="field">
                    <label for="cl-name">Name</label>
                    <input id="cl-name" type="text" bind:value={editName} />
                </div>
                <div class="field">
                    <label for="cl-desc">Description</label>
                    <textarea id="cl-desc" rows="3" bind:value={editDescription} />
                </div>
                <div class="field">
                    <label for="cl-config">Spread</label>
                    <select id="cl-config" bind:value={editPreferredInitialConfig}>
                        <option value="uniform">↺ Uniform</option>
                        <option value="center">◎ Center</option>
                        <option value="rainbow">≋ Rainbow</option>
                    </select>
                </div>

                <div class="section-label">Tags</div>

                <div class="field-group">
                    <div class="field">
                        <label for="cl-behavior">Behavior</label>
                        <select id="cl-behavior" bind:value={editBehavior}>
                            <option value="still">still</option>
                            <option value="converges">converges</option>
                            <option value="cyclic">cyclic</option>
                            <option value="chaotic">chaotic</option>
                        </select>
                    </div>
                    <p class="hint">{behaviorHints[editBehavior]}</p>
                </div>
                <div class="field-group">
                    <div class="field">
                        <label for="cl-structure">Structure</label>
                        <select id="cl-structure" bind:value={editStructure}>
                            <option value="none">none</option>
                            <option value="clusters">clusters</option>
                            <option value="patterns">patterns</option>
                            <option value="organisms">organisms</option>
                        </select>
                    </div>
                    <p class="hint">{structureHints[editStructure]}</p>
                </div>
                <div class="field-group">
                    <div class="field">
                        <label for="cl-colors">Colors</label>
                        <select id="cl-colors" bind:value={editActiveColors}>
                            <option value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                        </select>
                    </div>
                </div>
                <div class="field-group">
                    <div class="field">
                        <label for="cl-convergence">Convergence</label>
                        <select id="cl-convergence" bind:value={editConvergenceSpeed}>
                            <option value="instant">instant</option>
                            <option value="fast">fast</option>
                            <option value="medium">medium</option>
                            <option value="slow">slow</option>
                            <option value="never">never</option>
                        </select>
                    </div>
                    <p class="hint">{convergenceHints[editConvergenceSpeed]}</p>
                </div>
                <div class="field-group">
                    <div class="field">
                        <label for="cl-energy">Energy</label>
                        <select id="cl-energy" bind:value={editEnergyLevel}>
                            <option value="low">low</option>
                            <option value="medium">medium</option>
                            <option value="high">high</option>
                        </select>
                    </div>
                    <p class="hint">{energyHints[editEnergyLevel]}</p>
                </div>
                <div class="field-group">
                    <div class="field">
                        <label for="cl-complexity">Complexity</label>
                        <select id="cl-complexity" bind:value={editComplexity}>
                            <option value={1}>★☆☆</option>
                            <option value={2}>★★☆</option>
                            <option value={3}>★★★</option>
                        </select>
                    </div>
                    <p class="hint">{complexityHints[editComplexity]}</p>
                </div>

                <div class="save-row">
                    <button
                        class="save-btn"
                        class:saved={saveStatus === 'saved'}
                        class:error={saveStatus === 'error'}
                        on:click={save}
                        disabled={!dev || (!hasChanges && saveStatus !== 'error')}
                    >
                        {#if saveStatus === 'saving'}
                            Saving…
                        {:else if saveStatus === 'saved'}
                            Saved
                        {:else if saveStatus === 'error'}
                            Error — retry
                        {:else}
                            Save
                        {/if}
                    </button>
                    {#if hasChanges}
                        <span class="unsaved-dot" title="Unsaved changes" />
                    {/if}
                    {#if !dev}
                        <span class="dev-notice">Dev mode only</span>
                    {/if}
                </div>
            </div>

            <!-- Read-only properties -->
            <div class="card">
                <div class="card-title">Properties</div>
                <div class="field">
                    <span>ID</span>
                    <span class="ro-value">{selected.id}</span>
                </div>
                <WorldSettingsSelector settings={ws} readonly />
            </div>
        </div>
    {/if}
</div>

<style>
    .classifier {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 12px 16px 32px;
        max-width: 1200px;
        margin: 0 auto;
        box-sizing: border-box;
    }

    /* ── Spread buttons ─────────────────────── */
    .spread-btns {
        display: flex;
        gap: 6px;
    }

    .spread-btns button {
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

    .spread-btns button:hover {
        background: #2e3c43;
        border-color: #546e7a;
        color: #eceff1;
    }

    /* ── Panels grid ─────────────────────────── */
    .panels {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 10px;
    }

    @media (max-width: 640px) {
        .panels {
            grid-template-columns: 1fr;
        }
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
    }

    .section-label {
        font-size: 0.63rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: #546e7a;
        font-weight: 600;
        margin: 10px 0 6px;
        padding-top: 8px;
        border-top: 1px solid #37474f;
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

    .field label {
        font-size: 0.8rem;
        color: #90a4ae;
        width: 75px;
        flex-shrink: 0;
    }

    .field input[type='text'],
    .field select {
        flex: 1;
        background: #1a2327;
        border: 1px solid #37474f;
        border-radius: 5px;
        color: #eceff1;
        padding: 5px 8px;
        font-size: 0.82rem;
    }

    .field textarea {
        flex: 1;
        background: #1a2327;
        border: 1px solid #37474f;
        border-radius: 5px;
        color: #eceff1;
        padding: 5px 8px;
        font-size: 0.82rem;
        resize: vertical;
    }

    .field input:focus,
    .field select:focus,
    .field textarea:focus {
        outline: 1px solid #c3e88d;
        border-color: #c3e88d;
    }

    .field-group {
        display: flex;
        flex-direction: column;
        gap: 3px;
        margin-bottom: 4px;
    }

    .hint {
        margin: 0;
        padding-left: 83px;
        font-size: 0.72rem;
        color: #546e7a;
        font-style: italic;
    }

    .ro-value {
        font-size: 0.82rem;
        color: #b0bec5;
    }

    /* ── Save row ────────────────────────────── */
    .save-row {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-top: 14px;
        padding-top: 10px;
        border-top: 1px solid #37474f;
    }

    .save-btn {
        background: #1a2327;
        border: 1px solid #37474f;
        color: #cfd8dc;
        border-radius: 6px;
        padding: 8px 20px;
        font-size: 0.82rem;
        cursor: pointer;
        transition: background 0.13s, border-color 0.13s;
    }

    .save-btn:hover:not(:disabled) {
        background: #2e3c43;
        border-color: #546e7a;
        color: #eceff1;
    }

    .save-btn:disabled {
        opacity: 0.4;
        cursor: default;
    }

    .save-btn.saved {
        border-color: #c3e88d55;
        color: #c3e88d;
    }

    .save-btn.error {
        border-color: #ef535055;
        color: #ef5350;
    }

    .unsaved-dot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background: #ffab40;
        flex-shrink: 0;
    }

    .dev-notice {
        font-size: 0.72rem;
        color: #ef5350;
        font-style: italic;
    }
</style>
