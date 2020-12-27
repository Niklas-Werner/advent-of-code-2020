import { runDay } from '../utils';

runDay(__dirname, {}, async input => {

    const p1 = parseInt(input[0], 10);
    const p2 = parseInt(input[1], 10);

    let p;
    let l;

    let v = 1;
    for (let i = 1; true; i++) {
        v *= 7;
        v %= 20201227;
        if (v === p1) {
            p = p2;
            l = i;
            break;
        }
        if (v === p1) {
            p = p2;
            l = i;
            break;
        }
    }

    let k = 1;
    for (let i = 1; i <= l; i++) {
        k *= p;
        k %= 20201227;
    }

    console.info('#1', k);

});
