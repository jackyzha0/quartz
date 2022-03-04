# web-encoding

![Node.js CI][node.js ci]
[![package][version.icon] ![downloads][downloads.icon]][package.url]
[![styled with prettier][prettier.icon]][prettier.url]

This package provides [TextEncoder][] and [TextDecoder][] [Encoding Standard][]
APIs in a universal package. In the browsers it just exposes existing globals,
in nodejs it exposes globals in newer node versions and ones from `util` module
in older versions, and in the React Native environments it exposes these from
the [@zxing/text-encoding](https://www.npmjs.com/package/@zxing/text-encoding)
polyfill (installed as an optional dependency).

Package also works as ES module and CommonJS module.

### Usage

```js
import { TextEncoder, TextDecoder } from "web-encoding"
```

## Install

    npm install web-encoding

[node.js ci]: https://github.com/Gozala/web-encoding/workflows/Node.js%20CI/badge.svg
[version.icon]: https://img.shields.io/npm/v/web-encoding.svg
[downloads.icon]: https://img.shields.io/npm/dm/web-encoding.svg
[package.url]: https://npmjs.org/package/web-encoding
[downloads.image]: https://img.shields.io/npm/dm/web-encoding.svg
[downloads.url]: https://npmjs.org/package/web-encoding
[prettier.icon]: https://img.shields.io/badge/styled_with-prettier-ff69b4.svg
[prettier.url]: https://github.com/prettier/prettier
[ts-jsdoc]: https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html
[textencoder]: https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder
[textdecoder]: https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder
[encoding standard]: https://encoding.spec.whatwg.org/
