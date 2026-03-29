import type { AttractionTable } from '$lib/particles/attraction';
import type { Color } from './colors';

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

export type SimulationParams = {
    cells: Cell[];
    attractionTable: AttractionTable;
    worldSize: WorldSize;
    maxAttractionRadius: number;
    friction: number;
};

export type StartEngineRequest = {
    msg: 'start';
    cells: Cell[];
    attractionTable: AttractionTable;
    worldSize: WorldSize;
    maxAttractionRadius: number;
    useWorkers?: boolean;
    friction: number;
};

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

export type UpdateCellsResponse = {
    positions: Float32Array;
};
