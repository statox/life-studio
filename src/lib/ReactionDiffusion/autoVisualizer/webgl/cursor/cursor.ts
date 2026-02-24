import type REGL from 'regl';
import cursorVS from './glsl/cursor.vert.glsl';
import cursorFS from './glsl/cursor.frag.glsl';
import type { MouseState } from '../../types';

interface CursorProps {
    outputBuffer: REGL.Framebuffer2D | null;
    inputBuffer: REGL.Framebuffer2D;
    mousePosition: [number, number];
    penRadius: number;
    zoomLevel: number;
    pan: [number, number];
}

let command: REGL.DrawCommand;
export const initCursorCommand = (regl: REGL.Regl) => {
    const prop = <K extends keyof CursorProps>(name: K) => regl.prop<CursorProps, K>(name);
    command = regl({
        frag: cursorFS,
        vert: cursorVS,

        attributes: {
            position: [
                [1, -1],
                [-1, -1],
                [1, 1],
                [1, 1],
                [-1, -1],
                [-1, 1]
            ]
        },
        count: 6,
        framebuffer: prop('outputBuffer'),
        uniforms: {
            mousePosition: prop('mousePosition'),
            penRadius: prop('penRadius'),
            zoomLevel: prop('zoomLevel'),
            pan: prop('pan'),
            prevState: prop('inputBuffer')
        }
    });
};

export const doCursor = (params: {
    inputBuffer: REGL.Framebuffer2D;
    mouseState: MouseState;
    outputBuffer: REGL.Framebuffer2D | null;
    worldSize: number;
}) => {
    /*
     * Mouse parameters (position, penSize) are relative to the zoomed canvas
     * not to the underlying texture
     */
    const { inputBuffer, mouseState, outputBuffer, worldSize } = params;
    command({
        inputBuffer,
        outputBuffer,
        mousePosition: [mouseState.x, mouseState.y],
        penRadius: 1 / 2 ** (worldSize - mouseState.penSize),
        zoomLevel: mouseState.zoomLevel,
        pan: [mouseState.panX, mouseState.panY]
    });
};
