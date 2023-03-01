import * as tools from "./misc/tools.js";
import * as store from "./store/store.js";
import * as ui from "./ui/uitools.js";
import { log } from "./misc/logger.js";
const noteNameInput = document.querySelector(".note-name-input");
const noteBodyInput = document.querySelector("#note-input-area");
const radioButtonsList = document.querySelector(".radio-buttons-list");
const deleteNoteButton = document.querySelector("#note-delete-button");
const noteCounter = document.querySelector("#note-count");
const noteName = document.querySelector(".note-name-input");
const noteBody = document.querySelector("#note-input-area");
const noteCreationDate = document.querySelector("#note-creation-date");
const initialNotes = {
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
store.storeWatcher((v) => {
    ui.renderNote(v.notes[v.activeNoteID], {
        noteName: noteName,
        noteBody: noteBody,
        noteCreationDate: noteCreationDate,
    });
    ui.renderNoteCounter(Object.keys(v.notes).length, noteCounter);
    if (!noteEditingMode)
        ui.appendRadioButton([...Object.values(v.notes)], v.activeNoteID, radioButtonsList);
});
store.initStore(initialNotes);
function activeNoteID() {
    var _a;
    return (_a = document.querySelector("li[button-active]")) === null || _a === void 0 ? void 0 : _a.id;
}
function noteBodyHandler(e) {
    let body = e.value;
    noteEditingMode = true;
    store.updateNoteBody(activeNoteID(), body);
    noteEditingMode = false;
}
function noteNameHandler(e) {
    noteEditingMode = true;
    let name = e.value;
    store.updateNoteName(activeNoteID(), name);
    noteEditingMode = false;
}
function radioButtonClickHandler(e) {
    var _a;
    const target = e.target;
    const listLastChild = (_a = radioButtonsList === null || radioButtonsList === void 0 ? void 0 : radioButtonsList.lastElementChild) === null || _a === void 0 ? void 0 : _a.id;
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
    }
    ;
    log({ type: 'debug' }, `MAIN: Clicking Radio Buttons clicked: ${clickedRadioID}, last child: ${listLastChild}`);
}
noteBodyInput === null || noteBodyInput === void 0 ? void 0 : noteBodyInput.addEventListener("keyup", (e) => {
    noteBodyHandler(e.target);
});
noteNameInput === null || noteNameInput === void 0 ? void 0 : noteNameInput.addEventListener("keyup", (e) => {
    noteNameHandler(e.target);
});
function newNoteHandler() {
    const newNote = store.createNote("", "");
    store.addNote(newNote);
}
let lastClickedButtonID = `id-1`;
radioButtonsList === null || radioButtonsList === void 0 ? void 0 : radioButtonsList.addEventListener("click", radioButtonClickHandler);
deleteNoteButton === null || deleteNoteButton === void 0 ? void 0 : deleteNoteButton.addEventListener("click", () => {
    var _a;
    const radioListActiveNote = (_a = document.querySelector("li[button-active]")) === null || _a === void 0 ? void 0 : _a.id;
    store.removeNote(radioListActiveNote);
});
