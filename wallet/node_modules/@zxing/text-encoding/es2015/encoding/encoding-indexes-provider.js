import { getGlobalScope } from "../helper/getGlobalScope";
let _encodingIndexes;
function checkForEncodingIndexes() {
    if (typeof TextEncodingIndexes !== 'undefined')
        return TextEncodingIndexes.encodingIndexes;
    const glo = getGlobalScope();
    if (!glo)
        return null;
    if ('TextEncodingIndexes' in glo)
        return global['TextEncodingIndexes']['encodingIndexes'];
    if ('encoding-indexes' in glo)
        return global['encodingIndexes'];
    return null;
}
export function getEncodingIndexes() {
    if (_encodingIndexes) {
        return _encodingIndexes;
    }
    const indexes = checkForEncodingIndexes();
    if (!indexes) {
        return null;
    }
    _encodingIndexes = indexes;
    return indexes;
}
//# sourceMappingURL=encoding-indexes-provider.js.map