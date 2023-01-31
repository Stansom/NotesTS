import { config } from "../env/config.js";
function log(...msg) {
    if (config.debug) {
        console.log(...msg);
    }
}
export { log };
