import {
    conjoin,
    isEmpty
} from './tools.js'

function getFromLocalStorage(fieldName) {
    // return localStorage.getItem(fieldName) === null ? {} : JSON.parse(localStorage.getItem('notes'));
    if (localStorage.getItem(fieldName) !== null && localStorage.getItem(fieldName) !== undefined) {
        console.log('from get local storage', localStorage.getItem(fieldName))
        return JSON.parse(localStorage.getItem(fieldName))
    }

    return false;
}

function setToLocalStorage(fieldName, val) {
    localStorage.setItem(fieldName, JSON.stringify(val));
}

function checkLocalStorageForItem(fieldName) {
    return localStorage.getItem(fieldName) !== null;
}

export {
    getFromLocalStorage,
    setToLocalStorage,
    checkLocalStorageForItem
}