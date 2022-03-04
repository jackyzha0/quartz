"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getGlobalScope() {
    if (typeof global !== 'undefined')
        return global;
    if (typeof window !== 'undefined')
        return window;
    if (typeof self !== 'undefined')
        return self;
    return;
}
exports.getGlobalScope = getGlobalScope;
//# sourceMappingURL=getGlobalScope.js.map