import { runDay } from '../utils';

function findSum(numbers: number[], sum: number) {
    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            if (numbers[i] + numbers[j] === sum)
                return true;
        }
    }
    return false;
}

runDay(__dirname, {}, async (input, { test }) => {
    const range = test ? 5 : 25;

    let result1 = 0;
    const window = [];
    for (const line of input) {
        const value = parseInt(line, 10);
        if (window.length === range) {
            if (!findSum(window, value))
                result1 = value;
            window.shift();
        }
        window.push(value);
    }
    console.info('#1', result1);

    const sums = [];
    for (const line of input) {
        const value = parseInt(line, 10);
        for (let i = 0; i < sums.length; i++) {
            sums[i].value += value;
            sums[i].min = Math.min(sums[i].min, value);
            sums[i].max = Math.max(sums[i].max, value);
        }
        sums.push({ value, min: value, max: value });
        while (sums.length > 0 && sums[0].value >= result1) {
            if (value !== result1 && sums[0].value === result1)
                console.info('#2', sums[0].min + sums[0].max);
            sums.shift();
        }
    }
});
