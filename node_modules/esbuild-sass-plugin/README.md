![cooltext394785080075403](https://user-images.githubusercontent.com/160981/136289874-26ce7269-ea08-47dd-be31-9bf0ef7a0b8d.png)
![image](https://user-images.githubusercontent.com/160981/150880682-4915c4dd-726b-4fea-8f3b-597d191f05bc.png)

[![Build Status][travis-image]][travis-url]

A plugin for [esbuild](https://esbuild.github.io/) to handle Sass & SCSS files.

### Features
* **PostCSS** & **CSS modules**
* support for **constructable stylesheet** to be used in custom elements or `dynamic style` to be added to the html page
* uses the **new [Dart Sass](https://www.npmjs.com/package/sass) Js API**.
* caching
* **url rewriting**
* pre-compiling (to add **global resources** to the sass files)

### Breaking Changes
* `type` has been simplified and now accepts only a string. If you need different types in a project [you can use more
  than one instance](https://github.com/glromeo/esbuild-sass-plugin/issues/60) of the plugin. 
  You can have a look at the [**multiple** fixture](https://github.com/glromeo/esbuild-sass-plugin/blob/main/test/fixture/multiple) 
  for an example where **lit CSS** and **CSS modules** are both used in the same app
* The support for [node-sass](https://github.com/sass/node-sass) has been removed and for good.
  Sadly, node-sass is at a dead end and so it's 1.x.
* `transform` now is expected to send back the CSS text in contents and anything that has to be default exported in `pluginData`.

### Install

```console
$ npm i esbuild-sass-plugin
```

### Usage

Just add it to your esbuild plugins:

```javascript
import {sassPlugin} from 'esbuild-sass-plugin'

await esbuild.build({
  ...
  plugins: [sassPlugin()]
})
```

### Options

You can pass a series of **options** to the plugin that are a superset of Sass
[compile string options](https://sass-lang.com/documentation/js-api/interfaces/StringOptionsWithImporter). \
The following are the options specific to the plugin with their defaults whether provided:

| Option        | Type                                                    | Default                                 |
|---------------|---------------------------------------------------------|-----------------------------------------|
| filter        | regular expression (in Go syntax)                       | <code>/\.(s[ac]ss&vert;css)$/</code>    |
| type          | `"css"`<br/>`"style"`<br/>`"lit-css"`<br/>`"css-text"`  | `"css"`                                 |
| cache         | boolean or Map                                          | `true` (there is one Map per namespace) |
| transform     | function                                                |                                |
| [loadPaths](https://sass-lang.com/documentation/js-api/interfaces/Options#loadPaths) | string[] | []                                   |
| precompile    | function                              |                                |
| importMapper  | function                              |                                |
| cssImports    | boolean                               | false                                   |
| nonce         | string                                |                                |
| prefer        | string                                | preferred package.json field            |
| quietDeps     | boolean                               | false            |

Two main options control the plugin: `filter` which has the same meaning of filter in [esbuild](https://esbuild.github.io/plugins/#on-load) 
allowing to select the URLs handled by a plugin instance and then `type` that's what specifies how the css should be rendered and imported. 

### `filter`
The default filter is quite simple but also quite permissive. When specifying a custom regex bear in mind that this
is in [Go syntax](https://pkg.go.dev/regexp/syntax)

> If you have URLs in your imports and you want the plugin to ignore them you can't just a filter expression like:
`/^(?!https?:).*\.(s[ac]ss|css)$/` because *Go regex engine doesn't support lookarounds* but you can use 
> **esbuild**'s `external` option to ignore these imports or try a [solution like this one](https://esbuild.github.io/plugins/#on-resolve).

You can try to list multiple plugin instances in order so that the most specific RegEx come first: 
```javascript
await esbuild.build({
  ...
  plugins: [
    sassPlugin({
      filter: /\.module\.scss$/,
      transform: postcssModules()
    }),
    sassPlugin({
      filter: /\.scss$/
    }),
  ],
  ...   
})
```

### `type`

The example in [Usage](#usage) uses the default type `css` and will use esbuild CSS loader so your transpiled Sass 
will be in `index.css` alongside your bundle.

In all other cases `esbuild` won't process the CSS content which instead will be handled by the plugin.
> if you want `url()` resolution or other processing you have to use `postcss` like in [this example](https://github.com/glromeo/esbuild-sass-plugin/issues/92#issuecomment-1219209442) 

**NOTE:** Since version `2.7.0` the `css` type works also with postcss, CSS modules and more in general 
with any transformation function by keeping an internal cache of CSS chunks (virtual CSS files) 
importing them in the module wrapping the contents

#### `type: "style"`
In this mode the stylesheet will be in the javascript bundle 
and will be dynamically added to the page when the bundle is loaded.

#### `type: "css-text"`
You can use this mode if you want to use the resulting css text as a string import

```javascript
await esbuild.build({
  ...
  plugins: [sassPlugin({
    type: "css-text",
    ...   // for the options availanle look at 'SassPluginOptions' in index.ts
  })]
})
```

...and in your module do something like

```javascript
import cssText from './styles.scss'

customElements.define('hello-world', class HelloWorld extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({mode: 'open'});
    this.sheet = new CSSStyleSheet();
    this.sheet.replaceSync(cssText);
    this.shadowRoot.adoptedStyleSheets = [this.sheet];
  }
}
```

#### `type: "lit-css"`
Or you can import a **lit-element** css result using `type: "lit-css"`

```javascript
import styles from './styles.scss'

@customElement("hello-world")
export default class HelloWorld extends LitElement {

  static styles = styles

  render() {
    ...
  }
}
```

Look in `test/fixtures` folder for more usage examples.

### `cache`
The cache is enabled by default and can be turned off with `cache: false`. 
Each plugin instance creates and maintain its own cache (as a Map) and this cache lives for the duration of the build. 
If you want to pass a Map to preserve the cache amongst subsequent builds bear in mind that sharing the very same cache 
between different instances might work just fine or it might lead to issues if the contents are incompatible. 
> If you are not sure of what to do just keep a separate Map for each plugin instance.

### `cssImports`
when this is set to `true` the plugin rewrites the node-modules relative URLs startig with the `~` prefix so that
esbuild can resolve them similarly to what `css-loader` does. 
> Although this practice is [kind of deprecated nowadays](https://webpack.js.org/loaders/sass-loader/#resolving-import-at-rules) 
> some packages out there still use this notation (e.g. `formio`)
> \
> so I added this feature to help in cases [like this one](https://github.com/glromeo/esbuild-sass-plugin/issues/74).

### `nonce`
in presence of Content-Security-Policy 
[(CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/style-src) 
the `nonce` option allows to specify the nonce attribute for the dynamically generated `<style>`

If the `nonce` string is a field access starting with `window`, `process` or `globalThis` it is left in the code without quotes.
```javascript
sassPlugin({
  type: 'style',
  nonce: 'window.__esbuild_nonce__'
})
```
This allows to define it globally or to leave it for a subsequent build to resolve it using [esbuild define](https://esbuild.github.io/api/#define).
```javascript
define: {'window.__esbuild_nonce__': '"12345"'}
```

### `prefer`
when this option is specified it allows to import npm packages which have `sass` or `style` fields preferring those to `main`.

> **NOTE**: This is an experimental feature
> * it replaces the internal use of `require.resolve` with browserify `resolve.sync`
> * it only applies to import prefixed by `~` 

### `importMapper`

A function to customize/re-map the import path, both `import` statements in JavaScript/TypeScript code and `@import`
in Sass/SCSS are covered.   
You can use this option to re-map import paths like tsconfig's `paths` option.

e.g. given this `tsconfig.json` which maps image files paths

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@img/*": [
        "./assets/images/*"
      ]
    }
  }
}
```

now you can resolve these paths with `importMapper`

```javascript
await esbuild.build({
  ...,
  plugins: [sassPlugin({
    importMapper: (path) => path.replace(/^@img\//, './assets/images/')
  })]
})
```

### `precompile`

#### - Rewriting relative `url(...)`s
If your sass reference resources with relative urls (see [#48](https://github.com/glromeo/esbuild-sass-plugin/issues/48))
esbuild will struggle to rewrite those urls because it doesn't have idea of the imports that the Sass compiler 
has gone through. Fortunately the new importer API allows to rewrite those relative URLs in absolute ones which 
then esbuild will be able to handle.

Here is an example of how to do the `url(...)` rewrite ([make sure to handle `\` in *Windows*](https://github.com/glromeo/esbuild-sass-plugin/issues/58))
```javascript
const path = require('path')

await esbuild.build({
  ...,
  plugins: [sassPlugin({
    precompile(source, pathname) {
      const basedir = path.dirname(pathname)
      return source.replace(/(url\(['"]?)(\.\.?\/)([^'")]+['"]?\))/g, `$1${basedir}/$2$3`)
    }
  })]
})
```

#### - Globals and other Shims (like sass-loader's additionalData)
Look for a complete example in the [precompile](https://github.com/glromeo/esbuild-sass-plugin/tree/main/test/fixture/precompile) fixture.

Prepending a variable for a specific `pathname`:
```javascript
const context = { color: "blue" }

await esbuild.build({
  ...,
  plugins: [sassPlugin({
    precompile(source, pathname) {
      const prefix = /\/included\.scss$/.test(pathname) ? `
            $color: ${context.color};
          ` : env
      return prefix + source
    }
  })]
})
```

Prepending an `@import` of globals file only for the root file that triggered the compilation (to avoid nested files from importing it again):
```javascript
const context = { color: "blue" }

await esbuild.build({
  ...,
  plugins: [sassPlugin({
    precompile(source, pathname, isRoot) {
      return isRoot ? `@import '/path/to/globals.scss';\n${source}` : source
    }
  })]
})
```

### `transform`

```typescript
async (this: SassPluginOptions, css: string, resolveDir?: string) => Promise<string>
``` 

It's a function which will be invoked before passing the css to esbuild or wrapping it in a module.\
It can be used to do **PostCSS** processing and/or to create **modules** like in the following examples.

> **NOTE:** Since `v1.5.0` transform can return either a string or an esbuild `LoadResult` object. \
> This is what `postcssModules` uses to pass Javascript modules to esbuild bypassing the plugin output altogether.

#### - PostCSS

The simplest use case is to invoke PostCSS like this:

```javascript
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')
const postcssPresetEnv = require('postcss-preset-env')

esbuild.build({
  ...,
  plugins: [sassPlugin({
    async transform(source, resolveDir) {
      const {css} = await postcss([autoprefixer, postcssPresetEnv({stage: 0})]).process(source)
      return css
    }
  })]
})

```

#### - CSS Modules

A helper function is available to do all the work of calling PostCSS to create a CSS module. The usage is something
like:

```javascript
const {sassPlugin, postcssModules} = require('esbuild-sass-plugin')

esbuild.build({
  ...,
  plugins: [sassPlugin({
    transform: postcssModules({
      // ...put here the options for postcss-modules: https://github.com/madyankin/postcss-modules
    })
  })]
})

```
`postcssModules` produces Javascript modules which are handled by esbuild's `js` loader

`postcssModules` also accepts an optional array of plugins for PostCSS as second parameter.

Look into [fixture/css-modules](https://github.com/glromeo/esbuild-sass-plugin/tree/main/test/fixture/css-modules) for
the complete example.

> **NOTE:** `postcss` and `postcss-modules` have to be added to your `package.json`.

### quietDeps

In order for `quietDeps` to correctly identify external dependencies the `url` option is defaulted to the importing file path URL.

> The `url` option creates problems when importing source SASS files from 3rd party modules in which case the best workaround is to avoid `quietDeps` and [mute the logger](https://sass-lang.com/documentation/js-api/interfaces/StringOptionsWithImporter#logger) if that's a big issue.

### pnpm

There's a working example of using `pnpm` with `@material` design
in [issue/38](https://github.com/glromeo/esbuild-sass-plugin/tree/main/test/issues/38)

### Benchmarks
**Windows 10** Pro - **i7-4770K** CPU @ **3.50**GHz - RAM **24**GB - SSD **500**GB

Given 24 × 24 = 576 lit-element files & 576 imported CSS styles plus the import of the full bootstrap 5.1

|                        | dart sass | dart sass (no cache)  | node-sass*  | node-sass (no cache) |
|------------------------|-----------|-----------------------|-------------|----------------------|
| **initial build**      | 2.750s    | 2.750s                | 1.903s      | 1.858s               |
| rebuild (.ts change)   | 285.959ms | 1.950s                | 797.098ms   | 1.689s               |
| rebuild (.ts change)   | 260.791ms | 1.799s                | 768.213ms   | 1.790s               |
| rebuild (.scss change) | 234.152ms | 1.801s                | 770.619ms   | 1.652s               |
| rebuild (.scss change) | 267.857ms | 1.738s                | 750.743ms   | 1.682s               |

(*) node-sass is here just to give a term of comparison ...those samples were taken from 1.8.x

[travis-url]: https://app.travis-ci.com/glromeo/esbuild-sass-plugin
[travis-image]: https://app.travis-ci.com/glromeo/esbuild-sass-plugin.svg?branch=main
