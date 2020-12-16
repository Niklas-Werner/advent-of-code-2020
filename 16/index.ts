import { MultiMap, TwoWayMap } from '@nw55/common';
import { runDay } from '../utils';

runDay(__dirname, { blankLines: 'group' }, async input => {

    const fields = new Map(input[0].map(line => {
        const segments1 = line.split(': ');
        const segments2 = segments1[1].split(' or ');
        const ranges = segments2.map(range => range.split('-').map(x => parseInt(x, 10)));
        return [segments1[0], ranges];
    }));

    const yourTicket = input[1][1].split(',').map(x => parseInt(x, 10));

    const nearbyTickets = input[2].slice(1).map(line => line.split(',').map(x => parseInt(x, 10)));

    const allRanges = [...fields.values()].flat();

    const allNearbyValues = nearbyTickets.flat();

    const invalidSum = allNearbyValues.reduce((sum, value) => {
        const isValid = allRanges.some(range => value >= range[0] && value <= range[1]);
        return sum + (isValid ? 0 : value);
    }, 0);

    console.info('#1', invalidSum);

    const validTickets = nearbyTickets.filter(values => values.every(value => allRanges.some(range => value >= range[0] && value <= range[1])));

    const matchCandidates = new MultiMap<number, string>();
    for (let i = 0; i < fields.size; i++) {
        for (const [key, ranges] of fields) {
            const match = validTickets.every(values => ranges.some(range => values[i] >= range[0] && values[i] <= range[1]));
            if (match)
                matchCandidates.add(i, key);
        }
    }

    const matches = new TwoWayMap<number, string>();
    function assignMatches(): boolean {
        if (matches.size >= fields.size)
            return true;

        const filteredMatchCandidates = [...matchCandidates.groupedEntries()]
            .filter(([i, fields]) => !matches.hasKey(i))
            .map(([i, fields]) => [i, [...fields].filter(field => !matches.hasValue(field))] as const)
            .filter(([i, fields]) => fields.length > 0)
            .sort((a, b) => a[1].length - b[1].length);

        if (filteredMatchCandidates.length === 0)
            return false;

        const [current, currentFields] = filteredMatchCandidates[0];

        for (const field of currentFields) {
            if (!matches.hasValue(field)) {
                matches.set(current, field);
                if (assignMatches())
                    return true;
                matches.delete(current);
            }
        }

        return false;
    }

    assignMatches();

    const result2 = [...fields.keys()]
        .filter(field => field.startsWith('departure'))
        .map(field => yourTicket[matches.getKey(field)!])
        .reduce((p, v) => p * v, 1);

    console.info('#2', result2);

});
