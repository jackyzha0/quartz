"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var XMLHttpRequestEventTarget = /** @class */ (function () {
    function XMLHttpRequestEventTarget() {
        this.listeners = {};
    }
    XMLHttpRequestEventTarget.prototype.addEventListener = function (eventType, listener) {
        eventType = eventType.toLowerCase();
        this.listeners[eventType] = this.listeners[eventType] || [];
        this.listeners[eventType].push(listener.handleEvent || listener);
    };
    XMLHttpRequestEventTarget.prototype.removeEventListener = function (eventType, listener) {
        eventType = eventType.toLowerCase();
        if (!this.listeners[eventType]) {
            return;
        }
        var index = this.listeners[eventType].indexOf(listener.handleEvent || listener);
        if (index < 0) {
            return;
        }
        this.listeners[eventType].splice(index, 1);
    };
    XMLHttpRequestEventTarget.prototype.dispatchEvent = function (event) {
        var eventType = event.type.toLowerCase();
        event.target = this; // TODO: set event.currentTarget?
        if (this.listeners[eventType]) {
            for (var _i = 0, _a = this.listeners[eventType]; _i < _a.length; _i++) {
                var listener_1 = _a[_i];
                listener_1.call(this, event);
            }
        }
        var listener = this["on" + eventType];
        if (listener) {
            listener.call(this, event);
        }
        return true;
    };
    return XMLHttpRequestEventTarget;
}());
exports.XMLHttpRequestEventTarget = XMLHttpRequestEventTarget;
//# sourceMappingURL=xml-http-request-event-target.js.map