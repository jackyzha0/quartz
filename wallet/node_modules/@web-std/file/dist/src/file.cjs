'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var blob = require('@web-std/blob');

/**
 * @implements {globalThis.File}
 */
class File extends blob.Blob {
  /**
   *
   * @param {BlobPart[]} init
   * @param {string} name - A USVString representing the file name or the path
   * to the file.
   * @param {FilePropertyBag} [options]
   */
  constructor(
    init,
    name = panic(new TypeError("File constructor requires name argument")),
    options = {}
  ) {
    super(init, options);
    // Per File API spec https://w3c.github.io/FileAPI/#file-constructor
    // Every "/" character of file name must be replaced with a ":".
    /** @private */
    this._name = name;
    // It appears that browser do not follow the spec here.
    // String(name).replace(/\//g, ":")
    /** @private */
    this._lastModified = options.lastModified || Date.now();
  }

  /**
   * The name of the file referenced by the File object.
   * @type {string}
   */
  get name() {
    return this._name
  }

  /**
   * The path the URL of the File is relative to.
   * @type {string}
   */
  get webkitRelativePath() {
    return ""
  }

  /**
   * Returns the last modified time of the file, in millisecond since the UNIX
   * epoch (January 1st, 1970 at Midnight).
   * @returns {number}
   */
  get lastModified() {
    return this._lastModified
  }

  get [Symbol.toStringTag]() {
    return "File"
  }
}

/**
 * @param {*} error
 * @returns {never}
 */
const panic = error => {
  throw error
};

exports.File = File;
//# sourceMappingURL=file.cjs.map
