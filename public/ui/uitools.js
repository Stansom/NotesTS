import { log } from "../misc/logger.js";
function applyBackgroundColor(hsl, property) {
    document.documentElement.style.setProperty(property, hsl);
}
/**
 * Renders given note in the parent HTML element
 * @param note
 * @param elems
 */
function renderNote(note, elems) {
    log({ type: 'debug' }, `UI: rendering the note ${note.id}`);
    const { noteName, noteBody, noteCreationDate } = elems;
    const { name, body, createdAt, color } = note;
    noteName.value = name;
    noteBody.value = body;
    noteCreationDate.textContent = createdAt;
    applyBackgroundColor(color, "--list-background-color");
}
/**
 * Creates radio buttons list for given notes
 * @param notes
 * @param activeID
 * @param parent
 */
function appendRadioButton(notes, activeID, parent) {
    var _a;
    parent.innerHTML = notes.reduce((acc, v) => {
        if (v) {
            acc += `<li class="radio-button-item" id="${v.id}" 
        style="background-color: ${v.color}" ${v.id === activeID ? "button-active" : ""}></li>`;
        }
        return acc;
    }, "");
    (_a = parent.lastElementChild) === null || _a === void 0 ? void 0 : _a.setAttribute('add-button', '');
}
/**
 * Renders notes count in the parent element
 * @param count
 * @param parent
 */
function renderNoteCounter(count, parent) {
    const ch = document.createElement("span");
    ch.id = "note-count";
    ch.textContent = `${count}`;
    parent.replaceChildren(ch);
}
export { renderNote, appendRadioButton, renderNoteCounter };
