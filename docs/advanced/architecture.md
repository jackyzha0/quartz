---
title: Architecture
---

Quartz is a static site generator. How does it work?

This question is best answered by tracing what happens when a user (you!) runs `npx quartz build` in the command line:

## On the server

1. After running `npx quartz build`, npm will look at `package.json` to find the `bin` entry for `quartz` which points at `./quartz/bootstrap-cli.mjs`.
2. This file has a [shebang](<https://en.wikipedia.org/wiki/Shebang_(Unix)>) line at the top which tells npm to execute it using Node.
3. `bootstrap-cli.mjs` is responsible for a few things:
   1. Parsing the command-line arguments using [yargs](http://yargs.js.org/). The `plugin` subcommand is also handled here for managing external plugins.
   2. Transpiling and bundling the rest of Quartz (which is in Typescript) to regular JavaScript using [esbuild](https://esbuild.github.io/). The `esbuild` configuration here is slightly special as it also handles `.scss` file imports using [esbuild-sass-plugin v2](https://www.npmjs.com/package/esbuild-sass-plugin). Additionally, we bundle 'inline' client-side scripts (any `.inline.ts` file) that components declare using a custom `esbuild` plugin that runs another instance of `esbuild` which bundles for the browser instead of `node`. Modules of both types are imported as plain text.
   3. Running the local preview server if `--serve` is set. This starts two servers:
      1. A WebSocket server on port 3001 to handle hot-reload signals. This tracks all inbound connections and sends a 'rebuild' message a server-side change is detected (either content or configuration).
      2. An HTTP file-server on a user defined port (normally 8080) to serve the actual website files.
   4. If the `--serve` flag is set, it also starts a file watcher to detect source-code changes (e.g. anything that is `.ts`, `.tsx`, `.scss`, or packager files). On a change, we rebuild the module (step 2 above) using esbuild's [rebuild API](https://esbuild.github.io/api/#rebuild) which drastically reduces the build times.
   5. After transpiling the main Quartz build module (`quartz/build.ts`), we write it to a cache file `.quartz-cache/transpiled-build.mjs` and then dynamically import this using `await import(cacheFile)`. However, we need to be pretty smart about how to bust Node's [import cache](https://github.com/nodejs/modules/issues/307) so we add a random query string to fake Node into thinking it's a new module. This does, however, cause memory leaks so we just hope that the user doesn't hot-reload their configuration too many times in a single session :)) (it leaks about ~350kB memory on each reload). After importing the module, we then invoke it, passing in the command line arguments we parsed earlier along with a callback function to signal the client to refresh.
4. In `build.ts`, we start by installing source map support manually to account for the query string cache busting hack we introduced earlier. Then, we start processing content:
   1. Clean the output directory.
   2. Recursively glob all files in the `content` folder, respecting the `.gitignore`.
   3. Collect every page's slug (`ctx.allSlugs`), taking frontmatter `permalink`s into account, so links can be resolved while parsing.
   4. Parse the Markdown files.
      1. Quartz detects the number of threads available and chooses to spawn worker threads if there are >128 pieces of content to parse (rough heuristic). If it needs to spawn workers, it will invoke esbuild again to transpile the worker script `quartz/worker.ts`. Then, a work-stealing [workerpool](https://www.npmjs.com/package/workerpool) is then created and batches of 128 files are assigned to workers.
      2. Each worker (or just the main thread if there is no concurrency) creates a [unified](https://github.com/unifiedjs/unified) parser based off of the plugins defined in the [[configuration]].
      3. Parsing has these steps:
         1. Read the file into a [vfile](https://github.com/vfile/vfile).
         2. Applied plugin-defined text transformations over the content.
         3. Slugify the file path (or use its `permalink`) and store it in the data for the file. See the page on [[paths]] for more details about how path logic works in Quartz (spoiler: its complicated).
         4. Markdown parsing using [remark-parse](https://www.npmjs.com/package/remark-parse) (text to [mdast](https://github.com/syntax-tree/mdast)).
         5. Apply the transformers' Markdown-to-Markdown transformations, in plugin order. The [[built-in processing|built-in]] frontmatter parsing runs among them at order 0 and sets `file.data.frontmatter`.
         6. Convert Markdown into HTML using [remark-rehype](https://github.com/remarkjs/remark-rehype) ([mdast](https://github.com/syntax-tree/mdast) to [hast](https://github.com/syntax-tree/hast)).
         7. Apply the transformers' HTML-to-HTML transformations, in plugin order. The built-in link processing runs among them at order 60: it rewrites internal links and records `file.data.links`.
   5. Filter out unwanted content using filter plugins and the built-in drafts filter.
   6. Emit files using emitters, in three phases (`quartz/processors/emit.ts`):
      1. Gather all the static resources (e.g. external CSS, JS modules, etc.) that transformers and emitters declare. The `ComponentResources` emitter runs first and writes the site's CSS and scripts:
         1. CSS is minified and transformed using [Lightning CSS](https://github.com/parcel-bundler/lightningcss) to add vendor prefixes and do syntax lowering. Quartz's and the components' styles are put in the `quartz-base` cascade layer.
         2. Scripts are split into `beforeDOMLoaded` and `afterDOMLoaded` and are inserted in the `<head>` and `<body>` respectively.
      2. The `PageTypeDispatcher` emitter renders the HTML pages (`quartz/plugins/pageTypes/dispatcher.ts`):
         1. Each page type's `generate` runs, one after another in priority order, and returns virtual pages (folder and tag pages, `.base` and `.canvas` pages, …). They are collected in `ctx.virtualPages`. Pages that stand for a file (page types with `fileExtensions`) first go through the site's filters, with `file.data.referencedBy` set to the pages that link to them.
         2. The bodies of the virtual pages are rendered (so they can be embedded), and the transformers' `virtualPageHtmlPlugins` run on those of file-backed pages.
         3. Every content page is rendered by the first page type (highest priority) whose `match` accepts it, and every virtual page by the page type that generated it. Rendering transforms the [hast](https://github.com/syntax-tree/hast) produced in the parse step to JSX using [hast-util-to-jsx-runtime](https://github.com/syntax-tree/hast-util-to-jsx-runtime) with the [Preact](https://preactjs.com/) runtime, applies the page types' `treeTransforms`, assembles the page [[layout]] and [[layout#Page Frames|frame]], and renders the JSX to HTML using [preact-render-to-string](https://github.com/preactjs/preact-render-to-string) (statically: `useState`, `useEffect` and other interactive bits don't run). The bulk of this logic can be found in `quartz/components/renderPage.tsx`.
      3. The content index is built once from the published and virtual pages (`ctx.contentIndex`), then all other emitters run in parallel over the same content (virtual pages included). The built-in content index emitter writes `static/contentIndex.json`, the sitemap and the RSS feed; plugin emitters write their own files.
   7. If the `--serve` flag was detected, we also set up another file watcher to detect content changes (only `.md` files). We keep a content map that tracks the parsed AST and plugin data for each slug and update this on file changes. Newly added or modified paths are rebuilt and added to the content map. Then, all the filters and emitters are run over the resulting content map. This file watcher is debounced with a threshold of 250ms. On success, we send a client refresh signal using the passed in callback function.

## On the client

1. The browser opens a Quartz page and loads the HTML. The `<head>` also links to page styles (emitted to `public/index-<hash>.css`, plus a file per component stylesheet) and page-critical JS (emitted to `public/prescript-<hash>.js`). With `--serve`, the names have no hash.
2. Then, once the body is loaded, the browser loads the non-critical JS (`public/postscript-<hash>.js`). In a production build it imports each component's `afterDOMLoaded` script (`static/scripts/`) in parallel, then the SPA router; with `--serve` it holds all of them.
3. Once the page is done loading, the page will then dispatch a custom synthetic browser event `"nav"`. This is used so client-side scripts declared by components can 'setup' anything that requires access to the page DOM.
   1. If the [[SPA Routing|enableSPA option]] is enabled in the [[configuration]], this `"nav"` event is also fired on any client-navigation to allow for components to unregister and reregister any event handlers and state.
   2. If it's not, we wire up the `"nav"` event to just be fired a single time after page load to allow for consistency across how state is setup across both SPA and non-SPA contexts.
   3. A separate `"render"` event can be dispatched when the DOM is updated in-place without a full navigation (e.g. after content decryption). Components that attach listeners to content elements should listen for both `"nav"` and `"render"`.

## Community Package Layering

Quartz v5 separates shared code into three community packages, each with a distinct responsibility:

- **`@quartz-community/types`** — Type definitions, interfaces, and the canonical `vfile` DataMap augmentation. This is the "contract" between Quartz and plugins. It has no runtime dependencies.
- **`@quartz-community/utils`** — Shared utility functions (path manipulation, DOM helpers, sorting, date formatting, JSX conversion, etc.). Depends on `@quartz-community/types`.
- **`@quartz-community/runtime`** — Browser-only utilities for client-side scripts (event handling, navigation, storage, script loading). Depends on both `types` and `utils`.

```
types (no deps)
  ↑
utils (depends on types)
  ↑
runtime (depends on types + utils)
  ↑
plugins (depend on any combination)
```

Plugins should import types from `@quartz-community/types`, utility functions from `@quartz-community/utils`, and browser utilities from `@quartz-community/runtime`. This layering ensures plugins don't depend on Quartz core.

## Plugin System

Quartz v5 introduces a community plugin system. Plugins are standalone packages: the default plugins are npm packages (dependencies of Quartz, installed in `node_modules`), other plugins can also be Git repositories or local folders, which are installed into `.quartz/plugins/`. Their named exports are re-exported through an auto-generated index file at `.quartz/plugins/index.ts`, which you import in a `quartz.ts` override as `ExternalPlugin`.

### Plugin Types

There are four processing plugin categories, plus Bases views:

- **Transformers**: Map over content (generate descriptions, syntax highlighting, Obsidian syntax)
- **Filters**: Filter content (explicit publish, unlisted pages)
- **Emitters**: Reduce over content (generate RSS, sitemaps, alias redirects, OG images)
- **Page Types**: Define how pages are rendered. Each page type handles a specific kind of page (content notes, folder listings, tag listings, 404). Page types are ordinary entries in the `plugins` list of `quartz.config.yaml` whose manifest has the category `pageType`. The `PageTypeDispatcher` emitter routes pages to the appropriate page type plugin based on the content.
- **Bases Views**: Custom view renderers for the `bases-page` plugin's database-like view system. Plugins can register new view types (e.g., timeline, kanban) via the `ViewRegistry`. See [[making plugins#Bases Views]] for details.

Frontmatter parsing, link processing, drafts and the content index are not plugins but [[built-in processing]].

Plugins can also provide components and frames. These roles are **not mutually exclusive** — a single plugin can be a transformer AND provide components (e.g., `table-of-contents`), or be a page type AND provide custom frames (e.g., `canvas-page`).

### Plugin Resolution

When a Git plugin is installed, e.g. with `npx quartz plugin add github:your-name/my-plugin`:

1. The repository is cloned into `.quartz/plugins/my-plugin/`
2. If it ships a pre-built `dist/` (not gitignored), that is used as is and only its peer dependencies are linked to the site's `node_modules`. Otherwise its dependencies are installed and it is built using `tsup` (defined in the plugin's `tsup.config.ts`)
3. An auto-generated `.quartz/plugins/index.ts` re-exports all installed plugins
4. The plugin's commit hash is recorded in `quartz.lock.json`

npm plugins (such as the default `@quartz-community/explorer`) are imported from `node_modules` and are not cloned or built.

### Plugin CLI Commands

- `npx quartz plugin add github:quartz-community/<name>` — Install a community plugin
- `npx quartz plugin install --latest` — Update all plugins to latest commits
- `npx quartz plugin install` — Install plugins at the commits locked in `quartz.lock.json` (used in CI/CD); `--clean` only restores plugins whose directory is missing
- `npx quartz plugin remove <name>` — Remove an installed plugin

### Plugin Structure

Each community plugin repository contains:

- `src/index.ts` — Plugin entry point exporting the plugin function
- `tsup.config.ts` — Build configuration using tsup
- `package.json` — Declares dependencies on `@quartz-community/types` and `@quartz-community/utils`, and the [[plugin manifest]] in its `quartz` field

The architecture and design of the plugin system was intentionally left pretty vague here as this is described in much more depth in the guide on [[making plugins|creating plugins]].

## Page Frames

Page frames control the inner HTML structure of each page. While the outer shell (`<html>`, `<head>`, `<body>`, `#quartz-root`) is always the same (required for [[SPA Routing]]), the frame determines how layout slots are arranged inside the page.

The frame system lives in `quartz/components/frames/` and consists of:

- `types.ts` — Defines the `PageFrame` and `PageFrameProps` interfaces
- `DefaultFrame.tsx` — Three-column layout (left sidebar, center, right sidebar, footer)
- `FullWidthFrame.tsx` — No sidebars, single center column
- `MinimalFrame.tsx` — No sidebars, no header/beforeBody, just content and footer
- `registry.ts` — `FrameRegistry` singleton for plugin-registered frames
- `index.ts` — `resolveFrame()` function and built-in frame registry

### Frame Registry

The `FrameRegistry` (`quartz/components/frames/registry.ts`) is a singleton that stores frames registered by community plugins. It mirrors the design of the `ComponentRegistry`. Plugins declare frames in their `package.json` manifest under the `"quartz"."frames"` field, and these are loaded by `quartz/plugins/loader/frameLoader.ts` during plugin initialization.

### Frame Resolution

The rendering pipeline in `quartz/components/renderPage.tsx` delegates to the resolved frame's `render()` function. Frame resolution happens in the `PageTypeDispatcher` emitter (`quartz/plugins/pageTypes/dispatcher.ts`) using this priority:

1. YAML config: `layout.byPageType.<name>.template`
2. Plugin-registered frame: looked up by name in the `FrameRegistry`
3. Built-in frame: looked up by name in the `builtinFrames` map
4. Fallback: `"default"`

The active frame name is set as a `data-frame` attribute on the `.page` element, enabling frame-specific CSS overrides in `quartz/styles/base.scss`.

### Plugin-Provided Frames

Community plugins can ship their own frames by exporting them from a `./frames` subpath and declaring them in the plugin manifest. For example, the `canvas-page` plugin provides a `"canvas"` frame with a fullscreen layout and togglable sidebar. See [[making plugins#Providing Custom Frames]] for implementation details.

See [[layout#Page Frames]] for user-facing documentation and [[making plugins#Page Types]] for how to set frames in page type plugins.
