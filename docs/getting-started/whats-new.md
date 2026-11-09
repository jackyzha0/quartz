---
title: "What's New in Quartz 5"
aliases:
  - "changelog"
  - "v5"
---

Quartz 5 is a ground-up rearchitecture of Quartz focused on extensibility, performance, and Obsidian compatibility. If you're coming from v4, see [[migrating|Migrating to Quartz 5]] for the upgrade path.

## New in 5.1

Upgrading from 5.0? See [[upgrading#Upgrading from 5.0 to 5.1|Upgrading from 5.0 to 5.1]] for the steps and the changes you may notice.

- **[[prefetching|Prefetching]]** — pages are fetched before their links are followed, so they open at once (`configuration.prefetch`, default `viewport`). Works with and without SPA routing.
- **[[built-in processing|Built-in processing]]** — frontmatter, link resolution, drafts and the content index are built into Quartz (`configuration.frontmatter`, `links`, `drafts`, `contentIndex`) instead of plugins that broke the site when disabled.
- **`publishAssets: referenced`** — only copy the images and files that published pages use.
- **Permalinks as addresses** — `permalink: page` publishes a note at `/page`, as in Obsidian Publish.
- **Sidebar modes** — [[layout#Sidebar modes|`layout.sidebars`]] (`fit`, `scroll`, `static`) and a new `docs` template (`npx quartz create --template docs`).
- **Markdown as in Obsidian** — [[ObsidianFlavoredMarkdown]] 2.0 parses with Obsidian's own parser: single line breaks render as `<br>`, inline footnotes (`text^[note]`), image sizes on Markdown images (`![alt|300](image.png)`), themed Mermaid diagrams. [[GitHubFlavoredMarkdown]] now runs first, and headings get the same ids as on GitHub.
- **Bases as in Obsidian 1.15** — [[BasesPage]] 1.2: durations, nested tags, `file.name`/`file.fullname`, Obsidian's card layout. Pages rendered from `.base`, `.canvas` and Excalidraw files follow your publish filters.
- **`npx quartz info`** — prints your Quartz version, environment and plugins for bug reports.
- **`npx quartz plugin doctor`** — checks your config, lockfile and installed plugins, and `--fix` migrates entries of plugins that are now built in. `npx quartz upgrade` shows the release notes and runs these checks.
- **Clearer errors** — plugin errors name the plugin, what it was doing and the file; problems in content say so; broken or incompatible plugins fail CI builds. `--verbose` prints a layout report.
- **Plugin compatibility** — a plugin's required Quartz version is checked (a warning locally, an error in CI), and deprecated plugins are flagged.
- **Fixes** — Windows (npm plugins in `.quartz/plugins/index.ts`, local plugin paths, aliases, git dates), no sideways scrolling on phones, SPA navigation across redirects, and JavaScript frontmatter (`---js`) is no longer executed.

## Plugin Ecosystem

The biggest change in v5 is the move to a **community plugin ecosystem**. Plugins are now standalone packages maintained in the [quartz-community](https://github.com/quartz-community) GitHub organization. The default plugins are npm packages (`@quartz-community/explorer`) that ship with Quartz; others can be added from npm, git or a local folder:

```bash
npx quartz plugin add github:quartz-community/explorer
```

This means:

- **Independent versioning**: Plugins can be updated without upgrading Quartz itself
- **Community contributions**: Anyone can publish a Quartz plugin
- **Smaller core**: Quartz core is leaner; features live in plugins
- **Plugin registry**: Discover plugins via `npx quartz tui` or the [plugin registry](https://github.com/quartz-community/registry)

Over 40 official plugins ship with Quartz, covering everything from search and graph view to encrypted pages and canvas rendering.

## YAML Configuration

Configuration moved from TypeScript (`quartz.config.ts`) to **YAML** (`quartz.config.yaml`):

```yaml title="quartz.config.yaml"
configuration:
  pageTitle: My Digital Garden
  enableSPA: true
  enablePopovers: true
  locale: en-US
  baseUrl: mysite.github.io
  theme:
    typography:
      header: Schibsted Grotesk
      body: Source Sans Pro
      code: IBM Plex Mono
plugins:
  - source: "@quartz-community/github-flavored-markdown"
    enabled: true
    order: 30
  - source: "@quartz-community/obsidian-flavored-markdown"
    enabled: true
    order: 40
  - source: "@quartz-community/explorer"
    enabled: true
    layout:
      position: left
      priority: 50
```

Benefits:

- **No TypeScript knowledge required** for basic customization
- **JSON Schema validation** — editors with YAML support show errors inline
- **Layout defined per-plugin** — each plugin declares its own position and priority
- **Templates** — `npx quartz create` offers preconfigured templates (default, obsidian, ttrpg, blog, docs)

For advanced options that need JavaScript (callbacks, custom components), the `quartz.ts` override system provides full programmatic control.

## Improved Obsidian Compatibility

Quartz 5 aims for full compatibility with Obsidian's core features:

- **Wikilinks** — all variations including aliases, headings, block references, and pipe escaping in tables
- **Callouts** — all built-in types, collapsible variants, and nested callouts
- **Highlights** — `==highlighted text==` syntax
- **Comments** — `%%hidden comments%%` (inline and block)
- **Tags** — `#tag` and `#nested/tag` with tag pages
- **Custom task characters** — `[?]`, `[!]`, `[>]`, etc. preserved as `data-task` attributes
- **Mermaid diagrams** — Mermaid.js default; [Pele](https://pele.run) via `diagramRenderer: pele`
- **YouTube and Tweet embeds** — via image syntax
- **Block references** — `^block-id` with broad character support
- **Video/audio embeds** — full format support (mp4, webm, ogv, mov, mkv, avi, flac, aac, etc.)
- **Canvas files** — rendered as interactive, pannable pages via the canvas-page plugin
- **Obsidian URI links** — marked with CSS class for custom styling
- **Footnotes** — including inline footnotes (`text^[note]`), parsed by the Obsidian Flavored Markdown plugin

See [[Obsidian compatibility]] for the full list.

## Page Type System

Quartz 5 introduces **page types** — plugins that define how different kinds of pages are rendered:

- **Content pages** — regular markdown notes
- **Folder pages** — directory listing pages
- **Tag pages** — pages listing notes with a given tag
- **Canvas pages** — interactive JSON Canvas renderings
- **Bases pages** — database-style views of your content

Each page type can use a different [[layout#Page Frames|page frame]] for fundamentally different HTML structures (three-column, full-width, minimal, etc.).

## Layout System

The layout system is now declarative. Plugins declare their position (`left`, `right`, `beforeBody`, `afterBody`) and priority in the config:

```yaml
plugins:
  - source: "@quartz-community/explorer"
    layout:
      position: left
      priority: 50
  - source: "@quartz-community/graph"
    layout:
      position: right
      priority: 10
```

Additional features:

- **Groups** — combine components into flex rows/columns (e.g., toolbar with search + darkmode toggle)
- **Conditional rendering** — show/hide components based on page properties (`condition: not-index`, `condition: has-tags`)
- **Display modifiers** — `display: mobile-only` or `display: desktop-only`
- **Per-page-type overrides** — different layouts for content, folder, tag, and 404 pages

## Performance

- **Parallel processing** — markdown parsing uses a worker pool across all CPU cores
- **Incremental rebuilds** — watch mode only re-processes changed files
- **Pre-built plugins** — community plugins ship compiled `dist/` directories, skipping build-from-source on install
- **SPA routing** — client-side navigation with `micromorph` for instant page transitions
- **CDN-cached fonts** — Google Fonts with aggressive caching, or fully self-hosted with `fontOrigin: local`

## CLI Improvements

The CLI is simpler and more helpful:

| Command                          | Description                               |
| -------------------------------- | ----------------------------------------- |
| `npx quartz create`              | Interactive setup wizard with templates   |
| `npx quartz build --serve`       | Build and serve with hot reload           |
| `npx quartz sync`                | Commit and push to GitHub                 |
| `npx quartz upgrade`             | Pull latest Quartz updates                |
| `npx quartz plugin install`      | Install plugins from lockfile             |
| `npx quartz plugin add <source>` | Add a new plugin                          |
| `npx quartz plugin list`         | List installed plugins                    |
| `npx quartz plugin prune`        | Remove unused plugins                     |
| `npx quartz plugin doctor`       | Diagnose plugin problems                  |
| `npx quartz info`                | Print version and plugins for bug reports |

Other improvements:

- **Node.js version check** — clear error message if running on Node < 22
- **Port conflict handling** — helpful message when port is already in use
- **Plugin lockfile** — `quartz.lock.json` pins plugin versions for reproducible builds
- **Concurrency control** — `--concurrency` flag for memory-constrained environments

## Internationalization

Quartz 5 supports multiple locales out of the box. Set `locale: ja-JP` (or any supported locale) in your config to translate all UI strings — search placeholders, "table of contents", date formatting, and more.

## New Plugins

Plugins new to v5 (not available in v4):

```base
filters:
  and:
    - file.ext == "md"
    - file.inFolder("plugins")
    - note["new-in-v5"] == true
properties:
  title:
    displayName: Plugin
  repository:
    displayName: Repository
  description:
    displayName: Description
views:
  - type: table
    name: New in v5
    order:
      - title
      - repository
      - description
    sort:
      - property: title
        direction: ASC
```

## For Plugin Developers

If you built plugins for v4, the development model has changed significantly:

- Plugins are **standalone npm packages** with their own `package.json`, `tsconfig.json`, and build system
- The **factory function pattern** (inspired by Astro integrations) replaces class-based plugins
- **`@quartz-community/types`** provides full type safety without depending on the Quartz core
- **`@quartz-community/utils`** provides shared path, DOM, and language utilities
- **`@quartz-community/runtime`** provides browser runtime utilities
- Plugins can ship **components**, **frames**, **stylesheets**, and **client scripts**
- A **plugin template** is available at [quartz-community/plugin-template](https://github.com/quartz-community/plugin-template)

See [[making plugins]] for the full guide.
