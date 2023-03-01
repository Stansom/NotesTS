import { Notes } from "./types.js";
import * as tools from "./misc/tools.js";
import * as store from "./store/store.js";
import * as ui from "./ui/uitools.js";
import { log } from "./misc/logger.js";

const noteNameInput = document.querySelector(".note-name-input");
const noteBodyInput = document.querySelector("#note-input-area");
const radioButtonsList = document.querySelector(".radio-buttons-list");
const deleteNoteButton = document.querySelector("#note-delete-button");
const noteCounter = document.querySelector("#note-count");

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
            name: "Note name",
            body: "Just a body, you can change me.",
            createdAt: tools.dateGenerator(),
            id: `id0`,
        },
    },
};

// TODO: Yeah, at now it looks a little bit stupid
// I'm looking for other ways to prevent updating 
// the radio buttons on every store update
let noteEditingMode = false;

store.storeWatcher((v: Notes) => {
    ui.renderNote(v.notes[v.activeNoteID], {
        noteName: noteName!,
        noteBody: noteBody!,
        noteCreationDate: noteCreationDate!,
    })
    ui.renderNoteCounter(Object.keys(v.notes).length, noteCounter!);
    if (!noteEditingMode)
        ui.appendRadioButton(
            [...Object.values(v.notes)],
            v.activeNoteID,
            radioButtonsList!
        )
}
)

store.initStore(initialNotes);

function activeNoteID() {
    return document.querySelector("li[button-active]")?.id!;
}

function noteBodyHandler(e: HTMLInputElement) {
    let body = e.value;

    noteEditingMode = true;
    store.updateNoteBody(activeNoteID(), body);
    noteEditingMode = false;
}

function noteNameHandler(e: HTMLInputElement) {
    noteEditingMode = true;
    let name = e.value;

    store.updateNoteName(activeNoteID(), name);
    noteEditingMode = false;
}

function radioButtonClickHandler(e: Event) {
    const target = e.target as HTMLLIElement;
    const listLastChild = radioButtonsList?.lastElementChild?.id;
    const clickedRadioID = target.id;

    if (lastClickedButtonID === clickedRadioID) {
        return;
    }

    lastClickedButtonID = clickedRadioID;

    if (clickedRadioID === listLastChild) {
        newNoteHandler();

        return;
    }

    if (clickedRadioID) {
        store.setActiveNote(clickedRadioID);
    };

    log({ type: 'debug' }, `MAIN: Clicking Radio Buttons clicked: ${clickedRadioID}, last child: ${listLastChild}`);
}

noteBodyInput?.addEventListener("keyup", (e) => {
    noteBodyHandler(e.target as HTMLInputElement);
});

noteNameInput?.addEventListener("keyup", (e) => {
    noteNameHandler(e.target as HTMLInputElement);
});

function newNoteHandler() {
    const newNote = store.createNote("", "");
    store.addNote(newNote);
}

let lastClickedButtonID: string = `id-1`;
radioButtonsList?.addEventListener("click", radioButtonClickHandler);

deleteNoteButton?.addEventListener("click", () => {
    store.removeNote(activeNoteID());
});
