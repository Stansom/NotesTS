type Result<T, E> =
    { type: 'ok'; value: T } |
    { type: 'err'; value: E };

interface Matcher<T, E, R> {
    ok: (v: T) => R;
    err: (e: E) => R;
}

function match<T, E, R>(r: Result<T, E>, m: Matcher<T, E, R>): R {
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

function toOk<T, E>(r: T): Result<T, E> {
    return { type: 'ok', value: r };
}

function isOk<T, E>(r: Result<T, E>): boolean {
    return match(r, {
        ok: () => true,
        err: () => false,
    });
}

function isErr<T, E>(r: Result<T, E>): boolean {
    return match(r, {
        ok: () => false,
        err: () => true,
    });
}

function map<T, E>(r: Result<T, E>, fn: Function) {
    return match(r, {
        ok: (v) => toOk(fn(v)),
        err: () => r,
    });
}

function flatMap<T, E>(r: Result<T, E>, fn: Function) {
    return match(r, {
        ok: (v) => fn(v),
        err: () => r,
    });
}

function mapErr<T, E>(r: Result<T, E>, fn: Function) {
    return match(r, {
        ok: () => r,
        err: (e) => ({ type: 'err', value: fn(e) }),
    });
}

function unwrap<T, E>(r: Result<T, E>) {
    if (isOk(r)) {
        return r.value;
    }

    return r;
}

export { map, mapErr, flatMap, unwrap, isOk, isErr }