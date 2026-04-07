<script lang="ts">
    import { base } from '$app/paths';
    import type p5 from 'p5';
    import P5, { type Sketch } from 'p5-svelte';
    import { onDestroy, createEventDispatcher } from 'svelte';

    import { PARAMETERS_CLASSES } from './pearsonClasses';

    const dispatch = createEventDispatcher<{ fkupdated: { f: number; k: number } }>();
    let selectedClass = $state(PARAMETERS_CLASSES[0]);

    let isOpen = $state(true);

    const rangeF = [0, 0.12];
    const rangeK = [0.03, 0.07];

    const fkToCoords = (params: { f: number; k: number }) => {
        const { f, k } = params;
        const x = _p5.map(k, rangeK[0], rangeK[1], 0, _p5.width);
        const y = _p5.map(f, rangeF[0], rangeF[1], _p5.height, 0);

        return { x, y };
    };
    const coordsToFk = (params: { x: number; y: number }) => {
        const { x, y } = params;

        const f = _p5.map(y, _p5.height, 0, rangeF[0], rangeF[1]);
        const k = _p5.map(x, 0, _p5.width, rangeK[0], rangeK[1]);

        return { f, k };
    };
    const readMouse = (p5: p5) => {
        const x = p5.mouseX;
        const y = p5.mouseY;
        if (x < 0 || y < 0 || x > p5.width || y > p5.height) {
            return;
        }
        const { f, k } = coordsToFk({ x: p5.mouseX, y: p5.mouseY });
        selectedClass = {
            f,
            k,
            name: 'custom',
            type: 'manual'
        };
        dispatch('fkupdated', selectedClass);
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

    let _p5: p5;
    let buttonIsPressed = $state(false);
    const sketch: Sketch = (p5) => {
        _p5 = p5;
        let background: p5.Image;
        p5.preload = () => {
            // Images from https://www.mrob.com
            // background = p5.loadImage('/pearsons-parameter-map.jpg');
            // background = p5.loadImage(base + '/pearson-space.png');
            // background = p5.loadImage(base + '/my_parameters_map.png');
            background = p5.loadImage(base + '/parameters_map.png');
        };

        p5.setup = () => {
            p5.createCanvas(400, 400);
            p5.frameRate(55);
        };

        p5.draw = () => {
            p5.background(255);
            p5.tint(150, 190);
            p5.image(background, 0, 0, p5.width, p5.height);

            drawClasses(p5);
            drawTarget(p5);
            drawFKText(p5);

            buttonIsPressed = false;
            if (p5.mouseIsPressed) {
                readMouse(p5);
                buttonIsPressed = true;
            }
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
            onchange={() => dispatch('fkupdated', selectedClass)}
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
