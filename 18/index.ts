import { runDay } from '../utils';

function evalExpr(expr: string) {
    let expr2 = expr;
    do {
        expr = expr2;
        expr2 = expr.replace(/\d+\+\d+/, str => String(eval(str)));
    } while (expr !== expr2);
    do {
        expr = expr2;
        expr2 = expr.replace(/\d+\*\d+/, str => String(eval(str)));
    } while (expr !== expr2);
    return expr2;
}

runDay(__dirname, {}, async input => {

    let sum = 0;
    let sum2 = 0;

    for (const line of input) {
        let current = 0;
        let current2 = '';
        let op: '+' | '*' = '+';
        const stack: [number, '+' | '*'][] = [];
        const stack2: string[] = [];

        for (const char of line) {
            switch (char) {
                case '(':
                    stack.push([current, op]);
                    stack2.push(current2);
                    current = 0;
                    op = '+';
                    current2 = '';
                    break;
                case ')':
                    const [prev, prevOp] = stack.pop()!;
                    current = prevOp === '+' ? prev + current : prev * current;
                    const prev2 = stack2.pop()!;
                    current2 = prev2 + evalExpr(current2);
                    break;
                case '+':
                case '*':
                    op = char;
                    current2 += char;
                    break;
                case ' ':
                    break;
                default:
                    current2 += char;
                    const value = parseInt(char, 10);
                    current = op === '+' ? current + value : current * value;
                    break;
            }
        }

        sum += current;
        sum2 += parseInt(evalExpr(current2), 10);
    }

    console.info('#1', sum);
    console.info('#2', sum2);

});
