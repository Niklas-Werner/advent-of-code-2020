import { Awaitable } from '@nw55/common';
import { LogLevel } from '@nw55/logging';
import { runMain, tryReadTextFile, useDefaultConsoleLogging } from '@nw55/node-utils';
import { resolve } from 'path';

useDefaultConsoleLogging(LogLevel.Warning);

export async function readNonEmptyLines(...pathSegments: string[]) {
    const file = resolve(...pathSegments);
    const content = await tryReadTextFile(file);
    if (content === null)
        throw new Error('file not found');
    const lines = content.split(/\r?\n/g);
    return lines.filter(line => line !== '');
}

export function isNonNullable<T>(x: T): x is NonNullable<T> {
    return x !== null && x !== undefined;
}

export interface DayOptions {
    readonly blankLines?: false | 'keep' | 'group';
}

type InputType<Options extends DayOptions> = Options['blankLines'] extends 'group' ? string[][] : string[];

interface FnOptions {
    test: number;
}

export function runDay<O extends DayOptions>(dir: string, options: O, fn: (input: InputType<O>, options: FnOptions) => Awaitable<void>) {
    runMain(async ([param]) => {
        const file = resolve(dir, param === 'test' ? 'test-input' : param === 'test2' ? 'test-input2' : 'input');
        const fnOptions: FnOptions = {
            test: param === 'test' ? 1 : param === 'test2' ? 2 : 0
        };
        let content = await tryReadTextFile(file);
        if (content === null)
            throw new Error('file not found');
        content = content.replace(/(?:\r?\n)+$/, '');
        switch (options.blankLines) {
            case 'keep': {
                const lines = content.split(/\r?\n/g);
                await fn(lines as InputType<typeof options>, fnOptions);
                break;
            }
            case 'group': {
                const groups = content.split(/(?:\r?\n){2}/g);
                const input = groups.map(group => group.split(/\r?\n/g));
                await fn(input as InputType<typeof options>, fnOptions);
                break;
            }
            default: {
                const lines = content.split(/\r?\n/g);
                const input = options.blankLines ? lines : lines.filter(line => line !== '');
                await fn(input as InputType<typeof options>, fnOptions);
                break;
            }
        }
    });
}
