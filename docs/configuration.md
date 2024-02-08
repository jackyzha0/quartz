---
title: Configuration
---

Quartz is meant to be extremely configurable, even if you don't know any coding. Most of the configuration you should need can be done by just editing `quartz.config.ts` or changing [[layout|the layout]] in `quartz.layout.ts`.

> [!tip]
> If you edit Quartz configuration using a text-editor that has TypeScript language support like VSCode, it will warn you when you you've made an error in your configuration, helping you avoid configuration mistakes!

The configuration of Quartz can be broken down into two main parts:

```ts title="quartz.config.ts"
const config: QuartzConfig = {
  configuration: { ... },
  plugins: { ... },
}
```

## General Configuration

This part of the configuration concerns anything that can affect the whole site. The following is a list breaking down all the things you can configure:

- `pageTitle`: title of the site. This is also used when generating the [[RSS Feed]] for your site.
- `enableSPA`: whether to enable [[SPA Routing]] on your site.
- `enablePopovers`: whether to enable [[popover previews]] on your site.
- `analytics`: what to use for analytics on your site. Values can be
  - `null`: don't use analytics;
  - `{ provider: 'plausible' }`: use [Plausible](https://plausible.io/), a privacy-friendly alternative to Google Analytics; or
  - `{ provider: 'google', tagId: <your-google-tag> }`: use Google Analytics
- `locale`: used for [[i18n]] and date formatting
- `baseUrl`: this is used for sitemaps and RSS feeds that require an absolute URL to know where the canonical 'home' of your site lives. This is normally the deployed URL of your site (e.g. `quartz.jzhao.xyz` for this site). Do not include the protocol (i.e. `https://`) or any leading or trailing slashes.
  - This should also include the subpath if you are [[hosting]] on GitHub pages without a custom domain. For example, if my repository is `jackyzha0/quartz`, GitHub pages would deploy to `https://jackyzha0.github.io/quartz` and the `baseUrl` would be `jackyzha0.github.io/quartz`
  - Note that Quartz 4 will avoid using this as much as possible and use relative URLs whenever it can to make sure your site works no matter _where_ you end up actually deploying it.
- `ignorePatterns`: a list of [glob](<https://en.wikipedia.org/wiki/Glob_(programming)>) patterns that Quartz should ignore and not search through when looking for files inside the `content` folder. See [[private pages]] for more details.
- `defaultDateType`: whether to use created, modified, or published as the default date to display on pages and page listings.
- `theme`: configure how the site looks.
  - `cdnCaching`: Whether to use Google CDN to cache the fonts (generally will be faster). Disable this if you want Quartz to be self-contained. Default to `true`
  - `typography`: what fonts to use. Any font available on [Google Fonts](https://fonts.google.com/) works here.
    - `header`: Font to use for headers
    - `code`: Font for inline and block quotes.
    - `body`: Font for everything
  - `colors`: controls the theming of the site.
    - `light`: page background
    - `lightgray`: borders
    - `gray`: graph links, heavier borders
    - `darkgray`: body text
    - `dark`: header text and icons
    - `secondary`: link colour, current [[graph view|graph]] node
    - `tertiary`: hover states and visited [[graph view|graph]] nodes
    - `highlight`: internal link background, highlighted text, [[syntax highlighting|highlighted lines of code]]

## Plugins

You can think of Quartz plugins as a series of transformations over content.

![[quartz transform pipeline.png]]

```ts
plugins: {
  transformers: [...],
  filters: [...],
  emitters: [...],
}
```

- [[making plugins#Transformers|Transformers]] **map** over content (e.g. parsing frontmatter, generating a description)
- [[making plugins#Filters|Filters]] **filter** content (e.g. filtering out drafts)
- [[making plugins#Emitters|Emitters]] **reduce** over content (e.g. creating an RSS feed or pages that list all files with a specific tag)

By adding, removing, and reordering plugins from the `tranformers`, `filters`, and `emitters` fields, you can customize the behaviour of Quartz.

> [!note]
> Each node is modified by every transformer _in order_. Some transformers are position-sensitive so you may need to take special note of whether it needs come before or after any other particular plugins.

Additionally, plugins may also have their own configuration settings that you can pass in. For example, the [[Latex]] plugin allows you to pass in a field specifying the `renderEngine` to choose between Katex and MathJax.

```ts
transformers: [
  Plugin.FrontMatter(), // uses default options
  Plugin.Latex({ renderEngine: "katex" }), // specify some options
]
```

If you'd like to make your own plugins, read the guide on [[making plugins]] for more information.
