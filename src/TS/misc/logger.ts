import {config} from "../env/config.js";

function log(...msg: Array<unknown>) {
    if (config.debug) {
        console.log(...msg)
    }
}

export {
    log
};