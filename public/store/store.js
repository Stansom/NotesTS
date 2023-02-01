import { Atom } from "../misc/atom.js";
import * as tools from "../misc/tools.js";
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
const store = Atom(null);
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
function addWatcher(watcher) {
    store.addWatcher(watcher);
}
function updateNoteName(noteID, name) {
    store.update((oldNotes) => {
        return Object.assign(Object.assign({}, oldNotes), { notes: tools.updateIn(oldNotes.notes, [noteID.toString(), "name"], () => name) });
    });
}
function updateNoteBody(noteID, body) {
    store.update((oldNotes) => {
        return Object.assign(Object.assign({}, oldNotes), { notes: tools.updateIn(oldNotes.notes, [noteID.toString(), "body"], () => body) });
    });
}
function notesCount() {
    var _a;
    return Object.keys((_a = store.val()) === null || _a === void 0 ? void 0 : _a.notes).length || 1;
}
function addNote(note) {
    log("STORE: adding a new note: ", note, "old notes", store.val());
    if (note) {
        store.update((ov) => (Object.assign(Object.assign({}, ov), { notes: Object.assign(Object.assign({}, ov.notes), { [note.id]: note }), activeNoteID: note.id })));
    }
}
function setActiveNote(id) {
    log(`STORE: setting active note to ${id}`);
    store.update((ov) => (Object.assign(Object.assign({}, ov), { activeNoteID: id })));
}
function lastID() {
    var _a;
    return Object.keys((_a = store.val()) === null || _a === void 0 ? void 0 : _a.notes)[notesCount() - 1];
}
function removeKey(o, k) {
    let newObj = Object.assign({}, o);
    delete newObj[k];
    return newObj;
}
function idNum(id) {
    return Number(id.substring(2));
}
function findPrevID(o, currID) {
    const n = o.notes;
    const nks = Object.keys(n);
    const currInd = nks.findIndex((v) => v === currID);
    const prevID = nks[currInd - 1];
    log(`STORE FIND PREV ID: keys ${nks} current ID: ${currInd}, previous ID: ${prevID}`);
    return prevID;
}
function removeNote(id) {
    let idToNum = idNum(id);
    if (idToNum <= 0) {
        setActiveNote("id0");
        return;
    }
    let newID = `id${idToNum - 1}`;
    log(`STORE: removing a note by id: ${idNum(id)} and new ID: ${newID}`);
    store.update((oldNotes) => {
        const prevID = findPrevID(oldNotes, id);
        return Object.assign(Object.assign({}, oldNotes), { notes: Object.assign({}, removeKey(oldNotes.notes, id)), activeNoteID: prevID });
    });
}
function initStore(init) {
    const initItems = getNotesFromLocalStorage() || init;
    log("STORE: initializing");
    store.update(() => (Object.assign({}, initItems)));
}
function activeNote() {
    var _a;
    return ((_a = store.val()) === null || _a === void 0 ? void 0 : _a.activeNoteID) || `id0`;
}
addWatcher((nv) => {
    setNotesToLocalStorage(nv);
});
export { removeNote, addNote, addWatcher, setActiveNote, initStore, createNote, updateNoteBody, updateNoteName, activeNote,
// store,
 };
