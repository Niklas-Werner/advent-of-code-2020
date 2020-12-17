import { runDay } from '../utils';

runDay(__dirname, {}, async input => {

    const steps = 6;

    const initialState = input.map(line => [...line].map(x => x === '#'));

    function createGrid3() {
        return Array(steps * 2 + 1)
            .fill(undefined)
            .map(i => Array(initialState.length + steps * 2)
                .fill(undefined)
                .map(j => Array(initialState[0].length + steps * 2)
                    .fill(false)));
    }

    let grid3 = createGrid3();

    input.forEach((line, j) => [...line].forEach((x, k) => {
        grid3[6][6 + j][6 + k] = x === '#';
    }));

    function step3(grid: boolean[][][]) {
        const result = createGrid3();
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                for (let k = 0; k < grid[i][j].length; k++) {
                    const active = grid[i][j][k];
                    let count = 0;
                    for (let i2 = -1; i2 <= 1; i2++) {
                        if (i + i2 < 0 || i + i2 >= grid.length)
                            continue;
                        for (let j2 = -1; j2 <= 1; j2++) {
                            if (j + j2 < 0 || j + j2 >= grid[i + i2].length)
                                continue;
                            for (let k2 = -1; k2 <= 1; k2++) {
                                if (k + k2 < 0 || k + k2 >= grid[i + i2][j + j2].length)
                                    continue;
                                if (i2 === 0 && j2 === 0 && k2 === 0)
                                    continue;
                                if (grid[i + i2][j + j2][k + k2])
                                    count++;
                            }
                        }
                    }
                    if (active)
                        result[i][j][k] = count === 2 || count === 3;
                    else
                        result[i][j][k] = count === 3;
                }
            }
        }
        return result;
    }


    for (let i = 0; i < steps; i++)
        grid3 = step3(grid3);

    const count1 = grid3.flat(2).filter(x => x).length;

    console.info('#1', count1);

    function createGrid4() {
        return Array(steps * 2 + 1)
            .fill(undefined)
            .map(i => Array(steps * 2 + 1)
                .fill(undefined)
                .map(j => Array(initialState.length + steps * 2)
                    .fill(undefined)
                    .map(k => Array(initialState[0].length + steps * 2)
                        .fill(undefined))));
    }

    let grid4 = createGrid4();

    input.forEach((line, j) => [...line].forEach((x, k) => {
        grid4[6][6][6 + j][6 + k] = x === '#';
    }));

    function step4(grid: boolean[][][][]) {
        const result = createGrid4();
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                for (let k = 0; k < grid[i][j].length; k++) {
                    for (let l = 0; l < grid[i][j][k].length; l++) {
                        const active = grid[i][j][k][l];
                        let count = 0;
                        for (let i2 = -1; i2 <= 1; i2++) {
                            if (i + i2 < 0 || i + i2 >= grid.length)
                                continue;
                            for (let j2 = -1; j2 <= 1; j2++) {
                                if (j + j2 < 0 || j + j2 >= grid[i + i2].length)
                                    continue;
                                for (let k2 = -1; k2 <= 1; k2++) {
                                    if (k + k2 < 0 || k + k2 >= grid[i + i2][j + j2].length)
                                        continue;
                                    for (let l2 = -1; l2 <= 1; l2++) {
                                        if (l + l2 < 0 || l + l2 >= grid[i + i2][j + j2][k + k2].length)
                                            continue;
                                        if (i2 === 0 && j2 === 0 && k2 === 0 && l2 === 0)
                                            continue;
                                        if (grid[i + i2][j + j2][k + k2][l + l2])
                                            count++;
                                    }
                                }
                            }
                        }
                        if (active)
                            result[i][j][k][l] = count === 2 || count === 3;
                        else
                            result[i][j][k][l] = count === 3;
                    }
                }
            }
        }
        return result;
    }


    for (let i = 0; i < steps; i++)
        grid4 = step4(grid4);

    const count2 = grid4.flat(3).filter(x => x).length;

    console.info('#2', count2);

});
