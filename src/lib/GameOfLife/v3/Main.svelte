<script lang="ts">
    import { onDestroy, onMount } from 'svelte';
    import * as webglUtils from './webglUtils';
    import * as drawCells from './drawCells';
    import { getInitialData } from './simulationUtils';
    import * as updateCells from './updateCells';
    import type { InitialCellsMode } from './simulationUtils';
    import type { GUI } from 'dat.gui';

    const mouseCoordinates = { x: 0, y: 0 };
    let mouseMode: updateCells.MouseMode = 0;
    let startTime: number;
    let lastFrameUpdate: number;

    const screenDimensions = {
        width: window.innerWidth - 50,
        height: window.innerHeight - 10
    };
    const pan = {
        x: 0,
        y: 0
    };
    const settings = {
        Pause: false,
        'Infinite source': true,

        Iteration: 0,
        TimeInSeconds: 0,
        fps: 0,
        'Draw mode': 'age_gradiant' as drawCells.DrawingMode,

        'Reset grid': () => resetTexture('random'),
        'Empty grid': () => resetTexture('zero'),
        'Initial density': 0.05,
        'World width': screenDimensions.width,
        'World height': screenDimensions.height,
        Cells: (screenDimensions.width * screenDimensions.height).toString(),

        'Zoom level': 1,
        'Pan reset': () => {
            pan.x = 0;
            pan.y = 0;
        },

        'Reload progam': () => main()
    };

    let gui: GUI;
    const initGUI = async () => {
        // Imported here to avoid "window is not defined" error
        // https://github.com/dataarts/dat.gui/issues/271
        const dat = await import('dat.gui');
        gui = new dat.GUI();
        gui.add(settings, 'Pause').listen();
        gui.add(settings, 'Infinite source').listen();

        gui.add(settings, 'TimeInSeconds').listen();
        gui.add(settings, 'Iteration').listen();
        gui.add(settings, 'fps').listen();
        gui.add(settings, 'Draw mode', {
            White: 'white',
            'Age Gradiant': 'age_gradiant',
            'Position Gradiant': 'gradiant'
        }).onFinishChange(() =>
            drawCells.initProgram(gl, { screenDimensions, mode: settings['Draw mode'] })
        );

        gui.add(settings, 'Reset grid');
        gui.add(settings, 'Empty grid');
        gui.add(settings, 'Initial density', 0, 1, 0.01).onFinishChange(() =>
            resetTexture('random')
        );
        gui.add(settings, 'World width', 1, screenDimensions.width, 1).onFinishChange(() => {
            settings.Cells = (settings['World height'] * settings['World width']).toString();
            resetTexture('random');
        });
        gui.add(settings, 'World height', 1, screenDimensions.height, 1).onFinishChange(() => {
            settings.Cells = (settings['World height'] * settings['World width']).toString();
            resetTexture('random');
        });
        gui.add(settings, 'Cells').listen();

        gui.add(settings, 'Zoom level', 1, 10);
        gui.add(settings, 'Pan reset');

        gui.add(settings, 'Reload progam');
    };

    let gl: WebGLRenderingContext;
    let cellsTex: WebGLTexture;
    let animationFrameRequest: number;
    function main() {
        startTime = Date.now() / 1000;
        cancelAnimationFrame(animationFrameRequest);

        gl = webglUtils.getWebGLContext();

        webglUtils.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);

        const initialData = getInitialData(gl, {
            mode: 'random',
            worldDimensions: { width: settings['World width'], height: settings['World height'] },
            initialDensity: settings['Initial density']
        });
        cellsTex = updateCells.initProgram(gl, {
            cellsTex: initialData.cellsTex,
            texDimensions: { width: settings['World width'], height: settings['World height'] }
        });

        drawCells.initProgram(gl, { screenDimensions, mode: settings['Draw mode'] });

        function render() {
            if (!settings.Pause) {
                const now = Date.now() / 1000;
                const deltaTime = now - lastFrameUpdate;
                settings.fps = 1 / deltaTime;
                lastFrameUpdate = now;

                settings.TimeInSeconds = now - startTime;
                settings.Iteration++;
                cellsTex = updateCells.runProgram({
                    gl,
                    worldDimensions: {
                        width: settings['World width'],
                        height: settings['World height']
                    },
                    screenDimensions,
                    mouseCoordinates,
                    mouseMode,
                    infiniteSource: settings['Infinite source'],
                    iteration: settings.Iteration
                });
            }

            const step = 0.005;
            if (mouseCoordinates.x < 0.1 && pan.x >= step) {
                pan.x -= step;
            }
            if (mouseCoordinates.x > 0.9 && pan.x < 1 - 1 / settings['Zoom level']) {
                pan.x += step;
            }
            if (mouseCoordinates.y < 0.1 && pan.y >= step) {
                pan.y -= step;
            }
            if (mouseCoordinates.y > 0.9 && pan.y < 1 - 1 / settings['Zoom level']) {
                pan.y += step;
            }

            drawCells.runProgram({
                gl,
                cellsTex,
                worldDimensions: {
                    width: settings['World width'],
                    height: settings['World height']
                },
                zoomLevel: settings['Zoom level'],
                pan,
                iteration: settings.Iteration
            });

            return (animationFrameRequest = requestAnimationFrame(render));
        }
        animationFrameRequest = requestAnimationFrame(render);
    }

    onMount(() => {
        main();
        initGUI();

        document.addEventListener('keydown', (event) => {
            if (event.code === 'Space') {
                settings.Pause = !settings.Pause;
                event.preventDefault();
            }
            if (event.code === 'KeyR') {
                resetTexture('random');
                return;
            }
            if (event.code === 'KeyE') {
                resetTexture('zero');
                return;
            }
            if (event.code === 'KeyS') {
                settings['Infinite source'] = !settings['Infinite source'];
                return;
            }
        });

        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        if (!canvas) {
            throw new Error('Canvas unavailable');
        }

        canvas.addEventListener('mousemove', (event) => {
            const rect = canvas.getBoundingClientRect(); // abs. size of element
            const scaleX = canvas.width / rect.width; // relationship bitmap vs. element for x
            const scaleY = canvas.height / rect.height; // relationship bitmap vs. element for y

            const mousePos = {
                x: (event.clientX - rect.left) * scaleX, // scale mouse coordinates after they have
                y: (event.clientY - rect.top) * scaleY // been adjusted to be relative to element
            };

            mouseCoordinates.x = mousePos.x / screenDimensions.width;
            mouseCoordinates.y = mousePos.y / screenDimensions.height;
        });

        canvas.addEventListener('mousedown', (event) => {
            event.preventDefault();
            if (event.button === 0) {
                mouseMode = 1;
            } else if (event.button === 2) {
                mouseMode = 2;
            }
        });

        canvas.addEventListener('mouseup', (event) => {
            event.preventDefault();
            mouseMode = 0;
        });

        canvas.addEventListener('contextmenu', (event) => {
            event.preventDefault();
            return false;
        });
    });

    onDestroy(() => {
        gui.destroy();
    });

    const resetTexture = (mode: InitialCellsMode) => {
        settings.Iteration = 0;
        settings.TimeInSeconds = 0;
        const initialData = getInitialData(gl, {
            mode,
            worldDimensions: { width: settings['World width'], height: settings['World height'] },
            initialDensity: settings['Initial density']
        });
        cellsTex = updateCells.initProgram(gl, {
            cellsTex: initialData.cellsTex,
            texDimensions: { width: settings['World width'], height: settings['World height'] }
        });
    };
</script>

<canvas
    id="canvas"
    style="background-color: black"
    width={screenDimensions.width}
    height={screenDimensions.height}
></canvas>

<style>
    #canvas {
        position: absolute;
        right: 25px;
        margin-bottom: 50px;
    }
</style>
