<script lang="ts">
    import { run } from 'svelte/legacy';

    import type { PerfData } from '$lib/particles/engine/types';

    type PerfReport = PerfData & { total: number };
    interface Props {
        enginePerf?: PerfData | null;
        renderMs?: number | null;
    }

    let { enginePerf = null, renderMs = null }: Props = $props();
    let history: PerfReport[] = $state([]);
    let lastRecordedFrame = $state(-1);

    type PerfRow = { label: string; value: number };

    // Separate reactive block for history — only reacts to enginePerf changes
    run(() => {
        if (enginePerf && enginePerf.frame !== lastRecordedFrame) {
            if (history.length && enginePerf.frame <= history[history.length - 1]?.frame) {
                history = [];
            }
            history.push({
                ...enginePerf,
                total: enginePerf.grid + enginePerf.force + enginePerf.update + enginePerf.interleave
            });
            lastRecordedFrame = enginePerf.frame;
        }
    });

    let rows = $derived((() => {
        const r: PerfRow[] = [];
        if (enginePerf) {
            r.push({ label: 'Grid', value: enginePerf.grid });
            r.push({ label: 'Force', value: enginePerf.force });
            r.push({ label: 'Update', value: enginePerf.update });
            r.push({ label: 'Interleave', value: enginePerf.interleave });
        }
        if (renderMs != null) {
            r.push({ label: 'Render', value: renderMs });
        }
        r.sort((a, b) => b.value - a.value);
        return r;
    })());

    let total = $derived(rows.length > 0 ? rows.reduce((s, r) => s + r.value, 0) : null);

    let copied = $state(false);
    const copyStats = () => {
        const lines = history
            .map((r) => {
                const lines: string[] = [];
                lines.push(`Frame: ${r.frame.toString().padStart(5, ' ')}`);
                lines.push(`Force: ${r.force.toFixed(2).padStart(6, ' ')}`);
                lines.push(`Grid:\t${r.grid.toFixed(2)}`);
                lines.push(`Update:\t${r.update.toFixed(2)}`);
                lines.push(`Interleave:\t${r.interleave.toFixed(2)}`);
                lines.push(`Total:\t${r.total.toFixed(2)}`);
                return lines.join('\t');
            })
            .join('\n');
        navigator.clipboard.writeText(lines);
        copied = true;
        setTimeout(() => (copied = false), 1500);
    };
</script>

<div class="perf">
    {#each rows as r}
        <div class="row">
            <span class="label">{r.label}</span><span class="val">{r.value.toFixed(2)}</span>
        </div>
    {/each}
    {#if total != null}
        <div class="sep"></div>
        <div class="row total">
            <span class="label">Total</span><span class="val">{total.toFixed(2)} ms</span>
        </div>
    {/if}
    {#if enginePerf}
        <div class="row particles">
            <span class="label">Particles</span><span class="val">{enginePerf.particles}</span>
        </div>
        <div class="row particles">
            <span class="label">Frame</span><span class="val">{enginePerf.frame}</span>
        </div>
    {/if}
    {#if rows.length === 0}
        <span class="dim">Waiting for data...</span>
    {:else}
        <button class="copy-btn" onclick={copyStats}>{copied ? 'Copied!' : 'Copy'}</button>
    {/if}
</div>

<style>
    .perf {
        font-family: monospace;
        font-size: 0.78rem;
        color: #90a4ae;
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    .row {
        display: flex;
        justify-content: space-between;
        gap: 12px;
    }

    .label {
        color: #78909c;
    }

    .val {
        color: #cfd8dc;
        text-align: right;
    }

    .sep {
        border-top: 1px solid #37474f;
        margin: 2px 0;
    }

    .total .val {
        color: #c3e88d;
    }

    .particles {
        margin-top: 4px;
    }

    .particles .val {
        color: #90a4ae;
    }

    .dim {
        color: #546e7a;
        font-size: 0.75rem;
    }

    .copy-btn {
        margin-top: 6px;
        align-self: flex-end;
        background: #1a2327;
        border: 1px solid #37474f;
        color: #78909c;
        border-radius: 4px;
        padding: 2px 10px;
        font-size: 0.72rem;
        cursor: pointer;
        font-family: monospace;
        transition: background 0.13s, border-color 0.13s;
    }

    .copy-btn:hover {
        background: #2e3c43;
        border-color: #546e7a;
        color: #cfd8dc;
    }
</style>
