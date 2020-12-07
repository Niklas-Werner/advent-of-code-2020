import { parseJsonConfigFileContent } from 'typescript';
import { runDay } from '../utils';

const outerPattern = /^(?<color>[\w ]+) bags contain(?: (?<empty>no other bags)|(?<content>(?: \d+ [\w ]+ bags?,?)+))\.$/;
const innerPattern = / (?<count>\d+) (?<color>[\w ]+?) bags?,?/g;

runDay(__dirname, {}, async input => {
    const info = Object.fromEntries(input.map(line => {
        const { color, empty, content } = line.match(outerPattern)?.groups!;
        if (empty) {
            return [color, [] as []] as const;
        }
        else {
            const contentParsed = [...content.matchAll(innerPattern)].map(m => {
                const { count, color } = m.groups!;
                return { count: parseInt(count), color };
            });
            return [color, contentParsed] as const;
        }
    }));

    function visit(color: string, find: string): boolean {
        if (color === find)
            return true;
        return info[color].some(content => visit(content.color, find));
    }

    let result = 0;
    for (const color of Object.keys(info)) {
        if (color !== 'shiny gold' && visit(color, 'shiny gold'))
            result++;
    }

    console.info('#1', result);

    function count(color: string): number {
        return info[color].reduce((sum, content) => sum + content.count * count(content.color), 0) + 1;
    }

    console.info('#2', count('shiny gold') - 1);

});
