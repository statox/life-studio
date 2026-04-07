<script lang="ts">
    import { run, self } from 'svelte/legacy';

    import type {
        Universe,
        InitialConfig,
        UniverseBehavior,
        UniverseStructure,
        ConvergenceSpeed,
        EnergyLevel,
        UniverseCategory
    } from '../universe';
    import { UNIVERSE_CATEGORIES } from '../universe';

    interface Props {
        universe: Universe;
        onclose?: () => void;
    }

    let { universe, onclose }: Props = $props();

    const slugify = (s: string): string =>
        s
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '_')
            .replace(/^_|_$/g, '');

    let name = $state('');
    let id = $state('');
    let idManuallyEdited = $state(false);
    run(() => {
        if (name && !idManuallyEdited) id = slugify(name);
    });
    let description = $state('');
    let preferredInitialConfig: InitialConfig = $state('uniform');
    let behavior: UniverseBehavior = $state('cyclic');
    let structure: UniverseStructure = $state('none');
    let activeColors: 1 | 2 | 3 | 4 = $state(4);
    let convergenceSpeed: ConvergenceSpeed = $state('never');
    let energyLevel: EnergyLevel = $state('medium');
    let complexity: 1 | 2 | 3 = $state(2);
    let category: UniverseCategory = $state('other');
    let copied = $state(false);
    const createdAt = new Date().toISOString().slice(0, 10);

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

    let result = $derived(
        (() => {
            try {
                return JSON.stringify(
                    {
                        id,
                        name,
                        description,
                        preferredInitialConfig,
                        behavior,
                        structure,
                        activeColors,
                        convergenceSpeed,
                        energyLevel,
                        complexity,
                        category,
                        createdAt,
                        ...universe
                    },
                    null,
                    2
                );
            } catch {
                return 'Error';
            }
        })()
    );

    const copy = () => {
        navigator.clipboard.writeText(result).then(() => {
            copied = true;
            setTimeout(() => (copied = false), 2000);
        });
    };
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_static_element_interactions -->
<div class="backdrop" onclick={self(() => onclose?.())}>
    <div class="modal">
        <div class="modal-header">
            <span class="title">Export Universe</span>
            <button class="icon-btn" onclick={() => onclose?.()}>✕</button>
        </div>

        <div class="field">
            <label for="export-name">Name</label>
            <input id="export-name" type="text" placeholder="My table" bind:value={name} />
        </div>
        <div class="field">
            <label for="export-id">ID</label>
            <input
                id="export-id"
                type="text"
                placeholder="auto-generated from name"
                bind:value={id}
                oninput={() => (idManuallyEdited = true)}
            />
        </div>
        <div class="field">
            <label for="export-desc">Description</label>
            <textarea
                rows="4"
                id="export-desc"
                placeholder="What does it do?"
                bind:value={description}
            ></textarea>
        </div>
        <div class="field">
            <label for="export-config">Initial spread</label>
            <select id="export-config" bind:value={preferredInitialConfig}>
                <option value="uniform">↺ Uniform spread</option>
                <option value="center">◎ Centered circle</option>
                <option value="rainbow">≋ Rainbow</option>
            </select>
        </div>

        <div class="section-label">Classification</div>

        <div class="field">
            <label for="export-category">Category</label>
            <select id="export-category" bind:value={category}>
                {#each UNIVERSE_CATEGORIES as cat}
                    <option value={cat}>{cat}</option>
                {/each}
            </select>
        </div>

        <div class="field-group">
            <div class="field">
                <label for="export-behavior">Behavior</label>
                <select id="export-behavior" bind:value={behavior}>
                    <option value="still">still</option>
                    <option value="converges">converges</option>
                    <option value="cyclic">cyclic</option>
                    <option value="chaotic">chaotic</option>
                </select>
            </div>
            <p class="hint">{behaviorHints[behavior]}</p>
        </div>
        <div class="field-group">
            <div class="field">
                <label for="export-structure">Structure</label>
                <select id="export-structure" bind:value={structure}>
                    <option value="none">none</option>
                    <option value="clusters">clusters</option>
                    <option value="patterns">patterns</option>
                    <option value="organisms">organisms</option>
                </select>
            </div>
            <p class="hint">{structureHints[structure]}</p>
        </div>
        <div class="field-group">
            <div class="field">
                <label for="export-colors">Colors</label>
                <select id="export-colors" bind:value={activeColors}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                </select>
            </div>
            <p class="hint">Number of colours with a non-zero weight</p>
        </div>
        <div class="field-group">
            <div class="field">
                <label for="export-convergence">Convergence</label>
                <select id="export-convergence" bind:value={convergenceSpeed}>
                    <option value="instant">instant</option>
                    <option value="fast">fast</option>
                    <option value="medium">medium</option>
                    <option value="slow">slow</option>
                    <option value="never">never</option>
                </select>
            </div>
            <p class="hint">{convergenceHints[convergenceSpeed]}</p>
        </div>
        <div class="field-group">
            <div class="field">
                <label for="export-energy">Energy</label>
                <select id="export-energy" bind:value={energyLevel}>
                    <option value="low">low</option>
                    <option value="medium">medium</option>
                    <option value="high">high</option>
                </select>
            </div>
            <p class="hint">{energyHints[energyLevel]}</p>
        </div>
        <div class="field-group">
            <div class="field">
                <label for="export-complexity">Complexity</label>
                <select id="export-complexity" bind:value={complexity}>
                    <option value={1}>★☆☆</option>
                    <option value={2}>★★☆</option>
                    <option value={3}>★★★</option>
                </select>
            </div>
            <p class="hint">{complexityHints[complexity]}</p>
        </div>

        <div class="code-block">
            <pre>{result}</pre>
        </div>

        <button class="copy-btn" class:copied onclick={copy}>
            {copied ? '✓ Copied!' : '⧉ Copy to clipboard'}
        </button>
    </div>
</div>

<style>
    .backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100;
    }

    .modal {
        background: #263238;
        border: 1px solid #37474f;
        border-radius: 10px;
        padding: 20px 24px;
        width: min(560px, 92vw);
        display: flex;
        flex-direction: column;
        gap: 12px;
        max-height: 95vh;
        overflow-y: auto;
    }

    .modal-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .title {
        font-size: 0.68rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: #78909c;
        font-weight: 600;
    }

    .section-label {
        font-size: 0.68rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: #78909c;
        font-weight: 600;
        padding-top: 4px;
        border-top: 1px solid #37474f;
    }

    .field-group {
        display: flex;
        flex-direction: column;
        gap: 3px;
    }

    .hint {
        margin: 0;
        padding-left: 68px;
        font-size: 0.72rem;
        color: #546e7a;
        font-style: italic;
    }

    .field {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .field label {
        font-size: 0.8rem;
        color: #90a4ae;
        width: 60px;
        flex-shrink: 0;
    }

    .field input,
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
    }

    .field input:focus,
    .field select:focus {
        outline: 1px solid #c3e88d;
        border-color: #c3e88d;
    }

    .code-block {
        background: #1a2327;
        border: 1px solid #37474f;
        border-radius: 6px;
        padding: 12px 14px;
        overflow-x: auto;
    }

    .code-block pre {
        margin: 0;
        font-family: 'Fira Mono', 'Consolas', monospace;
        font-size: 0.78rem;
        color: #c3e88d;
        white-space: pre;
        line-height: 1.5;
    }

    .icon-btn {
        background: #1a2327;
        border: 1px solid #37474f;
        color: #cfd8dc;
        border-radius: 6px;
        padding: 5px 9px;
        font-size: 0.88rem;
        cursor: pointer;
        transition:
            background 0.13s,
            border-color 0.13s;
    }

    .icon-btn:hover {
        background: #2e3c43;
        border-color: #546e7a;
        color: #eceff1;
    }

    .copy-btn {
        align-self: flex-end;
        background: #1a2327;
        border: 1px solid #37474f;
        color: #cfd8dc;
        border-radius: 6px;
        padding: 6px 14px;
        font-size: 0.82rem;
        cursor: pointer;
        transition:
            background 0.13s,
            border-color 0.13s;
    }

    .copy-btn:hover {
        background: #2e3c43;
        border-color: #546e7a;
        color: #eceff1;
    }

    .copy-btn.copied {
        border-color: #c3e88d55;
        color: #c3e88d;
    }
</style>
