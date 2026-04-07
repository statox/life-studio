<script lang="ts">
    import {
        getCycledUpAttractionTable,
        getDecreasedAttractionTable,
        getIncreasedAttractionTable,
        getMutatedAttractionTable,
        getRandomAttractionTable,
        getZeroedAttractionTable,
        type AttractionTable
    } from '$lib/particles/attraction';
    import { COLORS, type Color, PARTICLE_COLORS } from '$lib/particles/engine';

    interface Props {
        attractionTable: AttractionTable;
        onUpdateTable?: (attractionTable: AttractionTable) => void;
        readonly?: boolean;
        compact?: boolean;
        hiddenColors?: Color[];
    }

    let {
        attractionTable,
        onUpdateTable = () => null,
        readonly = false,
        compact = false,
        hiddenColors = []
    }: Props = $props();

    let visibleColors = $derived(COLORS.filter((c) => !hiddenColors.includes(c)));

    const valueColor = (val: number): string => {
        if (val <= -2) return '#8b3a3a';
        if (val === -1) return '#a15252';
        if (val === 0) return '#37474f';
        if (val === 1) return '#4a7c59';
        return '#2d5e3a';
    };

    const valueLabel = (val: number): string => (val > 0 ? `+${val}` : `${val}`);

    const cycleUp = (selfColor: Color, otherColor: Color) => {
        onUpdateTable(getCycledUpAttractionTable(attractionTable, selfColor, otherColor));
    };

    const increase = (selfColor: Color, otherColor: Color) => {
        onUpdateTable(getIncreasedAttractionTable(attractionTable, selfColor, otherColor));
    };

    const decrease = (selfColor: Color, otherColor: Color) => {
        onUpdateTable(getDecreasedAttractionTable(attractionTable, selfColor, otherColor));
    };

    const randomizeTable = () => {
        onUpdateTable(getRandomAttractionTable());
    };

    const zeroTable = () => {
        onUpdateTable(getZeroedAttractionTable());
    };

    const mutateTable = () => {
        onUpdateTable(getMutatedAttractionTable(attractionTable));
    };
</script>

{#if attractionTable}
    {#if !readonly}
        <div class="actions">
            <button onclick={randomizeTable}>Randomize</button>
            <button onclick={zeroTable}>Zero</button>
            <button onclick={mutateTable}>Mutate</button>
        </div>
    {/if}

    <div class="scroll-wrap">
        <div
            class="matrix"
            class:compact
            style="grid-template-columns: auto repeat({visibleColors.length}, 1fr)"
        >
            <!-- Corner cell -->
            <div class="corner">
                {#if !compact}
                    <span class="corner-label">self ↓</span>
                    <span class="corner-label">other →</span>
                {/if}
            </div>
            <!-- Column headers -->
            {#each visibleColors as c}
                <div class="col-header">
                    {#if !compact}<span class="col-label">{c}</span>{/if}
                    <div class="color-bar-h" style="background:{PARTICLE_COLORS[c]}"></div>
                </div>
            {/each}

            <!-- Rows -->
            {#each visibleColors as selfColor}
                <div class="row-header">
                    {#if !compact}<span class="col-label">{selfColor}</span>{/if}
                    <div class="color-bar-v" style="background:{PARTICLE_COLORS[selfColor]}"></div>
                </div>
                {#each visibleColors as otherColor}
                    {@const val = attractionTable[selfColor][otherColor]}
                    {#if readonly}
                        <div
                            class="swatch"
                            style="background:{valueColor(val)}"
                            title="{selfColor} → {otherColor}: {valueLabel(val)}"
                        >
                            {valueLabel(val)}
                        </div>
                    {:else}
                        <div class="cell">
                            <button class="adj" onclick={() => decrease(selfColor, otherColor)}
                                >−</button
                            >
                            <button
                                class="swatch"
                                style="background:{valueColor(val)}"
                                onclick={() => cycleUp(selfColor, otherColor)}
                                title="Click to cycle · {selfColor} → {otherColor}"
                            >
                                {valueLabel(val)}
                            </button>
                            <button class="adj" onclick={() => increase(selfColor, otherColor)}
                                >+</button
                            >
                        </div>
                    {/if}
                {/each}
            {/each}
        </div>
    </div>
{/if}

<style>
    .actions {
        display: flex;
        gap: 6px;
        margin-bottom: 12px;
        flex-wrap: wrap;
    }

    .actions button {
        background: #1e272c;
        border: 1px solid #37474f;
        color: #eceff1;
        border-radius: 6px;
        padding: 5px 12px;
        font-size: 0.8rem;
        cursor: pointer;
        transition: background 0.15s;
    }

    .actions button:hover {
        background: #37474f;
    }

    .scroll-wrap {
        overflow-x: auto;
    }

    .matrix {
        display: grid;
        gap: 4px;
        min-width: 300px;
    }

    .matrix.compact {
        gap: 2px;
        min-width: 0;
        max-width: 400px;
    }

    .matrix.compact .corner {
        width: 6px;
    }

    .matrix.compact .swatch {
        height: auto;
        padding: 2px 0;
        font-size: 0.8rem;
        border-radius: 2px;
        cursor: default;
    }

    .corner {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding-bottom: 6px;
        padding-right: 6px;
    }

    .corner-label {
        font-size: 0.6rem;
        color: #546e7a;
        line-height: 1.4;
    }

    .col-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        padding: 4px 2px;
    }

    .row-header {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        gap: 6px;
    }

    .color-bar-h {
        width: 100%;
        height: 3px;
        border-radius: 2px;
        flex-shrink: 0;
    }

    .color-bar-v {
        width: 3px;
        align-self: stretch;
        border-radius: 2px;
        flex-shrink: 0;
    }

    .matrix.compact .row-header {
        padding-right: 2px;
    }

    .col-label {
        font-size: 0.62rem;
        color: #90a4ae;
        text-transform: capitalize;
    }

    @media (max-width: 640px) {
        .col-label {
            display: none;
        }
    }

    .cell {
        display: grid;
        grid-template-columns: 30% 1fr 30%;
        gap: 0px;
        align-items: stretch;
        justify-content: baseline;
        /* justify-items: center; */
    }

    .adj {
        background: #1e272c;
        border: 1px solid #37474f;
        color: #cfd8dc;
        border-radius: 4px;
        padding: 0;
        cursor: pointer;
        font-size: 1.05rem;
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background 0.12s;
        height: 34px;
    }

    .adj:hover {
        background: #37474f;
    }

    .swatch {
        border: none;
        border-radius: 4px;
        height: 34px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.72rem;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.92);
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
        transition: filter 0.12s;
    }

    .swatch:hover {
        filter: brightness(1.25);
    }
</style>
