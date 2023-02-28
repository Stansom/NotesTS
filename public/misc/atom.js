import { log } from "./logger.js";
function Atom(initValue) {
    log("ATOM: initializing");
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
    // const cell = Atom<T>(f(a.val()) || a.val());
    const cell = Atom(a.val());
    a.addWatcher((val) => {
        cell.update((cv) => {
            // const oldVal = f({ ...cv }) || 0;
            // const nv = f(val);
            // console.log("from reactive cell", oldVal, nv)
            // if (oldVal !== nv) {
            //     watchers.forEach(w => w(nv));
            //     // console.log("from reactive cell", { ...cv, nv })
            // }
            // return { ...cv, nv }
            return f(val);
        });
    });
    return {
        val: cell.val,
        addWatcher: cell.addWatcher
    };
}
export { Atom, ReactiveCell };
