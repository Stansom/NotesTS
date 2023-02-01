import {
    Atom
} from './atom.js';
import * as tools from './tools.js';
import * as store from './store.js';

import * as ui from './uitools.js';
import {
    log
} from './logger.js';

// const notesAtom = Atom([]);
// store.addWatcher(console.log)
// console.log(store.val)
// const st = store

// store.removeNote(1)

const noteNameInput = document.querySelector('.note-name-input');
const noteBodyInput = document.querySelector('#note-input-area');
const radioButtonsList = document.querySelector('.radio-buttons-list');
const deleteNoteButton = document.querySelector('#note-delete-button');

const note = {
    name: String,
    body: String,
    createdAt: String,
    id: String,
    color: String,
    active: Boolean
}

const nts = store.getNotesFromLocalStorage() || {
    activeNoteID: 0,
    notes: {
        0: {
            color: tools.softTonesGeneratorHSL(),
            active: true,
            name: 'nu tak',
            body: 'tuhlak',
            createdAt: tools.dateGenerator(),
            id: 0
        }
    }
};
let notes = {};

store.addWatcher((v) => {
    console.log('from watcher', v);
    notes = v.notes;
    // ui.renderAllNotes(notes, radioButtonsList);
    // ui.renderNote(notes[Object.keys(v.activeNoteID)])
    // ui.renderNote(Object.values(notes)[0])
    // ui.renderAllNotes(notes, radioButtonsList)
    // log(true, 'from add watcher', v);
    ui.appendRadioButton([...Object.entries(v.notes).map(n => n[1])], v.activeNoteID, radioButtonsList);
    ui.renderNote(notes[v.activeNoteID]);
})
store.initStore(nts)
// console.log(nts)
// store.addNote(nts)

// function createNote(name = '', body = '') {
//     return {
//         name,
//         body,
//         createdAt: tools.dateGenerator(),
//         id: tools.idGenerator(),
//         color: tools.softTonesGeneratorHSL(),
//         active: false
//     }
// }

// const not1 = createNote('bora', 'asdkjlkldfg')
// const not2 = createNote('kiro', 'musha cucetc')
// const not3 = createNote('joora', 'ashuken')

// const notes = [not1, not2]

// store.addNote(createNote('asdasd', 'fsdksdljkg'))
// store.addNote(not1);
// store.addNote(not2);
// store.addNote(not3);

function updateName(m, n) {
    return updateField(m, 'name', n)
}

function updateBody(m, n) {
    return updateField(m, 'body', n)
}

function updateColor(m, n) {
    return updateField(m, 'color', n)
}

function toggleActive(m) {
    return updateField(m, 'active', !m.active)
}

function toggleAllActive(m) {
    return m.map((todo) => updateField(todo, 'active', true));
}

function toggleAllUnActive(m) {
    return m.map((todo) => updateField(todo, 'active', false));
}

function setActiveNoteBody(body) {
}

noteBodyInput.addEventListener('keyup', (e) => {
    e.preventDefault();
    const radioListActiveNote = document.querySelector('li[button-active]');

    setActiveNoteBody();

    // if (noteBodyInput && radioListActiveNote) {
    //     const note = notesContainer.filter(
    //         (n) => n.id == radioListActiveNote.id
    //     )[0];
    //     note.setText(noteBodyInput.value);
    //     Storage.setNotes(notesContainer);
    // }
});

noteNameInput.addEventListener('keyup', (e) => {
    e.preventDefault();
    const radioListActiveNote = document.querySelector('li[button-active]');

    if (noteNameInput && radioListActiveNote) {
        const note = notesContainer.filter(
            (n) => n.id == radioListActiveNote.id
        )[0];
        note.setName(noteNameInput.value.toUpperCase());
        Storage.setNotes(notesContainer);
    }
});
let lastClickedButtonID = -1;

radioButtonsList.addEventListener('click', (e) => {
    const clickedRadioID = e.target.id;
    // lastClickedButtonID = clickedRadioID;
    const listLastChild = radioButtonsList.lastElementChild;

    // log(true, 'from radio button click', clickedRadioID);
    if (lastClickedButtonID === clickedRadioID) {
        return
    }
    console.log('rerender on button click')
    lastClickedButtonID = clickedRadioID;
    if (e.target.id === listLastChild.id) {
        // const lastNote = notes[notes.length - 1];
        // const noteName = document.querySelector('.note-name-input').value;
        // const noteText = document.querySelector('#note-input-area').value;
        const newNote = store.createNote('', '');
        console.log(newNote.id)
        // store.setActive(newNote.id)
        store.addNote(newNote);
        // e.target.className = 'radio-button-item noafter';
    }

    store.setActive(clickedRadioID);

    // if (e.target && e.target.classList.contains('radio-button-item')) {
    //     const listLastChild = radioButtonsList.lastElementChild;
    //     if (e.target.id === listLastChild.id) {
    //         const lastNote = notesContainer[notesContainer.length - 1];
    //         let noteName = document.querySelector('.note-name-input').value;
    //         let noteText = document.querySelector('#note-input-area').value;
    //         const newNote = new Note();
    //         newNote.active = true;
    //         notesContainer.push(newNote);
    //         UI.createNewRadioButton(newNote);
    //         UI.renderNote(newNote);
    //         Storage.setNotes(notesContainer);
    //         e.target.className = 'radio-button-item noafter';
    //     }
    //
    //     radioButtonsList.childNodes.forEach((child) => {
    //         if (child.attributes !== undefined) {
    //             if (child.id === e.target.id) {
    //                 tools.deactivateListEntries();
    //                 const note = notesContainer.filter(
    //                     (note) => note.id == e.target.id
    //                 )[0];
    //                 e.target.setAttribute('button-active', '');
    //                 const oneActiveLi = document.querySelector('li[button-active]');
    //                 note.setActive(true);
    //                 UI.renderNote(note);
    //             }
    //         }
    //     });
    // }
});

deleteNoteButton.addEventListener('click', (e) => {
    const activeRadioButton = document.querySelector('li[button-active]')
    if (activeRadioButton) {
        // const noteToRemove = notesContainer.filter(el => el.id == activeRadioButton.id)[0];
        // const previousElement = activeRadioButton.previousElementSibling;
        // const newActiveNote = notesContainer.filter(el => el.id == previousElement.id)[0];
        // activeRadioButton.remove();
        // Storage.removeNote(noteToRemove);
        // newActiveNote.setActive(true);
        // UI.renderNote(newActiveNote);
        // previousElement.setAttribute('button-active', '');
        // Storage.setNotes(notesContainer);
        // console.log(activeRadioButton.id)
        store.removeNote(activeRadioButton.id);
        ui.renderNote(activeRadioButton.id - 1);
    }
});