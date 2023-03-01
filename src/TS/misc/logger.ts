import {config} from "../env/config.js";
import {dispatch} from "./dispatcher.js"

type LogType = 'debug' | 'warn' | 'info' | 'err' | 'default';

interface MsgType {
    type: LogType
}

const dispatchMap = {
    debug: (msg: any) => config.debug ? console.debug(`[DEBUG LOG]: ${msg}`) : "",
    warn: (msg: any) => console.warn(`[WARN LOG]: ${msg}`),
    info: (msg: any) => console.info(`[INFO LOG]: ${msg}`),
    err: (msg: any) => console.error(`[ERROR LOG]: ${msg}`),
    default: () => "do nothing"
}

/**
 * Logs a message(s) by log level
 * @param m Message type 'debug' | 'warn' | 'info' | 'err'
 * @param msg Message(s) to log
 */

function log(m: MsgType, ...msg: Array<unknown>) {
    dispatch(dispatchMap, m)(msg);
}

export {
    log
};