---
title: Configuration
---

Quartz is meant to be extremely configurable, even if you don't know any coding. Most of the configuration you should need can be done by just editing `quartz.config.ts`.

> [!tip]
> If you edit this file using a text-editor that has TypeScript language support like VSCode, it will warn you when you you've made an error in your configuration, helping you avoid configuration mistakes!

This configuration can be broken down into two main parts:

```ts title="quartz.config.ts"
const config: QuartzConfig = {
  configuration: { ... },
  plugins: { ... },
}
```

## General Configuration

This part of the configuration concerns anything that can affect the whole site. The following is a list breaking down all the things you can configure:

- `pageTitle`: used as an anchor to return to the home page. This is also used when generating the [[RSS Feed]] for your site.
- `enableSPA`: whether to enable [[SPA Routing]] on your site.
- `enablePopovers`: whether to enable [[popover previews]] on your site.
- `analytics`: what to use for analytics on your site. Values can be
  - `null`: don't use analytics;
  - `{ provider: 'plausible' }`: use [Plausible](https://plausible.io/), a privacy-friendly alternative to Google Analytics; or
  - `{ provider: 'google', tagId: <your-google-tag> }`: use Google Analytics
- `caononicalUrl`: sometimes called `baseURL` in other site generators. This is used for sitemaps and RSS feeds that require an absolute URL to know where the canonical 'home' of your site lives. This is normally the deployed URL of your site (e.g. `https://quartz.jzhao.xyz/` for this site). Note that Quartz 4 will avoid using this as much as possible and use relative URLs whenever it can to make sure your site works no matter _where_ you end up actually deploying it.
- `ignorePatterns`: a list of [glob](<https://en.wikipedia.org/wiki/Glob_(programming)>) patterns that Quartz should ignore and not search through when looking for files inside the `content` folder.
- `theme`: configure how the site looks.
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

![[quartz-transform-pipeline.png]]

```ts
plugins: {
  transformers: [...],
  filters: [...],
  emitters: [...],
}
```

- [[making plugins#Transformers|Transformers]] **map** over content, taking a Markdown file and outputting modified content or adding metadata to the file itself (e.g. parsing frontmatter, generating a description)
- [[making plugins#Filters|Filters]] **filter** content, taking the output of all the transformers and determining what files to actually keep and what to discord (e.g. filtering out drafts)
- [[making plugins#Emitters|Emitters]] **reduce** over content, taking in a list of all the transformed and filtered content and creating output files (e.g. creating an RSS feed or pages that list all files with a specific tag)

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

### Layout

Certain emitters may also output [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) files. To enable easy customization, these emitters allow you to fully rearrange the layout of the page. The default page layouts can be found in `quartz.layout.ts`.

Each page is composed of multiple different sections which contain `QuartzComponents`. The following code snippet lists all of the valid sections that you can add components to:

```typescript title="quartz/cfg.ts"
export interface FullPageLayout {
  head: QuartzComponent // single component
  header: QuartzComponent[] // laid out horizontally
  beforeBody: QuartzComponent[] // laid out vertically
  pageBody: QuartzComponent // single component
  left: QuartzComponent[] // vertical on desktop, horizontal on mobile
  right: QuartzComponent[] // vertical on desktop, horizontal on mobile
  footer: QuartzComponent // single component
}
```

These correspond to following parts of the page:

![[quartz-layout.png|800]]

> [!note]
> There are two additional layout fields that are _not_ shown in the above diagram.
>
> 1. `head` is a single component that renders the `<head>` [tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/head) in the HTML. This doesn't appear visually on the page and is only is responsible for metadata about the document like the tab title, scripts, and styles.
> 2. `header` is a set of components that are laid out horizontally and appears _before_ the `beforeBody` section. This enables you to replicate the old Quartz 3 header bar where the title, search bar, and dark mode toggle. By default, Quartz 4 doesn't place any components in the `header`.

Quartz **components**, like plugins, can take in additional properties as configuration options. If you're familiar with React terminology, you can think of them as Higher-order Components.

See [a list of all the components](./tags/component) for all available components along with their configuration options.

### Style

Most meaningful style changes like colour scheme and font can be done simply through the [[#General Configuration|general configuration]] options above.

However, if you'd like to make more involved style changes, you can do this by writing your own styles. Quartz 4, like Quartz 3, uses [Sass](https://sass-lang.com/guide/) for styling.

You can see the base style sheet in `quartz/styles/base.scss` and write your own in `quartz/styles/custom.scss`.

> [!note]
> Some components may provide their own styling as well! For example, `quartz/components/Darkmode.tsx` imports styles from `quartz/components/styles/darkmode.scss`. If you'd like to customize styling for a specific component, double check the component definition to see how its styles are defined.

When you're ready, see how [[build|build and preview]] Quartz locally.
