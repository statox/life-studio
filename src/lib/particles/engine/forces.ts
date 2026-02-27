import { getAttractionForce, type AttractionTable } from '$lib/particles/attraction';
import { getNeighborsIds, type CellsMap } from '$lib/particles/cellsMap';
import { wrappedDistance } from './math';
import type { Cell } from './types';

export const attractionForce = (params: {
    cell: Cell;
    attractionTable: AttractionTable;
    maxAttractionRadiusSqrd: number;
    minDistanceSqrd: number;
    halfWorldDistance: number;
    cells: Cell[];
    cellsMap: CellsMap;
}) => {
    const {
        cell,
        attractionTable,
        maxAttractionRadiusSqrd,
        halfWorldDistance,
        minDistanceSqrd,
        cells,
        cellsMap
    } = params;

    const vel = { x: 0, y: 0 };

    const neigborIds = getNeighborsIds(cellsMap, cell);

    for (const j of neigborIds) {
        const other = cells[j];
        if (cell.id === other.id) {
            continue;
        }

        const { distSqrd, wrapped } = wrappedDistance(
            cellsMap.worldSize,
            cell.pos,
            other.pos,
            halfWorldDistance
        );

        let attractionForce = getAttractionForce(
            attractionTable,
            maxAttractionRadiusSqrd,
            minDistanceSqrd,
            distSqrd,
            cell.color,
            other.color
        );

        if (wrapped) {
            attractionForce *= -1;
        }

        const direction = {
            x: other.pos.x - cell.pos.x,
            y: other.pos.y - cell.pos.y
        };
        const directionMag = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
        if (directionMag === 0) {
            continue;
        }
        const normalizedDirection = {
            x: direction.x * (1 / directionMag),
            y: direction.y * (1 / directionMag)
        };
        const correctedDirection = {
            x: normalizedDirection.x * attractionForce,
            y: normalizedDirection.y * attractionForce
        };

        vel.x += correctedDirection.x;
        vel.y += correctedDirection.y;
    }

    const velocityMag = Math.sqrt(vel.x * vel.x + vel.y * vel.y);

    if (velocityMag === 0) {
        return vel;
    }
    const maxVelMag = 1;
    if (velocityMag > maxVelMag) {
        vel.x *= maxVelMag / velocityMag;
        vel.y *= maxVelMag / velocityMag;
    }
    return vel;
};
