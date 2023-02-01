const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
];

function conjoin(arr: [], val: unknown) {
    return [...arr, val];
}

function isEmpty(arr: []) {
    return !arr.length;
}

function rem(a: number, b: number) {
    return a % (a / b) > 1;
}

function date() {
    return new Date();
}

function getMonth(str: boolean = false) {
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

function updateField(m: Object, k: string, v: unknown) {
    return {
        ...m,
        [k]: v
    }
}


function update<T>(o: T, k: keyof typeof o, f: Function): T {
    let val = f(o[k])

    return {...o, [k]: val}
}

function updateIn<T>(o: T, p: Array<string>, f: Function): T {
    if (p.length === 0) {
        return f(o)
    }
    let firstEntry = p[0];

    let restEntries = p.slice(1);
    return update(o, firstEntry as keyof typeof o, (v: Object) => {
        return updateIn(v, restEntries, f)
    })
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

const cloneArray = (arr: []): [] | Array<Array<unknown>> => arr.map((item) =>
    Array.isArray(item) ? cloneArray(item) : item);

const copyOnEdit = (m: Object, f: Function) => {
    const copy = {
        ...m
    };
    f(copy);
    return copy;
}

function identity(n: unknown) {
    return n
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
    cloneArray,
    identity,
    updateIn
}