import {
    Atom
} from './atom.js';
import * as tools from './tools.js'
import {
    log
} from './logger.js';
import * as localStorage from './localstorage.js';

const getNotesFromLocalStorage = () => localStorage.getFromLocalStorage('notes');
const setNotesToLocalStorage = (notes) => localStorage.setToLocalStorage('notes', notes)
// const restoreNotes = () => {
//     const notes = Storage.getNotes();
//     if (tools.isEmpty(notes)) return;
//     return {
//         ...notes
//     };
// }

function createNote(name = '', body = '') {
    return {
        name,
        body,
        createdAt: tools.dateGenerator(),
        // id: tools.idGenerator(),
        id: lastID() + 1,
        color: tools.softTonesGeneratorHSL(),
        active: false
    }
}

function lastID() {
    const size = Object.keys(store.val().notes).length - 1;
    // console.log(size);
    // store.val.at(-1);
    return size;
}

// storage: {
//               activeNoteID: String,
//               note-id {name: String,
//                     body: String,
//                     createdAt: String,
//                     id: String,
//                     color: String,
//                     active: Boolean}}

// const nts = {
//     // id1: createNote('booba1', 'bla lbldlblblal 1'),
//     // id2: createNote('suka2', 'asdnfjdj kaksd'),
//     // id3: createNote('kakal', 'shamakel')
// }

// const nts = getNotesFromLocalStorage() || {
//     activeNoteID: 145,
//     notes: {
//         145: {
//             color: tools.softTonesGeneratorHSL(),
//             active: true,
//             name: 'nu tak',
//             body: 'tuhlak',
//             createdAt: tools.dateGenerator(),
//             id: 145
//         }
//     }
// };

// log(true, nts);

const store = Atom({});

function addWatcher(watcher) {
    store.addWatcher(watcher);
}

function assignNote(note) {
    return {
        [note.id]: note
    };
}

function addNote(note) {
    // log(true, 'adding a new note: ', note, 'old notes', store.val())
    if (note) {
        store.update((ov) => ({
            ...ov,
            notes: Object.assign(ov.notes, assignNote(note)),
            activeNoteID: note.id
            // notes: assignNote(note)
        }))
    }
}

function setActive(id) {
    if (id) {
        store.update((ov) => ({
            ...ov,
            activeNoteID: Number(id)
        }))
    }
}

// addNote(nts);
// log(true, nts)
// addNote(createNote('booba1', 'bla lbldlblblal 1'))
// addNote(createNote('suka2', 'asdnfjdj kaksd'))
// addWatcher(console.log)

function removeKey(m, k) {
    return tools.copyOnEdit(m, (c) => delete c[k]);
    // return m.filter((v) => v.id === k)
}


function removeNote(id) {
    store.update((notes) =>
        ({
            ...notes,
            notes: removeKey(notes.notes, id)
        }))
    log(true, 'deleting a note with ID: ', id)
}

function updateNote(id, f) {
    store.update((notes) => tools.copyOnEdit(notes, (note) => note[id]))
}

function initStore(init) {
    store.update(() => ({
        ...init
    }))
}

addWatcher(setNotesToLocalStorage);

export {
    // store,
    removeNote,
    addNote,
    addWatcher,
    setActive,
    getNotesFromLocalStorage,
    initStore,
    createNote
}