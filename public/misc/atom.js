import { log } from "./logger.js";
function Atom(initValue) {
    log({ type: 'debug' }, "ATOM: initializing");
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
        addWatcher: (watcher) => watchers.push(watcher),
    };
}
function ReactiveCell(a, f) {
    const cell = Atom(a.val());
    a.addWatcher((val) => {
        cell.update(() => {
            return f(val);
        });
    });
    return {
        val: cell.val,
        addWatcher: cell.addWatcher
    };
}
export { Atom, ReactiveCell };
