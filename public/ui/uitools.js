import { log } from '../misc/logger.js';
const noteName = document.querySelector('.note-name-input');
const noteBody = document.querySelector('#note-input-area');
const noteCreationDate = document.querySelector('#note-creation-date');
function applyBackgroundColor(hsl, property) {
    document.documentElement.style.setProperty(property, hsl);
}
function renderNote(note) {
    log(`UI: rendering the note ${note.id}`);
    if (note && noteName && noteBody && noteCreationDate) {
        noteName.value = note.name;
        noteBody.value = note.body;
        noteCreationDate.textContent = note.createdAt;
        applyBackgroundColor(note.color, '--list-background-color');
    }
}
function appendRadioButton(notes, activeID, parent) {
    const aid = Number(activeID);
    parent.innerHTML = notes.reduce((acc, v) => {
        // console.log('from appedn', typeof aid, typeof v.id)
        if (v) {
            acc += `<li class="radio-button-item" id="${v.id}" 
        style="background-color: ${v.color}" ${v.id === aid ? 'button-active' : ''}></li>`;
        }
        // acc += ''
        return acc;
        // acc += `<li class="radio-button-item" id="${v.id}" 
        // style="background-color: ${v.color}" ${v.id === aid ? 'button-active' : ''}></li>`
    }, '');
}
export { renderNote, appendRadioButton,
// renderNotes,
// renderAllNotes
 };
