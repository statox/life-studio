import type { AttractionTable } from '$lib/particles/attraction';
import type { InitialConfig } from '../universe';
import type { Color } from './colors';
import type { StatsResult } from './simulationStats';

export type Coordinates = {
    x: number;
    y: number;
};

export type WorldSize = Coordinates;

export interface Cell {
    id: number;
    pos: Coordinates;
    vel: Coordinates;
    color: Color;
}

export type WorldSettings = {
    nbParticles: number;
    horizontalResolution: number;
    verticalResolution: number;
    maxAttractionRadius: number;
    friction: number;
    colorWeights: ColorProportions;
};

export type SimulationParams = {
    cells: Cell[];
    attractionTable: AttractionTable;
    worldSize: WorldSize;
    maxAttractionRadius: number;
    friction: number;
};

export type StartEngineRequest = {
    msg: 'start';
    useWorkers?: boolean;
} & SimulationParams;

export type PauseEngineRequest = {
    msg: 'pause';
};

export type UnpauseEngineRequest = {
    msg: 'unpause';
};

export type DestroyEngineRequest = {
    msg: 'destroy';
};

export type UpdateTableEngineRequest = {
    msg: 'updateTable';
    attractionTable: AttractionTable;
};

export type EngineRequest =
    | StartEngineRequest
    | PauseEngineRequest
    | UnpauseEngineRequest
    | UpdateTableEngineRequest
    | DestroyEngineRequest;

export type PerfData = {
    grid: number;
    force: number;
    update: number;
    interleave: number;
    particles: number;
    frame: number;
};

export type UpdateCellsResponse = {
    positions: Float32Array;
    perf?: PerfData;
    stats?: StatsResult;
};

export type ColorProportions = Record<Color, number>;

export type SimulationConfig = {
    horizontalResolution: number;
    verticalResolution: number;
    initialSpreadConfig: InitialConfig;
    colorWeights: ColorProportions;
    maxAttractionRadius: number;
    attractionTable: AttractionTable;
    nbParticles: number;
    friction: number;
};
