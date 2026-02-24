import type REGL from 'regl';

import colorsVS from './glsl/colors.vert.glsl';
import colorsRawFS from './glsl/raw.frag.glsl';
import colorsTimeBasedBlueFS from './glsl/timeBasedBlue.frag.glsl';
import colorsGrayscaleFS from './glsl/grayscale.frag.glsl';
import colorsBlackWhiteFS from './glsl/blackWhite.frag.glsl';
import colorsWhiteBlackFS from './glsl/whiteBlack.frag.glsl';
import colorsLerpFS from './glsl/lerp.frag.glsl';
import colorsMrobFS from './glsl/mrob.frag.glsl';
import colorsRedBlueFS from './glsl/redblue.frag.glsl';
import colorsA_Gradiant1FS from './glsl/A_gradiant1.frag.glsl';
import colorsA_Gradiant2FS from './glsl/A_gradiant2.frag.glsl';
import colorsA_MATLAB_coolFS from './glsl/A_MATLAB_cool.frag.glsl';
import colorsA_IDL_CB_RdBuFS from './glsl/A_IDL_CB-RdBu.frag.glsl';
import colorsA_IDL_CB_RdYiBuFS from './glsl/A_IDL_CB-RdYiBu.frag.glsl';
import colorsA_IDL_CB_BuYiRdFS from './glsl/A_IDL_CB-BuYiRd.frag.glsl';
import colorsA_transform_seismicFS from './glsl/A_transform_seismic.frag.glsl';
import colorsB_IDL_CB_RdYiBuFS from './glsl/B_IDL_CB-RdYiBu.frag.glsl';

export type ColorMode =
    | 'A_gradiant1'
    | 'A_gradiant2'
    | 'A_MATLAB_cool'
    | 'A_IDL_CB_RdBu'
    | 'A_IDL_CB_RdYiBu'
    | 'B_IDL_CB_RdYiBu'
    | 'A_IDL_CB_BuYiRd'
    | 'A_transform_seismic'
    | 'lerp'
    | 'grayscale'
    | 'blackwhite'
    | 'whiteblack'
    | 'raw'
    | 'timebasedblue'
    | 'mrob';
interface ColorsProps {
    outputBuffer: REGL.Framebuffer2D | null;
    inputBuffer: REGL.Framebuffer2D;
    iteration: number;
    zoomLevel: number;
    pan: [number, number];
}

const colorCommands: {
    [k: string]: REGL.DrawCommand;
} = {};

export const initColorsCommands = (regl: REGL.Regl) => {
    const prop = <K extends keyof ColorsProps>(name: K) => regl.prop<ColorsProps, K>(name);
    const commonSettings = {
        vert: colorsVS,

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
            iteration: prop('iteration'),
            zoomLevel: prop('zoomLevel'),
            pan: prop('pan'),
            prevState: prop('inputBuffer')
        }
    };

    colorCommands['raw'] = regl({
        frag: colorsRawFS,
        ...commonSettings
    });

    colorCommands['A_transform_seismic'] = regl({
        frag: colorsA_transform_seismicFS,
        ...commonSettings
    });

    colorCommands['A_gradiant1'] = regl({
        frag: colorsA_Gradiant1FS,
        ...commonSettings
    });

    colorCommands['A_gradiant2'] = regl({
        frag: colorsA_Gradiant2FS,
        ...commonSettings
    });

    colorCommands['A_MATLAB_cool'] = regl({
        frag: colorsA_MATLAB_coolFS,
        ...commonSettings
    });

    colorCommands['A_IDL_CB_RdBu'] = regl({
        frag: colorsA_IDL_CB_RdBuFS,
        ...commonSettings
    });

    colorCommands['A_IDL_CB_RdYiBu'] = regl({
        frag: colorsA_IDL_CB_RdYiBuFS,
        ...commonSettings
    });

    colorCommands['A_IDL_CB_BuYiRd'] = regl({
        frag: colorsA_IDL_CB_BuYiRdFS,
        ...commonSettings
    });

    colorCommands['B_IDL_CB_RdYiBu'] = regl({
        frag: colorsB_IDL_CB_RdYiBuFS,
        ...commonSettings
    });

    colorCommands['grayscale'] = regl({
        frag: colorsGrayscaleFS,
        ...commonSettings
    });
    colorCommands['blackwhite'] = regl({
        frag: colorsBlackWhiteFS,
        ...commonSettings
    });
    colorCommands['whiteblack'] = regl({
        frag: colorsWhiteBlackFS,
        ...commonSettings
    });
    colorCommands['timebasedblue'] = regl({
        frag: colorsTimeBasedBlueFS,
        ...commonSettings
    });

    colorCommands['lerp'] = regl({
        frag: colorsLerpFS,
        ...commonSettings
    });

    colorCommands['mrob'] = regl({
        frag: colorsMrobFS,
        ...commonSettings
    });
    colorCommands['redblue'] = regl({
        frag: colorsRedBlueFS,
        ...commonSettings
    });
};

export const doColors = (params: {
    colorMode: ColorMode;
    inputBuffer: REGL.Framebuffer2D;
    iteration: number;
    outputBuffer: REGL.Framebuffer2D | null;
    zoomState: { zoomLevel: number; panX: number; panY: number };
}) => {
    const { colorMode, inputBuffer, iteration, outputBuffer, zoomState } = params;
    const command = colorCommands[colorMode] || colorCommands['raw'];
    command({
        inputBuffer,
        iteration,
        outputBuffer,
        pan: [zoomState.panX, zoomState.panY],
        zoomLevel: zoomState.zoomLevel
    });
};
