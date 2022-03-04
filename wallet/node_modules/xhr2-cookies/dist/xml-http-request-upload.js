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
var xml_http_request_event_target_1 = require("./xml-http-request-event-target");
var XMLHttpRequestUpload = /** @class */ (function (_super) {
    __extends(XMLHttpRequestUpload, _super);
    function XMLHttpRequestUpload() {
        var _this = _super.call(this) || this;
        _this._contentType = null;
        _this._body = null;
        _this._reset();
        return _this;
    }
    XMLHttpRequestUpload.prototype._reset = function () {
        this._contentType = null;
        this._body = null;
    };
    XMLHttpRequestUpload.prototype._setData = function (data) {
        if (data == null) {
            return;
        }
        if (typeof data === 'string') {
            if (data.length !== 0) {
                this._contentType = 'text/plain;charset=UTF-8';
            }
            this._body = new Buffer(data, 'utf-8');
        }
        else if (Buffer.isBuffer(data)) {
            this._body = data;
        }
        else if (data instanceof ArrayBuffer) {
            var body = new Buffer(data.byteLength);
            var view = new Uint8Array(data);
            for (var i = 0; i < data.byteLength; i++) {
                body[i] = view[i];
            }
            this._body = body;
        }
        else if (data.buffer && data.buffer instanceof ArrayBuffer) {
            var body = new Buffer(data.byteLength);
            var offset = data.byteOffset;
            var view = new Uint8Array(data.buffer);
            for (var i = 0; i < data.byteLength; i++) {
                body[i] = view[i + offset];
            }
            this._body = body;
        }
        else {
            throw new Error("Unsupported send() data " + data);
        }
    };
    XMLHttpRequestUpload.prototype._finalizeHeaders = function (headers, loweredHeaders) {
        if (this._contentType && !loweredHeaders['content-type']) {
            headers['Content-Type'] = this._contentType;
        }
        if (this._body) {
            headers['Content-Length'] = this._body.length.toString();
        }
    };
    XMLHttpRequestUpload.prototype._startUpload = function (request) {
        if (this._body) {
            request.write(this._body);
        }
        request.end();
    };
    return XMLHttpRequestUpload;
}(xml_http_request_event_target_1.XMLHttpRequestEventTarget));
exports.XMLHttpRequestUpload = XMLHttpRequestUpload;
//# sourceMappingURL=xml-http-request-upload.js.map