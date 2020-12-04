import { Awaitable } from '@nw55/common';
import { runMain, tryReadTextFile } from '@nw55/node-utils';
import { resolve } from 'path';

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
    readonly keepBlankLines?: boolean;
}

export function runDay(dir: string, options: DayOptions, fn: (input: string[]) => Awaitable<void>) {
    runMain(async ([param]) => {
        const file = resolve(dir, param === 'test' ? 'test-input' : 'input');
        const content = await tryReadTextFile(file);
        if (content === null)
            throw new Error('file not found');
        const lines = content.split(/\r?\n/g);
        const input = options.keepBlankLines ? lines : lines.filter(line => line !== '');
        await fn(input);
    });
}
