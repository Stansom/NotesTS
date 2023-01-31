import {Note, Notes} from "../types.js";
import {log} from "./logger.js";

function Atom<T>(initValue: T | null) {
    log('ATOM: initializing');
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
        addWatcher: (watcher: (v: T) => unknown) => watchers.push(watcher)
    }
}

// function Atom(initValue: Notes) {
//     log('ATOM: initializing');
//     let value: Notes = initValue;
//     const watchers: Array<(v: any) => unknown> = [];
//
//     return {
//         val: () => value,
//         update: (f: (v: Notes) => {}) => {
//             const oldValue = value;
//             const newValue = f(value);
//
//             if (oldValue !== newValue) {
//                 value = newValue as Notes;
//                 watchers.forEach((watcher: (v: Notes) => unknown) => watcher(newValue));
//             }
//         },
//         addWatcher: (watcher: (v: Notes) => unknown) => watchers.push(watcher)
//     }
// }

export {
    Atom
}