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

export {
    Note,
    Notes
}