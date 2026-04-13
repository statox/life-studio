<script lang="ts">
    import { COLORS, PARTICLE_COLORS } from '$lib/particles/engine';
    import type { WorldSettings } from '$lib/particles/engine/types';

    interface Props {
        settings: WorldSettings;
        readonly?: boolean;
        onChange?: (() => void) | undefined;
    }

    let { settings = $bindable(), readonly = false, onChange = undefined }: Props = $props();

    const emit = () => {
        if (onChange) onChange();
    };

    const particlePresets = [
        { label: 'Low', value: 4000 },
        { label: 'Medium', value: 8000 },
        { label: 'Big', value: 12000 }
    ] as const;

    const gridPresets = [
        { label: 'Small', h: 10, v: 7 },
        { label: 'Medium', h: 30, v: 20 },
        { label: 'Large', h: 90, v: 60 }
    ] as const;

    const setParticles = (n: number) => {
        settings.nbParticles = n;
        emit();
    };

    const setGrid = (h: number, v: number) => {
        settings.horizontalResolution = h;
        settings.verticalResolution = v;
        emit();
    };

    let advanced = $state(false);
</script>

<div class="world-settings">
    {#if !readonly}
        <div class="toggle-row">
            <button class="toggle-btn" class:active={!advanced} onclick={() => (advanced = false)}
                >Presets</button
            >
            <button class="toggle-btn" class:active={advanced} onclick={() => (advanced = true)}
                >Advanced</button
            >
        </div>
    {/if}

    {#if advanced && !readonly}
        <div class="field">
            <label for="ws-particles">Particles</label>
            <input
                id="ws-particles"
                type="number"
                bind:value={settings.nbParticles}
                onchange={emit}
                min="1"
            />
        </div>
        <div class="field">
            <label for="ws-hcells">H cells</label>
            <input
                id="ws-hcells"
                type="number"
                bind:value={settings.horizontalResolution}
                onchange={emit}
                min="1"
                max="100"
            />
            <span class="dim">{settings.horizontalResolution * settings.maxAttractionRadius}px</span
            >
        </div>
        <div class="field">
            <label for="ws-vcells">V cells</label>
            <input
                id="ws-vcells"
                type="number"
                bind:value={settings.verticalResolution}
                onchange={emit}
                min="1"
                max="100"
            />
            <span class="dim">{settings.verticalResolution * settings.maxAttractionRadius}px</span>
        </div>
        <div class="field">
            <label for="ws-radius">Max radius</label>
            <input
                id="ws-radius"
                type="number"
                bind:value={settings.maxAttractionRadius}
                onchange={emit}
                min="8"
                max="128"
            />
        </div>
    {:else}
        <div class="field">
            <span class="label">Particles</span>
            <span class="ro-value">{settings.nbParticles}</span>
            {#if !readonly}
                <div class="preset-btns">
                    {#each particlePresets as p}
                        <button
                            class="preset-btn"
                            class:active={settings.nbParticles === p.value}
                            onclick={() => setParticles(p.value)}>{p.label}</button
                        >
                    {/each}
                </div>
            {/if}
        </div>
        <div class="field">
            <span class="label">Grid</span>
            <span class="ro-value"
                >{settings.horizontalResolution}x{settings.verticalResolution}</span
            >
            {#if !readonly}
                <div class="preset-btns">
                    {#each gridPresets as g}
                        <button
                            class="preset-btn"
                            class:active={settings.horizontalResolution === g.h &&
                                settings.verticalResolution === g.v}
                            onclick={() => setGrid(g.h, g.v)}>{g.label}</button
                        >
                    {/each}
                </div>
            {/if}
        </div>
    {/if}
    <div class="field">
        <label for="ws-friction">Friction</label>
        <input
            id="ws-friction"
            type="range"
            bind:value={settings.friction}
            onchange={emit}
            min="0"
            max="1"
            step="0.01"
            disabled={readonly}
        />
        <span class="dim">{settings.friction.toFixed(2)}</span>
    </div>

    <div class="section-label">Color weights</div>
    <div class="proportion-list">
        {#each COLORS as c}
            <div class="field">
                <span class="pdot" style="background:{PARTICLE_COLORS[c]}"></span>
                <input
                    type="range"
                    bind:value={settings.colorWeights[c]}
                    onchange={emit}
                    min="0"
                    max="1000"
                    step="1"
                    disabled={readonly}
                />
                <span class="dim" style="width:28px;text-align:right"
                    >{settings.colorWeights[c]}</span
                >
            </div>
        {/each}
    </div>
</div>

<style>
    .world-settings {
        display: flex;
        flex-direction: column;
    }

    /* ── Toggle ─────────────────────────────── */
    .toggle-row {
        display: flex;
        gap: 4px;
        margin-bottom: 10px;
    }

    .toggle-btn {
        background: #1a2327;
        border: 1px solid #37474f;
        border-radius: 5px;
        color: #90a4ae;
        padding: 3px 12px;
        font-size: 0.72rem;
        cursor: pointer;
        transition:
            background 0.13s,
            border-color 0.13s;
    }

    .toggle-btn:hover {
        background: #263238;
    }

    .toggle-btn.active {
        background: #263238;
        border-color: #c3e88d;
        color: #c3e88d;
    }

    /* ── Fields ──────────────────────────────── */
    .field {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 4px 8px;
        margin-bottom: 7px;
    }

    .field:last-child {
        margin-bottom: 0;
    }

    .field label,
    .field .label {
        font-size: 0.8rem;
        color: #90a4ae;
        width: 55px;
        flex-shrink: 0;
    }

    .field input[type='number'] {
        flex: 1;
        background: #1a2327;
        border: 1px solid #37474f;
        border-radius: 5px;
        color: #eceff1;
        padding: 5px 8px;
        font-size: 0.82rem;
        max-width: 90px;
    }

    .field input[type='range'] {
        flex: 1;
        min-width: 0;
        accent-color: #c3e88d;
    }

    .field input:focus {
        outline: 1px solid #c3e88d;
        border-color: #c3e88d;
    }

    .ro-value {
        font-size: 0.82rem;
        color: #b0bec5;
    }

    .preset-btns {
        display: flex;
        flex-wrap: wrap;
        gap: 4px;
    }

    .preset-btn {
        background: #1a2327;
        border: 1px solid #37474f;
        border-radius: 5px;
        color: #b0bec5;
        padding: 3px 8px;
        font-size: 0.75rem;
        cursor: pointer;
        transition:
            background 0.13s,
            border-color 0.13s;
    }

    .preset-btn:hover {
        background: #263238;
        border-color: #546e7a;
    }

    .preset-btn.active {
        background: #263238;
        border-color: #c3e88d;
        color: #c3e88d;
    }

    .dim {
        font-size: 0.7rem;
        color: #aeafb0;
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

    .proportion-list {
        margin-top: 4px;
    }

    .pdot {
        width: 8px;
        height: 8px;
        border-radius: 50%;
        flex-shrink: 0;
    }
</style>
