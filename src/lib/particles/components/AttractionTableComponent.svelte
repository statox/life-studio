<script lang="ts">
    import {
        getMutatedAttractionTable,
        getRandomAttractionTable,
        getZeroedAttractionTable,
        type AttractionTable
    } from '$lib/particles/attraction';
    import { COLORS, type Color, PARTICLE_COLORS } from '$lib/particles/engine';

    export let attractionTable: AttractionTable;
    export let onUpdateTable: (attractionTable: AttractionTable) => void;

    const valueColor = (val: number): string => {
        if (val <= -2) return '#b71c1c';
        if (val === -1) return '#c62828';
        if (val === 0) return '#37474f';
        if (val === 1) return '#2e7d32';
        return '#1b5e20';
    };

    const valueLabel = (val: number): string => (val > 0 ? `+${val}` : `${val}`);

    const cycleUp = (selfColor: Color, otherColor: Color) => {
        let val = attractionTable[selfColor][otherColor];
        val = val >= 2 ? -2 : val + 1;
        attractionTable[selfColor][otherColor] = val;
        onUpdateTable(attractionTable);
    };

    const increase = (selfColor: Color, otherColor: Color) => {
        const val = attractionTable[selfColor][otherColor];
        if (val < 2) attractionTable[selfColor][otherColor] = val + 1;
        onUpdateTable(attractionTable);
    };

    const decrease = (selfColor: Color, otherColor: Color) => {
        const val = attractionTable[selfColor][otherColor];
        if (val > -2) attractionTable[selfColor][otherColor] = val - 1;
        onUpdateTable(attractionTable);
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
    <div class="actions">
        <button on:click={randomizeTable}>Randomize</button>
        <button on:click={zeroTable}>Zero</button>
        <button on:click={mutateTable}>Mutate</button>
    </div>

    <div class="scroll-wrap">
        <div class="matrix">
            <!-- Corner cell -->
            <div class="corner">
                <span class="corner-label">self ↓</span>
                <span class="corner-label">other →</span>
            </div>
            <!-- Column headers -->
            {#each COLORS as c}
                <div class="col-header">
                    <span class="dot" style="background:{PARTICLE_COLORS[c]}" />
                    <span class="col-label">{c}</span>
                </div>
            {/each}

            <!-- Rows -->
            {#each COLORS as selfColor}
                <div class="row-header">
                    <span class="dot" style="background:{PARTICLE_COLORS[selfColor]}" />
                    <span class="col-label">{selfColor}</span>
                </div>
                {#each COLORS as otherColor}
                    {@const val = attractionTable[selfColor][otherColor]}
                    <div class="cell">
                        <button class="adj" on:click={() => decrease(selfColor, otherColor)}
                            >−</button
                        >
                        <button
                            class="swatch"
                            style="background:{valueColor(val)}"
                            on:click={() => cycleUp(selfColor, otherColor)}
                            title="Click to cycle · {selfColor} → {otherColor}"
                        >
                            {valueLabel(val)}
                        </button>
                        <button class="adj" on:click={() => increase(selfColor, otherColor)}
                            >+</button
                        >
                    </div>
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
        grid-template-columns: auto repeat(4, 1fr);
        gap: 4px;
        min-width: 300px;
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

    .col-header,
    .row-header {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        padding: 4px 2px;
    }

    .row-header {
        flex-direction: row;
        justify-content: flex-end;
        padding-right: 6px;
    }

    .dot {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        flex-shrink: 0;
    }

    .col-label {
        font-size: 0.62rem;
        color: #90a4ae;
        text-transform: capitalize;
    }

    .cell {
        display: grid;
        grid-template-columns: 18px 1fr 18px;
        gap: 2px;
        align-items: stretch;
    }

    .adj {
        background: #1e272c;
        border: 1px solid #37474f;
        color: #cfd8dc;
        border-radius: 4px;
        padding: 0;
        cursor: pointer;
        font-size: 0.95rem;
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
