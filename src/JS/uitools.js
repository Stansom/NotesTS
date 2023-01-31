//  UI Tools

import {
    log
} from './logger.js';
import {
    config
} from './config.js';

const noteName = document.querySelector('.note-name-input');
const noteBody = document.querySelector('#note-input-area');
const noteCreationDate = document.querySelector('#note-creation-date');

function applyBackgroundColor(hsl, property) {
    document.documentElement.style.setProperty(property, hsl);
}

function renderNote(note) {
    // console.log(note)
    if (note) {
        noteName.value = note.name;
        noteBody.value = note.body;
        noteCreationDate.textContent = note.createdAt;
        applyBackgroundColor(note.color, '--list-background-color');
    }

    // const allRadioButtons = document.querySelectorAll('.radio-button-item');
    // allRadioButtons.forEach((el) => el.remove());
}

function appendRadioButton(notes, activeID, parent) {
    // const liRadio = document.createElement('li');
    // liRadio.className = 'radio-button-item';
    // liRadio.id = note.id;
    // liRadio.style.backgroundColor = note.color;

    // if(parent.hasChildNodes()) {
    //     parent.childNodes.forEach(el => {
    //         if(el.className === 'radio-button-item') {
    //             console.log('child nodes', el)
    //             if (el.id !== note.id) {
    //                 parent.appendChild(liRadio);
    //             }
    //         }
    //     })
    // } else {
    //     parent.appendChild(liRadio)
    // }
    // parent.innerHTML = `<li class="radio-button-item" id="${note.id}" style="background-color: ${note.color}"></li>`;

    const aid = Number(activeID);
    parent.innerHTML = notes.reduce((acc, v) => {
        // console.log('from appedn', typeof aid, typeof v.id)

        acc += `<li class="radio-button-item" id="${v.id}" 
        style="background-color: ${v.color}" ${v.id === aid ? 'button-active' : ''}></li>`
        return acc;
    }, '')
}

// function rerenderAllRadioButtons(buttons, parent) {
//     parent.
// }

function renderNotes(notes, parent) {
    for (const [_, note] of Object.entries(notes)) {
        appendRadioButton(note, parent);
        renderNote(note)
    }

    // const localNotes = [...notesAtom.val];
    // const storageNotes = Storage.getNotes();
    // if (storageNotes.length > 1) {
    //     localNotes = Storage.restoreNotes();
    //     storageNotes.forEach((note) => {
    //         UI.createNewRadioButton(note);
    //         UI.renderNote(note);
    //     });
    // }
    // if (localNotes.length === 1) {
    //     localNotes.forEach((note) => {
    //         UI.createNewRadioButton(note);
    //         UI.renderNote(note);
    //     });
    // }
}

function removeNote(note) {
    // if(note.id == radioButtonsList.id){
    //     console.log(radioButtonsList.id)
    // }
    // const activeRadioButton = document.querySelector("li[button-active]")
    console.log(radioButtonsList)
}

function identity(n) {
    return n
}

function renderAllNotes(notes, parent) {
    // log(false ,'notes');

    // notes[v.activeNoteID] || Object.values(notes)[0]
    for (const [_, note] of Object.entries(notes)) {
        renderNote(note);
    }



    // renderNote(notes)

    // console.log([...Object.entries(notes).map(n => n[1])].reduce((acc, v) => {
    //     return acc +=
    //         `<li class="radio-button-item" id="${v.id}" style="background-color: ${v.color}"></li>`
    // }, ''))
    // console.log([...Object.entries(notes).map(n => n[1])].map(n=>n.name))
    appendRadioButton([...Object.entries(notes).map(n => n[1])], parent);


    // return notes.map((note) => {
    //     const li = document.createElement('li');
    //     li.id = note.id;
    //     console.log(li, note)
    //     return renderNotes(note)
    // })
}

export {
    renderNote,
    appendRadioButton,
    renderNotes,
    renderAllNotes
}