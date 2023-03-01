import { Note } from "../types.js";
import { log } from "../misc/logger.js";

function applyBackgroundColor(hsl: string, property: string) {
    document.documentElement.style.setProperty(property, hsl);
}
interface Elems {
    [val: string]: HTMLInputElement | Element;
}

function renderNote(note: Note, elems: Elems) {
    log({ type: 'debug' }, `UI: rendering the note ${note.id}`);

    const { noteName, noteBody, noteCreationDate } = elems;
    if (note && noteName && noteBody && noteCreationDate) {
        (noteName as HTMLInputElement).value = note.name;
        (noteBody as HTMLInputElement).value = note.body;
        noteCreationDate.textContent = note.createdAt;
        applyBackgroundColor(note.color, "--list-background-color");
    }
}

function appendRadioButton(
    notes: Array<Note>,
    activeID: string,
    parent: Element
) {
    parent.innerHTML = notes.reduce((acc, v) => {
        if (v) {
            acc += `<li class="radio-button-item" id="${v.id}" 
        style="background-color: ${v.color}" ${v.id === activeID ? "button-active" : ""
                }></li>`;
        }
        return acc;
    }, "");
}

function renderNoteCounter(count: number, parent: Element) {
    const ch = document.createElement("span");
    ch.id = "note-count";
    ch.textContent = `${count}`;
    parent.replaceChildren(ch);
}

export { renderNote, appendRadioButton, renderNoteCounter };
