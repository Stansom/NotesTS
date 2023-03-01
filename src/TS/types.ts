interface Note {
    name: string,
    body: string,
    createdAt: string,
    id: string,
    color: string
}

interface NotesObj {
    [index: string]: Note
}
interface Notes {
    activeNoteID: string,
    notes: NotesObj
}

interface Atomic<T> {
    val: () => any,
    update: (f: (v: T) => T) => void,
    addWatcher: (watcher: (v: T) => unknown) => void
}

type RCell<T> = Omit<Atomic<T>, 'update'>;

export {
    Note,
    Notes,
    Atomic,
    RCell,
}