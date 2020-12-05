import { runDay } from '../utils';

function doPartition(doLow: string, doHigh: string, steps: string) {
    return partition(0, 2 ** steps.length, doLow, doHigh, steps);
}

function partition(start: number, size: number, doLow: string, doHigh: string, rest: string): number {
    if (rest.length === 0)
        return start;
    switch (rest.charAt(0)) {
        case doLow:
            return partition(start, (size / 2) | 0, doLow, doHigh, rest.slice(1));
        case doHigh:
            return partition(start + (size / 2) | 0, (size / 2) | 0, doLow, doHigh, rest.slice(1));
        default:
            throw new Error();
    }
}

runDay(__dirname, {}, async input => {
    const allIds = [];
    for (const line of input) {
        const row = doPartition('F', 'B', line.slice(0, 7));
        const column = doPartition('L', 'R', line.slice(7));
        const id = row * 8 + column;
        allIds.push(id);
    }
    allIds.sort((a, b) => a - b);
    console.info('#1', allIds[allIds.length - 1]);
    for (let i = 0; i < allIds.length - 1; i++) {
        if (allIds[i] + 1 !== allIds[i + 1])
            console.info('#2', allIds[i] + 1);
    }
});
