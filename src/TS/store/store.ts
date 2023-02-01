import {
    Atom
} from '../misc/atom.js';
import * as tools from '../misc/tools.js'
import * as localStorage from './localstorage.js';
import { Note, Notes } from '../types.js';
import { log } from '../misc/logger.js';

/* storage: {
               activeNoteID: number,
               notes {id: { name: String,
                        body: String,
                        createdAt: String,
                        id: String,
                        color: String}} */

const getNotesFromLocalStorage = () => localStorage.getFromLocalStorage('notes');
const setNotesToLocalStorage = (notes: Notes) => localStorage.setToLocalStorage('notes', notes);

const store = Atom<Notes>(null);

function createNote(name = '', body = '', id: number): Note {
    return {
        name,
        body,
        createdAt: tools.dateGenerator(),
        color: tools.softTonesGeneratorHSL(),
        id
    }
}

function addWatcher(watcher: (v: Notes) => unknown) {
    store.addWatcher(watcher);
}

function updateNoteName(noteID: number, name: string): void {
    store.update((oldNotes: Notes): Notes => {
        // return {
        //     ...oldNotes, notes: oldNotes.notes.map(updateField((n) => n.id === noteID, (n) => ({...n, name})))
        // }

        return {
            ...oldNotes,
            notes: tools.updateIn(oldNotes.notes, [noteID.toString(), "name"], () => name)
        }
    })
}

function updateNoteBody(noteID: number, body: string) {
    store.update((oldNotes: Notes): Notes => {
        return {
            ...oldNotes,
            notes: tools.updateIn(oldNotes.notes, [noteID.toString(), "body"], () => body)
        }
        // return {
        //     ...oldNotes, notes: oldNotes.notes.map(updateField((n) => n.id === noteID, (n) => ({ ...n, body })))
        // }
    })
}

function addNote(note: Note) {
    log('STORE: adding a new note: ', note, 'old notes', store.val())
    if (note) {
        store.update((ov: Notes) => ({
            ...ov,
            notes: { ...ov.notes, [note.id]: note }
        }))
    }
}

function setActive(id: number) {
    if (id >= 0) {
        log(`STORE: setting active note to ${id}`);
        store.update((ov) => ({
            ...ov,
            activeNoteID: id
        }))
    }
}

function removeKey(o: Object, k: string | number): Object {

    let newObj = { ...o };
    delete newObj[k as keyof typeof o];

    return newObj;

}


// function removeKey(o, k) {

//     let newObj = { ...o };
//     delete o[k];

//     return newObj;

// }
function removeNote(id: number) {

    if (id > 0) {
        log(`STORE: removing a note by id: ${id}`);

        store.update((oldNotes: Notes): Notes => {
            return {
                ...oldNotes,
                notes: { ...removeKey(oldNotes.notes, id.toString()) }

                // activeNoteID: oldNotes.activeNoteID,
            }
        });
    }


    // log(`STORE: last id ${actualNotesSize}`);
}

function initStore(init: Notes) {
    log('STORE: initializing');
    store.update(() => ({
        ...init
    }))
}

// addWatcher(setNotesToLocalStorage);
addWatcher((nv) => {
    // actualNotesSize = nv.notes.length;
    // log('STORE: From size watcher: ', actualNotesSize)
    setNotesToLocalStorage(nv);
});

export {
    // store,
    removeNote,
    addNote,
    addWatcher,
    setActive,
    getNotesFromLocalStorage,
    initStore,
    createNote,
    updateNoteBody,
    updateNoteName
}

