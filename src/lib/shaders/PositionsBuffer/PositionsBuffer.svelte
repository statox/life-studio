<script lang="ts">
    import { onMount } from 'svelte';
    import * as webglUtils from '../webglUtils';

    import drawPositionsBufferVS from './glsl/drawPositionsBuffer.vert.glsl';
    import drawPositionsBufferFS from './glsl/drawPositionsBuffer.frag.glsl';

    const positions = [50, 50, 50, 150, 150, 150, 150, 50, 200, 200];
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

        const program = webglUtils.createProgramFromSources(gl, [
            drawPositionsBufferVS,
            drawPositionsBufferFS
        ]);

        webglUtils.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);

        const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
        const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

        function render() {
            if (!gl) {
                throw 'Undefined params to render';
            }

            for (let i = 0; i <= positions.length - 2; i += 2) {
                positions[i] = (positions[i] + Math.random() * 2 - 1) % gl.canvas.width;
                positions[i + 1] = (positions[i + 1] + Math.random() * 0 + 1) % gl.canvas.height;
            }
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

            webglUtils.resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.useProgram(program);

            gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);

            gl.enableVertexAttribArray(positionAttributeLocation);

            // Bind the position buffer.
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

            // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
            const size = 2; // 2 components per iteration
            const type = gl.FLOAT; // the data is 32bit floats
            const normalize = false; // don't normalize the data
            const stride = 0; // 0 = move forward size * sizeof(type) each iteration to get the next position
            const offset = 0; // start at the beginning of the buffer
            gl.vertexAttribPointer(
                positionAttributeLocation,
                size,
                type,
                normalize,
                stride,
                offset
            );

            var primitiveType = gl.POINTS;
            var count = positions.length / 2;
            gl.drawArrays(primitiveType, offset, count);

            requestAnimationFrame(render);
        }
        requestAnimationFrame(render);
    }

    const addPosition = () => {
        positions.push(Math.random() * 800);
        positions.push(Math.random() * 600);
    };

    onMount(() => main());
</script>

<p>
    Create an array of render-size positions. Bind this array to a buffer in the shader program. In
    each <code>requestAnimationFrame</code> update the positions randomly with javascript and use the
    shader program to render each position as a point.
</p>
<canvas id="canvas" style="background-color: black" width="800" height="600"></canvas>

<button onclick={() => addPosition()}>Add position</button>
