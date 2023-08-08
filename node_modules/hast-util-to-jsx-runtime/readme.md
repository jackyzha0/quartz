# hast-util-to-jsx-runtime

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

hast utility to transform a tree to preact, react, solid, svelte, vue, etc.,
with an automatic JSX runtime.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`toJsxRuntime(tree, options)`](#tojsxruntimetree-options)
    *   [`Options`](#options)
    *   [`Components`](#components)
    *   [`ElementAttributeNameCase`](#elementattributenamecase)
    *   [`Fragment`](#fragment)
    *   [`Jsx`](#jsx)
    *   [`JsxDev`](#jsxdev)
    *   [`Props`](#props)
    *   [`Source`](#source)
    *   [`Space`](#space)
    *   [`StylePropertyNameCase`](#stylepropertynamecase)
*   [Examples](#examples)
    *   [Example: Preact](#example-preact)
    *   [Example: Vue](#example-vue)
    *   [Example: Solid](#example-solid)
    *   [Example: Svelte](#example-svelte)
*   [Syntax](#syntax)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package is a utility that takes a [hast][] tree and an
[automatic JSX runtime][jsx-runtime] and turns the tree into anything you
whish.

## When should I use this?

You can use this package when you have a hast syntax tree and want to use it
with whatever framework.

This package uses an automatic JSX runtime, which is a sort of lingua franca
for frameworks to support JSX.

Notably, automatic runtimes have support for passing extra information in
development, and have guaranteed support for fragments.

## Install

This package is [ESM only][esm].
In Node.js (version 14.14+ and 16.0+), install with [npm][]:

```sh
npm install hast-util-to-jsx-runtime
```

In Deno with [`esm.sh`][esmsh]:

```js
import {toJsxRuntime} from 'https://esm.sh/hast-util-to-jsx-runtime@1'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import {toJsxRuntime} from 'https://esm.sh/hast-util-to-jsx-runtime@1?bundle'
</script>
```

## Use

```js
import {Fragment, jsx, jsxs} from 'react/jsx-runtime'
import {renderToStaticMarkup} from 'react-dom/server'
import {h} from 'hastscript'
import {toJsxRuntime} from 'hast-util-to-jsx-runtime'

const tree = h('h1', 'Hello, world!')

const doc = renderToStaticMarkup(toJsxRuntime(tree, {Fragment, jsx, jsxs}))

console.log(doc)
```

Yields:

```html
<h1>Hello, world!</h1>
```

## API

This package exports the identifier [`toJsxRuntime`][api-to-jsx-runtime].
There is no default export.

### `toJsxRuntime(tree, options)`

Transform a hast tree to preact, react, solid, svelte, vue, etc., with an
automatic JSX runtime.

###### Parameters

*   `tree` ([`Node`][node])
    — tree to transform
*   `options` ([`Options`][api-options], required)
    — configuration

###### Returns

Result from your configured JSX runtime (`JSX.Element`).

### `Options`

Configuration (TypeScript type).

###### Fields

*   `Fragment` ([`Fragment`][api-fragment], required)
    — fragment
*   `jsx` ([`Jsx`][api-jsx], required in production)
    — dynamic JSX
*   `jsxs` ([`Jsx`][api-jsx], required in production)
    — static JSX
*   `jsxDEV` ([`JsxDev`][api-jsx-dev], required in development)
    — development JSX
*   `development` (`boolean`, default: `false`)
    — whether to use `jsxDEV` when on or `jsx` and `jsxs` when off
*   `components` ([`Partial<Components>`][api-components], optional)
    — components to use
*   `elementAttributeNameCase`
    ([`ElementAttributeNameCase`][api-element-attribute-name-case],
    default: `'react'`)
    — specify casing to use for attribute names
*   `filePath` (`string`, optional)
    — file path to the original source file, passed in source info to `jsxDEV`
    when using the automatic runtime with `development: true`
*   `passNode` (`boolean`, default: `false`)
    — pass the hast element node to components
*   `space` ([`Space`][api-space], default: `'html'`)
    — whether `tree` is in the `'html'` or `'svg'` space, when an `<svg>`
    element is found in the HTML space, this package already automatically
    switches to and from the SVG space when entering and exiting it
*   `stylePropertyNameCase`
    ([`StylePropertyNameCase`][api-style-property-name-case],
    default: `'dom'`)
    — specify casing to use for property names in `style` objects

### `Components`

Possible components to use (TypeScript type).

Each key is a tag name typed in `JSX.IntrinsicElements`.
Each value is either a different tag name, or a component accepting the
corresponding props (and an optional `node` prop if `passNode` is on).

You can access props at `JSX.IntrinsicElements`.
For example, to find props for `a`, use `JSX.IntrinsicElements['a']`.

###### Type

```ts
import type {Element} from 'hast'

type Components = {
  [TagName in keyof JSX.IntrinsicElements]:
    | Component<JSX.IntrinsicElements[TagName] & ExtraProps>
    | keyof JSX.IntrinsicElements
}

type ExtraProps = {node?: Element | undefined}

type Component<ComponentProps> =
  // Function component:
  | ((props: ComponentProps) => JSX.Element | string | null | undefined)
  // Class component:
  | (new (props: ComponentProps) => JSX.ElementClass)
```

### `ElementAttributeNameCase`

Casing to use for attribute names (TypeScript type).

HTML casing is for example `class`, `stroke-linecap`, `xml:lang`.
React casing is for example `className`, `strokeLinecap`, `xmlLang`.

###### Type

```ts
type ElementAttributeNameCase = 'react' | 'html'
```

### `Fragment`

Represent the children, typically a symbol (TypeScript type).

###### Type

```ts
type Fragment = unknown
```

### `Jsx`

Create a production element (TypeScript type).

###### Parameters

*   `type` (`unknown`)
    — element type: `Fragment` symbol, tag name (`string`), component
*   `props` ([`Props`][api-props])
    — element props, `children`, and maybe `node`
*   `key` (`string` or `undefined`)
    — dynamicly generated key to use

###### Returns

An element from your framework (`JSX.Element`).

### `JsxDev`

Create a development element (TypeScript type).

###### Parameters

*   `type` (`unknown`)
    — element type: `Fragment` symbol, tag name (`string`), component
*   `props` ([`Props`][api-props])
    — element props, `children`, and maybe `node`
*   `key` (`string` or `undefined`)
    — dynamicly generated key to use
*   `isStaticChildren` (`boolean`)
    — whether two or more children are passed (in an array), which is whether
    `jsxs` or `jsx` would be used
*   `source` ([`Source`][api-source])
    — info about source
*   `self` (`undefined`)
    — nothing (this is used by frameworks that have components, we don’t)

###### Returns

An element from your framework (`JSX.Element`).

### `Props`

Properties and children (TypeScript type).

###### Type

```ts
import type {Element} from 'hast'

type Props = {
  [prop: string]:
    | Element // For `node`.
    | Array<JSX.Element | string | null | undefined> // For `children`.
    | Record<string, string> // For `style`.
    | string
    | number
    | boolean
    | undefined
  children: Array<JSX.Element | string | null | undefined> | undefined
  node?: Element | undefined
}
```

### `Source`

Info about source (TypeScript type).

###### Fields

*   `fileName` (`string` or `undefined`)
    — name of source file
*   `lineNumber` (`number` or `undefined`)
    — line where thing starts (1-indexed)
*   `columnNumber` (`number` or `undefined`)
    — column where thing starts (0-indexed)

### `Space`

Namespace (TypeScript type).

> 👉 **Note**: hast is not XML.
> It supports SVG as embedded in HTML.
> It does not support the features available in XML.
> Passing SVG might break but fragments of modern SVG should be fine.
> Use `xast` if you need to support SVG as XML.

###### Type

```ts
type Space = 'html' | 'svg'
```

### `StylePropertyNameCase`

Casing to use for property names in `style` objects (TypeScript type).

CSS casing is for example `background-color` and `-webkit-line-clamp`.
DOM casing is for example `backgroundColor` and `WebkitLineClamp`.

###### Type

```ts
type StylePropertyNameCase = 'dom' | 'css'
```

## Examples

### Example: Preact

> 👉 **Note**: you must set `elementAttributeNameCase: 'html'` for preact.

In Node.js, do:

```js
import {Fragment, jsx, jsxs} from 'preact/jsx-runtime'
import {render} from 'preact-render-to-string'
import {h} from 'hastscript'
import {toJsxRuntime} from 'hast-util-to-jsx-runtime'

const result = render(
  toJsxRuntime(h('h1', 'hi!'), {
    Fragment,
    jsx,
    jsxs,
    elementAttributeNameCase: 'html'
  })
)

console.log(result)
```

Yields:

```html
<h1>hi!</h1>
```

In a browser, do:

```js
import {Fragment, jsx, jsxs} from 'https://esm.sh/preact@10/jsx-runtime'
import {render} from 'https://esm.sh/preact@10'
import {h} from 'https://esm.sh/hastscript@7'
import {toJsxRuntime} from 'https://esm.sh/hast-util-to-jsx-runtime@1'

render(
  toJsxRuntime(h('h1', 'hi!'), {
    Fragment,
    jsx,
    jsxs,
    elementAttributeNameCase: 'html'
  }),
  document.getElementById('root')
)
```

### Example: Vue

> 👉 **Note**: you must set `elementAttributeNameCase: 'html'` for Vue.

In Node.js, do:

```js
import {Fragment, jsx, jsxs} from 'vue-jsx-runtime/jsx-runtime'
import serverRenderer from '@vue/server-renderer'
import {h} from 'hastscript'
import {toJsxRuntime} from 'hast-util-to-jsx-runtime'

console.log(
  await serverRenderer.renderToString(
    toJsxRuntime(h('h1', 'hi!'), {
      Fragment,
      jsx,
      jsxs,
      elementAttributeNameCase: 'html'
    })
  )
)
```

Yields:

```html
<h1>hi!</h1>
```

In a browser, do:

```js
import {createApp} from 'https://esm.sh/vue@3'
import {Fragment, jsx, jsxs} from 'https://esm.sh/vue-jsx-runtime@0.1/jsx-runtime'
import {h} from 'https://esm.sh/hastscript@7'
import {toJsxRuntime} from 'https://esm.sh/hast-util-to-jsx-runtime@1'

createApp(Component).mount('#root')

function Component() {
  return toJsxRuntime(h('h1', 'hi!'), {
    Fragment,
    jsx,
    jsxs,
    elementAttributeNameCase: 'html'
  })
}
```

### Example: Solid

> 👉 **Note**: you must set `elementAttributeNameCase: 'html'` and
> `stylePropertyNameCase: 'css'` for Solid.

In Node.js, do:

```js
import {Fragment, jsx, jsxs} from 'solid-jsx/jsx-runtime'
import {h} from 'hastscript'
import {toJsxRuntime} from 'hast-util-to-jsx-runtime'

console.log(
  toJsxRuntime(h('h1', 'hi!'), {
    Fragment,
    jsx,
    jsxs,
    elementAttributeNameCase: 'html',
    stylePropertyNameCase: 'css'
  }).t
)
```

Yields:

```html
<h1 >hi!</h1>
```

In a browser, do:

```js
import {Fragment, jsx, jsxs} from 'https://esm.sh/solid-js@1/h/jsx-runtime'
import {render} from 'https://esm.sh/solid-js@1/web'
import {h} from 'https://esm.sh/hastscript@7'
import {toJsxRuntime} from 'https://esm.sh/hast-util-to-jsx-runtime@1'

render(Component, document.getElementById('root'))

function Component() {
  return toJsxRuntime(h('h1', 'hi!'), {
    Fragment,
    jsx,
    jsxs,
    elementAttributeNameCase: 'html',
    stylePropertyNameCase: 'css'
  })
}
```

### Example: Svelte

<!-- To do: improve svelte when it fixes a bunch of bugs. -->

I have no clue how to render a Svelte component in Node, but you can get that
component with:

```js
import {h} from 'hastscript'
import {toJsxRuntime} from 'hast-util-to-jsx-runtime'
import {Fragment, jsx, jsxs} from 'svelte-jsx'

const svelteComponent = toJsxRuntime(h('h1', 'hi!'), {Fragment, jsx, jsxs})

console.log(svelteComponent)
```

Yields:

```text
[class Component extends SvelteComponent]
```

## Syntax

HTML is parsed according to WHATWG HTML (the living standard), which is also
followed by browsers such as Chrome, Firefox, and Safari.

## Types

This package is fully typed with [TypeScript][].
It exports the additional types [`Components`][api-components],
[`ElementAttributeNameCase`][api-element-attribute-name-case],
[`Fragment`][api-fragment], [`Jsx`][api-jsx], [`JsxDev`][api-jsx-dev],
[`Options`][api-options], [`Props`][api-props], [`Source`][api-source],
[`Space`][api-Space],
and [`StylePropertyNameCase`][api-style-property-name-case].

The function `toJsxRuntime` returns a `JSX.Element`, which means that the JSX
namespace has to by typed.
Typically this is done by installing your frameworks types (e.g.,
`@types/react`), which you likely already have.

## Compatibility

Projects maintained by the unified collective are compatible with all maintained
versions of Node.js.
As of now, that is Node.js 14.14+ and 16.0+.
Our projects sometimes work with older versions, but this is not guaranteed.

## Security

Be careful with user input in your hast tree.
Use [`hast-util-santize`][hast-util-sanitize] to make hast trees safe.

## Related

*   [`hastscript`](https://github.com/syntax-tree/hastscript)
    — build hast trees
*   [`hast-util-to-html`](https://github.com/syntax-tree/hast-util-to-html)
    — serialize hast as HTML
*   [`hast-util-sanitize`](https://github.com/syntax-tree/hast-util-sanitize)
    — sanitize hast

## Contribute

See [`contributing.md`][contributing] in [`syntax-tree/.github`][health] for
ways to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/syntax-tree/hast-util-to-jsx-runtime/workflows/main/badge.svg

[build]: https://github.com/syntax-tree/hast-util-to-jsx-runtime/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/syntax-tree/hast-util-to-jsx-runtime.svg

[coverage]: https://codecov.io/github/syntax-tree/hast-util-to-jsx-runtime

[downloads-badge]: https://img.shields.io/npm/dm/hast-util-to-jsx-runtime.svg

[downloads]: https://www.npmjs.com/package/hast-util-to-jsx-runtime

[size-badge]: https://img.shields.io/bundlephobia/minzip/hast-util-to-jsx-runtime.svg

[size]: https://bundlephobia.com/result?p=hast-util-to-jsx-runtime

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/syntax-tree/unist/discussions

[npm]: https://docs.npmjs.com/cli/install

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[typescript]: https://www.typescriptlang.org

[license]: license

[author]: https://wooorm.com

[health]: https://github.com/syntax-tree/.github

[contributing]: https://github.com/syntax-tree/.github/blob/main/contributing.md

[support]: https://github.com/syntax-tree/.github/blob/main/support.md

[coc]: https://github.com/syntax-tree/.github/blob/main/code-of-conduct.md

[hast]: https://github.com/syntax-tree/hast

[node]: https://github.com/syntax-tree/hast#nodes

[hast-util-sanitize]: https://github.com/syntax-tree/hast-util-sanitize

[jsx-runtime]: https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html

[api-to-jsx-runtime]: #tojsxruntimetree-options

[api-components]: #components

[api-element-attribute-name-case]: #elementattributenamecase

[api-fragment]: #fragment

[api-jsx]: #jsx

[api-jsx-dev]: #jsxdev

[api-options]: #options

[api-props]: #props

[api-source]: #source

[api-space]: #space

[api-style-property-name-case]: #stylepropertynamecase
