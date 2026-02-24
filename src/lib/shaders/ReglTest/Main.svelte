<!--
 - Adapt regl sprites.js example to my code base
 -  https://regl-project.github.io/regl/www/gallery/sprites.js.html
-->
<script lang="ts">
    import REGL from 'regl';
    // import mouse from 'mouse-change';

    interface DrawSpritesProps {
        count: number;
    }
    const regl = REGL({
        extensions: ['OES_texture_float']
    });

    const N = 512;
    const BLOCK_SIZE = 64;

    const SPRITES = Array(2)
        .fill(0)
        .map(() =>
            regl.framebuffer({
                radius: N,
                colorType: 'float',
                depthStencil: false
            })
        );

    const updateSprites = regl({
        vert: `
  precision mediump float;
  attribute vec2 position;
  void main () {
    gl_Position = vec4(position, 0, 1);
  }
  `,

        frag: `
  precision highp float;
  uniform sampler2D state;
  uniform float shapeX, shapeY, deltaT, gravity;
  void main () {
    vec2 shape = vec2(shapeX, shapeY);
    vec4 prevState = texture2D(state,
      gl_FragCoord.xy / shape);
    vec2 position = prevState.xy;
    vec2 velocity = prevState.zw;
    position += 0.5 * velocity * deltaT;
    if (position.x < -1.0 || position.x > 1.0) {
      velocity.x *= -1.0;
    }
    if (position.y < -1.0 || position.y > 1.0) {
      velocity.y *= -1.0;
    }
    position += 0.5 * velocity * deltaT;
    velocity.y = velocity.y + gravity * deltaT;
    gl_FragColor = vec4(position, velocity);
  }
  `,

        depth: { enable: false },

        framebuffer: (params: { tick: number }) => SPRITES[(params.tick + 1) % 2],

        uniforms: {
            state: ({ tick }) => SPRITES[tick % 2],
            shapeX: regl.context<REGL.DefaultContext, 'viewportWidth'>('viewportWidth'),
            shapeY: regl.context<REGL.DefaultContext, 'viewportHeight'>('viewportHeight'),
            deltaT: 0.1,
            gravity: -0.5
        },

        attributes: {
            position: [0, -4, 4, 4, -4, 4]
        },
        primitive: 'triangles',
        elements: null,
        offset: 0,
        count: 3
    });

    const drawSprites = regl({
        vert: `
  precision highp float;
  attribute vec2 sprite;
  uniform sampler2D state;
  varying vec2 rg;
  void main () {
    vec2 position = texture2D(state, sprite).xy;
    gl_PointSize = 16.0;
    rg = sprite;
    gl_Position = vec4(position, 0, 1);
  }
  `,

        frag: `
  precision highp float;
  varying vec2 rg;
  void main () {
    gl_FragColor = vec4(rg, 1.0 - max(rg.x, rg.y), 1);
  }
  `,

        attributes: {
            sprite: Array(N * N)
                .fill(0)
                .map(function (_, i) {
                    const x = i % N;
                    const y = (i / N) | 0;
                    return [x / N, y / N];
                })
                .reverse()
        },

        uniforms: {
            state: ({ tick }) => SPRITES[tick % 2]
        },

        primitive: 'points',
        offset: (_, params: { count: number }) => N * N - params.count,
        elements: null,
        count: regl.prop<DrawSpritesProps, 'count'>('count')
    });

    let count = 0;
    const BLOCK = {
        data: new Float32Array(4 * BLOCK_SIZE),
        width: BLOCK_SIZE,
        height: 1
    };

    const COUNT_DIV = document.createElement('div');
    Object.assign(COUNT_DIV.style, {
        color: 'white',
        position: 'absolute',
        left: '20px',
        top: '20px',
        'z-index': 20
    });
    document.body.appendChild(COUNT_DIV);

    function toScreen(x: number, size: number, pixelRatio: number) {
        return Math.min(Math.max((2.0 * pixelRatio * x) / size - 1.0, -0.999), 0.999);
    }

    regl.frame(({ tick, drawingBufferWidth, drawingBufferHeight, pixelRatio }) => {
        // const mouseX = toScreen(mouse.x, drawingBufferWidth, pixelRatio);
        // const mouseY = -toScreen(mouse.y, drawingBufferHeight, pixelRatio);
        const mouseX = toScreen(100, drawingBufferWidth, pixelRatio);
        const mouseY = -toScreen(100, drawingBufferHeight, pixelRatio);

        // if (mouse.buttons) {
        if (Math.random() < 0.01) {
            for (let i = 0; i < BLOCK_SIZE; ++i) {
                BLOCK.data[4 * i] = mouseX;
                BLOCK.data[4 * i + 1] = mouseY;
                BLOCK.data[4 * i + 2] = 0.25 * (Math.random() - 0.5);
                BLOCK.data[4 * i + 3] = Math.random();
            }
            // @ts-expect-error TODO Check the type error
            SPRITES[tick % 2].color[0].subimage(BLOCK, count % N, ((count / N) | 0) % N);
            count += BLOCK_SIZE;
            COUNT_DIV.innerText = Math.min(count, N * N).toString();
        }

        updateSprites();

        regl.clear({
            color: [0, 0, 0, 1],
            depth: 1
        });

        drawSprites({
            count: Math.min(count, N * N)
        });
    });
</script>

<h1>Coucou</h1>
