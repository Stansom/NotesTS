import {log} from "../misc/logger.js";

function getFromLocalStorage(fieldName: string) {
    const item = localStorage.getItem(fieldName);
    if (item !== null && item !== undefined) {
        log("LOCAL STORAGE: getting from");
        return JSON.parse(item);
    }

    return false;
}

function setToLocalStorage(fieldName: string, val: unknown) {
    log("LOCAL STORAGE: setting to");

    localStorage.setItem(fieldName, JSON.stringify(val));
}

function checkLocalStorageForItem(fieldName: string) {
    return localStorage.getItem(fieldName) !== null;
}

export {getFromLocalStorage, setToLocalStorage, checkLocalStorageForItem};
