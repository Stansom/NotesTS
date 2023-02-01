import {Notes} from "./types.js";
import * as tools from "./misc/tools.js";
import * as store from "./store/store.js";
import * as ui from "./ui/uitools.js";
import {log} from "./misc/logger.js";

const noteNameInput = document.querySelector(".note-name-input");
const noteBodyInput = document.querySelector("#note-input-area");
const radioButtonsList = document.querySelector(".radio-buttons-list");
const deleteNoteButton = document.querySelector("#note-delete-button");

const noteName: HTMLInputElement | null =
    document.querySelector(".note-name-input");
const noteBody: HTMLInputElement | null =
    document.querySelector("#note-input-area");
const noteCreationDate = document.querySelector("#note-creation-date");

const initialNotes: Notes = {
    activeNoteID: "id0",
    notes: {
        id0: {
            color: tools.softTonesGeneratorHSL(),
            name: "The First Note",
            body: "Just a body, you can change me.",
            createdAt: tools.dateGenerator(),
            id: `id0`,
        },
    },
};

store.addWatcher((v: Notes) => {
    log("MAIN: from watcher, got a new value: ", v);
    let notes = v.notes;
    if (radioButtonsList) {
        let noteToRender = notes[v.activeNoteID];
        log("MAIN: from watcher, Active Note ID: ", v.activeNoteID);
        if (noteToRender) {
            ui.appendRadioButton(
                [...Object.values(notes)],
                v.activeNoteID,
                radioButtonsList
            );
            ui.renderNote(noteToRender, {
                noteName: noteName!,
                noteBody: noteBody!,
                noteCreationDate: noteCreationDate!,
            });
        }
    }
});

store.initStore(initialNotes);

noteBodyInput?.addEventListener("keyup", (e) => {
    e.preventDefault();
    let body = (e.target as HTMLInputElement).value;
    const radioListActiveNote = document.querySelector("li[button-active]")?.id!;

    store.updateNoteBody(radioListActiveNote, body);
});

noteNameInput?.addEventListener("keyup", (e) => {
    e.preventDefault();
    let name = (e.target as HTMLInputElement).value;
    const radioListActiveNote = document.querySelector("li[button-active]")?.id!;

    store.updateNoteName(radioListActiveNote, name);
});
let lastClickedButtonID: string = `id-1`;

radioButtonsList?.addEventListener("click", (e: Event) => {
    const target = e.target as HTMLLIElement;
    const listLastChild = radioButtonsList.lastElementChild?.id;
    const clickedRadioID = target.id;

    if (lastClickedButtonID === clickedRadioID) {
        return;
    }

    lastClickedButtonID = clickedRadioID;
    log(
        `MAIN: Clicking Radio Buttons clicked: ${clickedRadioID}, last child: ${listLastChild}`
    );

    if (clickedRadioID === listLastChild) {
        const newNote = store.createNote("", "");
        log(`MAIN: NEW NOTE`, newNote);
        store.addNote(newNote);

        return;
    }

    store.setActiveNote(clickedRadioID);
});

deleteNoteButton?.addEventListener("click", (_) => {
    const radioListActiveNote = document.querySelector("li[button-active]")?.id;
    store.removeNote(radioListActiveNote!);
});
