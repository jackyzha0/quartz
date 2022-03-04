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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var https = require("https");
var os = require("os");
var url = require("url");
var progress_event_1 = require("./progress-event");
var errors_1 = require("./errors");
var xml_http_request_event_target_1 = require("./xml-http-request-event-target");
var xml_http_request_upload_1 = require("./xml-http-request-upload");
var Cookie = require("cookiejar");
var XMLHttpRequest = /** @class */ (function (_super) {
    __extends(XMLHttpRequest, _super);
    function XMLHttpRequest(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        _this.UNSENT = XMLHttpRequest.UNSENT;
        _this.OPENED = XMLHttpRequest.OPENED;
        _this.HEADERS_RECEIVED = XMLHttpRequest.HEADERS_RECEIVED;
        _this.LOADING = XMLHttpRequest.LOADING;
        _this.DONE = XMLHttpRequest.DONE;
        _this.onreadystatechange = null;
        _this.readyState = XMLHttpRequest.UNSENT;
        _this.response = null;
        _this.responseText = '';
        _this.responseType = '';
        _this.status = 0; // TODO: UNSENT?
        _this.statusText = '';
        _this.timeout = 0;
        _this.upload = new xml_http_request_upload_1.XMLHttpRequestUpload();
        _this.responseUrl = '';
        _this.withCredentials = false;
        _this._method = null;
        _this._url = null;
        _this._sync = false;
        _this._headers = {};
        _this._loweredHeaders = {};
        _this._mimeOverride = null; // TODO: is type right?
        _this._request = null;
        _this._response = null;
        _this._responseParts = null;
        _this._responseHeaders = null;
        _this._aborting = null; // TODO: type?
        _this._error = null; // TODO: type?
        _this._loadedBytes = 0;
        _this._totalBytes = 0;
        _this._lengthComputable = false;
        _this._restrictedMethods = { CONNECT: true, TRACE: true, TRACK: true };
        _this._restrictedHeaders = {
            'accept-charset': true,
            'accept-encoding': true,
            'access-control-request-headers': true,
            'access-control-request-method': true,
            connection: true,
            'content-length': true,
            cookie: true,
            cookie2: true,
            date: true,
            dnt: true,
            expect: true,
            host: true,
            'keep-alive': true,
            origin: true,
            referer: true,
            te: true,
            trailer: true,
            'transfer-encoding': true,
            upgrade: true,
            'user-agent': true,
            via: true
        };
        _this._privateHeaders = { 'set-cookie': true, 'set-cookie2': true };
        _this._userAgent = "Mozilla/5.0 (" + os.type() + " " + os.arch() + ") node.js/" + process.versions.node + " v8/" + process.versions.v8;
        _this._anonymous = options.anon || false;
        return _this;
    }
    XMLHttpRequest.prototype.open = function (method, url, async, user, password) {
        if (async === void 0) { async = true; }
        method = method.toUpperCase();
        if (this._restrictedMethods[method]) {
            throw new XMLHttpRequest.SecurityError("HTTP method " + method + " is not allowed in XHR");
        }
        ;
        var xhrUrl = this._parseUrl(url, user, password);
        if (this.readyState === XMLHttpRequest.HEADERS_RECEIVED || this.readyState === XMLHttpRequest.LOADING) {
            // TODO(pwnall): terminate abort(), terminate send()
        }
        this._method = method;
        this._url = xhrUrl;
        this._sync = !async;
        this._headers = {};
        this._loweredHeaders = {};
        this._mimeOverride = null;
        this._setReadyState(XMLHttpRequest.OPENED);
        this._request = null;
        this._response = null;
        this.status = 0;
        this.statusText = '';
        this._responseParts = [];
        this._responseHeaders = null;
        this._loadedBytes = 0;
        this._totalBytes = 0;
        this._lengthComputable = false;
    };
    XMLHttpRequest.prototype.setRequestHeader = function (name, value) {
        if (this.readyState !== XMLHttpRequest.OPENED) {
            throw new XMLHttpRequest.InvalidStateError('XHR readyState must be OPENED');
        }
        var loweredName = name.toLowerCase();
        if (this._restrictedHeaders[loweredName] || /^sec-/.test(loweredName) || /^proxy-/.test(loweredName)) {
            console.warn("Refused to set unsafe header \"" + name + "\"");
            return;
        }
        value = value.toString();
        if (this._loweredHeaders[loweredName] != null) {
            name = this._loweredHeaders[loweredName];
            this._headers[name] = this._headers[name] + ", " + value;
        }
        else {
            this._loweredHeaders[loweredName] = name;
            this._headers[name] = value;
        }
    };
    XMLHttpRequest.prototype.send = function (data) {
        if (this.readyState !== XMLHttpRequest.OPENED) {
            throw new XMLHttpRequest.InvalidStateError('XHR readyState must be OPENED');
        }
        if (this._request) {
            throw new XMLHttpRequest.InvalidStateError('send() already called');
        }
        switch (this._url.protocol) {
            case 'file:':
                return this._sendFile(data);
            case 'http:':
            case 'https:':
                return this._sendHttp(data);
            default:
                throw new XMLHttpRequest.NetworkError("Unsupported protocol " + this._url.protocol);
        }
    };
    XMLHttpRequest.prototype.abort = function () {
        if (this._request == null) {
            return;
        }
        this._request.abort();
        this._setError();
        this._dispatchProgress('abort');
        this._dispatchProgress('loadend');
    };
    XMLHttpRequest.prototype.getResponseHeader = function (name) {
        if (this._responseHeaders == null || name == null) {
            return null;
        }
        var loweredName = name.toLowerCase();
        return this._responseHeaders.hasOwnProperty(loweredName)
            ? this._responseHeaders[name.toLowerCase()]
            : null;
    };
    XMLHttpRequest.prototype.getAllResponseHeaders = function () {
        var _this = this;
        if (this._responseHeaders == null) {
            return '';
        }
        return Object.keys(this._responseHeaders).map(function (key) { return key + ": " + _this._responseHeaders[key]; }).join('\r\n');
    };
    XMLHttpRequest.prototype.overrideMimeType = function (mimeType) {
        if (this.readyState === XMLHttpRequest.LOADING || this.readyState === XMLHttpRequest.DONE) {
            throw new XMLHttpRequest.InvalidStateError('overrideMimeType() not allowed in LOADING or DONE');
        }
        this._mimeOverride = mimeType.toLowerCase();
    };
    XMLHttpRequest.prototype.nodejsSet = function (options) {
        this.nodejsHttpAgent = options.httpAgent || this.nodejsHttpAgent;
        this.nodejsHttpsAgent = options.httpsAgent || this.nodejsHttpsAgent;
        if (options.hasOwnProperty('baseUrl')) {
            if (options.baseUrl != null) {
                var parsedUrl = url.parse(options.baseUrl, false, true);
                if (!parsedUrl.protocol) {
                    throw new XMLHttpRequest.SyntaxError("baseUrl must be an absolute URL");
                }
            }
            this.nodejsBaseUrl = options.baseUrl;
        }
    };
    XMLHttpRequest.nodejsSet = function (options) {
        XMLHttpRequest.prototype.nodejsSet(options);
    };
    XMLHttpRequest.prototype._setReadyState = function (readyState) {
        this.readyState = readyState;
        this.dispatchEvent(new progress_event_1.ProgressEvent('readystatechange'));
    };
    XMLHttpRequest.prototype._sendFile = function (data) {
        // TODO
        throw new Error('Protocol file: not implemented');
    };
    XMLHttpRequest.prototype._sendHttp = function (data) {
        if (this._sync) {
            throw new Error('Synchronous XHR processing not implemented');
        }
        if (data && (this._method === 'GET' || this._method === 'HEAD')) {
            console.warn("Discarding entity body for " + this._method + " requests");
            data = null;
        }
        else {
            data = data || '';
        }
        this.upload._setData(data);
        this._finalizeHeaders();
        this._sendHxxpRequest();
    };
    XMLHttpRequest.prototype._sendHxxpRequest = function () {
        var _this = this;
        if (this.withCredentials) {
            var cookie = XMLHttpRequest.cookieJar
                .getCookies(Cookie.CookieAccessInfo(this._url.hostname, this._url.pathname, this._url.protocol === 'https:')).toValueString();
            this._headers.cookie = this._headers.cookie2 = cookie;
        }
        var _a = this._url.protocol === 'http:' ? [http, this.nodejsHttpAgent] : [https, this.nodejsHttpsAgent], hxxp = _a[0], agent = _a[1];
        var requestMethod = hxxp.request.bind(hxxp);
        var request = requestMethod({
            hostname: this._url.hostname,
            port: +this._url.port,
            path: this._url.path,
            auth: this._url.auth,
            method: this._method,
            headers: this._headers,
            agent: agent
        });
        this._request = request;
        if (this.timeout) {
            request.setTimeout(this.timeout, function () { return _this._onHttpTimeout(request); });
        }
        request.on('response', function (response) { return _this._onHttpResponse(request, response); });
        request.on('error', function (error) { return _this._onHttpRequestError(request, error); });
        this.upload._startUpload(request);
        if (this._request === request) {
            this._dispatchProgress('loadstart');
        }
    };
    XMLHttpRequest.prototype._finalizeHeaders = function () {
        this._headers = __assign({}, this._headers, { Connection: 'keep-alive', Host: this._url.host, 'User-Agent': this._userAgent }, this._anonymous ? { Referer: 'about:blank' } : {});
        this.upload._finalizeHeaders(this._headers, this._loweredHeaders);
    };
    XMLHttpRequest.prototype._onHttpResponse = function (request, response) {
        var _this = this;
        if (this._request !== request) {
            return;
        }
        if (this.withCredentials && (response.headers['set-cookie'] || response.headers['set-cookie2'])) {
            XMLHttpRequest.cookieJar
                .setCookies(response.headers['set-cookie'] || response.headers['set-cookie2']);
        }
        if ([301, 302, 303, 307, 308].indexOf(response.statusCode) >= 0) {
            this._url = this._parseUrl(response.headers.location);
            this._method = 'GET';
            if (this._loweredHeaders['content-type']) {
                delete this._headers[this._loweredHeaders['content-type']];
                delete this._loweredHeaders['content-type'];
            }
            if (this._headers['Content-Type'] != null) {
                delete this._headers['Content-Type'];
            }
            delete this._headers['Content-Length'];
            this.upload._reset();
            this._finalizeHeaders();
            this._sendHxxpRequest();
            return;
        }
        this._response = response;
        this._response.on('data', function (data) { return _this._onHttpResponseData(response, data); });
        this._response.on('end', function () { return _this._onHttpResponseEnd(response); });
        this._response.on('close', function () { return _this._onHttpResponseClose(response); });
        this.responseUrl = this._url.href.split('#')[0];
        this.status = response.statusCode;
        this.statusText = http.STATUS_CODES[this.status];
        this._parseResponseHeaders(response);
        var lengthString = this._responseHeaders['content-length'] || '';
        this._totalBytes = +lengthString;
        this._lengthComputable = !!lengthString;
        this._setReadyState(XMLHttpRequest.HEADERS_RECEIVED);
    };
    XMLHttpRequest.prototype._onHttpResponseData = function (response, data) {
        if (this._response !== response) {
            return;
        }
        this._responseParts.push(new Buffer(data));
        this._loadedBytes += data.length;
        if (this.readyState !== XMLHttpRequest.LOADING) {
            this._setReadyState(XMLHttpRequest.LOADING);
        }
        this._dispatchProgress('progress');
    };
    XMLHttpRequest.prototype._onHttpResponseEnd = function (response) {
        if (this._response !== response) {
            return;
        }
        this._parseResponse();
        this._request = null;
        this._response = null;
        this._setReadyState(XMLHttpRequest.DONE);
        this._dispatchProgress('load');
        this._dispatchProgress('loadend');
    };
    XMLHttpRequest.prototype._onHttpResponseClose = function (response) {
        if (this._response !== response) {
            return;
        }
        var request = this._request;
        this._setError();
        request.abort();
        this._setReadyState(XMLHttpRequest.DONE);
        this._dispatchProgress('error');
        this._dispatchProgress('loadend');
    };
    XMLHttpRequest.prototype._onHttpTimeout = function (request) {
        if (this._request !== request) {
            return;
        }
        this._setError();
        request.abort();
        this._setReadyState(XMLHttpRequest.DONE);
        this._dispatchProgress('timeout');
        this._dispatchProgress('loadend');
    };
    XMLHttpRequest.prototype._onHttpRequestError = function (request, error) {
        if (this._request !== request) {
            return;
        }
        this._setError();
        request.abort();
        this._setReadyState(XMLHttpRequest.DONE);
        this._dispatchProgress('error');
        this._dispatchProgress('loadend');
    };
    XMLHttpRequest.prototype._dispatchProgress = function (eventType) {
        var event = new XMLHttpRequest.ProgressEvent(eventType);
        event.lengthComputable = this._lengthComputable;
        event.loaded = this._loadedBytes;
        event.total = this._totalBytes;
        this.dispatchEvent(event);
    };
    XMLHttpRequest.prototype._setError = function () {
        this._request = null;
        this._response = null;
        this._responseHeaders = null;
        this._responseParts = null;
    };
    XMLHttpRequest.prototype._parseUrl = function (urlString, user, password) {
        var absoluteUrl = this.nodejsBaseUrl == null ? urlString : url.resolve(this.nodejsBaseUrl, urlString);
        var xhrUrl = url.parse(absoluteUrl, false, true);
        xhrUrl.hash = null;
        var _a = (xhrUrl.auth || '').split(':'), xhrUser = _a[0], xhrPassword = _a[1];
        if (xhrUser || xhrPassword || user || password) {
            xhrUrl.auth = (user || xhrUser || '') + ":" + (password || xhrPassword || '');
        }
        return xhrUrl;
    };
    XMLHttpRequest.prototype._parseResponseHeaders = function (response) {
        this._responseHeaders = {};
        for (var name_1 in response.headers) {
            var loweredName = name_1.toLowerCase();
            if (this._privateHeaders[loweredName]) {
                continue;
            }
            this._responseHeaders[loweredName] = response.headers[name_1];
        }
        if (this._mimeOverride != null) {
            this._responseHeaders['content-type'] = this._mimeOverride;
        }
    };
    XMLHttpRequest.prototype._parseResponse = function () {
        var buffer = Buffer.concat(this._responseParts);
        this._responseParts = null;
        switch (this.responseType) {
            case 'json':
                this.responseText = null;
                try {
                    this.response = JSON.parse(buffer.toString('utf-8'));
                }
                catch (_a) {
                    this.response = null;
                }
                return;
            case 'buffer':
                this.responseText = null;
                this.response = buffer;
                return;
            case 'arraybuffer':
                this.responseText = null;
                var arrayBuffer = new ArrayBuffer(buffer.length);
                var view = new Uint8Array(arrayBuffer);
                for (var i = 0; i < buffer.length; i++) {
                    view[i] = buffer[i];
                }
                this.response = arrayBuffer;
                return;
            case 'text':
            default:
                try {
                    this.responseText = buffer.toString(this._parseResponseEncoding());
                }
                catch (_b) {
                    this.responseText = buffer.toString('binary');
                }
                this.response = this.responseText;
        }
    };
    XMLHttpRequest.prototype._parseResponseEncoding = function () {
        return /;\s*charset=(.*)$/.exec(this._responseHeaders['content-type'] || '')[1] || 'utf-8';
    };
    XMLHttpRequest.ProgressEvent = progress_event_1.ProgressEvent;
    XMLHttpRequest.InvalidStateError = errors_1.InvalidStateError;
    XMLHttpRequest.NetworkError = errors_1.NetworkError;
    XMLHttpRequest.SecurityError = errors_1.SecurityError;
    XMLHttpRequest.SyntaxError = errors_1.SyntaxError;
    XMLHttpRequest.XMLHttpRequestUpload = xml_http_request_upload_1.XMLHttpRequestUpload;
    XMLHttpRequest.UNSENT = 0;
    XMLHttpRequest.OPENED = 1;
    XMLHttpRequest.HEADERS_RECEIVED = 2;
    XMLHttpRequest.LOADING = 3;
    XMLHttpRequest.DONE = 4;
    XMLHttpRequest.cookieJar = Cookie.CookieJar();
    return XMLHttpRequest;
}(xml_http_request_event_target_1.XMLHttpRequestEventTarget));
exports.XMLHttpRequest = XMLHttpRequest;
XMLHttpRequest.prototype.nodejsHttpAgent = http.globalAgent;
XMLHttpRequest.prototype.nodejsHttpsAgent = https.globalAgent;
XMLHttpRequest.prototype.nodejsBaseUrl = null;
//# sourceMappingURL=xml-http-request.js.map