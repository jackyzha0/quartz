'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var builtin = require('buffer');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var builtin__namespace = /*#__PURE__*/_interopNamespace(builtin);

/**
 * @returns {typeof globalThis.Blob|null}
 */
const use = () => {
  try {
    // @ts-ignore
    const { Blob } = builtin__namespace;
    const view = new Uint16Array(1);
    // Checks if critical issue with node implementation of Blob is fixed
    // @see https://github.com/nodejs/node/issues/40705
    const isBugFixed = new Blob([view]).size === view.byteLength;
    return isBugFixed ? Blob : null
  } catch (error) {
    return null
  }
};

const Blob = use();

exports.Blob = Blob;
//# sourceMappingURL=blob.node.cjs.map
