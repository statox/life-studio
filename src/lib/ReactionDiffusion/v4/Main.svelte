<!--
- Adapt regl sprites.js example to my code base
-  https://regl-project.github.io/regl/www/gallery/sprites.js.html
-->
<script lang="ts">
    import REGL from 'regl';
    import { onMount } from 'svelte';

    const screenDimensions = {
        width: window.innerWidth - 50,
        height: window.innerHeight - 10
    };

    const RADIUS = 2 ** 10;
    const seedRadius = RADIUS * 0.05;

    const INITIAL_CONDITIONS = Array(RADIUS * RADIUS)
        .fill(0)
        .map((_, index) => {
            const y = Math.floor(index / RADIUS);
            const x = index % RADIUS;
            const dist = Math.hypot(RADIUS / 2 - x, RADIUS / 2 - y);
            if (dist < seedRadius) {
                return [0, 1, 0, 1];
            }

            if (Math.random() < 0.01) {
                return [0, 1, 0, 1];
            }
            return [1, 0, 0, 1];
        })
        .flat();

    onMount(() => {
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        if (!canvas) {
            throw new Error('Canvas container not ready');
        }
        const regl = REGL({
            extensions: ['OES_texture_float'],
            canvas
        });
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
    float Da = 1.0;
    float Db = 0.5;
    float f = 0.055;
    float k = 0.062;

    float A = texture2D(prevState, uv).r;
    float B = texture2D(prevState, uv).g;

    vec2 L = laplacianDiff();
    float La = L.r;
    float Lb = L.g;

    float newA = A + ((Da * La) - (A * B * B) + (f * (1.0 - A)));
    float newB = B + ((Db * Lb) + (A * B * B) - ((k + f) * B));

    gl_FragColor = vec4(newA, newB, 0, 1);
}`,

            framebuffer: (params: { tick: number }) => state[(params.tick + 1) % 2]
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
                updateLife();
            });
        });
    });
</script>

<canvas id="canvas" width={screenDimensions.width} height={screenDimensions.height}></canvas>

<style>
    #canvas {
        position: absolute;
        right: 25px;
        margin-bottom: 50px;
    }
</style>
