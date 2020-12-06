import { runDay } from '../utils';

runDay(__dirname, { blankLines: 'group' }, async input => {

    const result1 = input.reduce((sum, group) => sum + new Set(group.flatMap(line => [...line])).size, 0);
    console.info('#1', result1);


    const result2 = input.reduce((sum, group) => {
        const set = new Set([...group[0]]);
        for (let i = 1; i < group.length; i++) {
            const set2 = new Set([...group[i]]);
            for (const entry of set) {
                if (!set2.has(entry))
                    set.delete(entry);
            }
        }
        return sum + set.size;
    }, 0);
    console.info('#2', result2);

});
