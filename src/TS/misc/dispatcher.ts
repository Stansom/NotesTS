
/**  Takes an dispatch object (disp) and applies 
dispatch function from the message(msg)

EXAMPLE:
const mmethod = {
    admin: (n) => `hello ADMIN: ${n}`,
    user: (n) => `USER: hi ${n}`,
    default: () => 'Anon hola!'
  };
  let dispMsg = {
    type: 'user'
  };

  dispatch(mmethod, dispMsg)('Fasi') 
        =>> returns "USER: hi Fasi"

  dispMsg = {
    type: 'none'
  };
  dispatch(mmethod, dispMsg)('Fasi') 
        =>> returns "Anon hola!"
  */

interface Msg {
    type: string;
}

interface Dispatch { [i: string]: Function }

function dispatch(disp: Dispatch, msg: Msg): Function {
    if (disp.hasOwnProperty(msg['type'])) {
        return disp[msg['type']]
    } else {
        return disp['default']
    }
}

export { dispatch };