<script lang="ts">
    import { onMount } from 'svelte';
    import * as webglUtils from '../webglUtils';
    import { initProgram, runProgram } from './drawPositionsTexture';

    const screenWidth = 800;
    const screenHeight = 600;
    function main() {
        // Get A WebGL context
        const canvas = document.getElementById('canvas') as HTMLCanvasElement;
        if (!canvas) {
            throw 'canvas undefined';
        }
        const gl = canvas.getContext('webgl');
        if (!gl) {
            throw 'gl undefined';
        }
        webglUtils.checkWebGlCapabilities(gl);
        webglUtils.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);
        initProgram(gl);

        const ids = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const positions = ids
            .map((_) => [Math.random() * screenWidth, Math.random() * screenHeight, 0, 0])
            .flat();

        function render() {
            if (!gl) {
                throw 'Undefined params to render';
            }

            for (let i = 0; i <= positions.length - 2; i += 2) {
                positions[i] = (positions[i] + Math.random() * 2 - 1) % gl.canvas.width;
                positions[i + 1] = (positions[i + 1] + Math.random() * 0 + 1) % gl.canvas.height;
            }
            const positionTex = webglUtils.createTexture(gl, new Float32Array(positions), 3, 3);
            runProgram({
                gl,
                positionTex,
                textureDimension: { width: 3, height: 3 },
                ids
            });

            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
    }

    onMount(() => main());
</script>

<p>
    Create an array of render-size positions. Store this array in a texture. In each <code>
        requestAnimationFrame</code
    > update the positions randomly with javascript and create a new texture holding the positions then
    use a shader to render the texture.
</p>
<canvas id="canvas" style="background-color: black" width={screenWidth} height={screenHeight}></canvas>
