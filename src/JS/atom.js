function Atom(initValue) {
    let value = initValue || {};
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
    }
}

export {
    Atom
}