---
title: Creating Component Plugins
---

> [!warning]
> This guide assumes you have experience writing JavaScript and are familiar with TypeScript.

Normally on the web, we write layout code using HTML which looks something like the following:

```html
<article>
  <h1>An article header</h1>
  <p>Some content</p>
</article>
```

This piece of HTML represents an article with a leading header that says "An article header" and a paragraph that contains the text "Some content". This is combined with CSS to style the page and JavaScript to add interactivity.

However, HTML doesn't let you create reusable templates. If you wanted to create a new page, you would need to copy and paste the above snippet and edit the header and content yourself. This isn't great if we have a lot of content on our site that shares a lot of similar layout. The smart people who created React also had similar complaints and invented the concept of Components -- JavaScript functions that return JSX -- to solve the code duplication problem.

In effect, components allow you to write a JavaScript function that takes some data and produces HTML as an output. **While Quartz doesn't use React, it uses the same component concept to allow you to easily express layout templates in your Quartz site.**

## Community Component Plugins

In v5, most components are community plugins — standalone repositories that export a `QuartzComponent`. These plugins are decoupled from the core Quartz repository, allowing for easier maintenance and sharing.

### Getting Started

To create a new component plugin, you can use the official plugin template:

```shell
git clone https://github.com/quartz-community/plugin-template.git my-component
cd my-component
npm install
```

### Plugin Structure

A component is a constructor: a function that takes the user's options and returns a `QuartzComponent`. Put it in `src/components/`:

```tsx title="src/components/MyComponent.tsx"
import type { QuartzComponent, QuartzComponentConstructor } from "@quartz-community/types"

export interface MyComponentOptions {
  favouriteNumber: number
}

const defaultOptions: MyComponentOptions = {
  favouriteNumber: 42,
}

export default ((userOpts?: Partial<MyComponentOptions>) => {
  const opts = { ...defaultOptions, ...userOpts }

  const Component: QuartzComponent = () => {
    if (opts.favouriteNumber < 0) return null
    return <p class="my-component">My favourite number is {opts.favouriteNumber}</p>
  }

  return Component
}) satisfies QuartzComponentConstructor<Partial<MyComponentOptions>>
```

Quartz loads components from the package's **`./components`** export, by the names listed in the manifest — not from the entry module, and not from a `default` export:

```ts title="src/components/index.ts"
export { default as MyComponent } from "./MyComponent"
export type { MyComponentOptions } from "./MyComponent"
```

```json title="package.json"
{
  "exports": {
    ".": { "types": "./dist/index.d.ts", "import": "./dist/index.js" },
    "./components": {
      "types": "./dist/components/index.d.ts",
      "import": "./dist/components/index.js"
    }
  },
  "quartz": {
    "category": "component",
    "components": {
      "MyComponent": {
        "displayName": "My Component",
        "defaultPosition": "right",
        "defaultPriority": 50
      }
    }
  }
}
```

