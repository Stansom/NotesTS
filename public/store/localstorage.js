import { log } from "../misc/logger.js";
function getFromLocalStorage(fieldName) {
    // return localStorage.getItem(fieldName) === null ? {} : JSON.parse(localStorage.getItem('notes'));
    const item = localStorage.getItem(fieldName);
    if (item !== null && item !== undefined) {
        log('LOCAL STORAGE: getting from');
        return JSON.parse(item);
    }
    return false;
}
function setToLocalStorage(fieldName, val) {
    log('LOCAL STORAGE: setting to');
    localStorage.setItem(fieldName, JSON.stringify(val));
}
function checkLocalStorageForItem(fieldName) {
    return localStorage.getItem(fieldName) !== null;
}
export { getFromLocalStorage, setToLocalStorage, checkLocalStorageForItem };
