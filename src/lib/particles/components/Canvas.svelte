<script lang="ts">
    /*
     * This component is made to replace P5-svelte to improve performences
     * It uses the technic described by https://stackoverflow.com/a/13916313
     * to draw the circles only once in an offscreen buffer and then copy them
     * to the actual canvas.
     */

    import { onMount } from 'svelte';
    import { linearMap } from '$lib/particles/attraction';
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

    let canvas: HTMLCanvasElement;
    let off: HTMLCanvasElement | undefined;
    const backgroundColor = '#000000';
    const n = COLORS.length;
    const r = cellSize;
    const d = r * 2;

    let fpsInterval = 1000 / maxFPS;
    let then = 0;

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

        const cw = canvas.width;
        const ch = canvas.height;
        const wsx = worldSize.x;
        const wsy = worldSize.y;

        for (let i = 0; i < numParticles; i++) {
            const x = Math.floor(linearMap(positions[i * 2], 0, wsx, 0, cw));
            const y = Math.floor(linearMap(positions[i * 2 + 1], 0, wsy, 0, ch));
            const c = showColors ? colorIndices[i] : 0;
            ctx.drawImage(off, c * d, 0, d, d, x - r, y - r, d, d);
        }
        drewFrame();
    }

    onMount(() => {
        canvas.width = 1600;
        canvas.height = 960;

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
