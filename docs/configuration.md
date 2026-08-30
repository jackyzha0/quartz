---
title: Configuration
---

Quartz is meant to be extremely configurable, even if you don't know any coding. Most of the configuration you should need can be done by just editing `quartz.config.yaml`.

> [!tip]
> If you edit `quartz.config.yaml` using a text-editor with YAML language support like VSCode, it will warn you when you've made an error in your configuration, helping you avoid configuration mistakes!

The configuration of Quartz can be broken down into two main parts:

```yaml title="quartz.config.yaml"
configuration:
  pageTitle: "My Site"
  # ... general configuration
plugins:
  - source: github:quartz-community/some-plugin
    enabled: true
    # ... plugin entries
```

## General Configuration

This part of the configuration concerns anything that can affect the whole site. The following is a list breaking down all the things you can configure:

- `pageTitle`: title of the site. This is also used when generating the [[RSS Feed]] for your site.
- `pageTitleSuffix`: a string added to the end of the page title. This only applies to the browser tab title, not the title shown at the top of the page.
- `enableSPA`: whether to enable [[SPA Routing]] on your site.
- `enablePopovers`: whether to enable [[popover previews]] on your site.
- `analytics`: what to use for analytics on your site. Values can be
  - `null`: don't use analytics;
  - `{ provider: 'google', tagId: '<your-google-tag>' }`: use Google Analytics;
  - `{ provider: 'plausible' }` (managed) or `{ provider: 'plausible', host: 'https://<your-plausible-host>' }` (self-hosted, make sure to include the `https://` protocol prefix): use [Plausible](https://plausible.io/);
  - `{ provider: 'umami', host: '<your-umami-host>', websiteId: '<your-umami-website-id>' }`: use [Umami](https://umami.is/);
  - `{ provider: 'goatcounter', websiteId: 'my-goatcounter-id' }` (managed) or `{ provider: 'goatcounter', websiteId: 'my-goatcounter-id', host: 'my-goatcounter-domain.com', scriptSrc: 'https://my-url.to/counter.js' }` (self-hosted) use [GoatCounter](https://goatcounter.com);
  - `{ provider: 'posthog', apiKey: '<your-posthog-project-apiKey>', apiHost: '<your-posthog-api-host>', uiHost: '<your-posthog-ui-host>', personProfiles: 'identified_only' }`: use [PostHog](https://posthog.com/). `uiHost` is required when `apiHost` is a reverse proxy. The legacy `host` option is an alias for `apiHost`;
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
- `ignorePatterns`: a list of [glob](<https://en.wikipedia.org/wiki/Glob_(programming)>) patterns that Quartz should ignore and not search through when looking for files inside the `content` folder. See [[private pages]] for more details.
- `theme`: configure how the site looks.
  - `fontOrigin`: where to load fonts from.
    - `"googleFonts"` (default): loads fonts from Google Fonts API. Fastest option, especially with CDN caching enabled.
    - `"local"`: downloads fonts and serves them from your site. Fully self-contained with no external requests.
  - `cdnCaching`: if `true` (default), use Google CDN to cache the fonts. This will generally be faster. Disable (`false`) this if you want Quartz to download the fonts to be self-contained.
  - `typography`: what fonts to use. Any font available on [Google Fonts](https://fonts.google.com/) works here.
    - `title`: font for the title of the site (optional, same as `header` by default)
    - `header`: font to use for headers
    - `code`: font for inline and block quotes
    - `body`: font for everything
  - `colors`: controls the theming of the site.
    - `light`: page background
    - `lightgray`: borders
    - `gray`: graph links, heavier borders
    - `darkgray`: body text
    - `dark`: header text and icons
    - `secondary`: link colour, current [[graph view|graph]] node
    - `tertiary`: hover states and visited [[graph view|graph]] nodes
    - `highlight`: internal link background, highlighted text, [[syntax highlighting|highlighted lines of code]]
    - `textHighlight`: markdown highlighted text background

## Plugins

You can think of Quartz plugins as a series of transformations over content.

![[quartz transform pipeline.png]]

```yaml title="quartz.config.yaml"
plugins:
  - source: github:quartz-community/created-modified-date
    enabled: true
    order: 10 # controls execution order
  - source: github:quartz-community/syntax-highlighting
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
- [[tags/plugin/filter|Filters]] **filter** content (e.g. filtering out drafts)
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

Quartz distinguishes between internal plugins that are bundled with Quartz and community plugins that are installed separately.

In `quartz.config.yaml`, community plugins are referenced by their GitHub source:

```yaml title="quartz.config.yaml"
plugins:
  - source: github:quartz-community/explorer
    enabled: true
  - source: github:quartz-community/syntax-highlighting
    enabled: true
    options:
      theme:
        light: github-light
        dark: github-dark
```

Internal plugins (like `FrontMatter`) are bundled with Quartz. Community plugins are installed separately and referenced by their `github:org/repo` source.

### Community Plugins

To install a community plugin, you can use the following command:

```shell
npx quartz plugin add github:quartz-community/explorer
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
  - source: github:quartz-community/explorer
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

> [!example] Real-world example
> The [quartz-themes](https://github.com/saberzero1/quartz-themes) plugin lives in the `plugin/` subdirectory of its repository. To install it:
>
> ```yaml title="quartz.config.yaml"
> plugins:
>   - source:
>       name: quartz-themes
>       repo: "https://github.com/saberzero1/quartz-themes.git"
>       subdir: plugin
>     enabled: true
>     options:
>       theme: "tokyo-night"
>       mode: both
> ```

> [!tip]
> The string form `github:user/repo#branch` and the object form `{ repo, ref }` are equivalent ways to specify a branch. Use the object form when you also need `subdir` or `name`, or when you prefer a more readable configuration.

### Usage

You can customize the behaviour of Quartz by adding, removing and reordering plugins in `quartz.config.yaml`. Each plugin entry specifies its source, whether it's enabled, execution order, and any options:

```yaml title="quartz.config.yaml"
plugins:
  - source: github:quartz-community/note-properties
    enabled: true
    options:
      includeAll: false
      includedProperties:
        - description
        - tags
        - aliases
    order: 5
  - source: github:quartz-community/created-modified-date
    enabled: true
    options:
      priority:
        - frontmatter
        - git
        - filesystem
    order: 10
  - source: github:quartz-community/latex
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
