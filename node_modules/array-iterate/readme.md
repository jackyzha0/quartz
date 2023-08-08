# array-iterate

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]

[`Array#forEach()`][foreach] but it’s possible to define where to move to next.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`arrayIterate(values, callbackFn[, thisArg])`](#arrayiteratevalues-callbackfn-thisarg)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

A tiny package that works just like `forEach`, with one small difference.

## When should I use this?

You can use this if for some weird reason—like I did—you have to sometimes
skip a few places ahead or backwards when moving through an array.

## Install

This package is [ESM only][esm].
In Node.js (version 12.20+, 14.14+, or 16.0+), install with [npm][]:

```sh
npm install array-iterate
```

In Deno with [Skypack][]:

```js
import {arrayIterate} from 'https://cdn.skypack.dev/array-iterate@2?dts'
```

In browsers with [Skypack][]:

```html
<script type="module">
  import {arrayIterate} from 'https://cdn.skypack.dev/array-iterate@2?min'
</script>
```

## Use

```js
import {arrayIterate} from 'array-iterate'

let first = true

arrayIterate(
  [1, 2, 3, 4],
  (value, index, values) => {
    console.log(this, value, index, values)

    // Repeat once.
    if (first && index + 1 === values.length) {
      first = false
      return 0
    }
  },
  {hello: 'world'}
)
```

Yields:

```js
{hello: 'world'}, 1, 0, [1, 2, 3, 4]
{hello: 'world'}, 2, 1, [1, 2, 3, 4]
{hello: 'world'}, 3, 2, [1, 2, 3, 4]
{hello: 'world'}, 4, 3, [1, 2, 3, 4]
{hello: 'world'}, 1, 0, [1, 2, 3, 4]
{hello: 'world'}, 2, 1, [1, 2, 3, 4]
{hello: 'world'}, 3, 2, [1, 2, 3, 4]
{hello: 'world'}, 4, 3, [1, 2, 3, 4]
```

## API

This package exports the following identifiers: `arrayIterate`.
There is no default export.

### `arrayIterate(values, callbackFn[, thisArg])`

Perform the specified action for each element in an array (just like
[`Array#forEach()`][foreach]).
When `callbackFn` returns a `number`, moves to the element at that index
next.

###### Parameters

*   `values` (`Array<*>`)
    — values to iterate over
*   `callbackFn` (`Function`)
    — function called for each element, can return the `index` to move to next
*   `thisArg` (`*`, optional)
    — optional object assigned as `this` in `callbackFn`

###### Returns

`undefined`.

#### `function callbackFn(value, index, values)`

Callback given to `iterate`.

###### Parameters

*   `this` (`*`)
    — context object when given as `thisArg` to `arrayIterate` or `undefined`
*   `value` (`*`)
    — element in array
*   `index` (`number`)
    — index of `value` in `values`
*   `values` (`Array.<*>`)
    — list

###### Returns

`number` or `undefined` — the `index` to move to next.

## Types

This package is fully typed with [TypeScript][].
There is also a `CallbackFn` type export that represents the callback function.

## Compatibility

This package is at least compatible with all maintained versions of Node.js.
As of now, that is Node.js 12.20+, 14.14+, and 16.0+.
It also works in Deno and modern browsers.

## Security

This package is safe, assuming that you don’t create an infinite loop
by keeping on repeating.

## Contribute

Yes please!
See [How to Contribute to Open Source][contribute].

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/wooorm/array-iterate/workflows/main/badge.svg

[build]: https://github.com/wooorm/array-iterate/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/array-iterate.svg

[coverage]: https://codecov.io/github/wooorm/array-iterate

[downloads-badge]: https://img.shields.io/npm/dm/array-iterate.svg

[downloads]: https://www.npmjs.com/package/array-iterate

[size-badge]: https://img.shields.io/bundlephobia/minzip/array-iterate.svg

[size]: https://bundlephobia.com/result?p=array-iterate

[npm]: https://docs.npmjs.com/cli/install

[skypack]: https://www.skypack.dev

[license]: license

[author]: https://wooorm.com

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[typescript]: https://www.typescriptlang.org

[contribute]: https://opensource.guide/how-to-contribute/

[foreach]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
