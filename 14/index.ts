import { runDay } from '../utils';

runDay(__dirname, {}, async (input, { test }) => {

    const memory = new Map<number, bigint>();
    let orMask = 0n;
    let andMask = 0n;

    for (const line of input) {
        if (line.startsWith('mask =')) {
            const mask = line.slice(7);
            orMask = BigInt('0b' + mask.replace(/X/g, '0'));
            andMask = BigInt('0b' + mask.replace(/X/g, '1'));
        }
        else {
            const match = line.match(/^mem\[(\d+\]) = (\d+)$/)!;
            const address = parseInt(match[1], 10);
            const value = BigInt(parseInt(match[2], 10));
            memory.set(address, value & andMask | orMask);
        }
    }

    const sum = [...memory.values()].reduce((a, b) => a + b, 0n);
    console.info('#1', Number(sum));

    if (test === 1)
        return;

    const memory2 = new Map<bigint, number>();
    let floating: number[] = [];

    for (const line of input) {
        if (line.startsWith('mask =')) {
            const mask = line.slice(7);
            floating = [...mask].map((x, i) => x === 'X' ? 35 - i : -1).filter(i => i !== -1);
            andMask = BigInt('0b' + mask.replace(/0/g, '1').replace(/X/g, '0'));
            orMask = BigInt('0b' + mask.replace(/X/g, '0'));
        }
        else {
            const match = line.match(/^mem\[(\d+\]) = (\d+)$/)!;
            const baseAddress = BigInt(parseInt(match[1], 10)) & andMask | orMask;
            const value = parseInt(match[2], 10);
            const addresses = floating.reduce((addrs, i) => addrs.concat(addrs.map(addr => addr | 2n ** BigInt(i))), [baseAddress]);
            addresses.forEach(address => memory2.set(address, value));
        }
    }

    const sum2 = [...memory2.values()].reduce((a, b) => a + b, 0);
    console.info('#2', sum2);

});
