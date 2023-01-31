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

function getMonth(str) {
    const dateImp = date().getMonth() + 1;
    return str ? months[date().getMonth()] : rem(dateImp, 10) ? dateImp : '0' + dateImp;
}

function backgroundColorGenerator() {
    return Math.floor(Math.random() * 355);
}

function softTonesGeneratorHSL() {
    const hue = this.backgroundColorGenerator();
    return `hsl(${hue}, 58%, 70%)`;
}

function updateField(m, k, v) {
    return {
        ...m,
        [k]: v
    }
}


function dateGenerator() {
    return `${date().getDate() % 10 ? date().getDate() : '0' + date().getDate()}/${getMonth()}/${date().getFullYear()}`;
}

function idGenerator() {
    return Math.floor(
        (Math.random() * 10 * (date().getMilliseconds() * date().getFullYear())) /
        date().getDate()
    );
}

function deactivateListEntries() {
    const activeLis = document.querySelectorAll('li[button-active]');
    activeLis.forEach(li => li.removeAttribute('button-active'));
}

const cloneArray = (arr) => arr.map(item => Array.isArray(item) ? cloneArray(item) : item);

const copyOnEdit = (m, f) => {
    const copy = {
        ...m
    };
    f(copy);
    return copy;
}

export {
    conjoin,
    isEmpty,
    date,
    backgroundColorGenerator,
    softTonesGeneratorHSL,
    dateGenerator,
    idGenerator,
    deactivateListEntries,
    updateField,
    copyOnEdit,
    cloneArray
}