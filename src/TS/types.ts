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

export {
    Note,
    Notes
}