import {
    Atom
} from '../misc/atom.js';
import * as tools from '../misc/tools.js'
import * as localStorage from './localstorage.js';
import {Note, Notes} from '../types.js';
import {log} from '../misc/logger.js';

/* storage: {
               activeNoteID: number,
               notes [{ name: String,
                        body: String,
                        createdAt: String,
                        id: String,
                        color: String}]} */

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

// let actualNotesSize = 0;

// function lastID(): number {
//     const size = (store.val() as Notes).notes.length;
//
//     return size;
// }

function addWatcher(watcher: (v: Notes) => unknown) {
    store.addWatcher(watcher);
}

function updateField(pred: (n: Note) => boolean, f: (n: Note) => Note): (n: Note) => Note {

    return (note: Note) => {
        log(`STORE: updating the note ${note.id}`)

        return pred(note) ? f(note) : note
    }
}

function updateNoteName(noteID: number, name: string) {
    store.update((oldNotes: Notes): Notes => {
        return {
            ...oldNotes, notes: oldNotes.notes.map(updateField((n) => n.id === noteID, (n) => ({...n, name})))
        }
    })
}

function updateNoteBody(noteID: number, body: string) {
    store.update((oldNotes: Notes): Notes => {
        return {
            ...oldNotes, notes: oldNotes.notes.map(updateField((n) => n.id === noteID, (n) => ({...n, body})))
        }
    })
}

function addNote(note: Note) {
    log('STORE: adding a new note: ', note, 'old notes', store.val())
    if (note) {
        store.update((ov: Notes) => ({
            ...ov,
            // activeNoteID: note.id,
            notes: [...ov.notes, note]
        }))
        // setActive(note.id + 1)
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

function removeNote(id: number) {
    if (id > 0) {
        log(`STORE: removing a note by id: ${id}`);

        store.update((oldNotes: Notes): Notes => {
            return {
                ...oldNotes,
                notes: oldNotes.notes.filter((n: Note) => n.id !== id),
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

