import { runDay } from '../utils';

function step(seats: string[][]) {
    let anyChange = false;
    const newSeats = seats.map((row, y) => row.map((seat, x) => {
        if (seat === '.')
            return '.';
        let adjacentCount = 0;
        for (let y2 = -1; y2 <= 1; y2++) {
            if (y + y2 < 0 || y + y2 >= seats.length)
                continue;
            for (let x2 = -1; x2 <= 1; x2++) {
                if (x + x2 < 0 || x + x2 >= row.length)
                    continue;
                if (y2 === 0 && x2 === 0)
                    continue;
                if (seats[y2 + y][x2 + x] === '#')
                    adjacentCount++;
            }
        }
        if (seat === 'L' && adjacentCount === 0) {
            anyChange = true;
            return '#';
        }
        if (seat === '#' && adjacentCount >= 4) {
            anyChange = true;
            return 'L';
        }
        return seat;
    }));
    return { newSeats, anyChange };
}

function step2(seats: string[][]) {
    let anyChange = false;
    const newSeats = seats.map((row, y) => row.map((seat, x) => {
        if (seat === '.')
            return '.';
        let visibleCount = 0;
        for (let y2 = -1; y2 <= 1; y2++) {
            for (let x2 = -1; x2 <= 1; x2++) {
                if (y2 === 0 && x2 === 0)
                    continue;
                let d = 1;
                while (true) {
                    if (y + d * y2 < 0 || y + d * y2 >= seats.length)
                        break;
                    if (x + d * x2 < 0 || x + d * x2 >= row.length)
                        break;
                    const visibleSeatCandidate = seats[y + d * y2][x + d * x2];
                    if (visibleSeatCandidate === '#') {
                        visibleCount++;
                        break;
                    }
                    if (visibleSeatCandidate === 'L')
                        break;
                    d++;
                }
            }
        }
        if (seat === 'L' && visibleCount === 0) {
            anyChange = true;
            return '#';
        }
        if (seat === '#' && visibleCount >= 5) {
            anyChange = true;
            return 'L';
        }
        return seat;
    }));
    return { newSeats, anyChange };
}

function count(seats: string[][]) {
    return seats.flat().filter(seat => seat === '#').length;
}

runDay(__dirname, {}, async (input) => {

    let seats = input.map(line => [...line]);

    while (true) {
        const { newSeats, anyChange } = step(seats);
        if (!anyChange)
            break;
        seats = newSeats;
    }

    console.info('#1', count(seats));

    let seats2 = input.map(line => [...line]);

    while (true) {
        const { newSeats, anyChange } = step2(seats2);
        if (!anyChange)
            break;
        seats2 = newSeats;
    }

    console.info('#2', count(seats2));
});
