<script lang="ts">
    import {
        getMutatedAttractionTable,
        getRandomAttractionTable,
        getUpdatedAttractionTable,
        getZeroedAttractionTable,
        ATTRACTION_MIN,
        ATTRACTION_MAX,
        ATTRACTION_STEP,
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
        const t = Math.max(0, Math.min(1, (val + 2) / 4));
        let r: number, g: number, b: number;
        if (t < 0.5) {
            const u = t / 0.5;
            r = 139 + (55 - 139) * u;
            g = 58 + (71 - 58) * u;
            b = 58 + (79 - 58) * u;
        } else {
            const u = (t - 0.5) / 0.5;
            r = 55 + (45 - 55) * u;
            g = 71 + (94 - 71) * u;
            b = 79 + (58 - 79) * u;
        }
        return `rgb(${Math.round(r)},${Math.round(g)},${Math.round(b)})`;
    };

    const valueLabel = (val: number): string => (val > 0 ? '+' : '') + val.toFixed(1);

    // ── Drag interaction ──────────────────────
    let dragging: {
        selfColor: Color;
        otherColor: Color;
        startX: number;
        startVal: number;
    } | null = $state(null);

    const onPointerDown = (e: PointerEvent, selfColor: Color, otherColor: Color) => {
        if (readonly) return;
        const target = e.currentTarget as HTMLElement;
        target.setPointerCapture(e.pointerId);
        dragging = {
            selfColor,
            otherColor,
            startX: e.clientX,
            startVal: attractionTable[selfColor][otherColor]
        };
    };

    const onPointerMove = (e: PointerEvent) => {
        if (!dragging) return;
        const dx = e.clientX - dragging.startX;
        const steps = Math.round(dx / 16);
        const newVal =
            Math.round(
                Math.max(
                    ATTRACTION_MIN,
                    Math.min(ATTRACTION_MAX, dragging.startVal + steps * ATTRACTION_STEP)
                ) * 10
            ) / 10;
        if (newVal !== attractionTable[dragging.selfColor][dragging.otherColor]) {
            onUpdateTable(
                getUpdatedAttractionTable(
                    attractionTable,
                    dragging.selfColor,
                    dragging.otherColor,
                    newVal
                )
            );
        }
    };

    const onPointerUp = () => {
        dragging = null;
    };

    // ── Bulk actions ──────────────────────────
    const randomizeTable = () => onUpdateTable(getRandomAttractionTable());
    const zeroTable = () => onUpdateTable(getZeroedAttractionTable());
    const mutateTable = () => onUpdateTable(getMutatedAttractionTable(attractionTable));
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
                    {#if readonly || compact}
                        <div
                            class="swatch"
                            style="background:{valueColor(val)}"
                            title="{selfColor} → {otherColor}: {valueLabel(val)}"
                        >
                            {compact ? ' ' : valueLabel(val)}
                        </div>
                    {:else}
                        <!-- svelte-ignore a11y_no_static_element_interactions -->
                        <div
                            class="swatch interactive"
                            class:dragging={dragging?.selfColor === selfColor &&
                                dragging?.otherColor === otherColor}
                            style="background:{valueColor(val)}"
                            title="Drag horizontally to adjust · {selfColor} → {otherColor}"
                            onpointerdown={(e) => onPointerDown(e, selfColor, otherColor)}
                            onpointermove={onPointerMove}
                            onpointerup={onPointerUp}
                            onlostpointercapture={onPointerUp}
                        >
                            {valueLabel(val)}
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
        font-size: 0.7rem;
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

    .swatch {
        border: none;
        border-radius: 4px;
        height: 34px;
        min-height: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0.72rem;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.92);
        text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
        transition: filter 0.12s;
    }

    .swatch.interactive {
        cursor: ew-resize;
        touch-action: none;
        user-select: none;
    }

    .swatch.interactive:hover,
    .swatch.dragging {
        filter: brightness(1.25);
    }
</style>
