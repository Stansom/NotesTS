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

interface NotesObj {
    [key: number]: Note
}
//
// let o1: NotesObj = {1: {
//         name: "string",
//         body: "string",
//         createdAt: "string",
//         id: 1,
//         color: "string"
//     }}


interface Notes {
    activeNoteID: number,
    notes: NotesObj
}

export {
    Note,
    Notes
}