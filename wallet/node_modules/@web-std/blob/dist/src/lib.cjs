'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var webEncoding = require('web-encoding');
var stream = require('@web-std/stream');

// On the web we just export native Blob implementation
const { Blob } = globalThis;

Object.defineProperty(exports, 'TextDecoder', {
	enumerable: true,
	get: function () {
		return webEncoding.TextDecoder;
	}
});
Object.defineProperty(exports, 'TextEncoder', {
	enumerable: true,
	get: function () {
		return webEncoding.TextEncoder;
	}
});
Object.defineProperty(exports, 'ReadableStream', {
	enumerable: true,
	get: function () {
		return stream.ReadableStream;
	}
});
exports.Blob = Blob;
//# sourceMappingURL=lib.cjs.map
