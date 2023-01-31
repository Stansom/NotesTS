import { Atom } from '../misc/atom.js';
import * as tools from '../misc/tools.js';
import * as localStorage from './localstorage.js';
import { log } from '../misc/logger.js';
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
const setNotesToLocalStorage = (notes) => localStorage.setToLocalStorage('notes', notes);
const store = Atom(null);
function createNote(name = '', body = '', id) {
    return {
        name,
        body,
        createdAt: tools.dateGenerator(),
        color: tools.softTonesGeneratorHSL(),
        id
    };
}
// let actualNotesSize = 0;
// function lastID(): number {
//     const size = (store.val() as Notes).notes.length;
//
//     return size;
// }
function addWatcher(watcher) {
    store.addWatcher(watcher);
}
function updateField(pred, f) {
    return (note) => {
        log(`STORE: updating the note ${note.id}`);
        return pred(note) ? f(note) : note;
    };
}
function updateNoteName(noteID, name) {
    store.update((oldNotes) => {
        return Object.assign(Object.assign({}, oldNotes), { notes: oldNotes.notes.map(updateField((n) => n.id === noteID, (n) => (Object.assign(Object.assign({}, n), { name })))) });
    });
}
function updateNoteBody(noteID, body) {
    store.update((oldNotes) => {
        return Object.assign(Object.assign({}, oldNotes), { notes: oldNotes.notes.map(updateField((n) => n.id === noteID, (n) => (Object.assign(Object.assign({}, n), { body })))) });
    });
}
function addNote(note) {
    log('STORE: adding a new note: ', note, 'old notes', store.val());
    if (note) {
        store.update((ov) => (Object.assign(Object.assign({}, ov), { 
            // activeNoteID: note.id,
            notes: [...ov.notes, note] })));
        // setActive(note.id + 1)
    }
}
function setActive(id) {
    if (id >= 0) {
        log(`STORE: setting active note to ${id}`);
        store.update((ov) => (Object.assign(Object.assign({}, ov), { activeNoteID: id })));
    }
}
function removeNote(id) {
    if (id > 0) {
        log(`STORE: removing a note by id: ${id}`);
        store.update((oldNotes) => {
            return Object.assign(Object.assign({}, oldNotes), { notes: oldNotes.notes.filter((n) => n.id !== id) });
        });
    }
    // log(`STORE: last id ${actualNotesSize}`);
}
function initStore(init) {
    log('STORE: initializing');
    store.update(() => (Object.assign({}, init)));
}
// addWatcher(setNotesToLocalStorage);
addWatcher((nv) => {
    // actualNotesSize = nv.notes.length;
    // log('STORE: From size watcher: ', actualNotesSize)
    setNotesToLocalStorage(nv);
});
export { 
// store,
removeNote, addNote, addWatcher, setActive, getNotesFromLocalStorage, initStore, createNote, updateNoteBody, updateNoteName };
