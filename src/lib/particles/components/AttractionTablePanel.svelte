<script lang="ts">
    import AttractionTableComponent from '$lib/particles/components/AttractionTableComponent.svelte';
    import TableExportModal from '$lib/particles/components/TableExportModal.svelte';
    import type { AttractionTable } from '$lib/particles/attraction';
    import { getRandomAttractionTable, tables } from '$lib/particles/attraction';

    interface Props {
        attractionTable: AttractionTable;
        onUpdateTable?: (table: AttractionTable) => void;
    }

    let { attractionTable, onUpdateTable }: Props = $props();

    const update = (t: AttractionTable) => onUpdateTable?.(t);

    let showExportModal = $state(false);
</script>

<!-- Attraction table editor (collapsible) -->
<details class="card" open>
    <summary>
        <span class="card-title inline">Attraction table</span>
        <span class="summary-hint">— click to expand</span>
    </summary>
    {#if attractionTable}
        <!-- Preset selector -->
        <div class="table-body">
            <AttractionTableComponent {attractionTable} onUpdateTable={update} />
        </div>
        <br />
        <div class="card preset-card">
            <div class="preset-row">
                <div class="card-title">Preset</div>
                <button
                    class="export-btn"
                    onclick={() => (showExportModal = true)}
                    title="Export current table"
                >
                    ↗ Export
                </button>
            </div>
            <select
                onchange={(e) => {
                    const v = e.currentTarget.value;
                    if (v === '__random__') update(getRandomAttractionTable());
                    else update(JSON.parse(v));
                }}
            >
                <option value="__random__">✦ Random</option>
                {#each tables as t}
                    <option value={JSON.stringify(t.table)}>{t.name} — {t.description}</option>
                {/each}
            </select>
        </div>
    {/if}
</details>

{#if showExportModal}
    <TableExportModal {attractionTable} onclose={() => (showExportModal = false)} />
{/if}

<style>
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

    .card-title.inline {
        display: inline;
        margin-bottom: 0;
    }

    /* ── Preset card ─────────────────────────── */
    .preset-card select {
        width: 100%;
        background: #1a2327;
        border: 1px solid #37474f;
        border-radius: 6px;
        color: #eceff1;
        padding: 7px 10px;
        font-size: 0.82rem;
        cursor: pointer;
        appearance: auto;
    }

    .preset-card select:focus {
        outline: 1px solid #c3e88d;
        border-color: #c3e88d;
    }

    /* ── Preset row ───────────────────────────── */
    .preset-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 8px;
    }

    .preset-row .card-title {
        margin-bottom: 0;
    }

    /* ── Collapsible attraction table ────────── */
    details > summary {
        cursor: pointer;
        list-style: none;
        display: flex;
        align-items: center;
        gap: 0;
        user-select: none;
    }

    details > summary::-webkit-details-marker {
        display: none;
    }

    .summary-hint {
        font-size: 0.72rem;
        color: #455a64;
        margin-left: 6px;
    }

    details[open] .summary-hint {
        display: none;
    }

    .table-body {
        margin-top: 14px;
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
        transition:
            background 0.13s,
            border-color 0.13s;
        display: flex;
        align-items: center;
        gap: 6px;
    }

    button:hover {
        background: #2e3c43;
        border-color: #546e7a;
        color: #eceff1;
    }

    .export-btn {
        font-size: 0.75rem;
        padding: 4px 9px;
        color: #90a4ae;
    }
</style>
