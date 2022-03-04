'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var webEncoding = require('web-encoding');
var stream = require('@web-std/stream');
var blob = require('./blob.cjs');

/** @type {typeof globalThis.Blob} */
// Our first choise is to use global `Blob` because it may be available e.g. in
// electron renderrer process. If not available fall back to node native
// implementation, if also not available use our implementation.
const Blob =
  globalThis.Blob || 
  // Disable node native blob until impractical perf issue is fixed
  // @see https://github.com/nodejs/node/issues/42108
  // NodeBlob ||
  blob.Blob;

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
//# sourceMappingURL=lib.node.cjs.map
