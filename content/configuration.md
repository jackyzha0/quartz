---
title: Configuration
---

Quartz is meant to be extremely configurable, even if you don't know any coding. Most of the configuration you should need can be done by just editing `quartz.config.ts`. 

If you edit this file using a text-editor that has TypeScript language support like VSCode, it will warn you when you you've made an error in your configuration.

This configuration can be broken down into two main parts:

```ts
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
- `caononicalUrl`: sometimes called `baseURL` in other site generators. This is used for sitemaps and RSS feeds that require an absolute URL to know where the canonical 'home' of your site lives. This is normally the deployed URL of your site (e.g. `https://quartz.jzhao.xyz/` for this site). Note that Quartz 4 will avoid using this as much as possible and use relative URLs whenever it can to make sure your site works no matter *where* you end up actually deploying it.
- `ignorePatterns`: a list of [glob](https://en.wikipedia.org/wiki/Glob_(programming)) patterns that Quartz should ignore and not search through when looking for files inside the `content` folder.
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
> Each node is modified by every transformer *in order*. Some transformers are position-sensitive so you may need to take special note of whether it needs come before or after any other particular plugins. 

Additionally, plugins may also have their own configuration settings that you can pass in. For example, the [[Latex]] plugin allows you to pass in a field specifying the `renderEngine` to choose between Katex and MathJax.

```ts
transformers: [
	Plugin.FrontMatter(),                   // uses default options
	Plugin.Latex({ renderEngine: 'katex' }) // specify some options
]
```

### Layout
Certain emitters may also output [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) files. To make sure that 

### Components
