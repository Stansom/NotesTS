import * as tools from "./misc/tools.js";
import * as store from "./store/store.js";
import * as ui from "./ui/uitools.js";
import { log } from "./misc/logger.js";
import { idNum } from "./misc/tools.js";
/**
 * Selectors for UI elements
 */
const noteNameInput = document.querySelector(".note-name-input");
const noteBodyInput = document.querySelector("#note-input-area");
const radioButtonsList = document.querySelector(".radio-buttons-list");
const deleteNoteButton = document.querySelector("#note-delete-button");
const noteCounter = document.querySelector("#note-count");
const noteName = document.querySelector(".note-name-input");
const noteBody = document.querySelector("#note-input-area");
const noteCreationDate = document.querySelector("#note-creation-date");
/**
 * Initial notes which will be created when there is no data in Local Storage
 */
const initialNotes = {
    activeNoteID: "id0",
    notes: {
        id0: {
            color: tools.softTonesGeneratorHSL(),
            name: "Note name",
            body: "Place your thoughts here.",
            createdAt: tools.dateGenerator(),
            id: `id0`,
        },
    },
};
/**
 * Prevents re-rendering on every store change
 */
let noteEditingMode = false;
/**
 * Watches for store and renders a new state on every change
 */
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
/**
 * Init store when app is loaded
 */
store.initStore(initialNotes);
/**
 * Returns an active note ID by looking for 'button-active' attribute of 'li' element
 * @return {string}
 */
function activeNoteID() {
    var _a;
    return (_a = document.querySelector("li[button-active]")) === null || _a === void 0 ? void 0 : _a.id;
}
/**
 * Keeps last clicked radio button ID to prevent multiple clicks on the same button
 */
let lastClickedButtonID = `id-1`;
/**
 * Handles changes of the note body HTML element
 * @param e Current HTML Element
 */
function noteBodyHandler(e) {
    let body = e.value;
    noteEditingMode = true;
    store.updateNoteBody(activeNoteID(), body);
    noteEditingMode = false;
}
/**
 * Handles changes of the note name HTML element
 * @param e Current HTML Element
 */
function noteNameHandler(e) {
    noteEditingMode = true;
    let name = e.value;
    store.updateNoteName(activeNoteID(), name);
    noteEditingMode = false;
}
/**
 * Creates a new note and adds it to the store when create new button is clicked
 */
function newNoteHandler() {
    store.addNote();
}
/**
 * Handles radio button click<br>
 * Watches for clicked radio button and if clicked button has 'add-button' attribute
 * or clicked button ID is equals first and last button IDs calls newNoteHandler function. <br>
 * Otherwise sets active note by providing to the store clicked button ID
 * @param e Current HTML Element
 */
function radioButtonClickHandler(e) {
    const lastChild = radioButtonsList === null || radioButtonsList === void 0 ? void 0 : radioButtonsList.lastElementChild;
    const firstChild = radioButtonsList === null || radioButtonsList === void 0 ? void 0 : radioButtonsList.firstElementChild;
    const target = e.target;
    const clickedRadioID = target.id;
    log({ type: 'debug' }, `MAIN: Radio Buttons, clicked: ${clickedRadioID}, last clicked: ${lastClickedButtonID}`);
    if (target.getAttribute('add-button') !== null) {
        lastClickedButtonID = `id${idNum(clickedRadioID) + 1}`;
        newNoteHandler();
        return;
    }
    if (lastClickedButtonID === clickedRadioID && (firstChild === null || firstChild === void 0 ? void 0 : firstChild.id) !== (lastChild === null || lastChild === void 0 ? void 0 : lastChild.id)) {
        return;
    }
    if (clickedRadioID) {
        lastClickedButtonID = clickedRadioID;
        store.setActiveNote(clickedRadioID);
    }
}
/**
 * Event listeners
 */
noteBodyInput === null || noteBodyInput === void 0 ? void 0 : noteBodyInput.addEventListener("keyup", (e) => {
    noteBodyHandler(e.target);
});
noteNameInput === null || noteNameInput === void 0 ? void 0 : noteNameInput.addEventListener("keyup", (e) => {
    noteNameHandler(e.target);
});
radioButtonsList === null || radioButtonsList === void 0 ? void 0 : radioButtonsList.addEventListener("click", radioButtonClickHandler);
deleteNoteButton === null || deleteNoteButton === void 0 ? void 0 : deleteNoteButton.addEventListener("click", () => {
    store.removeNote(activeNoteID());
});
