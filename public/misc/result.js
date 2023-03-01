/**
 * Match result with 'OK' or 'ERROR' types<br>
 * If type is 'OK' calls matcher callback object with ok function<br>
 * When type is 'ERROR' calls matcher callback object with err function<br>
 * @param r Result of { type: 'ok'; value: T } | { type: 'err'; value: E }
 * @param m Matcher function object
 */
function match(r, m) {
    switch (r.type) {
        case 'ok': {
            return m.ok(r.value);
        }
        case 'err': {
            return m.err(r.value);
        }
        default: {
            return r;
        }
    }
}
function toOk(r) {
    return { type: 'ok', value: r };
}
function isOk(r) {
    return match(r, {
        ok: () => true,
        err: () => false,
    });
}
function isErr(r) {
    return match(r, {
        ok: () => false,
        err: () => true,
    });
}
function map(r, fn) {
    return match(r, {
        ok: (v) => toOk(fn(v)),
        err: () => r,
    });
}
function flatMap(r, fn) {
    return match(r, {
        ok: (v) => fn(v),
        err: () => r,
    });
}
function mapErr(r, fn) {
    return match(r, {
        ok: () => r,
        err: (e) => ({ type: 'err', value: fn(e) }),
    });
}
function unwrap(r) {
    if (isOk(r)) {
        return r.value;
    }
    return r;
}
export { map, mapErr, flatMap, unwrap, isOk, isErr };
