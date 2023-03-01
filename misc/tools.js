/*
    Contains a bunch of useful functions aka tools
 */
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
];
function conjoin(arr, val) {
    return [...arr, val];
}
function isEmpty(arr) {
    return !arr.length;
}
function rem(a, b) {
    return a % (a / b) > 1;
}
function date() {
    return new Date();
}
function getMonth(str = false) {
    const dateImp = date().getMonth() + 1;
    return str ? months[date().getMonth()] : rem(dateImp, 10) ? dateImp : '0' + dateImp;
}
function backgroundColorGenerator() {
    return Math.floor(Math.random() * 355);
}
function softTonesGeneratorHSL() {
    const hue = backgroundColorGenerator();
    return `hsl(${hue}, 58%, 70%)`;
}
function updateField(m, k, v) {
    return Object.assign(Object.assign({}, m), { [k]: v });
}
function update(o, k, f) {
    const val = f(o[k]);
    return Object.assign(Object.assign({}, o), { [k]: val });
}
function updateIn(o, p, f) {
    if (p.length === 0) {
        return f(o);
    }
    const firstEntry = p[0];
    const restEntries = p.slice(1);
    return update(o, firstEntry, (v) => {
        return updateIn(v, restEntries, f);
    });
}
function dateGenerator() {
    return `${date().getDate() % 10 ? date().getDate() : '0' + date().getDate()}/${getMonth()}/${date().getFullYear()}`;
}
function idGenerator() {
    return Math.floor((Math.random() * 10 * (date().getMilliseconds() * date().getFullYear())) /
        date().getDate());
}
function deactivateListEntries() {
    const activeLis = document.querySelectorAll('li[button-active]');
    activeLis.forEach(li => li.removeAttribute('button-active'));
}
function cloneArray(arr) {
    return arr.map((item) => Array.isArray(item) ? cloneArray(item) : item);
}
function copyOnEdit(m, f) {
    const copy = Object.assign({}, m);
    f(copy);
    return copy;
}
function identity(n) {
    return n;
}
function pipe(...fns) {
    return (val) => fns.reduce((acc, v) => v(acc), val);
}
function debounce(fn, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn(...args);
        }, timeout);
    };
}
function removeKey(o, k) {
    let newObj = Object.assign({}, o);
    delete newObj[k];
    return newObj;
}
export { conjoin, isEmpty, date, backgroundColorGenerator, softTonesGeneratorHSL, dateGenerator, idGenerator, deactivateListEntries, updateField, copyOnEdit, cloneArray, identity, updateIn, pipe, debounce, removeKey };
