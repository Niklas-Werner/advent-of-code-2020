import { runDay } from '../utils';

const directions: Record<number, string> = { 0: 'E', 90: 'S', 180: 'W', 270: 'N' };

function rot(x: number, y: number, a: number): [number, number] {
    switch (a) {
        case 90:
            return [y, -x];
        case 180:
            return [-x, -y];
        case 270:
            return [-y, x];
    }
    return [x, y];
}

function part1(input: string[]) {
    let east = 0;
    let north = 0;
    let dir = 0;

    for (const line of input) {
        let type = line.charAt(0);
        const value = parseInt(line.slice(1), 10);
        if (type === 'F')
            type = directions[dir];
        switch (type) {
            case 'N':
                north += value;
                break;
            case 'S':
                north -= value;
                break;
            case 'E':
                east += value;
                break;
            case 'W':
                east -= value;
                break;
            case 'L':
                dir = (dir + 360 - value) % 360;
                break;
            case 'R':
                dir = (dir + value) % 360;
                break;
        }
    }

    console.info('#1', east, north, Math.abs(east) + Math.abs(north));
}

function part2(input: string[]) {
    let wpEast = 10;
    let wpNorth = 1;
    let east = 0;
    let north = 0;

    for (const line of input) {
        let type = line.charAt(0);
        let value = parseInt(line.slice(1), 10);
        switch (type) {
            case 'N':
                wpNorth += value;
                break;
            case 'S':
                wpNorth -= value;
                break;
            case 'E':
                wpEast += value;
                break;
            case 'W':
                wpEast -= value;
                break;
            case 'L':
                value = 360 - value;
            case 'R':
                [wpEast, wpNorth] = rot(wpEast, wpNorth, value % 360);
                break;
            case 'F':
                east += value * wpEast;
                north += value * wpNorth;
                break;
        }
    }

    console.info('#2', east, north, Math.abs(east) + Math.abs(north));
}

runDay(__dirname, {}, async input => {

    part1(input);

    part2(input);

});
