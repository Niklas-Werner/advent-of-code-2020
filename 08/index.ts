import { runDay } from '../utils';


runDay(__dirname, {}, async input => {

    const program = input.map(line => {
        const match = line.match(/^(nop|acc|jmp) ([+-]\d+)$/);
        if (!match)
            throw new Error('parse error: ' + line);
        return {
            op: match[1] as 'nop' | 'acc' | 'jmp',
            arg: parseInt(match[2])
        };
    });

    function run() {
        let ip = 0;
        let acc = 0;
        const visited = new Set<number>();
        while (true) {
            if (ip === program.length)
                return { loop: false, acc };
            if (visited.has(ip))
                return { loop: true, acc };
            visited.add(ip);
            const ins = program[ip];
            switch (ins.op) {
                case 'acc':
                    acc += ins.arg;
                    ip++;
                    break;
                case 'jmp':
                    ip += ins.arg;
                    break;
                default:
                    ip++;
                    break;
            }
        }
    }

    const result1 = run();
    console.info('#1', result1.acc);

    function switchOp(ins: typeof program[number]) {
        if (ins.op === 'jmp') {
            ins.op = 'nop';
            return true;
        }
        if (ins.op === 'nop') {
            ins.op = 'jmp';
            return true;
        }
        return false;
    }

    for (const ins of program) {
        if (switchOp(ins)) {
            const result = run();
            if (!result.loop)
                console.info('#2', result.acc);
            switchOp(ins);
        }
    }

});
