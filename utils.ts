import { tryReadTextFile } from '@nw55/node-utils';
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
