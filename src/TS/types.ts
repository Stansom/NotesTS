// storage: {
//               activeNoteID: String,
//               note-id {name: String,
//                     body: String,
//                     createdAt: String,
//                     id: String,
//                     color: String,
//                     active: Boolean}}
interface Note {
    name: string,
    body: string,
    createdAt: string,
    id: number,
    color: string
}

interface Notes {
    activeNoteID: number,
    notes: Array<Note>
}

export {
    Note,
    Notes
}