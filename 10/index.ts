import { runDay } from '../utils';

runDay(__dirname, {}, async (input) => {

    const values = input.map(x => parseInt(x, 10)).sort((a, b) => a - b);

    let prev = 0;
    let diff1Count = 0;
    let diff3Count = 1;
    for (const value of values) {
        switch (value - prev) {
            case 1:
                diff1Count++;
                break;
            case 3:
                diff3Count++;
                break;
        }
        prev = value;
    }

    console.info('#1', diff1Count, diff3Count, diff1Count * diff3Count);

    const values2 = [0, ...values];

    function findCombinations(vs: number[], i: number, c: number[]): number {
        if (i === vs.length - 1)
            return 1;
        if (c[i] !== 0)
            return c[i];
        const v = vs[i];
        let r = 0;
        for (let j = 1; j <= 3; j++) {
            if (vs[i + j] - v <= 3)
                r += findCombinations(vs, i + j, c);
        }
        c[i] = r;
        return r;
    }

    const result2 = findCombinations(values2, 0, values2.map(() => 0));
    console.info('#2', result2);

});
