---
title: Configuration
---

Quartz is meant to be extremely configurable, even if you don't know any coding. Most of the configuration you should need can be done by just editing `quartz.config.yaml`.

> [!tip]
> If you edit `quartz.config.yaml` using a text-editor with YAML language support like VSCode, it will warn you when you've made an error in your configuration, helping you avoid configuration mistakes!

The configuration of Quartz can be broken down into three parts:

```yaml title="quartz.config.yaml"
configuration:
  pageTitle: "My Site"
  # ... general configuration
plugins:
  - source: "@quartz-community/explorer"
    enabled: true
    # ... plugin entries
layout:
  # ... groups and per-page-type layout overrides
```

`configuration` and `plugins` are described below; the `layout` section (component groups, `byPageType` overrides, sidebar modes) is described in [[layout]].

## General Configuration

This part of the configuration concerns anything that can affect the whole site. The following is a list breaking down all the things you can configure:

- `pageTitle`: title of the site. This is also used when generating the [[RSS Feed]] for your site.
- `pageTitleSuffix`: a string added to the end of the page title. This only applies to the browser tab title, not the title shown at the top of the page.
- `enableSPA`: whether to enable [[SPA Routing]] on your site.
- `enablePopovers`: whether to enable [[popover previews]] on your site.
- `prefetch`: fetch pages before their links are followed, so they open at once ([[prefetching]]): `viewport` (default, links on screen and links pointed at), `hover` (only links pointed at) or `"off"`. Works with and without SPA routing.
- `analytics`: what to use for analytics on your site. Values can be
  - `null`: don't use analytics;
  - `{ provider: 'google', tagId: '<your-google-tag>' }`: use Google Analytics;
  - `{ provider: 'plausible' }` (managed) or `{ provider: 'plausible', host: 'https://<your-plausible-host>' }` (self-hosted, make sure to include the `https://` protocol prefix): use [Plausible](https://plausible.io/);
  - `{ provider: 'umami', host: '<your-umami-host>', websiteId: '<your-umami-website-id>', script: '<your-script-name.js>' }`: use [Umami](https://umami.is/);
  - `{ provider: 'goatcounter', websiteId: 'my-goatcounter-id' }` (managed) or `{ provider: 'goatcounter', websiteId: 'my-goatcounter-id', host: 'my-goatcounter-domain.com', scriptSrc: 'https://my-url.to/counter.js' }` (self-hosted) use [GoatCounter](https://goatcounter.com);
  - `{ provider: 'posthog', apiKey: '<your-posthog-project-apiKey>' }` (managed) or `{ provider: 'posthog', apiKey: '<your-posthog-project-apiKey>', apiHost: '<your-posthog-api-host>', uiHost: '<your-posthog-ui-host>', personProfiles: 'identified_only' }` (self-hosted/reverse proxy): use [PostHog](https://posthog.com/). `uiHost` is required when `apiHost` is a reverse proxy. The legacy `host` option is an alias for `apiHost`;
  - `{ provider: 'tinylytics', siteId: '<your-site-id>' }`: use [Tinylytics](https://tinylytics.app/);
  - `{ provider: 'cabin' }` or `{ provider: 'cabin', host: 'https://cabin.example.com' }` (custom domain): use [Cabin](https://withcabin.com);
  - `{provider: 'clarity', projectId: '<your-clarity-id-code' }`: use [Microsoft clarity](https://clarity.microsoft.com/). The project id can be found on top of the overview page.
  - `{ provider: 'matomo', siteId: '<your-matomo-id-code', host: 'matomo.example.com' }`: use [Matomo](https://matomo.org/), without protocol.
  - `{ provider: 'vercel' }`: use [Vercel Web Analytics](https://vercel.com/docs/concepts/analytics).
  - `{ provider: 'rybbit', siteId: 'my-rybbit-id' }` (managed) or `{ provider: 'rybbit', siteId: 'my-rybbit-id', host: 'my-rybbit-domain.com' }` (self-hosted) use [Rybbit](https://rybbit.com);
- `locale`: used for [[i18n]] and date formatting
- `baseUrl`: this is used for sitemaps and RSS feeds that require an absolute URL to know where the canonical 'home' of your site lives. This is normally the deployed URL of your site (e.g. `quartz.jzhao.xyz` for this site). Do not include the protocol (i.e. `https://`) or any leading or trailing slashes.
  - You will be prompted to set this during [[create|`npx quartz create`]]. The CLI automatically strips any `https://` or `http://` protocol prefixes and trailing slashes for you.
  - This should also include the subpath if you are [[hosting]] on GitHub pages without a custom domain. For example, if my repository is `jackyzha0/quartz`, GitHub pages would deploy to `https://jackyzha0.github.io/quartz` and the `baseUrl` would be `jackyzha0.github.io/quartz`.
  - Note that Quartz 5 will avoid using this as much as possible and use relative URLs whenever it can to make sure your site works no matter _where_ you end up actually deploying it.
- `publishAssets`: which non-Markdown files (images, PDFs, …) from `content` are copied to the site.
  - `"all"` (default): every file that isn't ignored.
  - `"referenced"`: only files a published page links to or embeds. Use this with [[ExplicitPublish]] or [[private pages|drafts]], so that files only unpublished notes use stay private.
  - Files that Quartz renders as pages themselves (e.g. `.base` and `.canvas` files) are never copied as raw assets.
- `ignorePatterns`: a list of [glob](<https://en.wikipedia.org/wiki/Glob_(programming)>) patterns that Quartz should ignore and not search through when looking for files inside the `content` folder. See [[private pages]] for more details.
- `theme`: configure how the site looks.
  - `fontOrigin`: where to load fonts from.
    - `"googleFonts"` (default): loads fonts from Google Fonts API. Fastest option, especially with CDN caching enabled.
    - `"local"`: Quartz loads no fonts at all; you provide them. The `typography` names are still used as the font families, so declare matching `@font-face` rules in `quartz/styles/custom.scss` and put the font files in `quartz/static/fonts/` (served at `static/fonts/`):

      ```scss title="quartz/styles/custom.scss"
      @font-face {
        font-family: "Inter";
        src: url("static/fonts/Inter.woff2") format("woff2");
        font-display: swap;
      }
      ```

      Use a path relative to the site root like above (no leading `/`) so it also works when the site is served from a subpath. To have Quartz download Google Fonts at build time and serve them from your site instead, use the [[plugins/Fonts|Fonts]] plugin with `fontOrigin: selfHosted`.
  - `cdnCaching`: if `true` (default), use Google CDN to cache the fonts. This will generally be faster. Disable (`false`) this if you want Quartz to download the fonts to be self-contained.
  - `typography`: what fonts to use. Any font available on [Google Fonts](https://fonts.google.com/) works here.
    - `title`: font for the title of the site (optional, same as `header` by default)
    - `header`: font to use for headers
    - `code`: font for inline and block quotes
    - `body`: font for everything
  - `colors`: controls the theming of the site. It has two color schemes, `lightMode` and `darkMode`, each with the same keys:
    - `light`: page background
    - `lightgray`: borders
    - `gray`: graph links, heavier borders
    - `darkgray`: body text
    - `dark`: header text and icons
    - `secondary`: link colour, current [[graph view|graph]] node
    - `tertiary`: hover states and visited [[graph view|graph]] nodes
    - `highlight`: internal link background, highlighted text, [[syntax highlighting|highlighted lines of code]]
    - `textHighlight`: markdown highlighted text background
- `frontmatter`, `links`, `drafts`, `contentIndex`: options for Quartz's [[built-in processing]] — frontmatter parsing ([[Frontmatter]]), link resolution ([[CrawlLinks]]), draft handling ([[RemoveDrafts]]) and the content index, sitemap and RSS feed ([[ContentIndex]]). They are on by default. Each takes an object of options (plus `enabled` and `order`) or a boolean shorthand: set e.g. `links: { markdownLinkResolution: relative }` to change an option or `contentIndex: false` to turn one off.
  - `links.markdownLinkResolution` defaults to `shortest` (Obsidian's default). An old `crawl-links` plugin entry that Quartz migrates keeps that plugin's default, `absolute`, unless it sets another value.

```yaml title="quartz.config.yaml"
configuration:
  theme:
    colors:
      lightMode:
        light: "#faf8f8"
        secondary: "#284b63"
        # ... the other keys
      darkMode:
        light: "#161618"
        secondary: "#7b97aa"
        # ... the other keys
```

> [!note] Colors with an Obsidian theme
> A theme from [quartz-themes](https://github.com/saberzero1/quartz-themes) (the [[ThemesCore|@quartz-themes/core]] plugin; the Obsidian and TTRPG [[create#Templates|templates]] enable one) brings its own color scheme and colors the page through Obsidian's CSS variables (`--text-normal` for most text, `--text-muted` for paragraphs, `--background-primary`, `--interactive-accent`, …). The `colors` above then have little or no effect. To change a theme's colors, override its variables in `quartz/styles/custom.scss`:
>
> ```scss title="quartz/styles/custom.scss"
> html[saved-theme="dark"] body {
>   --text-normal: #e0e0e0;
>   --text-muted: #a0a0a0;
> }
> ```
>
> (use `html[saved-theme="light"] body` for light mode), or disable the theme to use the `colors` above.

## Plugins

You can think of Quartz plugins as a series of transformations over content.

![[quartz transform pipeline.png]]

```yaml title="quartz.config.yaml"
plugins:
  - source: "@quartz-community/created-modified-date"
    enabled: true
    order: 10 # controls execution order
  - source: "@quartz-community/syntax-highlighting"
    enabled: true
    order: 20
  # ... more plugins
```

Plugins are categorized by their type (transformer, filter, emitter, pageType) based on their manifest. The `order` field controls execution order within each category.

> [!note]
> For advanced TS override of plugin configuration, you can modify `quartz.ts`:
>
> ```ts title="quartz.ts"
> import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
>
> const config = await loadQuartzConfig({
>   // override any configuration field here
> })
> export default config
> export const layout = await loadQuartzLayout()
> ```

- [[tags/plugin/transformer|Transformers]] **map** over content (e.g. parsing frontmatter, generating a description)
- [[tags/plugin/filter|Filters]] **filter** content (e.g. hiding [[UnlistedPages|unlisted pages]]; dropping drafts is [[built-in processing|built in]])
- [[tags/plugin/emitter|Emitters]] **reduce** over content (e.g. creating an RSS feed or pages that list all files with a specific tag)
- **Page Types** define how different types of pages are rendered (content pages, folder listings, tag listings). Each page type can use a different [[layout#Page Frames|page frame]] to control its overall HTML structure.

The `layout.byPageType` section in `quartz.config.yaml` can also set a `template` field to override the page frame for a specific page type:

```yaml title="quartz.config.yaml"
layout:
  byPageType:
    canvas:
      template: minimal # Override the page frame for canvas pages
```

See [[layout#Page Frames]] for details on available frames and how frame resolution works.

### Internal vs External Plugins

Quartz distinguishes between processing that is built into Quartz and plugins that are installed separately.

In `quartz.config.yaml`, the official plugins are referenced by their npm package name (this is what the default config uses); other plugins can also be referenced by a Git source such as `github:org/repo`:

```yaml title="quartz.config.yaml"
plugins:
  - source: "@quartz-community/explorer"
    enabled: true
  - source: "@quartz-community/syntax-highlighting"
    enabled: true
    options:
      theme:
        light: github-light
        dark: github-dark
```

Frontmatter parsing, link resolution, drafts and the content index are not plugins: they are [[built-in processing|built into Quartz]] and configured under `configuration.frontmatter`, `.links`, `.drafts` and `.contentIndex`. Everything else is a plugin, referenced by its source: npm plugins (all the default ones) are installed in `node_modules`, Git and local plugins in `.quartz/plugins/`.

### Community Plugins

To install a community plugin, you can use the following command:

```shell
npx quartz plugin add @quartz-community/explorer   # an npm package
npx quartz plugin add github:username/repo         # a Git repository
```

This adds the plugin to `quartz.config.yaml` and installs it to `.quartz/plugins/`.

To install all plugins referenced in your config that aren't yet installed (useful when cloning a project or setting up CI):

```shell
npx quartz plugin install --from-config
```

To remove installed plugins that are no longer in your config:

```shell
npx quartz plugin prune
```

Both commands support `--dry-run` to preview changes. See [[cli/plugin|the plugin CLI reference]] for full details.

### Advanced Source Options

The `source` field for a plugin can be either a simple string or an object with additional options. The string form is the most common:

```yaml title="quartz.config.yaml"
plugins:
  - source: "@quartz-community/explorer"
    enabled: true
  - source: github:username/repo
    enabled: true
```

For plugins that live in a subdirectory of a repository (monorepo-style), or when you need to pin to a specific branch or tag, use the object form:

```yaml title="quartz.config.yaml"
plugins:
  - source:
      repo: "https://github.com/user/repo.git"
      subdir: plugin
      ref: main
      name: my-plugin
    enabled: true
```

The object form supports the following fields:

| Field    | Required | Description                                                                                               |
| -------- | :------: | --------------------------------------------------------------------------------------------------------- |
| `repo`   |    ✅    | Git repository URL (e.g. `https://github.com/user/repo.git`).                                             |
| `subdir` |    ❌    | Subdirectory within the repository that contains the plugin. Used for monorepo-style plugin repositories. |
| `ref`    |    ❌    | Git ref (branch or tag) to pin to. Equivalent to the `#ref` suffix on string sources.                     |
| `name`   |    ❌    | Override the directory name used in `.quartz/plugins/`. Defaults to the repository name.                  |

> [!example] Example
> A plugin in the `plugin/` subdirectory of a repository, pinned to a tag:
>
> ```yaml title="quartz.config.yaml"
> plugins:
>   - source:
>       name: my-plugin
>       repo: "https://github.com/user/repo.git"
>       subdir: plugin
>       ref: v1.0.0
>     enabled: true
> ```
>
> Themes from [quartz-themes](https://github.com/saberzero1/quartz-themes) don't need this: they are published to npm as `@quartz-themes/core` and the default config already has a (disabled) entry for it:
>
> ```yaml title="quartz.config.yaml"
> plugins:
>   - source: "@quartz-themes/core"
>     enabled: true
>     options:
>       theme: tokyo-night
>       mode: both
> ```

> [!tip]
> The string form `github:user/repo#branch` and the object form `{ repo, ref }` are equivalent ways to specify a branch. Use the object form when you also need `subdir` or `name`, or when you prefer a more readable configuration.

### Usage

You can customize the behaviour of Quartz by adding, removing and reordering plugins in `quartz.config.yaml`. Each plugin entry specifies its source, whether it's enabled, execution order, and any options:

```yaml title="quartz.config.yaml"
plugins:
  - source: "@quartz-community/note-properties"
    enabled: true
    options:
      includeAll: false
      includedProperties:
        - description
        - tags
        - aliases
    order: 5
  - source: "@quartz-community/created-modified-date"
    enabled: true
    options:
      priority:
        - frontmatter
        - git
        - filesystem
    order: 10
  - source: "@quartz-community/latex"
    enabled: true
    options:
      renderEngine: katex
    order: 80
```

> [!note]
> Some plugin options require JavaScript callback functions (e.g. custom sort, filter, or map functions) that can't be expressed in YAML. For these, use the TS override in `quartz.ts`:
>
> ```ts title="quartz.ts"
> import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
> import * as ExternalPlugin from "./.quartz/plugins"
>
> ExternalPlugin.Explorer({
>   mapFn: (node) => {
>     node.displayName = node.displayName.toUpperCase()
>     return node
>   },
> })
>
> const config = await loadQuartzConfig()
> export default config
> export const layout = await loadQuartzLayout()
> ```
>
> Options set in `quartz.ts` are merged with YAML options and take precedence. Plugin overrides must be placed **before** `loadQuartzConfig()` so they are applied when components are instantiated during config loading. See the plugin-specific documentation for available callback options.

You can see a list of all plugins and their configuration options [[tags/plugin|here]].

If you'd like to make your own plugins, see the [[making plugins|making custom plugins]] guide.

## Fonts

Fonts can be specified as a simple string or with advanced options in `quartz.config.yaml`:

```yaml title="quartz.config.yaml"
configuration:
  theme:
    typography:
      title: Schibsted Grotesk # optional, defaults to header font
      header: Schibsted Grotesk
      body: Source Sans Pro
      code: IBM Plex Mono
```

> [!note]
> Quartz uses `title`, but the config's JSON schema doesn't list it yet, so an editor with YAML validation may flag it. The warning can be ignored.

For more control over font weights and italics, use the TS override in `quartz.ts`:

```ts title="quartz.ts"
import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"

const config = await loadQuartzConfig({
  theme: {
    typography: {
      header: {
        name: "Schibsted Grotesk",
        weights: [400, 700],
        includeItalic: true,
      },
      body: "Source Sans Pro",
      code: "IBM Plex Mono",
    },
  },
})
export default config
export const layout = await loadQuartzLayout()
```

> [!tip]
> For per-heading font control, self-hosted fonts, or Obsidian theme font bridging, see the [[plugins/Fonts|Fonts]] plugin. It can download Google Fonts at build time and serve them locally with `fontOrigin: selfHosted`, making your site fully self-contained.
