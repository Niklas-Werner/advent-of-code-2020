import { runDay } from '../utils';

function adjacent(x: number, y: number): [number, number][] {
    const yMod2 = Math.abs(y % 2);
    return [
        [1, 0], // e
        [-1, 0], // w
        [1 - yMod2, -1], // ne
        [-yMod2, -1], // nw
        [1 - yMod2, 1], // se
        [-yMod2, 1], // sw
    ].map(([dx, dy]) => [x + dx, y + dy]);
}

function tileKey(x: number, y: number) {
    return x + ',' + y;
}

runDay(__dirname, {}, async input => {

    const tiles = new Map<string, [number, number]>();

    for (const line of input) {
        let x = 0;
        let y = 0;
        let dx = 0;
        let dy = 0;
        for (let ch of line) {
            switch (ch) {
                case 's':
                    dy = 1;
                    continue;
                case 'n':
                    dy = -1;
                    continue;
                case 'e':
                    if (Math.abs(y % 2) === 0 || dy === 0)
                        dx = 1;
                    break;
                case 'w':
                    if (Math.abs(y % 2) === 1 || dy === 0)
                        dx = -1;
                    break;
            }
            x += dx;
            y += dy;
            dx = 0;
            dy = 0;
        }
        const key = tileKey(x, y);
        if (!tiles.delete(key))
            tiles.set(key, [x, y]);
    }

    console.info('#1', tiles.size);

    for (let i = 0; i < 100; i++) {
        const blackToFlip: string[] = [];
        const adjacentBlack = new Map<string, [number, number, number]>();
        for (const [key, [x, y]] of tiles) {
            let adjacentCount = 0;
            for (const [x2, y2] of adjacent(x, y)) {
                const key2 = tileKey(x2, y2);
                if (tiles.has(key2))
                    adjacentCount++;
                if (adjacentBlack.has(key2))
                    adjacentBlack.get(key2)![2]++;
                else
                    adjacentBlack.set(key2, [x2, y2, 1]);
            }
            if (adjacentCount === 0 || adjacentCount > 2)
                blackToFlip.push(key);
        }
        for (const key of blackToFlip)
            tiles.delete(key);
        for (const [key, [x, y, count]] of adjacentBlack) {
            if (count === 2)
                tiles.set(key, [x, y]);
        }
    }

    console.info('#2', tiles.size);

});
