import { writeTextFile } from '@nw55/node-utils';
import { runDay } from '../utils';

runDay(__dirname, {}, async input => {

    const startingNumbers = input[0].split(',').map(x => parseInt(x, 10));

    const memory = new Map<number, number>();

    let lastNumber = 0;

    for (let turn = 1; turn <= 30000000; turn++) {
        let currentNumber;
        if (turn <= startingNumbers.length) {
            currentNumber = startingNumbers[turn - 1];
        }
        else {
            const lastNumberTurn = memory.get(lastNumber);
            if (lastNumberTurn === undefined)
                currentNumber = 0;
            else
                currentNumber = turn - 1 - lastNumberTurn;
        }
        memory.set(lastNumber, turn - 1);
        lastNumber = currentNumber;
        if (turn === 2020)
            console.info('#1', lastNumber);
    }

    console.info('#2', lastNumber);

});
