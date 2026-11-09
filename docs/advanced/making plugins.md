---
title: Making your own plugins
---

> [!warning]
> This part of the documentation will assume you have working knowledge in TypeScript and will include code snippets that describe the interface of what Quartz plugins should look like.

Quartz's plugins are a series of transformations over content. This is illustrated in the diagram of the processing pipeline below:

![[quartz transform pipeline.png]]

All plugins are defined as a function that takes in a single parameter for options `type OptionType = object | undefined` and return an object that corresponds to the type of plugin it is.

```ts
type OptionType = object | undefined
type QuartzPlugin<Options extends OptionType = undefined> = (opts?: Options) => QuartzPluginInstance
type QuartzPluginInstance =
  | QuartzTransformerPluginInstance
  | QuartzFilterPluginInstance
  | QuartzEmitterPluginInstance
  | QuartzPageTypePluginInstance
```

The following sections will go into detail for what methods can be implemented for each plugin type. Before we do that, let's clarify a few more ambiguous types:

- `BuildCtx` is defined in `@quartz-community/types`. It consists of
  - `argv`: The command line arguments passed to the Quartz [[build]] command
  - `cfg`: The full Quartz [[configuration]]
  - `allSlugs`: a list of all the valid content slugs (see [[paths]] for more information on what a slug is)
- `StaticResources` is defined in `@quartz-community/types`. It consists of
  - `css`: a list of CSS style definitions that should be loaded. A CSS style is described with the `CSSResource` type. It accepts either a source URL or the inline content of the stylesheet.
  - `js`: a list of scripts that should be loaded. A script is described with the `JSResource` type. It allows you to define a load time (either before or after the DOM has been loaded), whether it should be a module, and either the source URL or the inline content of the script.
  - `additionalHead`: a list of JSX elements or functions that return JSX elements to be added to the `<head>` tag of the page. Functions receive the page's data as an argument and can conditionally render elements.

## Getting Started

In v5, plugins are standalone repositories. The easiest way to create one is using the plugin template:

```shell
# Use the plugin template to create a new repository on GitHub
# Then clone it locally
git clone https://github.com/your-username/my-plugin.git
cd my-plugin
npm install
```

The template provides the build configuration (`tsup.config.ts`), TypeScript setup, and correct package structure.

## Plugin Structure

The basic file structure of a plugin is as follows:

```
my-plugin/
├── src/
│   └── index.ts          # Plugin entry point
├── tsup.config.ts         # Build configuration
├── package.json           # Dependencies and exports
└── tsconfig.json          # TypeScript configuration
```

The plugin's `package.json` should declare dependencies on `@quartz-community/types` (for type definitions) and optionally `@quartz-community/utils` (for shared utilities).

If your plugin reads data, DOM elements, globals or files produced by another plugin (or provides them), declare that in `quartz.capabilities` so Quartz can warn when the provider is disabled. See [[plugin capabilities]].

