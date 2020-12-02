import { runMain } from '@nw55/node-utils';
import { isNonNullable, readNonEmptyLines } from '../utils';

runMain(async ([param]) => {
    const input = await readNonEmptyLines(__dirname, param === 'test' ? 'test-input' : 'input');
    const parsedInput = input.map(line => {
        const match = /^(\d+)-(\d+) (\w): (\w+)$/.exec(line);
        if (!match) {
            console.error('no match', line);
            return null;
        }
        return {
            min: parseInt(match[1]),
            max: parseInt(match[2]),
            letter: match[3],
            password: match[4]
        };
    }).filter(isNonNullable);

    const isValid = parsedInput.map(({ min, max, letter, password }) => {
        let count = [...password].filter(c => c === letter).length;
        return count >= min && count <= max;
    });
    const validCount = isValid.filter(x => x).length;
    console.info('#1', validCount);

    const isValid2 = parsedInput.map(({ min, max, letter, password }) => {
        const match1 = password.charAt(min - 1) === letter;
        const match2 = password.charAt(max - 1) === letter;
        return match1 !== match2;
    });
    const validCount2 = isValid2.filter(x => x).length;
    console.info('#2', validCount2);
});
