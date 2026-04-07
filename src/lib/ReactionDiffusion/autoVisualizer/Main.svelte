<script lang="ts">
    import { preventDefault } from 'svelte/legacy';

    import FkRandomizer from './FKRandomizer.svelte';
    import type { GUI } from 'dat.gui';
    import type REGL from 'regl';
    import { onDestroy, onMount } from 'svelte';
    import { PARAMETERS_CLASSES } from './pearsonClasses';
    import { initProgram } from './webgl';
    import type { Controls, MouseState, SimulationInfo, SimulationParameters } from './types';

    const screenDimensions = {
        width: Math.min(window.innerWidth, window.innerHeight) * 0.9,
        height: Math.min(window.innerWidth, window.innerHeight) * 0.9
    };

    const controls: Controls = {
        colors: 'A_transform_seismic',
        initialConditions: 'middleCircleAndRandomSpots',
        reset: () => reset(),
        pause: false,
        grid: false,
        pen: false,
        speed: 50
    };

    const mouseState: MouseState = {
        pressedLeft: false,
        pressedRight: false,
        x: 0,
        y: 0,
        penSize: 3,
        penDensity: 0.3,
        zoomLevel: 1,
        panX: 0.5,
        panY: 0.5
    };

    const info: SimulationInfo = $state({
        iteration: 0,
        worldSize: 8 // Used as a power of 2
    });

    // Dummy initialization, changes are handled by FKRandomizer
    const simulationParameters: SimulationParameters = {
        f: PARAMETERS_CLASSES[0].f,
        k: PARAMETERS_CLASSES[0].k
    };

    let gui: GUI;
    let regl: REGL.Regl;

    const initGUI = async () => {
        // Imported here to avoid "window is not defined" error
        // https://github.com/dataarts/dat.gui/issues/271
        const dat = await import('dat.gui');
        gui = new dat.GUI({ autoPlace: false, closeOnTop: true });

        gui.domElement.id = 'datgui';
        const guiContainer = document.getElementById('datgui-container');
        if (!guiContainer) {
            throw new Error('Gui container not ready');
        }
        guiContainer.appendChild(gui.domElement);

        gui.add(controls, 'pause').name('Pause');
        gui.add(controls, 'grid').name('Debug grid');
        gui.add(controls, 'pen').name('Show pen');
        gui.add(controls, 'reset').name('Reset simulation');

        gui.add(controls, 'colors', [
            'grayscale',
            'blackwhite',
            'whiteblack',
            'raw',
            'timebasedblue',
            'lerp',
            'mrob',
            'redblue',
            'A_gradiant1',
            'A_gradiant2',
            'A_MATLAB_cool',
            'A_IDL_CB_RdBu',
            'A_IDL_CB_RdYiBu',
            'A_IDL_CB_BuYiRd',
            'A_transform_seismic',
            'B_IDL_CB_RdYiBu'
        ]).name('Color scheme');

        const initialConditionsOptions = {
            'Random spots': 'randomSpots',
            'Middle spot': 'middleSpot',
            'Middle + random': 'middleCircleAndRandomSpots',
            Empty: 'empty'
        };
        gui.add(controls, 'initialConditions', initialConditionsOptions)
            .onFinishChange(controls.reset)
            .name('Initial conditions');

        const iterationController = gui.add(info, 'iteration').listen();
        iterationController.domElement.style.pointerEvents = 'none';
        gui.add(controls, 'speed', 1, 200).name('Simulation speed').listen();

        gui.add(mouseState, 'penSize', 0, info.worldSize).name('Pen size').listen();
        gui.add(mouseState, 'penDensity', 0, 1).name('Pen density');

        gui.add(mouseState, 'zoomLevel', 0, 1).name('Zoom level').listen();
        gui.add(mouseState, 'panX', 0, 1).name('pan x').listen();
        gui.add(mouseState, 'panY', 0, 1).name('pan y').listen();
    };

    const handleKeydown = (event: KeyboardEvent) => {
        if (event.code === 'Space') {
            controls.pause = !controls.pause;
            event.preventDefault();
            return;
        }
        if (event.code === 'KeyR' && !event.getModifierState('Control')) {
            reset();
            event.preventDefault();
            return;
        }
    };

    let autoclickInterval: ReturnType<typeof setTimeout>;
    const randomClick = () => {
        mouseState.x = Math.random();
        mouseState.y = Math.random();
        mouseState.penSize = Math.random() * 3;
        mouseState.pressedLeft = true;
        setTimeout(() => (mouseState.pressedLeft = false), 500);
        autoclickInterval = setTimeout(randomClick, Math.random() * 5000);
    };

    const reset = () => {
        if (isNaN(info.worldSize)) {
            return;
        }
        if (info.worldSize > 11) {
            info.worldSize = 11;
        }
        if (info.worldSize < 1) {
            info.worldSize = 1;
        }
        if (gui) {
            document.getElementById(gui.domElement.id)?.remove();
            gui.destroy();
        }
        regl?.destroy();

        initGUI();
        regl = initProgram({ controls, info, mouseState, simulationParameters });

        if (autoclickInterval) {
            clearTimeout(autoclickInterval);
        }
        randomClick();
    };

    const onSimulationParamsUpdate = (params: { f: number; k: number }) => {
        simulationParameters.f = params.f;
        simulationParameters.k = params.k;

        if (simulationParameters.f > 0.03) {
            controls.speed = 50;
        } else {
            controls.speed = 2;
        }
    };

    onMount(() => {
        reset();
    });

    onDestroy(() => {
        gui.destroy();
        regl.destroy();
    });
</script>

<svelte:window onkeydown={handleKeydown} />
<main>
    <FkRandomizer onfkupdated={onSimulationParamsUpdate} />
    <div id="datgui-container"></div>

    <div>
        <label for="worldSize">World Size:</label>
        <input
            id="worldSize"
            bind:value={info.worldSize}
            type="number"
            step="1"
            onchange={reset}
        />
        <span>({2 ** info.worldSize} x {2 ** info.worldSize} : {2 ** (info.worldSize + 1)})</span>
    </div>
    <canvas
        oncontextmenu={preventDefault((e) => e)}
        id="canvas"
        width={screenDimensions.width}
        height={screenDimensions.height}
></canvas>
</main>

<style>
    #canvas {
        position: absolute;
        margin-bottom: 50px;
        cursor: none;
    }

    #datgui-container {
        position: fixed;
        bottom: 1em;
        right: 25px;
        z-index: 1;
    }
</style>
