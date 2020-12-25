import { runDay } from '../utils';

interface Entry {
    prev: Entry;
    next: Entry;
    value: number;
}

class List {
    private _head: Entry;
    private _map = new Map<number, Entry>();

    constructor() {
        this._head = {} as Entry;
        this._head.prev = this._head;
        this._head.next = this._head;
    }

    get head() {
        return this._head.next;
    }

    push(value: number) {
        this.pushAfter(this._head.prev, value);
    }

    pushAfter(entry: Entry, value: number) {
        const newEntry = {
            prev: entry,
            next: entry.next,
            value
        };
        entry.next.prev = newEntry;
        entry.next = newEntry;
        this._map.set(value, newEntry);
        return newEntry;
    }

    toArray() {
        const result = [];
        let current = this._head;
        while (true) {
            current = current.next;
            if (current === this._head)
                break;
            result.push(current.value);
        }
        return result;
    }

    popAfter(entry: Entry): number {
        if (entry.next === this._head)
            return this.popAfter(this._head);
        const remove = entry.next;
        entry.next = remove.next;
        remove.next.prev = entry;
        this._map.delete(remove.value);
        return remove.value;
    }

    has(value: number) {
        return this._map.has(value);
    }

    getEntry(value: number) {
        return this._map.get(value);
    }

    getNext(entry: Entry) {
        if (entry.next === this._head)
            return this._head.next;
        return entry.next;
    }
}

runDay(__dirname, {}, async input => {

    let cups = input[0].split('').map(x => parseInt(x, 10));
    let count = cups.length;
    let min = Math.min(...cups);
    let max = Math.max(...cups);

    let currentIndex = 0;
    for (let i = 0; i < 100; i++) {
        const current = cups[currentIndex];
        const part1 = Math.min(count - currentIndex - 1, 3);
        let taken = cups.splice(currentIndex + 1, part1).concat(cups.splice(0, 3 - part1));
        let destination = current;
        do {
            destination--;
            if (destination < min)
                destination = max;
        } while (!cups.includes(destination));
        cups.splice((cups.indexOf(destination) + 1) % count, 0, ...taken);
        currentIndex = (cups.indexOf(current) + 1) % count;
    }

    console.info('#1', (cups.join('') + cups.join('')).replace(/.*1(.*)1.*/, '$1'));

    count = 1000000;

    cups = input[0].split('').map(x => parseInt(x, 10));
    const list = new List();
    for (const item of cups)
        list.push(item);
    for (let x = max + 1; x <= count; x++)
        list.push(x);
    max = count;

    let current = list.head;
    for (let i = 0; i < 10000000; i++) {
        if (i % 500000 === 0)
            console.info(`${i / 500000} / 20`);
        const cup1 = list.popAfter(current);
        const cup2 = list.popAfter(current);
        const cup3 = list.popAfter(current);
        let destination = current.value;
        do {
            destination--;
            if (destination < min)
                destination = max;
        } while (!list.has(destination));
        const destinationEntry = list.getEntry(destination)!;
        list.pushAfter(destinationEntry, cup3);
        list.pushAfter(destinationEntry, cup2);
        list.pushAfter(destinationEntry, cup1);
        current = list.getNext(current);
    }

    const entry1 = list.getEntry(1)!;
    const cup1 = list.getNext(entry1).value;
    const cup2 = list.getNext(list.getNext(entry1)).value;
    console.info('#2', cup1, cup2, cup1 * cup2);

});
