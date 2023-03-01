import {Note} from "../types.js";
import {log} from "../misc/logger.js";

function applyBackgroundColor(hsl: string, property: string) {
    document.documentElement.style.setProperty(property, hsl);
}

interface Elems {
    [val: string]: HTMLInputElement | Element;
}

/**
 * Renders given note in the parent HTML element
 * @param note
 * @param elems
 */
function renderNote(note: Note, elems: Elems) {
    log({type: 'debug'}, `UI: rendering the note ${note.id}`);

    const {noteName, noteBody, noteCreationDate} = elems;
    const {name, body, createdAt, color} = note;
    (noteName as HTMLInputElement).value = name;
    (noteBody as HTMLInputElement).value = body;
    noteCreationDate.textContent = createdAt;
    applyBackgroundColor(color, "--list-background-color");
}

/**
 * Creates radio buttons list for given notes
 * @param notes
 * @param activeID
 * @param parent
 */
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

/**
 * Renders notes count in the parent element
 * @param count
 * @param parent
 */
function renderNoteCounter(count: number, parent: Element) {
    const ch = document.createElement("span");
    ch.id = "note-count";
    ch.textContent = `${count}`;
    parent.replaceChildren(ch);
}

export {renderNote, appendRadioButton, renderNoteCounter};
