import { log } from "./logger.js";
function Atom(initValue) {
    log('ATOM: initializing');
    let value = initValue;
    const watchers = [];
    return {
        val: () => value,
        update: (f) => {
            const oldValue = value;
            const newValue = f(value);
            if (oldValue !== newValue) {
                value = newValue;
                watchers.forEach((watcher) => watcher(newValue));
            }
        },
        addWatcher: (watcher) => watchers.push(watcher)
    };
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
export { Atom };
