"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ProgressEvent = /** @class */ (function () {
    function ProgressEvent(type) {
        this.type = type;
        this.bubbles = false;
        this.cancelable = false;
        this.loaded = 0;
        this.lengthComputable = false;
        this.total = 0;
    }
    return ProgressEvent;
}());
exports.ProgressEvent = ProgressEvent;
//# sourceMappingURL=progress-event.js.map