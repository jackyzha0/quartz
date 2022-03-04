"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TextDecoder_1 = require("./common/TextDecoder");
exports.TextDecoder = TextDecoder_1.TextDecoder;
var TextEncoder_1 = require("./common/TextEncoder");
exports.TextEncoder = TextEncoder_1.TextEncoder;
// Polyfills browser
if (typeof window !== 'undefined') {
    var checkUndefined = function (key) { return !(key in window)
        || typeof window[key] === 'undefined'
        || window[key] === null; };
    if (checkUndefined('TextDecoder'))
        window['TextDecoder'] = TextDecoder_1.TextDecoder;
    if (checkUndefined('TextEncoder'))
        window['TextEncoder'] = TextEncoder_1.TextEncoder;
}
//# sourceMappingURL=encoding.js.map