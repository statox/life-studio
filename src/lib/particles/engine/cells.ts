import type { AttractionTable } from '$lib/particles/attraction';
import { getNeighborsIds, type CellsMap } from '$lib/particles/cellsMap';
import type { Cell, Color, Coordinates } from './types';
import { updateCellPos, wrappedDistance } from './math';
import { attractionForce } from './forces';
import { CELL_RADIUS, COLORS } from './Engine';

const randColor = (): Color => {
    const randIndex = Math.floor(Math.random() * COLORS.length);
    return COLORS[randIndex];
};

export const getNewCells = (worldSize: Coordinates, nbParticles: number): Cell[] => {
    const cells = [] as Cell[];
    for (let i = 0; i < nbParticles; i++) {
        const cell = {
            id: i,
            pos: {
                x: Math.random() * worldSize.x,
                y: Math.random() * worldSize.y
            },
            vel: { x: 0, y: 0 },
            color: randColor()
        };
        cells.push(cell);
    }
    return cells;
};

export const updateCells = (
    attractionTable: AttractionTable,
    maxAttractionRadius: number,
    cells: Cell[],
    cellsMap: CellsMap
) => {
    const smallestDimension =
        cellsMap.worldSize.x < cellsMap.worldSize.y ? cellsMap.worldSize.x : cellsMap.worldSize.y;
    const halfWorldDistance = (smallestDimension * smallestDimension) / 2;
    const maxAttractionRadiusSqrd = maxAttractionRadius * maxAttractionRadius;
    const cellRadius = CELL_RADIUS;
    const minDistanceSqrd = (2 * cellRadius) ** 2;

    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        cell.vel.x = 0;
        cell.vel.y = 0;

        const attractionVelocity = attractionForce({
            cell,
            attractionTable,
            maxAttractionRadiusSqrd,
            minDistanceSqrd,
            halfWorldDistance,
            cells,
            cellsMap
        });
        cell.vel.x = attractionVelocity.x;
        cell.vel.y = attractionVelocity.y;
        // The update of the cell position could be done in a separate loop.
        // That would match what I am used too in the particles simulations I have done before.
        // However here updating the cells position as we compute the attraction of the other ones
        // seems to create more moving patterns
        updateCellPos(cellsMap.worldSize, cell);
        cellsMap.updateCell(cell);
    }

    // That works well (can be tested with a zeroed attraction table)
    // but for now it is too slow to run smoothly
    // for (let i = 0; i < 3; i++) {
    //     pullCellsAppart(minDistanceSqrd, halfWorldDistance, cells, cellsMap);
    // }
};

export const pullCellsAppart = (
    minDistanceSqrd: number,
    halfWorldDistance: number,
    cells: Cell[],
    cellsMap: CellsMap
) => {
    for (let i = 0; i < cells.length; i++) {
        const cell = cells[i];
        cell.vel = { x: 0, y: 0 };

        const neigborIds = getNeighborsIds(cellsMap, cell);
        for (const j of neigborIds) {
            if (i === j) {
                continue;
            }
            const other = cells[j];

            const { distSqrd, wrapped } = wrappedDistance(
                cellsMap.worldSize,
                cell.pos,
                other.pos,
                halfWorldDistance
            );

            if (distSqrd > minDistanceSqrd) {
                continue;
            }

            const direction = {
                x: (other.pos.x - cell.pos.x) * (wrapped ? 1 : -1),
                y: (other.pos.y - cell.pos.y) * (wrapped ? 1 : -1)
            };
            const directionMag = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
            if (directionMag === 0) {
                continue;
            }
            const normalizedDirection = {
                x: direction.x * (1 / directionMag) * Math.sqrt(minDistanceSqrd),
                y: direction.y * (1 / directionMag) * Math.sqrt(minDistanceSqrd)
            };

            cell.vel.x += normalizedDirection.x;
            cell.vel.y += normalizedDirection.y;
        }

        const velocityMag = Math.sqrt(cell.vel.x * cell.vel.x + cell.vel.y * cell.vel.y);

        if (velocityMag === 0) {
            continue;
        }
        cell.vel.x *= 1 / velocityMag;
        cell.vel.y *= 1 / velocityMag;

        // The update of the cell position could be done in a separate loop.
        // That would match what I am used too in the particles simulations I have done before.
        // However here updating the cells position as we compute the attraction of the other ones
        // seems to create more moving patterns
        updateCellPos(cellsMap.worldSize, cell);
        cellsMap.updateCell(cell);
    }
};
