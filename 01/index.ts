import { runMain } from '@nw55/node-utils';
import { readNonEmptyLines } from '../utils';

runMain(async () => {
    const input = await readNonEmptyLines(__dirname, 'input');
    const numbers = input.map(line => parseInt(line));
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            if (numbers[i] + numbers[j] === 2020)
                console.info('#1', numbers[i], numbers[j], numbers[i] * numbers[j]);
        }
    }
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            for (let k = j + 1; k < numbers.length; k++) {
                if (numbers[i] + numbers[j] + numbers[k] === 2020)
                    console.info('#2', numbers[i], numbers[j], numbers[k], numbers[i] * numbers[j] * numbers[k]);
            }
        }
    }
});
