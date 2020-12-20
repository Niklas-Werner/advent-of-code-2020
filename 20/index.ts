import { runDay } from '../utils';

function rotateTileCcw(tile: string[]) {
    return tile.map((_, i) => tile.map(line => line.charAt(line.length - 1 - i)).join(''));
}

function flipTileY(tile: string[]) {
    return tile.slice().reverse();
}

function rotateFlipTile(tile: string[], orientation: number) {
    switch (orientation) {
        case 0:
            return tile;
        case 1:
            return rotateTileCcw(rotateTileCcw(rotateTileCcw(tile)));
        case 2:
            return rotateTileCcw(rotateTileCcw(tile));
        case 3:
            return rotateTileCcw(tile);
        case 4:
            return rotateTileCcw(rotateTileCcw(flipTileY(tile)));
        case 5:
            return rotateTileCcw(flipTileY(tile));
        case 6:
            return flipTileY(tile);
        case 7:
            return flipTileY(rotateTileCcw(tile));
    }
    throw new Error();
}

function trimTile(tile: string[]) {
    return tile.slice(1, -1).map(line => line.slice(1, -1));
}

function findPattern(text: string, char: string, offsets: number[]) {
    const result = [];
    for (let i = 0; i < text.length - offsets.length; i++) {
        let match = true;
        for (const j of offsets) {
            if (text.charAt(i + j) !== char) {
                match = false;
                break;
            }
        }
        if (match)
            result.push(i);
    }
    return result;
}

function markPatterns(text: string, pattern: number[], positions: number[], char: string) {
    const result = text.split('');
    for (const i of positions) {
        for (const j of pattern)
            result[i + j] = char;
    }
    return result.join('');
}

runDay(__dirname, { blankLines: 'group' }, async input => {

    const tiles = new Map(input.map(tile => {
        const id = parseInt(tile[0].replace(/Tile (\d+):/, '$1'), 10);
        return [id, tile.slice(1)];
    }));

    const borders = new Map([...tiles].map(([id, tile]) => {
        const f1 = tile[0];
        const f2 = tile.map(line => line.charAt(line.length - 1)).join('');
        const f3 = tile[tile.length - 1];
        const f4 = tile.map(line => line.charAt(0)).join('');
        const b1 = f1.split('').reverse().join('');
        const b2 = f2.split('').reverse().join('');
        const b3 = f3.split('').reverse().join('');
        const b4 = f4.split('').reverse().join('');
        return [id, [
            [f1, f2, f3, f4],
            [b4, f1, b2, f3],
            [b3, b4, b1, b2],
            [f2, b3, f4, b1],
            [b1, f4, b3, f2],
            [b2, b1, b4, b3],
            [f3, b2, f1, b4],
            [f4, f3, f2, f1]
        ]];
    }));

    const size = Math.sqrt(tiles.size);

    const arrangement: [number, number][] = [];
    const verticalBorders: string[] = [];
    const horizontalBorders: string[] = [];
    const usedTiles = new Set<number>();
    function arrange() {
        if (arrangement.length === tiles.size)
            return true;
        const pos = arrangement.length;
        const row = (pos / size) | 0;
        const column = pos % size;
        for (const [id, orientations] of borders) {
            if (usedTiles.has(id))
                continue;
            const leftBorder = column === 0 ? undefined : verticalBorders[pos - 1];
            const topBorder = row === 0 ? undefined : horizontalBorders[pos - size];
            for (const [orientation, [top, right, bottom, left]] of Object.entries(orientations)) {
                if (topBorder !== undefined && top !== topBorder)
                    continue;
                if (leftBorder !== undefined && left !== leftBorder)
                    continue;
                usedTiles.add(id);
                arrangement.push([id, Number(orientation)]);
                verticalBorders.push(right);
                horizontalBorders.push(bottom);
                if (arrange())
                    return true;
                usedTiles.delete(id);
                arrangement.pop();
                verticalBorders.pop();
                horizontalBorders.pop();
            }
        }
        return false;
    }

    if (!arrange())
        console.info('ERR');

    const corner1 = arrangement[0][0];
    const corner2 = arrangement[size - 1][0];
    const corner3 = arrangement[size * (size - 1)][0];
    const corner4 = arrangement[size * size - 1][0];

    console.info('#1', corner1 * corner2 * corner3 * corner4);

    const tileSize = verticalBorders[0].length - 2;

    let resultLines = Array(size * tileSize).fill('');
    for (let i = 0; i < arrangement.length; i++) {
        const row = (i / size) | 0;
        const [tileId, orientation] = arrangement[i];
        const tileOriginal = tiles.get(tileId)!;
        const tile = trimTile(rotateFlipTile(tileOriginal, orientation));
        for (let j = 0; j < tileSize; j++)
            resultLines[row * tileSize + j] += tile[j];
    }

    const monster = [
        '                  # ',
        '#    ##    ##    ###',
        ' #  #  #  #  #  #   '
    ];
    const offsets = monster
        .flatMap((line, i) => [...line]
            .map((ch, j) => ch === '#' ? i * tileSize * size + j : -1))
        .filter(x => x !== -1);

    for (let o = 0; o < 8; o++) {
        const oriented = rotateFlipTile(resultLines, o);
        const text = oriented.join('');
        const positions = findPattern(text, '#', offsets);
        if (positions.length > 0) {
            const marked = markPatterns(text, offsets, positions, 'O');
            const result = [...marked].filter(ch => ch === '#').length;
            console.info('#2', result);
        }
    }

});