The key in `quartz.components` must match the export name in `src/components/index.ts`; `defaultPosition` and `defaultPriority` place the component when the user's config doesn't (see [[plugin manifest#components]]). The plugin template's `tsup.config.ts` already builds the `components/index` entry.

Also re-export the constructor by name from the entry module, so users can call it in `quartz.ts` overrides (`ExternalPlugin.MyComponent(…)`, see [[#Installing Your Component]]). The generated `.quartz/plugins/index.ts` re-exports your entry module's named exports; `default` exports are left out.

```ts title="src/index.ts"
export { MyComponent } from "./components"
export type { MyComponentOptions } from "./components"
```

### Props

All Quartz components accept the same set of props:

```tsx
export type QuartzComponentProps = {
  ctx: unknown
  externalResources: StaticResources
  fileData: QuartzPluginData & Record<string, unknown>
  cfg: GlobalConfiguration
  children: unknown
  tree: unknown
  allFiles: (QuartzPluginData & Record<string, unknown>)[]
  displayClass?: "mobile-only" | "desktop-only"
  [key: string]: unknown
}
```

- `ctx`: the [[making plugins|`BuildCtx`]] of the build (typed `unknown`; cast it to `BuildCtx` to read it).
- `externalResources`: the page's CSS, scripts and head elements.
- `fileData`: Any metadata plugins may have added to the current page.
  - `fileData.slug`: slug of the current page.
  - `fileData.frontmatter`: any frontmatter parsed.
- `cfg`: The `configuration` field in `quartz.config.yaml`.
- `children`: child components, for components that wrap others (e.g. `Flex`).
- `tree`: the resulting [HTML AST](https://github.com/syntax-tree/hast) (a hast `Root`) after processing and transforming the file.
- `allFiles`: Metadata for all published pages, virtual pages included. Useful for doing page listings or figuring out the overall site structure.
- `displayClass`: a utility class that indicates a preference from the user about how to render it in a mobile or desktop setting.

### Styling

In community plugins, styles are bundled with the plugin. You can define styles using the `.css` property on the component:

```tsx
Component.css = `
  .my-component { color: red; }
`
```

For SCSS, you can import it and assign it to the `.css` property. The build system will handle the transformation:

```tsx
import styles from "./styles.scss"
Component.css = styles
```

> [!warning]
> Quartz does not use CSS modules so any styles you declare here apply _globally_. If you only want it to apply to your component, make sure you use specific class names and selectors.

Quartz puts component CSS in the `quartz-base` [cascade layer](https://developer.mozilla.org/en-US/docs/Web/CSS/@layer), like its own base styles, so a site's `custom.scss` (unlayered) overrides it without needing more specific selectors.

#### Source attributes

When Quartz renders a component provided by a plugin, it adds two attributes to the component's root element:

```html
<div class="graph" data-quartz-plugin="graph" data-quartz-component="Graph">…</div>
```

They let site owners and theme authors find out which plugin produced a part of the page (use your browser's inspector) and give a stable hook for styling, e.g. `[data-quartz-plugin="graph"] { … }`. The attributes are only added when your component returns a single HTML element; components returning `null`, text, a fragment or another component are rendered unchanged. Existing attributes are never modified.

### Internationalization

Component plugins should use the i18n pattern for any user-facing strings. See [[making plugins#Internationalization (i18n)]] for the full setup guide.

Quick reference:

```tsx
import { i18n } from "../i18n"

const MyComponent: QuartzComponent = ({ cfg }) => {
  const t = i18n(cfg.locale ?? "en-US").components.myComponent
  return <h2>{t.title}</h2>
}
```

Always provide at least an `en-US` locale as the fallback. Additional locales are optional but encouraged for international reach.

### Scripts and Interactivity

For interactivity, you can declare `.beforeDOMLoaded` and `.afterDOMLoaded` properties on the component. These should be strings containing the JavaScript to be executed in the browser.

- `.beforeDOMLoaded`: Executed _before_ the page is done loading (from `<head>`), for early initialization such as applying a saved theme before the page is painted.
- `.afterDOMLoaded`: Executed once the page has been completely loaded.

Each script runs once per full page load, not on every SPA navigation. Don't rely on scripts sharing a scope or running in a particular order:

- In a production build, each `afterDOMLoaded` script is a separate ES module, and all of them are imported in parallel; only the SPA router (which dispatches the first `nav`) is imported after them.
- In `quartz build --serve`, all `afterDOMLoaded` scripts are bundled into one file, each wrapped in its own function.

Share state between components through `window` or DOM attributes, and do page setup in a `nav` listener rather than at the top level.

If you need to create an `afterDOMLoaded` script that depends on page-specific elements that may change when navigating, listen for the `"nav"` event:

```ts
document.addEventListener("nav", () => {
  // do page specific logic here
  const toggleSwitch = document.querySelector("#switch") as HTMLInputElement
  if (toggleSwitch) {
    toggleSwitch.addEventListener("change", switchTheme)
    window.addCleanup(() => toggleSwitch.removeEventListener("change", switchTheme))
  }
})
```

You can also use the `"prenav"` event, which fires before the page is replaced during SPA navigation.

The `"render"` event fires when the DOM has been updated in-place without a full navigation — for example, after content decryption or dynamic DOM modifications by other plugins. If your component attaches event listeners to content elements, listen for `"render"` in addition to `"nav"` to ensure re-initialization:

```ts
function setupMyComponent() {
  const elements = document.querySelectorAll(".my-interactive")
  for (const el of elements) {
    el.addEventListener("click", handleClick)
    window.addCleanup(() => el.removeEventListener("click", handleClick))
  }
}

document.addEventListener("nav", setupMyComponent)
document.addEventListener("render", setupMyComponent)
```

It is best practice to track any event handlers via `window.addCleanup` to prevent memory leaks during SPA navigation.

Quartz itself never dispatches `"render"`; plugins that change the page do (e.g. encrypted pages after decryption). Since other components re-run their setup on it, make your `render` handler safe to run more than once.

#### Links your script adds

[[prefetching|Prefetching]] and [[popover previews]] look for links on `nav`, and again on `render`. If your script inserts links after `nav` (lists built from `contentIndex.json`, content fetched later), dispatch `render` once they are in the page so they are prefetched and get popovers. Mark links with

- `data-no-prefetch` to keep them from being prefetched,
- `data-router-ignore` to make them full page loads instead of SPA navigations (they aren't prefetched either),
- `data-no-popover="true"` to give them no popover.

When your script needs another page's HTML, get it through the prefetch cache with `window.quartzPrefetch?.load(url)` (set unless prefetching is off; declared in the globals of `@quartz-community/types` 1.3.1+), so a page the reader is about to open is fetched once:

```ts title="related.inline.ts"
import { normalizeRelativeURLs } from "@quartz-community/utils/dom"

async function pageHtml(url: URL): Promise<string | undefined> {
  // with prefetching on, use its cache (or fetch through it, so the page is fetched once)
  if (window.quartzPrefetch) return (await window.quartzPrefetch.load(url))?.text
  const res = await fetch(url)
  return res.ok ? await res.text() : undefined
}

document.addEventListener("nav", async () => {
  const container = document.querySelector<HTMLElement>(".my-related")
  if (!container?.dataset.src) return
  const url = new URL(container.dataset.src, window.location.href)
  const html = await pageHtml(url)
  if (!html) return
  const doc = new DOMParser().parseFromString(html, "text/html")
  normalizeRelativeURLs(doc, url.toString()) // its links are relative to that page
  container.replaceChildren(...doc.querySelectorAll("article a.internal"))
  // the links were added after `nav`: let prefetching and popovers pick them up
  document.dispatchEvent(new CustomEvent("render", { detail: {} }))
})
```

#### Importing Code

In community plugins, TypeScript scripts should be transpiled at build time. The plugin template includes an `inlineScriptPlugin` in `tsup.config.ts` that automatically transpiles `.inline.ts` files imported as text:

```tsx title="src/index.ts"
import script from "./script.inline.ts"

const Component: QuartzComponent = (props) => {
  return <button id="btn">Click me</button>
}
Component.afterDOMLoaded = script
```

The `inlineScriptPlugin` handles transpiling TypeScript to browser-compatible JavaScript during the build step, allowing you to write type-safe client-side code.

### Installing Your Component

Once your component is published (e.g., to GitHub or npm), users can install it using the Quartz CLI:

```shell
npx quartz plugin add github:your-username/my-component
```

Then, they can add it to their `quartz.config.yaml`:

```yaml title="quartz.config.yaml"
plugins:
  - source: github:your-username/my-component
    enabled: true
    options:
      favouriteNumber: 42
    layout:
      position: left
      priority: 60
```

For advanced usage via the TS override in `quartz.ts`:

```ts title="quartz.ts (override)"
import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import * as ExternalPlugin from "./.quartz/plugins"

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout({
  byPageType: {
    content: {
      left: [ExternalPlugin.MyComponent({ favouriteNumber: 42 })],
    },
  },
})
```

### Receiving YAML Options in Component-Only Plugins

Component plugins that also belong to a processing category (transformer, filter, emitter, page type) receive options through their factory function automatically. However, **component-only plugins** — those whose manifest declares only `"category": ["component"]` — are loaded via side-effect import and don't go through the factory path.

To receive YAML options in a component-only plugin, export an `init` function from your entry point:

```ts title="src/index.ts"
export function init(options?: Record<string, unknown>): void {
  // options contains merged defaultOptions + user's YAML options
  const myFlag = (options?.myFlag as boolean) ?? false
  // Use options to configure registrations, global state, etc.
}
```

Quartz's config-loader calls `init()` after importing the module, passing the merged result of your manifest's `defaultOptions` and the user's `options` from `quartz.config.yaml`. The merge follows the same `{ ...defaultOptions, ...userOptions }` pattern used for processing plugins — user values take precedence.

Declare your defaults in `package.json`:

```json title="package.json"
{
  "quartz": {
    "category": ["component"],
    "defaultOptions": {
      "myFlag": false
    }
  }
}
```

If your plugin does not export `init`, it continues to work as a pure side-effect import — this is fully backward compatible.

## Internal Components

Quartz also has internal components that provide layout utilities. These live in `quartz/components/` and are primarily used for structural purposes:

- `Component.Head()` — renders the `<head>` tag
- `Component.Spacer()` — adds flexible space
- `Component.Flex()` — flexible layout container
- `Component.MobileOnly()` — shows component only on mobile
- `Component.DesktopOnly()` — shows component only on desktop
- `Component.ConditionalRender()` — conditionally renders based on page data

See [[layout-components]] for more details on these utilities.

> [!hint]
> Look at existing community plugins like [Explorer](https://github.com/quartz-community/explorer) or [Darkmode](https://github.com/quartz-community/darkmode) for real-world examples.
