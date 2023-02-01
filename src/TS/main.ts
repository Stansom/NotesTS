import {Note, Notes} from './types.js'
import * as tools from './misc/tools.js';
import * as store from './store/store.js';
import * as ui from './ui/uitools.js';
import {log} from './misc/logger.js';
import {getNotesFromLocalStorage} from "./store/store.js";

const noteNameInput = document.querySelector('.note-name-input');
const noteBodyInput = document.querySelector('#note-input-area');
const radioButtonsList = document.querySelector('.radio-buttons-list');
const deleteNoteButton = document.querySelector('#note-delete-button');

const nts: Notes = getNotesFromLocalStorage() || {
    activeNoteID: 0,
    notes:
        {
            0: {
                color: tools.softTonesGeneratorHSL(),
                name: 'The First Note',
                body: 'Just a body, you can change me.',
                createdAt: tools.dateGenerator(),
                id: 0
            }
        }


};
// nts.notes.note
store.addWatcher((v: Notes) => {
    log('MAIN: from watcher, got a new value: ', v);
    let notes = Object.values(v.notes);
    if (radioButtonsList) {
        ui.appendRadioButton([...notes], v.activeNoteID, radioButtonsList);
        // ui.renderNote(
        //     v.notes.length > 2 ?
        //     v.notes[v.activeNoteID - 1] : v.notes[v.activeNoteID] );
        let noteToRender = notes[v.activeNoteID];
        log(`asdasdasd ${noteToRender.id}`)
        if (noteToRender) {
            ui.renderNote(noteToRender)
        }
    }
})

store.initStore(nts)

noteBodyInput?.addEventListener('keyup', (e) => {
    e.preventDefault();
    let body = (e.target as HTMLInputElement).value;
    const radioListActiveNote = document.querySelector('li[button-active]')?.id!;

    store.updateNoteBody(Number(radioListActiveNote), body)
});

noteNameInput?.addEventListener('keyup', (e) => {
    e.preventDefault();
    let name = (e.target as HTMLInputElement).value;
    const radioListActiveNote = document.querySelector('li[button-active]')?.id!;

    store.updateNoteName(Number(radioListActiveNote), name)
});
// let lastClickedButtonID: number = -1;

radioButtonsList?.addEventListener('click', (e: Event) => {
    const target = (e.target as HTMLLIElement);
    const listLastChild = Number(radioButtonsList.lastElementChild?.id);
    const clickedRadioID = Number(target.id);

    // if (lastClickedButtonID === clickedRadioID) {
    //     return
    // }

    // lastClickedButtonID = clickedRadioID;
    // if (clickedRadioID && listLastChild) {
    //
    //
    // }
    log(`MAIN: Clicking Radio Buttons ${listLastChild} ${clickedRadioID}`)

    if (clickedRadioID === listLastChild) {
        const newNote = store.createNote('', '', clickedRadioID + 1);
        store.addNote(newNote);
        target.className = 'radio-button-item noafter';
    }
    if (clickedRadioID >= 0) {
        store.setActive(clickedRadioID);
    }


});

deleteNoteButton?.addEventListener('click', (_) => {
    const radioListActiveNote = Number(document.querySelector('li[button-active]')?.id);
    store.setActive(radioListActiveNote)
    store.removeNote(radioListActiveNote);
});