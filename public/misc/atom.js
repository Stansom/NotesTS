import { log } from "./logger.js";
/**
 * Creates an Atom object
 * You can subscribe to it to watch the changes
 * @param initValue of type T
 * @constructor
 *
 * @example
 * let counter = Atom(10);
 * counter.addWatcher(console.log);
 * counter.update((oldValue) => oldValue + 1);
 * =>> Logs to console "1"
 * counter.update((oldValue) => oldValue + 1);
 * =>> Logs to console "2"
 */
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
/**
 * A 'watcher' for given Atom, it can't change self state or state of a watchable Atom.<br>
 * Just looks for new values and reacts to change<br>
 * You can 'subscribe' or watch to the ReactiveCell
 *
 * @param a Atom for watching
 * @param f Function to react to the Atom change, takes a new value of the Atom to operate
 * @constructor
 *
 * @example
 * let counter = Atom(0);
 * let reactCounter = ReactiveCell(counter, console.log);
 *
 * counter.update((ov) => ov + 1);
 * ==> Logs to console '1'
 * counter.update((ov) => ov + 1);
 * ==> Logs to console '2'
 */
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
