# @web-std/stream

[![ci][ci.icon]][ci.url]
[![package][version.icon] ![downloads][downloads.icon]][package.url]
[![styled with prettier][prettier.icon]][prettier.url]

Web streams APIs across web & node. In browsers this library just exports stream constructors, in node it exports [native web stream implementations][node webstreams] when available and [web-streams-polyfill][]

> ⚠️ Please note that library makes no attempt to polyfill `WritableStream` or `TransforStream` in web browsers that do not have them.

### Usage

```js
import {
  ReadableStream,
  WritableStream,
  TransformStream,
} from "@web-std/stream"
```

### Usage from Typescript

This library makes use of [typescript using JSDOC annotations][ts-jsdoc] and
also generates type definitions along with typed definition maps. So you should
be able to get all the type inference out of the box.

## Install

    npm install @web-std/stream

[ci.icon]: https://github.com/web-std/io/workflows/stream/badge.svg
[ci.url]: https://github.com/web-std/io/actions/workflows/stream.yml
[version.icon]: https://img.shields.io/npm/v/@web-std/stream.svg
[downloads.icon]: https://img.shields.io/npm/dm/@web-std/stream.svg
[package.url]: https://npmjs.org/package/@web-std/stream
[downloads.image]: https://img.shields.io/npm/dm/@web-std/stream.svg
[downloads.url]: https://npmjs.org/package/@web-std/stream
[prettier.icon]: https://img.shields.io/badge/styled_with-prettier-ff69b4.svg
[prettier.url]: https://github.com/prettier/prettier
[ts-jsdoc]: https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html
[node-webstreams]: https://nodejs.org/dist/latest-v16.x/docs/api/webstreams.html
[web-streams-polyfill]: https://www.npmjs.com/package/web-streams-polyfill
