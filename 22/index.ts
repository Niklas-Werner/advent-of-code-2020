import { runDay } from '../utils';

runDay(__dirname, { blankLines: 'group' }, async (input, { test }) => {

    let player1Cards = input[0].slice(1).map(line => parseInt(line, 10));
    let player2Cards = input[1].slice(1).map(line => parseInt(line, 10));

    if (test !== 2) {
        while (player1Cards.length > 0 && player2Cards.length > 0) {
            if (player1Cards[0] > player2Cards[0]) {
                player1Cards.push(player1Cards.shift()!);
                player1Cards.push(player2Cards.shift()!);
            }
            else {
                player2Cards.push(player2Cards.shift()!);
                player2Cards.push(player1Cards.shift()!);
            }
        }

        const winner1 = player1Cards.length > 0 ? player1Cards : player2Cards;

        const result1 = winner1.reduce((sum, card, index) => sum + card * (winner1.length - index), 0);

        console.info('#1', result1);
    }

    player1Cards = input[0].slice(1).map(line => parseInt(line, 10));
    player2Cards = input[1].slice(1).map(line => parseInt(line, 10));

    function game2(player1: number[], player2: number[], rounds: Set<string>) {
        while (player1.length > 0 && player2.length > 0) {
            const round = player1.join(', ') + ' | ' + player2.join(', ');
            if (rounds.has(round))
                return true;
            rounds.add(round);
            let player1Win;
            if (player1.length > player1[0] && player2.length > player2[0])
                player1Win = game2(player1.slice(1, player1[0] + 1), player2.slice(1, player2[0] + 1), new Set());
            else
                player1Win = player1[0] > player2[0];
            if (player1Win) {
                player1.push(player1.shift()!);
                player1.push(player2.shift()!);
            }
            else {
                player2.push(player2.shift()!);
                player2.push(player1.shift()!);
            }
        }
        return player1.length > 0;
    }

    game2(player1Cards, player2Cards, new Set());

    const winner2 = player1Cards.length > 0 ? player1Cards : player2Cards;

    const result2 = winner2.reduce((sum, card, index) => sum + card * (winner2.length - index), 0);

    console.info('#2', result2);

});