Declare the oldest Quartz version your plugin works with in `quartz.quartzVersion` (a semver range such as `">=5.1.0"`). Quartz checks it when loading the config and in `plugin add` / `plugin doctor`, and mentions it when your plugin throws. See [[versioning#For plugin authors]].

## Plugin Types

## Choosing a Plugin Type

Quartz supports six plugin capabilities. A single plugin can combine multiple types.

| I want to...                                     | Plugin Type |
| ------------------------------------------------ | ----------- |
| Transform Markdown/HTML content                  | Transformer |
| Decide which pages to publish                    | Filter      |
| Generate output files (RSS, sitemaps, manifests) | Emitter     |
| Define how a category of pages renders           | Page Type   |
| Add a UI component to the layout                 | Component   |
| Add a custom view to the Bases database system   | Bases View  |

These are **not mutually exclusive**. For example:

- `obsidian-flavored-markdown` is both a **transformer** (processes OFM syntax) and provides **components** (mermaid rendering)
- `canvas-page` is a **page type** that also provides a custom **frame**
- A plugin could be a **transformer** that adds metadata AND a **component** that displays it

### Transformers

Transformers **map** over content, taking a Markdown file and outputting modified content or adding metadata to the file itself.

```ts
export type QuartzTransformerPluginInstance = {
  name: string
  textTransform?: (ctx: BuildCtx, src: string) => string
  markdownPlugins?: (ctx: BuildCtx) => PluggableList
  htmlPlugins?: (ctx: BuildCtx) => PluggableList
  virtualPageHtmlPlugins?: (ctx: BuildCtx, content: ProcessedContent[]) => PluggableList
  externalResources?: (ctx: BuildCtx) => Partial<StaticResources>
}
```

All transformer plugins must define at least a `name` field to register the plugin and a few optional functions that allow you to hook into various parts of transforming a single Markdown file.

- `textTransform` performs a text-to-text transformation _before_ a file is parsed into the [Markdown AST](https://github.com/syntax-tree/mdast).
- `markdownPlugins` defines a list of [remark plugins](https://github.com/remarkjs/remark/blob/main/doc/plugins.md). `remark` is a tool that transforms Markdown to Markdown in a structured way.
- `htmlPlugins` defines a list of [rehype plugins](https://github.com/rehypejs/rehype/blob/main/doc/plugins.md). Similar to how `remark` works, `rehype` is a tool that transforms HTML to HTML in a structured way.
- `virtualPageHtmlPlugins` (Quartz 5.1+) defines rehype plugins for the pages that page types render from files (`.base`, `.canvas`, Excalidraw drawings). Those pages are rendered when emitting and never pass through `htmlPlugins`, so a plugin that should also act on them (e.g. encryption) registers its rehype plugin here too. They run on the page's rendered body, with the page's vfile (`file.data.frontmatter`, `file.data.referencedBy`), after the filters published the page; the page then shows the resulting tree. `content` is the published content.
- `externalResources` defines any external resources the plugin may need to load on the client-side for it to work properly.

Normally for both `remark` and `rehype`, you can find existing plugins that you can use. If you'd like to create your own `remark` or `rehype` plugin, checkout the [guide to creating a plugin](https://unifiedjs.com/learn/guide/create-a-plugin/) using `unified` (the underlying AST parser and transformer library).

A good example of a transformer plugin that borrows from the `remark` and `rehype` ecosystems is the [[plugins/Latex|Latex]] plugin:

```ts
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import rehypeMathjax from "rehype-mathjax/svg"
import { QuartzTransformerPlugin } from "@quartz-community/types"

interface Options {
  renderEngine: "katex" | "mathjax"
}

export const Latex: QuartzTransformerPlugin<Options> = (opts?: Options) => {
  const engine = opts?.renderEngine ?? "katex"
  return {
    name: "Latex",
    markdownPlugins() {
      return [remarkMath]
    },
    htmlPlugins() {
      if (engine === "katex") {
        // if you need to pass options into a plugin, you
        // can use a tuple of [plugin, options]
        return [[rehypeKatex, { output: "html" }]]
      } else {
        return [rehypeMathjax]
      }
    },
    externalResources() {
      if (engine === "katex") {
        return {
          css: [
            {
              // base css
              content: "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css",
            },
          ],
          js: [
            {
              // fix copy behaviour: https://github.com/KaTeX/KaTeX/blob/main/contrib/copy-tex/README.md
              src: "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/contrib/copy-tex.min.js",
              loadTime: "afterDOMReady",
              contentType: "external",
            },
          ],
        }
      }
    },
  }
}
```

Another common thing that transformer plugins will do is parse a file and add extra data for that file:

```ts
import { QuartzTransformerPlugin } from "@quartz-community/types"

export const AddWordCount: QuartzTransformerPlugin = () => {
  return {
    name: "AddWordCount",
    markdownPlugins() {
      return [
        () => {
          return (tree, file) => {
            // tree is an `mdast` root element
            // file is a `vfile`
            const text = file.value
            const words = text.split(" ").length
            file.data.wordcount = words
          }
        },
      ]
    },
  }
}

// tell typescript about our custom data fields we are adding
// other plugins will then also be aware of this data field
declare module "vfile" {
  interface DataMap {
    wordcount: number
  }
}
```

Finally, you can also perform transformations over Markdown or HTML ASTs using the `visit` function from the `unist-util-visit` package or the `findAndReplace` function from the `mdast-util-find-and-replace` package.

```ts
import { visit } from "unist-util-visit"
import { findAndReplace } from "mdast-util-find-and-replace"
import { QuartzTransformerPlugin } from "@quartz-community/types"
import { Link } from "mdast"

export const TextTransforms: QuartzTransformerPlugin = () => {
  return {
    name: "TextTransforms",
    markdownPlugins() {
      return [
        () => {
          return (tree, file) => {
            // replace _text_ with the italics version
            findAndReplace(tree, /_(.+)_/, (_value: string, ...capture: string[]) => {
              // inner is the text inside of the () of the regex
              const [inner] = capture
              // return an mdast node
              // https://github.com/syntax-tree/mdast
              return {
                type: "emphasis",
                children: [{ type: "text", value: inner }],
              }
            })

            // remove all links (replace with just the link content)
            // match by 'type' field on an mdast node
            // https://github.com/syntax-tree/mdast#link in this example
            visit(tree, "link", (link: Link) => {
              return {
                type: "paragraph",
                children: [{ type: "text", value: link.title }],
              }
            })
          }
        },
      ]
    },
  }
}
```

A parting word: transformer plugins are quite complex so don't worry if you don't get them right away. Take a look at the built in transformers and see how they operate over content to get a better sense for how to accomplish what you are trying to do.

### Filters

Filters **filter** content, taking the output of all the transformers and determining what files to actually keep and what to discard.

```ts
export type QuartzFilterPlugin<Options extends OptionType = undefined> = (
  opts?: Options,
) => QuartzFilterPluginInstance

export type QuartzFilterPluginInstance = {
  name: string
  shouldPublish(ctx: BuildCtx, content: ProcessedContent): boolean
}
```

A filter plugin must define a `name` field and a `shouldPublish` function that takes in a piece of content that has been processed by all the transformers and returns a `true` or `false` depending on whether it should be passed to the emitter plugins or not.

Filters also see the pages that page types render from files (Quartz 5.1+; page types that declare `fileExtensions`, e.g. `.base` and `.canvas` pages), with the frontmatter the page type gives them and `file.data.referencedBy`: the published pages that link to them. A page a filter rejects is not emitted, listed or embeddable. Such files may have no frontmatter (`.base`, `.canvas`): [[ExplicitPublish]] publishes them when a published page links to them.

For example, here is a filter that removes drafts (Quartz has this [[RemoveDrafts|built in]]):

```ts
import { QuartzFilterPlugin } from "@quartz-community/types"

export const RemoveDrafts: QuartzFilterPlugin<{}> = () => ({
  name: "RemoveDrafts",
  shouldPublish(_ctx, [_tree, vfile]) {
    // uses frontmatter parsed from transformers
    const draftFlag: boolean = vfile.data?.frontmatter?.draft ?? false
    return !draftFlag
  },
})
```

### Emitters

Emitters **reduce** over content, taking in a list of all the transformed and filtered content and creating output files.

```ts
export type QuartzEmitterPlugin<Options extends OptionType = undefined> = (
  opts?: Options,
) => QuartzEmitterPluginInstance

export type QuartzEmitterPluginInstance = {
  name: string
  emit(
    ctx: BuildCtx,
    content: ProcessedContent[],
    resources: StaticResources,
  ): Promise<FilePath[]> | AsyncGenerator<FilePath>
  partialEmit?(
    ctx: BuildCtx,
    content: ProcessedContent[],
    resources: StaticResources,
    changeEvents: ChangeEvent[],
  ): Promise<FilePath[]> | AsyncGenerator<FilePath> | null
  getQuartzComponents(ctx: BuildCtx): QuartzComponent[]
}
```

An emitter plugin must define a `name` field, an `emit` function, and a `getQuartzComponents` function. It can optionally implement a `partialEmit` function for incremental builds.

- `emit` is responsible for looking at all the parsed and filtered content and then appropriately creating files and returning a list of paths to files the plugin created.
- `partialEmit` is an optional function that enables incremental builds. It receives information about which files have changed (`changeEvents`) and can selectively rebuild only the necessary files. This is useful for optimizing build times in development mode. If `partialEmit` is undefined, it will default to the `emit` function.
- `getQuartzComponents` declares which Quartz components the emitter uses to construct its pages.

Creating new files can be done via regular Node [fs module](https://nodejs.org/api/fs.html) (i.e. `fs.cp` or `fs.writeFile`) or via the `write` function in `@quartz-community/utils` if you are creating files that contain text. `write` has the following signature:

```ts
export type WriteOptions = (data: {
  // the build context
  ctx: BuildCtx
  // the name of the file to emit (not including the file extension)
  slug: FullSlug
  // the file extension
  ext: `.${string}` | ""
  // the file content to add
  content: string
}) => Promise<FilePath>
```

This is a thin wrapper around writing to the appropriate output folder and ensuring that intermediate directories exist. If you choose to use the native Node `fs` APIs, ensure you emit to the `argv.output` folder as well.

If you are creating an emitter plugin that needs to render components, there are three more things to be aware of:

- Your component should use `getQuartzComponents` to declare a list of `QuartzComponents` that it uses to construct the page. See the page on [[creating components]] for more information.
- You can use the `renderPage` function defined in `@quartz-community/utils` to render Quartz components into HTML.
- If you need to render an HTML AST to JSX, you can use the `htmlToJsx` function from `@quartz-community/utils`.

For example, the following is a simplified version of the content page plugin that renders every single page.

```tsx
import { QuartzEmitterPlugin, FullPageLayout, QuartzComponentProps } from "@quartz-community/types"
import { renderPage, canonicalizeServer, pageResources, write } from "@quartz-community/utils"

export const ContentPage: QuartzEmitterPlugin = () => {
  return {
    name: "ContentPage",
    getQuartzComponents(ctx) {
      const { head, header, beforeBody, pageBody, afterBody, left, right, footer } = ctx.cfg.layout
      return [head, ...header, ...beforeBody, pageBody, ...afterBody, ...left, ...right, footer]
    },
    async emit(ctx, content, resources): Promise<FilePath[]> {
      const cfg = ctx.cfg.configuration
      const fps: FilePath[] = []
      const allFiles = content.map((c) => c[1].data)
      for (const [tree, file] of content) {
        const slug = canonicalizeServer(file.data.slug!)
        const externalResources = pageResources(slug, file.data, resources)
        const componentData: QuartzComponentProps = {
          fileData: file.data,
          externalResources,
          cfg,
          children: [],
          tree,
          allFiles,
        }

        const content = renderPage(cfg, slug, componentData, {}, externalResources)
        const fp = await write({
          ctx,
          content,
          slug: file.data.slug!,
          ext: ".html",
        })

        fps.push(fp)
      }
      return fps
    },
  }
}
```

Page types define how a category of pages is rendered. They are the primary way to add support for new file types or virtual pages in Quartz.

```ts
export interface QuartzPageTypePluginInstance {
  name: string
  priority?: number
  fileExtensions?: string[]
  match: PageMatcher
  generate?: PageGenerator
  layout: string
  frame?: string
  body: QuartzComponentConstructor
}
```

- `name`: A unique identifier for this page type.
- `priority`: Controls matching order when multiple page types could match a slug. Higher priority page types are checked first. Default: `0`.
- `fileExtensions`: Array of file extensions this page type handles (e.g. `[".canvas"]`, `[".base"]`). Content files (`.md`) are handled by the default content page type. The pages of such a page type stand for files: Quartz runs the site's filters on them (Quartz 5.1+), so give each page the file's `filePath` / `relativePath` and, if the file has frontmatter, that frontmatter.
- `match`: A function that determines whether a given slug/file should be rendered by this page type.
- `generate`: An optional function that produces virtual pages (pages not backed by files on disk, such as folder listings or tag indices). It receives `{ content, cfg, ctx }` and returns the pages, or (Quartz 5.1+) a promise of them, so it can do async work such as running content through the site's transformers or bundling with esbuild. Page types generate one after another, in priority order. A plugin with an async `generate` should declare `"quartzVersion": ">=5.1.0"`, since older versions don't wait for it.
- `layout`: The layout configuration key (e.g. `"content"`, `"folder"`, `"tag"`). This determines which `byPageType` entry in `quartz.config.yaml` provides the layout overrides for this page type.
- `frame`: The [[layout#Page Frames|page frame]] to use for this page type. Controls the overall HTML structure (e.g. `"default"`, `"full-width"`, `"minimal"`, or a custom frame provided by your plugin). If not set, defaults to `"default"`. Can be overridden per-page-type via `layout.byPageType.<name>.template` in `quartz.config.yaml`.
- `body`: The Quartz component constructor that renders the page body content.

### Extending the content index

Quartz [[ContentIndex|builds `static/contentIndex.json`]] itself — the file search, the explorer, the graph and other client-side components read. Any plugin (transformer, filter, emitter or page type) can add fields to every page's entry by defining `extendContentIndex` on its plugin instance:

```ts
import { QuartzTransformerPlugin } from "@quartz-community/types"

export const ReadingTime: QuartzTransformerPlugin = () => ({
  name: "ReadingTime",
  markdownPlugins: () => [/* … sets file.data.readingTime … */],
  // called once per page when contentIndex.json is written
  extendContentIndex({ fileData, entry }) {
    return { readingTime: fileData.readingTime as number | undefined }
  },
})
```

Client-side code then finds the field next to the core ones:

```ts
const index = await fetchData
index["some/page"].readingTime
```

Rules:

- Return a plain object of JSON-serialisable values, or `undefined` to add nothing. `undefined` values are skipped.
- Core fields (`slug`, `filePath`, `title`, `links`, `tags`, `content`, `richContent`, `date`, `description`) cannot be overridden.
- If two plugins add the same key, the first one in plugin order keeps it; a warning names both. Prefer distinctive or namespaced keys (`"readingTime"`, `"myPlugin:score"` or one nested object).
- `entry` is a read-only copy of the core fields; `fileData` is the page's `file.data`.
- Errors thrown by the hook are reported as a warning and the page keeps its core entry.
- Keep it small: `contentIndex.json` is downloaded by every visitor.

Declare the field in your [[plugin capabilities|capabilities]] (`provides.data`) so other plugins can depend on it.

### Reusing the content index in emitters

Emitters don't need to rebuild the index: `ctx.contentIndex` holds it (a read-only `Map` from slug to entry, virtual pages included, with the same fields as `contentIndex.json` plus `date` and `description`). It is built once per build, after page types generated their pages and before plugin emitters run:

```ts
emit: async (ctx, content) => {
  const recent = [...(ctx.contentIndex?.values() ?? [])]
    .filter((entry) => entry.date)
    .sort((a, b) => b.date!.getTime() - a.date!.getTime())
    .slice(0, 20)
  // … write a feed, a JSON API, a search index …
}
```

Built-in settings are available too, with defaults and migrated options applied: `ctx.cfg.configuration.links.markdownLinkResolution`, `ctx.cfg.configuration.contentIndex.enableRSS`, … Both need Quartz 5.1+ — declare `"quartzVersion": ">=5.1.0"` (see [[versioning#For plugin authors]]).

### Components in sidebars

Sidebars have three modes ([[layout#Sidebar modes|`layout.sidebars`]]), set on the sidebar element as `data-sidebar-mode`:

- In `fit` (the default) a sidebar is exactly one screen tall and doesn't scroll. A component that can grow (a list, a tree) must be able to shrink: give it `min-height: 0` and its own scroll area (`overflow-y: auto`), or it pushes the components below it out of reach.
- In `scroll` and `static`, core gives every sidebar component its natural height (`flex-shrink: 0`); nothing extra is needed.

To behave differently per mode, target it in your stylesheet, e.g. `.sidebar[data-sidebar-mode="fit"] .my-list { max-height: 40vh; }`. Custom frames with sidebars should put the `sidebars` prop on their sidebar elements the same way.

### Providing Custom Frames

Plugins can ship their own [[layout#Page Frames|page frames]] — custom page layouts that control how the HTML structure (sidebars, header, content area, footer) is arranged. This is useful for page types that need fundamentally different layouts (e.g. a fullscreen canvas, a presentation mode, a dashboard).

To provide a custom frame:

**1. Create the frame file:**

```tsx title="src/frames/MyFrame.tsx"
import type { PageFrame, PageFrameProps } from "@quartz-community/types"
import type { ComponentChildren } from "preact"

export const MyFrame: PageFrame = {
  name: "my-frame",
  css: `
.page[data-frame="my-frame"] > #quartz-body {
  grid-template-columns: 1fr;
  grid-template-areas: "center";
}
`,
  render({ componentData, pageBody: Content, footer: Footers }: PageFrameProps): unknown {
    const renderSlot = (C: (props: typeof componentData) => unknown): ComponentChildren =>
      C(componentData) as ComponentChildren
    return (
      <div class="center">
        {(Content as any)(componentData)}
        {Footers.map((Footer) => (Footer as any)(componentData))}
      </div>
    )
  },
}
```

Key requirements:

- `name`: A unique string identifier. This is what page types and YAML config reference.
- `render()`: Receives all layout slots (header, sidebars, content, footer) and returns JSX for the inner page structure. Note that `footer` is a `QuartzComponent[]` (an array) — frames should iterate over it with `.map()` to render all footer components.
- `css` (optional): Frame-specific CSS. Scope it with `.page[data-frame="my-frame"]` selectors to avoid conflicts.

**2. Re-export the frame:**

```ts title="src/frames/index.ts"
export { MyFrame } from "./MyFrame"
```

**3. Declare the frame in `package.json`:**

```json title="package.json"
{
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    },
    "./frames": {
      "import": "./dist/frames/index.js",
      "types": "./dist/frames/index.d.ts"
    }
  },
  "quartz": {
    "frames": {
      "MyFrame": { "exportName": "MyFrame" }
    }
  }
}
```

The `"frames"` field in the `"quartz"` manifest maps export names to frame metadata. The key (e.g. `"MyFrame"`) must match the export name in `src/frames/index.ts`.

**4. Add the frame entry point to your build config:**

```ts title="tsup.config.ts"
export default defineConfig({
  entry: ["src/index.ts", "src/frames/index.ts"],
  // ...
})
```

**5. Reference the frame in your page type:**

```ts
export const MyPageType: QuartzPageTypePlugin = () => ({
  name: "MyPageType",
  frame: "my-frame", // References the frame by its name property
  // ...
})
```

When a user installs your plugin, Quartz automatically loads the frame from the `./frames` export and registers it in the Frame Registry. The frame is then available by name in any page type or YAML config override.

> [!tip]
> See the [`canvas-page`](https://github.com/quartz-community/canvas-page) plugin for a complete real-world example of a plugin-provided frame.

### Bases Views

The `bases-page` plugin provides a database-like view system similar to Obsidian Bases. Other plugins can register custom view types via the `ViewRegistry`:

```ts
import { viewRegistry } from "@quartz-community/bases-page";
import type { ViewTypeRegistration } from "@quartz-community/bases-page";

viewRegistry.register({
  id: "timeline",
  name: "Timeline",
  icon: "git-branch",
  render: ({ entries, view, slug, allSlugs }) => (
    <div class="bases-timeline">
      {entries.map(entry => <div>{entry.properties.title}</div>)}
    </div>
  ),
  css: `.bases-timeline { display: flex; flex-direction: column; }`,
  afterDOMLoaded: `document.addEventListener("nav", () => { /* setup */ })`,
});
```

Each view registration includes:

- `id`: Unique identifier (e.g., `"timeline"`, `"kanban"`)
- `name`: Display name shown in the view selector
- `icon`: Optional Lucide icon name
- `render`: Function that receives `ViewRendererProps` and returns Preact JSX
- `css`: Optional CSS string (deduplicated by view ID)
- `afterDOMLoaded`: Optional client-side script (same lifecycle as component scripts)
- `options`: Optional configuration passed to every render invocation

The `ViewRegistry` is a global singleton (via `Symbol.for`) ensuring all copies of the module share the same registry.

### Reporting problems in content

When your plugin fails because of a file's content rather than a bug in your code — a `.canvas` file that isn't valid JSON, a property with a value your plugin can't use, a file it can't read — throw an `Error` with `quartzContent` set to `true` and a message that names the problem:

```ts
const err = new Error(`Invalid canvas: ${parseError.message}`)
;(err as Error & { quartzContent?: boolean }).quartzContent = true
throw err
```

Quartz then reports it as a problem in the file's content ("fix it and build again") instead of asking the user to report a bug in your plugin, and leaves out the stack trace. Errors from transformers name the file being processed; from an emitter or a page type's `generate`, put the file's path in your message. Quartz checks the property, not the class, so plugins don't need to import anything from Quartz; it also finds the property on an error's `cause`. Only use it when the content is at fault — a wrong guess sends users looking for a problem in their notes that isn't there.

## Building and Distribution

Quartz v5 plugins ship pre-built `dist/` in their repositories. When a user installs your plugin, Quartz detects the pre-built output and skips the install/build cycle entirely — making installation near-instant.

### Build Configuration

The plugin template's `tsup.config.ts` bundles all dependencies by default. Only **singleton externals** — packages that must be the same instance across all plugins — are left unbundled:

```ts
const SINGLETON_EXTERNALS = [
  "preact",
  "preact/hooks",
  "preact/jsx-runtime",
  "preact/compat",
  "@jackyzha0/quartz",
  "@jackyzha0/quartz/*",
  "vfile",
  "vfile/*",
  "unified",
]

export default defineConfig({
  // ...
  noExternal: [/.*/], // Bundle everything
  external: SINGLETON_EXTERNALS, // Except singletons
})
```

This means your plugin's `dist/index.js` is self-contained — no `npm install` needed at install time.

### Shipping Pre-built Output

Your plugin's `dist/` directory should be committed to the repository:

1. **Do NOT add `dist/` to `.gitignore`**
2. Run `npm run build` before committing
3. The CI workflow verifies `dist/` is up to date on every push

If `dist/` is missing or gitignored, Quartz falls back to the full install/build cycle (useful during local development with symlinked plugins).

### Shipping Files with Your Plugin

Since Quartz 5.1, `externalResources()` can return `assets`: files or directories that Quartz copies into the site at `static/plugins/<to>`. Client scripts find them through the `window.quartzStaticUrl` page global (the absolute URL of `static/`, valid across SPA navigations).

Use this for large or optional client code instead of an inline script: Quartz serves inline scripts to **every page**, while an asset is only downloaded where your script imports it.

```ts
import path from "path"
import { createRequire } from "module"

externalResources() {
  // resolve a dependency's browser build at build time
  const pkg = createRequire(import.meta.url).resolve("my-renderer/package.json")
  return {
    js: [{ script: loaderScript, loadTime: "afterDOMReady", contentType: "inline", moduleType: "module" }],
    assets: [{ from: path.join(path.dirname(pkg), "dist", "esm"), to: "my-plugin/renderer" }],
  }
}
```

```ts title="loader.inline.ts"
document.addEventListener("nav", async () => {
  const nodes = document.querySelectorAll(".my-widget")
  if (nodes.length === 0 || !window.quartzStaticUrl) return // nothing to do on this page
  const url = new URL("plugins/my-plugin/renderer/index.js", window.quartzStaticUrl).href
  const { render } = await import(url)
  for (const node of nodes) render(node)
})
```

- `to` is relative to `static/plugins/`; use your plugin's name as the first segment. Invalid or conflicting targets and missing sources are reported as build warnings.
- An ES module build with relative `import()`s keeps working when served this way, so only the chunks a page needs are downloaded.
- Older Quartz versions ignore `assets` and leave `quartzStaticUrl` undefined. Either require `"quartzVersion": ">=5.1.0"` or fall back (for example to a CDN), as [[ObsidianFlavoredMarkdown]] does for [[Mermaid diagrams|Pele]].

### Plugins with Native Dependencies

Plugins that require native packages (e.g. `sharp` for image processing) cannot bundle those. For these plugins:

1. Set `"requiresInstall": true` in your `package.json` quartz manifest
2. Declare the native package as a `peerDependency`
3. Quartz will install it into the host project at build time

```shell
# Build the plugin
npm run build
# or
npx tsup
```

## What to Import from Where

| You need...                                                            | Import from                                                       |
| ---------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Type definitions (`QuartzTransformerPlugin`, `QuartzComponent`, etc.)  | `@quartz-community/types`                                         |
| Path utilities (`simplifySlug`, `resolveRelative`, `pathToRoot`)       | `@quartz-community/utils/path`                                    |
| DOM utilities (`removeAllChildren`, `registerEscapeHandler`)           | `@quartz-community/utils/dom`                                     |
| JSX conversion (`htmlToJsx`)                                           | `@quartz-community/utils/jsx`                                     |
| Language utilities (`classNames`, `capitalize`)                        | `@quartz-community/utils/lang`                                    |
| Date/sort utilities (`formatDate`, `getDate`, `byDateAndAlphabetical`) | `@quartz-community/utils/date` and `@quartz-community/utils/sort` |
| HTML escaping (`escapeHTML`, `unescapeHTML`)                           | `@quartz-community/utils/escape`                                  |
| Emoji utilities (`getIconCode`)                                        | `@quartz-community/utils/emoji`                                   |
| Browser runtime (`onNav`, `onRender`, `fetchContentIndex`)             | `@quartz-community/runtime`                                       |

Do **not** import from `@jackyzha0/quartz` or from `vfile` directly. Use the community packages instead.

## Internationalization (i18n)

Plugins should provide their own translations for user-facing strings. Do **not** hardcode strings in components.

### Setting Up i18n

Create the following structure:

```
src/i18n/
├── index.ts
└── locales/
    └── en-US.ts
```

**`src/i18n/locales/en-US.ts`** (required base locale):

```ts
export default {
  components: {
    myPlugin: {
      title: "My Plugin",
      description: "A description",
      itemCount: ({ count }: { count: number }) => (count === 1 ? "1 item" : `${count} items`),
    },
  },
}
```

**`src/i18n/index.ts`**:

```ts
import enUS from "./locales/en-US"

const locales: Record<string, typeof enUS> = {
  "en-US": enUS,
}

export function i18n(locale: string) {
  return locales[locale] || enUS
}
```

### Using i18n in Components

```tsx
import { i18n } from "../i18n"

const MyComponent: QuartzComponent = ({ cfg }) => {
  const locale = cfg.locale ?? "en-US"
  const t = i18n(locale).components.myPlugin
  return <h2>{t.title}</h2>
}
```

### Adding Translations

To add a new locale, copy `en-US.ts`, translate the strings, and register it:

```ts
// src/i18n/locales/fr-FR.ts
export default {
  components: {
    myPlugin: {
      title: "Mon Plugin",
      description: "Une description",
      itemCount: ({ count }: { count: number }) =>
        count === 1 ? "1 élément" : `${count} éléments`,
    },
  },
}
```

```ts
// src/i18n/index.ts
import enUS from "./locales/en-US"
import frFR from "./locales/fr-FR"

const locales: Record<string, typeof enUS> = {
  "en-US": enUS,
  "fr-FR": frFR,
}
```

Use [BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag) locale codes (e.g., `en-US`, `de-DE`, `ja-JP`, `zh-CN`). For dynamic content, use function-based translations as shown with `itemCount` above.

## Installing Your Plugin

```shell
# In your Quartz project
npx quartz plugin add github:your-username/my-plugin
```

This clones the plugin and adds it to both `quartz.config.yaml` and `quartz.lock.json`. If the plugin ships pre-built `dist/` (recommended), installation completes in seconds with no build step. You can then configure it in your config:

```yaml title="quartz.config.yaml"
plugins:
  - source: github:your-username/my-plugin
    enabled: true
```

For options that require JavaScript callback functions (not expressible in YAML), use the TS override in `quartz.ts`:

```ts title="quartz.ts (override)"
import * as ExternalPlugin from "./.quartz/plugins"

// Must be placed before loadQuartzConfig()
ExternalPlugin.MyPlugin({
  customFn: (data) => {
    // ...
  },
})
```

Options set via `quartz.ts` are merged with YAML options at instantiation time, with `quartz.ts` overrides taking precedence. These calls must be placed **before** `loadQuartzConfig()` in your `quartz.ts`.

### Development Workflow

During plugin development, you'll frequently install and uninstall your plugin to test changes. The following commands help manage this cycle:

```shell
# Remove your plugin and clean up
npx quartz plugin remove my-plugin

# Re-add after making changes
npx quartz plugin add github:your-username/my-plugin
```

If you've updated your `quartz.config.yaml` to reference a plugin that isn't installed yet, you can install it without manually running `add`:

```shell
# Install all config-referenced plugins missing from the lockfile
npx quartz plugin install --from-config

# Preview first without making changes
npx quartz plugin install --from-config --dry-run
```

To clean up plugins that are installed but no longer referenced in your config:

```shell
# Remove orphaned plugins
npx quartz plugin prune

# Preview first without making changes
npx quartz plugin prune --dry-run
```

> [!tip]
> Both `resolve` and `prune` fall back to `quartz.config.default.yaml` if no `quartz.config.yaml` is present. This is useful for CI environments where the default config is the source of truth. See [[cli/plugin#prune|prune]] and [[cli/plugin#resolve|resolve]] for full details.

## Component Plugins

For plugins that provide visual components (like Explorer, Graph, Search), see the [[creating components|creating component plugins]] guide.

Component-only plugins (those with `"category": ["component"]` in their manifest) are loaded via side-effect import rather than a factory function. If your component-only plugin needs to receive user options from `quartz.config.yaml`, export an `init(options)` function — see [[creating components#Receiving YAML Options in Component-Only Plugins|receiving YAML options]] for details.
