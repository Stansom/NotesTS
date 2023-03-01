import {log} from "../misc/logger.js";

/**
 * Gets a field from the Local Storage object if exists
 * @param fieldName
 */
function getFromLocalStorage(fieldName: string) {
    const item = localStorage.getItem(fieldName);
    if (item !== null && item !== undefined) {
        log({type: 'debug'}, "LOCAL STORAGE: getting from");
        return JSON.parse(item);
    }

    return false;
}

/**
 * Sets a value to the Local Storage object by provided field name
 * @param fieldName
 * @param val
 */
function setToLocalStorage(fieldName: string, val: unknown) {
    log({type: 'debug'}, "LOCAL STORAGE: setting to");

    localStorage.setItem(fieldName, JSON.stringify(val));
}

/**
 * Checks that field is presented in the Local Storage
 * @param fieldName
 */
function checkLocalStorageForItem(fieldName: string) {
    return localStorage.getItem(fieldName) !== null;
}

export {getFromLocalStorage, setToLocalStorage, checkLocalStorageForItem};
