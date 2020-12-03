import { runMain } from '@nw55/node-utils';
import { readNonEmptyLines } from '../utils';

runMain(async ([param]) => {
    const input = await readNonEmptyLines(__dirname, param === 'test' ? 'test-input' : 'input');

    let x = 0;
    let trees = 0;
    for (let y = 0; y < input.length; y++) {
        if (input[y].charAt(x) === '#')
            trees++;
        x = (x + 3) % input[y].length;
    }
    console.info('#1', trees);

    let results = [];
    for (const [sx, sy] of [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]) {
        let x = 0;
        let trees = 0;
        for (let y = 0; y < input.length; y += sy) {
            if (input[y].charAt(x) === '#')
                trees++;
            x = (x + sx) % input[y].length;
        }
        results.push(trees);
    }
    const result = results.reduce((a, b) => a * b, 1);
    console.info('#2', results, result);
});
