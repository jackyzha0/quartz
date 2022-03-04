import { TextDecoder } from "../common/TextDecoder";
import { TextEncoder } from "../common/TextEncoder";
if (!global['TextEncoder'])
    global['TextEncoder'] = TextEncoder;
if (!global['TextDecoder'])
    global['TextDecoder'] = TextDecoder;
//# sourceMappingURL=polyfill.js.map