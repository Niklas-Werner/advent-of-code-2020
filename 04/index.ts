import { runDay } from '../utils';

const FOUR_DIGITS = /^\d{4}$/;

const testRange = (v: string, min: number, max: number) => parseInt(v) >= min && parseInt(v) <= max;

const validationRules = {
    'byr': (v: string) => FOUR_DIGITS.test(v) && testRange(v, 1920, 2002),
    'iyr': (v: string) => FOUR_DIGITS.test(v) && testRange(v, 2010, 2020),
    'eyr': (v: string) => FOUR_DIGITS.test(v) && testRange(v, 2020, 2030),
    'hgt': (v: string) => /^\d+(cm|in)$/.test(v) && (v.endsWith('cm') ? testRange(v, 150, 193) : testRange(v, 59, 76)),
    'hcl': (v: string) => /^#[0-9a-f]{6}$/.test(v),
    'ecl': (v: string) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(v),
    'pid': (v: string) => /^[0-9]{9}$/.test(v)
};
const requiredFields = Object.keys(validationRules);

runDay(__dirname, { keepBlankLines: true }, async input => {
    if (input[input.length - 1] !== '')
        input.push('');

    let validCount = 0;
    let valid2Count = 0;

    const fields = new Map<string, string>();
    for (const line of input) {
        if (line === '') {
            const valid = requiredFields.every(field => fields.has(field));
            const valid2 = valid && Object.entries(validationRules).every(([key, rule]) => rule(fields.get(key)!));
            if (valid)
                validCount++;
            if (valid2)
                valid2Count++;
            fields.clear();
        }
        else {
            const segments = line.split(' ');
            segments.forEach(segment => {
                const separatorIndex = segment.indexOf(':');
                const key = segment.slice(0, separatorIndex);
                const value = segment.slice(separatorIndex + 1);
                fields.set(key, value);
            });
        }
    }

    console.info('#1', validCount);
    console.info('#2', valid2Count);
});
