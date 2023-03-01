import { Atomic, RCell } from "../types.js";
import { log } from "./logger.js";

function Atom<T>(initValue: T | null): Atomic<T> {
    log({ type: 'debug' }, "ATOM: initializing");
    let value = initValue;
    const watchers: Array<(v: T) => unknown> = [];

    return {
        val: () => value,
        update: (f: (v: T) => T) => {
            const oldValue = value;
            const newValue = f(value as T);

            if (oldValue !== newValue) {
                value = newValue;
                watchers.forEach((watcher: (v: T) => unknown) => watcher(newValue));
            }
        },
        addWatcher: (watcher: (v: T) => unknown) => watchers.push(watcher),
    };
}

function ReactiveCell<T>(a: Atomic<T>, f: Function): RCell<T> {
    const cell = Atom<T>(a.val());
    a.addWatcher((val) => {
        cell.update(() => {
            return f(val)
        })
    })

    return {
        val: cell.val,
        addWatcher: cell.addWatcher
    }
}

export { Atom, ReactiveCell };
