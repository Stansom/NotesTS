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
//
let o1: NotesObj = {
    1: {
        name: "string",
        body: "string",
        createdAt: "string",
        id: 'id1',
        color: "string"
    }
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
    RCell
}