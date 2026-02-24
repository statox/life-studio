<!--
- Adapt regl sprites.js example to my code base
-  https://regl-project.github.io/regl/www/gallery/sprites.js.html
-->
<script lang="ts">
    import type { GUI } from 'dat.gui';
    import REGL from 'regl';
    import { onDestroy, onMount } from 'svelte';
    import { middleCircleAndRandomSpots, middleSpot, randomSpots } from './initialConditions';
    import { PARAMETERS_CLASSES } from './pearsonClasses';

    const screenDimensions = {
        width: window.innerWidth - 50,
        height: window.innerHeight - 10
    };

    const controls = {
        presetParams: 4,
        initialConditions: 'randomSpots',
        reset: () => initProgram(),
        pause: false
    };

    const info = {
        iteration: 0
    };

    const simulationParameters = {
        f: PARAMETERS_CLASSES[controls.presetParams].f,
        k: PARAMETERS_CLASSES[controls.presetParams].k
    };

    let gui: GUI;
    let regl: REGL.Regl;

    const initGUI = async () => {
        // Imported here to avoid "window is not defined" error
        // https://github.com/dataarts/dat.gui/issues/271
        const dat = await import('dat.gui');
        gui = new dat.GUI();

        gui.domElement.setAttribute('style', 'background-color: black');

        gui.add(simulationParameters, 'f').name('Feed rate').listen();
        gui.add(simulationParameters, 'k').name('Kill rate').listen();

        gui.add(controls, 'pause').name('Pause');
        gui.add(controls, 'reset').name('Reset simulation');

        const presetParamsOptions = PARAMETERS_CLASSES.reduce((options, option, index) => {
            options[option.name] = index;
            return options;
        }, {} as { [name: string]: number });
        gui.add(controls, 'presetParams', presetParamsOptions).onFinishChange(() => {
            simulationParameters.f = PARAMETERS_CLASSES[controls.presetParams].f;
            simulationParameters.k = PARAMETERS_CLASSES[controls.presetParams].k;
        });

        const initialConditionsOptions = {
            'Random spots': 'randomSpots',
            'Middle spot': 'middleSpot',
            'Middle + random': 'middleCircleAndRandomSpots'
        };
        gui.add(controls, 'initialConditions', initialConditionsOptions).onFinishChange(
            controls.reset
        );

        const iterationController = gui.add(info, 'iteration').listen();
        iterationController.domElement.style.pointerEvents = 'none';
    };

    const initEvents = () => {
        document.addEventListener('keydown', (event) => {
            if (event.code === 'Space') {
                controls.pause = !controls.pause;
                return event.preventDefault();
            }
            if (event.code === 'KeyR') {
                initProgram();
                return event.preventDefault();
            }
        });
    };

    const initProgram = () => {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        if (!canvas) {
            throw new Error('Canvas container not ready');
        }
        if (regl) {
            regl.destroy();
        }
        regl = REGL({
            extensions: ['OES_texture_float'],
            canvas
        });

        interface SimProps { Da: number; Db: number; f: number; k: number; }
        const prop = <K extends keyof SimProps>(name: K) => regl.prop<SimProps, K>(name);

        info.iteration = 0;

        const RADIUS = 2 ** 11;

        let INITIAL_CONDITIONS: number[];
        if (controls.initialConditions === 'randomSpots') {
            INITIAL_CONDITIONS = randomSpots(RADIUS, 0.001);
        } else if (controls.initialConditions === 'middleCircleAndRandomSpots') {
            INITIAL_CONDITIONS = middleCircleAndRandomSpots(RADIUS, 0.005, 0.05);
        } else {
            INITIAL_CONDITIONS = middleSpot(RADIUS, 0.02);
        }

        const state = Array(2)
            .fill(0)
            .map(() =>
                regl.framebuffer({
                    color: regl.texture({
                        radius: RADIUS,
                        data: INITIAL_CONDITIONS,
                        wrap: 'repeat',
                        type: 'float'
                    }),
                    depthStencil: false
                })
            );

        const updateLife = regl({
            frag: `
precision mediump float;

uniform sampler2D prevState;
uniform float Da;
uniform float Db;
uniform float f;
uniform float k;

varying vec2 uv;

vec2 laplacianDiff() {
    vec2 r = vec2(0.0, 0.0);

    // top left
    r += texture2D(prevState, uv+vec2(-1,-1)/float(${RADIUS})).rg * 0.05;
    // top
    r += texture2D(prevState, uv+vec2(0,-1)/float(${RADIUS})).rg * 0.2;
    // top right
    r += texture2D(prevState, uv+vec2(1,-1)/float(${RADIUS})).rg * 0.05;

    // left
    r += texture2D(prevState, uv+vec2(-1,0)/float(${RADIUS})).rg * 0.2;
    // middle
    r += texture2D(prevState, uv+vec2(0,0)/float(${RADIUS})).rg * -1.0;
    // right
    r += texture2D(prevState, uv+vec2(1,0)/float(${RADIUS})).rg * 0.2;

    // bottom left
    r += texture2D(prevState, uv+vec2(-1,1)/float(${RADIUS})).rg * 0.05;
    // bottom
    r += texture2D(prevState, uv+vec2(0,1)/float(${RADIUS})).rg * 0.2;
    // bottom right
    r += texture2D(prevState, uv+vec2(1,1)/float(${RADIUS})).rg * 0.05;

    return r;
}

void main() {
    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    vec2 L = laplacianDiff();
    float La = L.r;
    float Lb = L.g;

    float newA = A + ((Da * La) - (A * B * B) + (f * (1.0 - A)));
    float newB = B + ((Db * Lb) + (A * B * B) - ((k + f) * B));

    gl_FragColor = vec4(newA, newB, 0, 1);
}`,

            framebuffer: (params: { tick: number }) => state[(params.tick + 1) % 2],
            uniforms: {
                Da: prop('Da'),
                Db: prop('Db'),
                f: prop('f'),
                k: prop('k')
            }
        });

        const setupQuad = regl({
            frag: `
precision mediump float;
uniform sampler2D prevState;
varying vec2 uv;
void main() {
    vec2 state = texture2D(prevState, uv).rg;
    gl_FragColor = vec4(state, 0, 1);
}`,

            vert: `
precision mediump float;
attribute vec2 position;
varying vec2 uv;
void main() {
    uv = 0.5 * (position + 1.0);
    gl_Position = vec4(position, 0, 1);
}`,

            attributes: {
                position: [-4, -4, 4, -4, 0, 4]
            },

            uniforms: {
                prevState: ({ tick }) => state[tick % 2]
            },

            depth: { enable: false },

            count: 3
        });

        regl.frame(() => {
            setupQuad(() => {
                regl.draw();
                if (controls.pause) {
                    return;
                }
                info.iteration++;
                updateLife({
                    Da: 1,
                    Db: 0.5,
                    ...simulationParameters
                });
            });
        });
    };

    onMount(() => {
        initGUI();
        initEvents();
        initProgram();
    });

    onDestroy(() => {
        gui.destroy();
        regl.destroy();
    });
</script>

<canvas id="canvas" width={screenDimensions.width} height={screenDimensions.height} />

<style>
    #canvas {
        position: absolute;
        right: 25px;
        margin-bottom: 50px;
    }
</style>
