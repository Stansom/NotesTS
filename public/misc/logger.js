import { config } from "../env/config.js";
import { dispatch } from "./dispatcher.js";
const dispatchMap = {
    debug: (msg) => config.debug ? console.debug(`[DEBUG LOG]: ${msg}`) : "",
    warn: (msg) => console.warn(`[WARN LOG]: ${msg}`),
    info: (msg) => console.info(`[INFO LOG]: ${msg}`),
    err: (msg) => console.error(`[ERROR LOG]: ${msg}`),
    default: () => "do nothing"
};
/**
 * Logs a message(s) by log level
 * @param m Message type 'debug' | 'warn' | 'info' | 'err'
 * @param msg Message(s) to log
 */
function log(m, ...msg) {
    dispatch(dispatchMap, m)(msg);
}
export { log };
