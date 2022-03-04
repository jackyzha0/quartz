"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var SecurityError = /** @class */ (function (_super) {
    __extends(SecurityError, _super);
    function SecurityError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SecurityError;
}(Error));
exports.SecurityError = SecurityError;
var InvalidStateError = /** @class */ (function (_super) {
    __extends(InvalidStateError, _super);
    function InvalidStateError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return InvalidStateError;
}(Error));
exports.InvalidStateError = InvalidStateError;
var NetworkError = /** @class */ (function (_super) {
    __extends(NetworkError, _super);
    function NetworkError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return NetworkError;
}(Error));
exports.NetworkError = NetworkError;
var SyntaxError = /** @class */ (function (_super) {
    __extends(SyntaxError, _super);
    function SyntaxError() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SyntaxError;
}(Error));
exports.SyntaxError = SyntaxError;
//# sourceMappingURL=errors.js.map