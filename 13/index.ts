import { runDay } from '../utils';

function ee(a: bigint, b: bigint): [bigint, bigint] {
    if (b === 0n)
        return [1n, 0n];
    const [s, t] = ee(b, a % b);
    return [t, s - a / b * t];
}

runDay(__dirname, {}, async input => {

    const time = parseInt(input[0], 10);
    const ids = input[1].split(',').filter(id => id !== 'x').map(id => parseInt(id, 10));

    const waitTimes = ids.map(id => [id, id - time % id] as const);
    waitTimes.sort((a, b) => a[1] - b[1]);

    console.info('#1', waitTimes[0][0] * waitTimes[0][1]);

    const input2 = input[1];
    const ids2 = input2.split(',').map((id, i) => id === 'x' ? false : [BigInt(i), BigInt(parseInt(id, 10))] as const).filter((x): x is [bigint, bigint] => !!x);

    const M = ids2.reduce((p, id) => p * id[1], 1n);
    const x = ids2.reduce((s, [a, m]) => s + a * (M / m) * ee(m, M / m)[1], 0n);
    const r = (x % M + M) % M;

    console.info('#2', (M - r));

});
