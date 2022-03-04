"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var getGlobalScope_1 = require("../helper/getGlobalScope");
var _encodingIndexes;
function checkForEncodingIndexes() {
    if (typeof TextEncodingIndexes !== 'undefined')
        return TextEncodingIndexes.encodingIndexes;
    var glo = getGlobalScope_1.getGlobalScope();
    if (!glo)
        return null;
    if ('TextEncodingIndexes' in glo)
        return global['TextEncodingIndexes']['encodingIndexes'];
    if ('encoding-indexes' in glo)
        return global['encodingIndexes'];
    return null;
}
function getEncodingIndexes() {
    if (_encodingIndexes) {
        return _encodingIndexes;
    }
    var indexes = checkForEncodingIndexes();
    if (!indexes) {
        return null;
    }
    _encodingIndexes = indexes;
    return indexes;
}
exports.getEncodingIndexes = getEncodingIndexes;
//# sourceMappingURL=encoding-indexes-provider.js.map