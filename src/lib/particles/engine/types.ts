import type { AttractionTable } from '$lib/particles/attraction';

export type Coordinates = {
    x: number;
    y: number;
};

export type WorldSize = Coordinates;

export const COLORS = ['white', 'red', 'green', 'blue'] as const;
export type Color = typeof COLORS[number];

export interface Cell {
    id: number;
    pos: Coordinates;
    nextPos: Coordinates;
    vel: Coordinates;
    color: Color;
}

export type StartEngineRequest = {
    msg: 'start';
    cells: Cell[];
    attractionTable: AttractionTable;
    worldSize: WorldSize;
    maxAttractionRadius: number;
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
    positions: Coordinates[];
};
