"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TextDecoder_1 = require("../common/TextDecoder");
var TextEncoder_1 = require("../common/TextEncoder");
if (!global['TextEncoder'])
    global['TextEncoder'] = TextEncoder_1.TextEncoder;
if (!global['TextDecoder'])
    global['TextDecoder'] = TextDecoder_1.TextDecoder;
//# sourceMappingURL=polyfill.js.map