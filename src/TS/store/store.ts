import {Atom, ReactiveCell} from "../misc/atom.js";
import * as tools from "../misc/tools.js";
import {debounce, removeKey} from "../misc/tools.js";
import * as localStorage from "./localstorage.js";
import {Note, Notes, RCell} from "../types.js";
import {log} from "../misc/logger.js";

/* Storage shape: {
               activeNoteID: number,
               notes {id: { name: String,
                        body: String,
                        createdAt: String,
                        id: String,
                        color: String}} */

const getNotesFromLocalStorage = () =>
    localStorage.getFromLocalStorage("notes");
const setNotesToLocalStorage = (notes: Notes) =>
    localStorage.setToLocalStorage("notes", notes);

/**
 * The global app storage atom
 */
const store = Atom<Notes>({} as Notes);

/**
 * Creates a new note<br>
 * By default parameters are empty strings
 * @param name Name of the new note
 * @param body Body of the new note
 */
function createNote(name = "", body = ""): Note {
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
function updateNoteName(noteID: string, name: string): void {
    store.update((oldNotes: Notes): Notes => {
        return {
            ...oldNotes,
            notes: tools.updateIn(
                oldNotes.notes,
                [noteID.toString(), "name"],
                () => name
            ),
        };
    });
}

/**
 * Updates a note body field by note ID
 * @param noteID
 * @param body
 */
function updateNoteBody(noteID: string, body: string) {
    store.update((oldNotes: Notes): Notes => {
        return {
            ...oldNotes,
            notes: tools.updateIn(
                oldNotes.notes,
                [noteID.toString(), "body"],
                () => body
            ),
        };
    });
}

/**
 * Return count of all notes in the store
 */
function notesCount() {
    return Object.keys(store.val()?.notes!).length || 1;
}

/**
 * Adds a new note to the store
 * @param note
 */
function addNote(note: Note) {
    log({type: 'debug'}, "STORE: adding a new note: ", note);
    if (note) {
        store.update((ov: Notes) => ({
            ...ov,
            notes: {...ov.notes, [note.id]: note},
            activeNoteID: note.id,
        }));
    }
}

/**
 * Sets a new active note ID by updating 'activeNoteID' field inside the store
 * @param id
 */
function setActiveNote(id: string) {
    log({type: 'debug'}, `STORE: setting active note to ${id}`);
    store.update((ov) => ({
        ...ov,
        activeNoteID: id,
    }));
}

/**
 * Returns an ID of the last note in the store
 */
function lastID(): string {
    return Object.keys(store.val()?.notes!)[notesCount() - 1];
}

/**
 * Converts an ID string to number
 *
 * @example
 * 'id32' => 32
 *
 * @param id
 */
function idNum(id: string): number {
    return Number(id.substring(2));
}

/**
 * Returns an ID of the previous Note
 * @param notes
 * @param currID
 */
function findPrevID(notes: Notes, currID: string): string {
    const n = notes.notes;
    const nks = Object.keys(n!);
    const currInd = nks.findIndex((v) => v === currID);
    const prevID = nks[currInd - 1];

    log(
        {type: 'debug'}, `STORE FIND PREV ID: keys ${nks} current ID: ${currInd}, previous ID: ${prevID}`
    );

    return prevID;
}

/**
 * Removes a note by given note ID from the store
 * @param id
 */
function removeNote(id: string) {
    let idToNum = idNum(id);
    if (idToNum <= 0) {
        setActiveNote("id0");
        return;
    }
    let newID = `id${idToNum - 1}`;

    log({type: 'debug'}, `STORE: removing a note by id: ${idNum(id)} and new ID: ${newID}`);
    store.update((oldNotes: Notes): Notes => {
        const prevID = findPrevID(oldNotes, id);

        return {
            ...oldNotes,
            notes: {...removeKey(oldNotes.notes, id)},
            activeNoteID: prevID,
        };
    });
}

/**
 * Initializes the Notes store by taking Notes from the Local Storage if presented or
 * from init Notes object provided via function argument
 * @param init
 */
function initStore(init: Notes) {
    const initItems = getNotesFromLocalStorage() || init;
    log({type: 'debug'}, "STORE: initializing");
    store.update(() => ({
        ...initItems,
    }));
}

/**
 * Returns active note id or 'id0'
 * @param nts
 */
function activeNote(nts: Notes): string {
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
function storeWatcher(f: Function): RCell<Notes> {
    return ReactiveCell(store, f)
}

export {
    removeNote,
    addNote,
    setActiveNote,
    initStore,
    createNote,
    updateNoteBody,
    updateNoteName,
    activeNote,
    // store,
    storeWatcher,
    notesCount
};
