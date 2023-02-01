import { log } from "../misc/logger.js";
function applyBackgroundColor(hsl, property) {
    document.documentElement.style.setProperty(property, hsl);
}
function renderNote(note, elems) {
    log(`UI: rendering the note ${note.id}`);
    const { noteName, noteBody, noteCreationDate } = elems;
    if (note && noteName && noteBody && noteCreationDate) {
        noteName.value = note.name;
        noteBody.value = note.body;
        noteCreationDate.textContent = note.createdAt;
        applyBackgroundColor(note.color, "--list-background-color");
    }
}
function appendRadioButton(notes, activeID, parent) {
    parent.innerHTML = notes.reduce((acc, v) => {
        if (v) {
            acc += `<li class="radio-button-item" id="${v.id}" 
        style="background-color: ${v.color}" ${v.id === activeID ? "button-active" : ""}></li>`;
        }
        return acc;
    }, "");
}
export { renderNote, appendRadioButton };
