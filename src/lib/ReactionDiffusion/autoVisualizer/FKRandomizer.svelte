<script lang="ts">
    import { base } from '$app/paths';
    import type p5 from 'p5';
    import P5, { type Sketch } from 'p5-svelte';
    import { onDestroy } from 'svelte';

    import { PARAMETERS_CLASSES } from './pearsonClasses';

    interface Props {
        onfkupdated?: (params: { f: number; k: number }) => void;
    }
    let { onfkupdated }: Props = $props();
    let selectedClass = $state(PARAMETERS_CLASSES[0]);

    let isOpen = $state(true);

    const rangeF = [0, 0.12];
    const rangeK = [0.03, 0.07];

    const vertices = [
        { f: 0.1045, k: 0.0553 },
        { f: 0.0829, k: 0.0582 },
        { f: 0.0664, k: 0.0595 },
        { f: 0.0511, k: 0.0594 },
        { f: 0.0307, k: 0.0549 },
        { f: 0.017, k: 0.0467 },
        { f: 0.005, k: 0.0335 },
        { f: 0.0076, k: 0.0472 },
        { f: 0.0166, k: 0.0594 },
        { f: 0.0277, k: 0.0657 },
        { f: 0.046, k: 0.0675 },
        { f: 0.0757, k: 0.0643 },
        { f: 0.0949, k: 0.0594 }
    ];

    const fkToCoords = (params: { f: number; k: number }) => {
        const { f, k } = params;
        const x = _p5.map(k, rangeK[0], rangeK[1], 0, _p5.width);
        const y = _p5.map(f, rangeF[0], rangeF[1], _p5.height, 0);

        return { x, y };
    };

    const drawClasses = (p5: p5) => {
        p5.noStroke();
        const textSizeSave = p5.textSize();
        for (const paramClass of PARAMETERS_CLASSES) {
            const { x, y } = fkToCoords({ f: paramClass.f, k: paramClass.k });
            const isSelected = paramClass.f === selectedClass.f && paramClass.k === selectedClass.k;
            p5.circle(x, y, 3);
            p5.textSize(isSelected ? textSizeSave * 2 : textSizeSave);
            p5.fill(isSelected ? [240, 240, 150] : [255, 255, 255]);
            p5.text(paramClass.name, x - p5.textWidth(paramClass.name) / 2, y - 10);
        }
    };

    const drawTarget = (p5: p5) => {
        p5.noFill();
        p5.stroke('red');
        p5.strokeWeight(1);
        const { x, y } = fkToCoords(selectedClass);
        p5.text('F', 10, y > 10 ? y - 5 : y + 15);
        p5.line(0, y, p5.width, y);

        p5.text('K', x < p5.width - 10 ? x + 5 : x - 15, p5.height - 10);
        p5.line(x, 0, x, p5.height);

        p5.circle(x, y, 10);
    };

    const drawFKText = (p5: p5) => {
        const { f, k } = selectedClass;
        const lineF = `F: ${f.toFixed(4)}`;
        const lineK = `K: ${k.toFixed(4)}`;

        const textSizeSave = p5.textSize();
        const textSize = p5.height * 0.05;
        p5.textStyle(p5.BOLD);
        p5.textSize(textSize);
        p5.fill('white');
        p5.stroke(0);
        p5.strokeWeight(1);
        p5.text(lineF, p5.width * 0.05, p5.textSize());
        p5.text(lineK, p5.width * 0.05, p5.textSize() + p5.textSize() + 6);
        p5.textStyle(p5.NORMAL);
        p5.textSize(textSizeSave);
    };

    const drawBoundingBox = (p5: p5) => {
        for (let i = 0; i < vertices.length; i++) {
            const { x: xa, y: ya } = fkToCoords(vertices[i]);
            const { x: xb, y: yb } = fkToCoords(vertices[(i + 1) % vertices.length]);
            p5.fill('white');
            p5.stroke('white');
            p5.strokeWeight(1);
            p5.circle(xa, ya, 3);
            p5.circle(xb, yb, 3);
            p5.line(xa, ya, xb, yb);
        }
    };

    function constrainPointToPolygon(
        point: [x: number, y: number],
        polygon: [x: number, y: number][]
    ) {
        let inside = false;
        let closestDistance = Infinity;
        let closestPoint = null;
        for (let i = 0; i < polygon.length; i++) {
            const p1 = polygon[i];
            const p2 = polygon[(i + 1) % polygon.length];
            if (point[0] === p1[0] && point[1] === p1[1]) {
                return point;
            }
            const intersect =
                p1[1] > point[1] !== p2[1] > point[1] &&
                point[0] < ((p2[0] - p1[0]) * (point[1] - p1[1])) / (p2[1] - p1[1]) + p1[0];
            if (intersect) {
                inside = !inside;
            }
            const d = distancePointToLine(point, p1, p2);
            if (d < closestDistance) {
                closestDistance = d;
                closestPoint = closestPointOnLine(point, p1, p2);
            }
        }
        if (inside) {
            return point;
        }
        if (!closestPoint) {
            throw new Error('Now closest point found');
        }
        return closestPoint;
    }

    function distancePointToLine(
        point: [x: number, y: number],
        lineStart: [x: number, y: number],
        lineEnd: [x: number, y: number]
    ) {
        const v1 = [lineEnd[0] - lineStart[0], lineEnd[1] - lineStart[1]];
        const v2 = [point[0] - lineStart[0], point[1] - lineStart[1]];
        const dot = v1[0] * v2[0] + v1[1] * v2[1];
        const lenSq = v1[0] * v1[0] + v1[1] * v1[1];
        const param = dot / lenSq;
        let closestPoint;
        if (param < 0) {
            closestPoint = lineStart;
        } else if (param > 1) {
            closestPoint = lineEnd;
        } else {
            closestPoint = [lineStart[0] + param * v1[0], lineStart[1] + param * v1[1]];
        }
        const d = Math.sqrt((point[0] - closestPoint[0]) ** 2 + (point[1] - closestPoint[1]) ** 2);
        return d;
    }

    function closestPointOnLine(
        point: [x: number, y: number],
        lineStart: [x: number, y: number],
        lineEnd: [x: number, y: number]
    ) {
        const v1 = [lineEnd[0] - lineStart[0], lineEnd[1] - lineStart[1]];
        const v2 = [point[0] - lineStart[0], point[1] - lineStart[1]];
        const dot = v1[0] * v2[0] + v1[1] * v2[1];
        const lenSq = v1[0] * v1[0] + v1[1] * v1[1];
        const param = dot / lenSq;
        let closestPoint;
        if (param < 0) {
            closestPoint = lineStart;
        } else if (param > 1) {
            closestPoint = lineEnd;
        } else {
            closestPoint = [lineStart[0] + param * v1[0], lineStart[1] + param * v1[1]];
        }
        return closestPoint;
    }

    const constrainFK = () => {
        const fk: [number, number] = [selectedClass.f, selectedClass.k];
        const polygon = vertices.map((v) => [v.f, v.k] as [number, number]);
        const newFK = constrainPointToPolygon(fk, polygon);
        selectedClass.f = newFK[0];
        selectedClass.k = newFK[1];
    };

    const moveFK = () => {
        let { f, k } = selectedClass;

        const noiseK = _p5.noise(_p5.frameCount * 0.01);
        const noiseF = _p5.noise(5321 + _p5.frameCount * 0.01);
        const smallMove = Math.random() < 0.97;
        const moveCoefficient = smallMove ? 0.001 : 0.01;
        f = f + (noiseF * 2 - 1) * (rangeF[1] - rangeF[0]) * moveCoefficient;
        k = k + (noiseK * 2 - 1) * (rangeK[1] - rangeK[0]) * moveCoefficient;

        selectedClass = {
            f,
            k,
            name: 'custom',
            type: 'manual'
        };
        constrainFK();
        onfkupdated?.(selectedClass);
    };

    let _p5: p5;
    let buttonIsPressed = false;
    const sketch: Sketch = (p5) => {
        _p5 = p5;
        let background: p5.Image;

        p5.setup = async () => {
            background = await p5.loadImage(base + '/parameters_map.png');
            p5.createCanvas(400, 400);
            p5.frameRate(55);
        };

        p5.draw = () => {
            p5.background(255);
            p5.tint(150, 190);
            p5.image(background, 0, 0, p5.width, p5.height);

            drawClasses(p5);
            drawBoundingBox(p5);
            drawTarget(p5);
            drawFKText(p5);

            moveFK();
        };
    };

    const toggleDisplay = () => {
        isOpen = !isOpen;
        if (!isOpen) {
            _p5.remove();
        }
    };

    onDestroy(() => _p5?.remove());
</script>

<div id="container" class:no-cursor={buttonIsPressed}>
    <button class="full-width" id="toggleButton" onclick={toggleDisplay}>
        {isOpen ? 'Close' : 'F/K selection'}
    </button>
    {#if isOpen}
        <div>Select f and k parameters on the map of use a preset</div>
        <select
            class="full-width"
            bind:value={selectedClass}
            onchange={() => onfkupdated?.(selectedClass)}
        >
            {#each PARAMETERS_CLASSES as parametersClass}
                <option value={parametersClass}>
                    {parametersClass.type} - {parametersClass.name} (f/k {parametersClass.f} / {parametersClass.k})
                </option>
            {/each}
        </select>
        <P5 {sketch} />
    {/if}
</div>

<style>
    #container {
        position: fixed;
        bottom: 0;
        left: 25px;
        z-index: 1;
    }
    #toggleButton {
        margin-bottom: 4px;
    }

    .full-width {
        width: 100%;
    }
    .no-cursor {
        cursor: none;
    }
</style>
