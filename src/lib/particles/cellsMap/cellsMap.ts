// See ./README.md for details and explanations

import type { Cell, Coordinates } from '$lib/particles/engine';

export class CellsMap {
    squares: Set<number>[][];
    squareByCellId: Map<number, Coordinates>;
    worldSize: Coordinates;
    maxAttractionRadius: number;

    constructor(params: { worldSize: Coordinates; maxAttractionRadius: number }) {
        const { worldSize, maxAttractionRadius } = params;
        if (worldSize.x % maxAttractionRadius !== 0 || worldSize.y % maxAttractionRadius !== 0) {
            throw new Error('Screen size is not a multiple of maxAttractionRadius');
        }

        this.worldSize = { ...worldSize };
        this.maxAttractionRadius = maxAttractionRadius;
        this.squareByCellId = new Map<number, Coordinates>();
        this.squares = [] as Set<number>[][];

        const squareSize = maxAttractionRadius;
        const cols = worldSize.x / squareSize;
        const rows = worldSize.y / squareSize;

        for (let y = 0; y < rows; y++) {
            this.squares.push([]);
            for (let x = 0; x < cols; x++) {
                this.squares[y].push(new Set<number>());
            }
        }
    }

    checkCoord(cellPos: Coordinates) {
        if (
            cellPos.x < 0 ||
            cellPos.x > this.worldSize.x ||
            cellPos.y < 0 ||
            cellPos.y > this.worldSize.y
        ) {
            throw new Error(
                `The cell at position ${cellPos.x},${cellPos.y} is outside of the screen ${this.worldSize.x},${this.worldSize.y} `
            );
        }
    }

    getSquareCoords(cellPos: Coordinates): Coordinates {
        this.checkCoord(cellPos);

        return {
            x: Math.floor((cellPos.x * this.squares[0].length) / this.worldSize.x),
            y: Math.floor((cellPos.y * this.squares.length) / this.worldSize.y)
        };
    }

    insert(cell: Cell) {
        if (this.squareByCellId.get(cell.id)) {
            throw new Error('Cell already in map');
        }

        const squareCoord = this.getSquareCoords(cell.pos);

        this.squares[squareCoord.y][squareCoord.x].add(cell.id);
        this.squareByCellId.set(cell.id, squareCoord);
    }

    updateCell(cell: Cell) {
        this.checkCoord(cell.pos);

        const currentSquare = this.squareByCellId.get(cell.id);

        if (!currentSquare) {
            throw new Error('Cell not in map');
        }

        this.squares[currentSquare.y][currentSquare.x].delete(cell.id);
        const newSquare = this.getSquareCoords(cell.pos);

        this.squares[newSquare.y][newSquare.x].add(cell.id);
        this.squareByCellId.set(cell.id, newSquare);
    }
}

// Pure function to compute the 9 neighbor square coordinates (with wrapping)
export const getNeighborCoords = (
    sx: number,
    sy: number,
    cols: number,
    rows: number
): { x: number; y: number }[] => {
    const prevX = sx === 0 ? cols - 1 : sx - 1;
    const nextX = sx === cols - 1 ? 0 : sx + 1;
    const prevY = sy === 0 ? rows - 1 : sy - 1;
    const nextY = sy === rows - 1 ? 0 : sy + 1;

    return [
        { x: prevX, y: prevY },
        { x: sx, y: prevY },
        { x: nextX, y: prevY },
        { x: prevX, y: sy },
        { x: sx, y: sy },
        { x: nextX, y: sy },
        { x: prevX, y: nextY },
        { x: sx, y: nextY },
        { x: nextX, y: nextY }
    ];
};

// Not in the class because it needs to be used in the worker and can't be
// serialized properly
export const getNeighborsIds = (map: CellsMap, cell: Cell) => {
    const currentSquare = map.squareByCellId.get(cell.id);

    if (!currentSquare) {
        throw new Error('Cell not in map');
    }

    const neighborSquaresCoords = getNeighborCoords(
        currentSquare.x,
        currentSquare.y,
        map.squares[0].length,
        map.squares.length
    );

    const neighborsIds: number[] = [];
    for (const { x, y } of neighborSquaresCoords) {
        neighborsIds.push(...map.squares[y][x]);
    }
    return neighborsIds;
};
