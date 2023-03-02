import { Atom, ReactiveCell } from "../misc/atom.js";
import * as tools from "../misc/tools.js";
import { debounce, idNum, removeKey } from "../misc/tools.js";
import * as localStorage from "./localstorage.js";
import { log } from "../misc/logger.js";
/* Storage shape: {
               activeNoteID: number,
               notes {id: { name: String,
                        body: String,
                        createdAt: String,
                        id: String,
                        color: String}} */
const getNotesFromLocalStorage = () => localStorage.getFromLocalStorage("notes");
const setNotesToLocalStorage = (notes) => localStorage.setToLocalStorage("notes", notes);
/**
 * The global app storage atom
 */
const store = Atom({});
/**
 * Creates a new note<br>
 * By default parameters are empty strings
 * @param name Name of the new note
 * @param body Body of the new note
 */
function createNote(name = "", body = "") {
    const newNoteID = `id${idNum(lastID()) + 1}`;
    return {
        name,
        body,
        createdAt: tools.dateGenerator(),
        color: tools.softTonesGeneratorHSL(),
        id: newNoteID,
    };
}
/**
 * Updates a note name field by note ID
 * @param noteID
 * @param name
 */
function updateNoteName(noteID, name) {
    store.update((oldNotes) => {
        return Object.assign(Object.assign({}, oldNotes), { notes: tools.updateIn(oldNotes.notes, [noteID.toString(), "name"], () => name) });
    });
}
/**
 * Updates a note body field by note ID
 * @param noteID
 * @param body
 */
function updateNoteBody(noteID, body) {
    store.update((oldNotes) => {
        return Object.assign(Object.assign({}, oldNotes), { notes: tools.updateIn(oldNotes.notes, [noteID.toString(), "body"], () => body) });
    });
}
/**
 * Return count of all notes in the store
 */
function notesCount() {
    var _a;
    return Object.keys((_a = store.val()) === null || _a === void 0 ? void 0 : _a.notes).length || 1;
}
/**
 * Adds a new note to the store
 * @param note
 */
function addNote(note) {
    const n = note !== null && note !== void 0 ? note : createNote();
    log({ type: 'debug' }, "STORE: adding a new note: ", n);
    store.update((ov) => (Object.assign(Object.assign({}, ov), { notes: Object.assign(Object.assign({}, ov.notes), { [n.id]: n }), activeNoteID: n.id })));
}
/**
 * Sets a new active note ID by updating 'activeNoteID' field inside the store
 * @param id
 */
function setActiveNote(id) {
    log({ type: 'debug' }, `STORE: setting active note to ${id}`);
    store.update((ov) => (Object.assign(Object.assign({}, ov), { activeNoteID: id })));
}
/**
 * Returns an ID of the last note in the store
 */
function lastID() {
    var _a;
    return Object.keys((_a = store.val()) === null || _a === void 0 ? void 0 : _a.notes)[notesCount() - 1];
}
/**
 * Returns an ID of the previous Note
 * @param notes
 * @param currID
 */
function findPrevID(notes, currID) {
    const n = notes.notes;
    const nks = Object.keys(n);
    const currInd = nks.findIndex((v) => v === currID);
    const prevID = nks[currInd - 1];
    log({ type: 'debug' }, `STORE FIND PREV ID: keys ${nks} current ID: ${currInd}, previous ID: ${prevID}`);
    return prevID;
}
/**
 * Removes a note by given note ID from the store
 * @param id
 */
function removeNote(id) {
    let idToNum = idNum(id);
    if (idToNum <= 0) {
        setActiveNote("id0");
        return;
    }
    let newID = `id${idToNum - 1}`;
    log({ type: 'debug' }, `STORE: removing a note by id: ${idNum(id)} and new ID: ${newID}`);
    store.update((oldNotes) => {
        const prevID = findPrevID(oldNotes, id);
        return Object.assign(Object.assign({}, oldNotes), { notes: Object.assign({}, removeKey(oldNotes.notes, id)), activeNoteID: prevID });
    });
}
/**
 * Initializes the Notes store by taking Notes from the Local Storage if presented or
 * from init Notes object provided via function argument
 * @param init
 */
function initStore(init) {
    const initItems = getNotesFromLocalStorage() || init;
    log({ type: 'debug' }, "STORE: initializing");
    store.update(() => (Object.assign({}, initItems)));
}
/**
 * Returns active note id or 'id0'
 * @param nts
 */
function activeNote(nts) {
    return nts.activeNoteID || `id0`;
}
/**
 * Reactive Cell for watching an active note ID every store change
 */
ReactiveCell(store, activeNote);
/**
 * Reactive Cell for setting a new value to the Local Storage
 * with every store change, but with little throttle time
 */
ReactiveCell(store, debounce(setNotesToLocalStorage));
/**
 * 'Subscribes’ given in the arguments function to every store change
 * and returns a watchable Reactive Cell
 * @param f
 */
function storeWatcher(f) {
    return ReactiveCell(store, f);
}
export { removeNote, addNote, setActiveNote, initStore, createNote, updateNoteBody, updateNoteName, activeNote, 
// store,
storeWatcher, notesCount };
