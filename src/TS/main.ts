import { Note, Notes } from "./types.js";
import * as tools from "./misc/tools.js";
import * as store from "./store/store.js";
import * as ui from "./ui/uitools.js";
import { log } from "./misc/logger.js";
import { ReactiveCell } from "./misc/atom.js";

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

noteBodyInput?.addEventListener("keyup", (e) => {
    e.preventDefault();
    noteEditingMode = true;
    let body = (e.target as HTMLInputElement).value;
    const radioListActiveNote = document.querySelector("li[button-active]")?.id!;

    store.updateNoteBody(radioListActiveNote, body);
    noteEditingMode = false;
});

noteNameInput?.addEventListener("keyup", (e) => {
    e.preventDefault();
    noteEditingMode = true;

    let name = (e.target as HTMLInputElement).value;
    const radioListActiveNote = document.querySelector("li[button-active]")?.id!;

    store.updateNoteName(radioListActiveNote, name);
    noteEditingMode = false;
});

function newNoteHandler() {
    const newNote = store.createNote("", "");
    store.addNote(newNote);
}

let lastClickedButtonID: string = `id-1`;
radioButtonsList?.addEventListener("click", (e: Event) => {
    const target = e.target as HTMLLIElement;
    const listLastChild = radioButtonsList.lastElementChild?.id;
    const clickedRadioID = target.id;

    if (lastClickedButtonID === clickedRadioID) {
        return;
    }

    lastClickedButtonID = clickedRadioID;
    log(`MAIN: Clicking Radio Buttons clicked: ${clickedRadioID}, last child: ${listLastChild}`);

    if (clickedRadioID === listLastChild) {
        newNoteHandler();

        return;
    }

    if (clickedRadioID) {
        store.setActiveNote(clickedRadioID);
    };

});

deleteNoteButton?.addEventListener("click", (_) => {
    const radioListActiveNote = document.querySelector("li[button-active]")?.id;
    store.removeNote(radioListActiveNote!);
});


