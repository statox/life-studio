import type REGL from 'regl';

import gridVS from './glsl/grid.vert.glsl';
import gridFS from './glsl/grid.frag.glsl';

interface GridProps {
    outputBuffer: REGL.Framebuffer2D | null;
    inputBuffer: REGL.Framebuffer2D;
    zoomLevel: number;
    pan: [number, number];
}

let command: REGL.DrawCommand;

export const initGridCommands = (regl: REGL.Regl) => {
    const prop = <K extends keyof GridProps>(name: K) => regl.prop<GridProps, K>(name);
    command = regl({
        vert: gridVS,
        frag: gridFS,

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
            prevState: prop('inputBuffer'),
            zoomLevel: prop('zoomLevel'),
            pan: prop('pan')
        }
    });
};

export const doGrid = (params: {
    inputBuffer: REGL.Framebuffer2D;
    outputBuffer: REGL.Framebuffer2D | null;
    zoomState: { zoomLevel: number; panX: number; panY: number };
}) => {
    const { inputBuffer, outputBuffer, zoomState } = params;
    command({
        inputBuffer,
        outputBuffer,
        zoomLevel: zoomState.zoomLevel,
        pan: [zoomState.panX, zoomState.panY]
    });
};
