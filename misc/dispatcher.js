/**
 *   Takes a dispatch object (disp) and applies
 * dispatch function from the message(msg)
 *
 * @example
 * const method = {
 *     admin: (n) => `hello ADMIN: ${n}`,
 *     user: (n) => `USER: hi ${n}`,
 *     default: () => 'Anon hola!'
 *   };
 *   let dispatchMsg = {
 *     type: 'user'
 *   };
 *
 *   dispatch(method, dispatchMsg)('Fasi')
 *   =>> returns "USER: hi Fasi"
 *
 *   dispatchMsg = {
 *     type: 'none'
 *   };
 *   dispatch(method, dispatchMsg)('Fasi')
 *   =>> returns "Anon hola!"
 *
 *
 *   ==> The dispatch function simply 'get' a function from
 *   ==> the corresponding field in the message object
 *
 *   ==> In this example it looks like this:
 *   =>> "If the dispatch object contains corresponding field in the message object,
 *   =>> then call a function corresponding to the message from the dispatch object"
 *   ==> msg -> dispatch: {type: 'user'} -> {user: (n) => `USER: hi ${n}`}: (n) => `USER: hi ${n}`;
 *   ==> msg -> dispatch: {type: 'admin'} -> {admin: (n) => `hello ADMIN: ${n}`}: (n) => `hello ADMIN: ${n}`;
 *   =>> "When there is no such field call default function:"
 *   ==> msg -> dispatch: {type: 'none'} -> {default: () => 'Anon hola!'}: () => 'Anon hola!';
 *
 * @param dispatch Dispatch object
 * @param msg Dispatch message
 * @return {Function}
 */
function dispatch(dispatch, msg) {
    if (dispatch.hasOwnProperty(msg['type'])) {
        return dispatch[msg['type']];
    }
    else {
        return dispatch['default'];
    }
}
export { dispatch };
