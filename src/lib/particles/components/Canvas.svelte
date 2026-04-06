<script lang="ts">
    /*
     * This component is made to replace P5-svelte to improve performences
     * It uses the technic described by https://stackoverflow.com/a/13916313
     * to draw the circles only once in an offscreen buffer and then copy them
     * to the actual canvas.
     */

    import { onMount } from 'svelte';
    import { COLORS, PARTICLE_COLORS } from '../engine';
    import type { Coordinates } from '../engine';

    export let cellSize: number;
    export let positions: Float32Array | null;
    export let colorIndices: Uint8Array;
    export let numParticles: number;
    export let worldSize: Coordinates;
    export let drewFrame: () => void;
    export let showColors: boolean;
    export let maxFPS = 25;
    export let onRenderPerf: ((ms: number) => void) | undefined = undefined;

    let canvas: HTMLCanvasElement;
    let off: HTMLCanvasElement | undefined;
    const backgroundColor = '#000000';
    const n = COLORS.length;

    $: r = cellSize || 2;
    $: d = r * 2;

    let fpsInterval = 1000 / maxFPS;
    let then = 0;
    let _renderCount = 0;
    let _tRender = 0;

    $: fpsInterval = 1000 / maxFPS;

    function draw() {
        if (!canvas || !off) return;
        window.requestAnimationFrame(draw);

        const now = Date.now();
        const elapsed = now - then;
        if (elapsed <= fpsInterval) return;
        then = now - (elapsed % fpsInterval);

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (!positions || numParticles === 0) return;

        // Scale factors to map world coordinates [0, worldSize] to canvas
        // pixel coordinates [0, canvasSize]. Pre-computed once per frame so
        // the inner loop only needs a single multiply per axis instead of
        // calling linearMap() (which involves extra arithmetic and clamping).
        const sx = canvas.width / worldSize.x;
        const sy = canvas.height / worldSize.y;

        const tR0 = performance.now();
        for (let i = 0; i < numParticles; i++) {
            // `| 0` truncates to integer (equivalent to Math.floor for
            // positive numbers) — it's a common JS micro-optimisation that
            // avoids a function call in this hot loop.
            const x = (positions[i * 2] * sx) | 0;
            const y = (positions[i * 2 + 1] * sy) | 0;
            const c = showColors ? colorIndices[i] : 0;
            ctx.drawImage(off, c * d, 0, d, d, x - r, y - r, d, d);
        }
        const tR1 = performance.now();
        _renderCount++;
        _tRender += tR1 - tR0;
        if (_renderCount >= 120) {
            if (onRenderPerf) onRenderPerf(_tRender / _renderCount);
            _tRender = 0;
            _renderCount = 0;
        }
        drewFrame();
    }

    const createOffsetPoints = (d: number) => {
        if (typeof document === 'undefined') {
            return;
        }
        off = document.createElement('canvas');
        off.width = n * d;
        off.height = d;
        const offCtx = off.getContext('2d');
        if (!offCtx) throw new Error('Offscreen canvas context unavailable');

        for (let i = 0; i < n; i++) {
            offCtx.fillStyle = PARTICLE_COLORS[COLORS[i]];
            offCtx.beginPath();
            offCtx.arc(i * d + r, r, r, 0, 2 * Math.PI);
            offCtx.closePath();
            offCtx.fill();
        }
    };
    $: createOffsetPoints(d);

    onMount(() => {
        canvas.width = 1600;
        canvas.height = 960;

        createOffsetPoints(d);

        then = Date.now();
        window.requestAnimationFrame(draw);
    });
</script>

<canvas bind:this={canvas} />

<style>
    canvas {
        width: 100%;
        max-width: 1600px;
        aspect-ratio: 5 / 3;
        display: block;
        border-radius: 10px;
    }
</style>
