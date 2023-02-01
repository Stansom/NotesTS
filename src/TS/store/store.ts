import {Atom} from "../misc/atom.js";
import * as tools from "../misc/tools.js";
import * as localStorage from "./localstorage.js";
import {Note, Notes} from "../types.js";
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

const store = Atom<Notes>(null);

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

function addWatcher(watcher: (v: Notes) => unknown) {
    store.addWatcher(watcher);
}

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

function notesCount() {
    return Object.keys(store.val()?.notes!).length || 1;
}

function addNote(note: Note) {
    log("STORE: adding a new note: ", note, "old notes", store.val());
    if (note) {
        store.update((ov: Notes) => ({
            ...ov,
            notes: Object.assign({...ov.notes}, {[note.id]: note}),
            activeNoteID: note.id,
        }));
    }
}

function setActiveNote(id: string) {
    log(`STORE: setting active note to ${id}`);
    store.update((ov) => ({
        ...ov,
        activeNoteID: id,
    }));
}

function lastID(): string {
    return Object.keys(store.val()?.notes!)[notesCount() - 1];
}

function removeKey<T>(o: T, k: string): T {
    let newObj = {...o};
    delete newObj[k as keyof typeof o];

    return newObj;
}

function idNum(id: string): number {
    return Number(id.substring(2));
}

function findPrevID(o: Notes, currID: string): string {
    const n = o.notes;
    const nks = Object.keys(n!);
    const currInd = nks.findIndex((v) => v === currID);
    const prevID = nks[currInd - 1];

    log(
        `STORE FIND PREV ID: keys ${nks} current ID: ${currInd}, previous ID: ${prevID}`
    );

    return prevID;
}

function removeNote(id: string) {
    let idToNum = idNum(id);
    if (idToNum <= 0) {
        setActiveNote("id0");
        return;
    }
    let newID = `id${idToNum - 1}`;

    log(`STORE: removing a note by id: ${idNum(id)} and new ID: ${newID}`);
    store.update((oldNotes: Notes): Notes => {
        const prevID = findPrevID(oldNotes, id);

        return {
            ...oldNotes,
            notes: {...removeKey(oldNotes.notes, id)},
            activeNoteID: prevID,
        };
    });
}

function initStore(init: Notes) {
    const initItems = getNotesFromLocalStorage() || init;
    log("STORE: initializing");
    store.update(() => ({
        ...initItems,
    }));
}

function activeNote(): string {
    return store.val()?.activeNoteID || `id0`;
}

addWatcher((nv) => {
    setNotesToLocalStorage(nv);
});

export {
    removeNote,
    addNote,
    addWatcher,
    setActiveNote,
    initStore,
    createNote,
    updateNoteBody,
    updateNoteName,
    activeNote,
    // store,
};
