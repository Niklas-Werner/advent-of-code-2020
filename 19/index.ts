import { runDay } from '../utils';

runDay(__dirname, { blankLines: 'group' }, async input => {

    const ruleStrings = new Map<number, string>();
    for (const rule of input[0]) {
        const match = rule.match(/^(\d+): (.*)$/)!;
        ruleStrings.set(parseInt(match[1], 10), match[2]);
    }

    const rulePatterns = new Map<number, string>();
    function getPattern(id: number, part2: boolean): string {
        let pattern = rulePatterns.get(id);
        if (pattern === undefined) {
            if (part2 && id === 8) {
                const p42 = getPattern(42, part2);
                pattern = p42 + '+';
            }
            else if (part2 && id === 11) {
                const p42 = getPattern(42, part2);
                const p31 = getPattern(31, part2);
                pattern = `${p42}${p31}|${p42}{2}${p31}{2}|${p42}{3}${p31}{3}|${p42}{4}${p31}{4}|${p42}{5}${p31}{5}`;
            }
            else {
                const rule = ruleStrings.get(id)!;
                if (rule.startsWith('"')) {
                    pattern = rule.slice(1, -1);
                }
                else {
                    pattern = rule
                        .replace(/(\d+)/g, (str, subId) => getPattern(parseInt(subId, 10), part2))
                        .replace(/ /g, '');
                }
            }
            // if (pattern.includes('|'))
            pattern = '(?:' + pattern + ')';
            rulePatterns.set(id, pattern);
        }
        return pattern;
    }

    const pattern = getPattern(0, false);
    const regex = new RegExp('^' + pattern + '$');

    const matches = input[1].filter(line => regex.test(line)).length;
    console.info('#1', matches);

    rulePatterns.clear();
    const pattern2 = getPattern(0, true);
    const regex2 = new RegExp('^' + pattern2 + '$');

    const matches2 = input[1].filter(line => regex2.test(line)).length;
    console.info('#2', matches2);

});
