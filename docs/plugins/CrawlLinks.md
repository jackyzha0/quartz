---
title: CrawlLinks
tags:
  - plugin/transformer
---

This plugin parses links and processes them to point to the right places. It is also needed for embedded links (like images). See [[Obsidian compatibility]] for more information.

> [!note]
> For information on how to add, remove or configure plugins, see the [[Configuration#Plugins|Configuration]] page.

This plugin accepts the following configuration options:

- `markdownLinkResolution`: Defines the strategy for resolving Markdown paths, can be `"absolute"` (default), `"relative"` or `"shortest"`.
- `prettyLinks`: When `true` (default), simplifies links by removing folder paths, making them more user-friendly.
- `openLinksInNewTab`: When `true`, configures external links to open in a new tab. Defaults to `false`.
- `lazyLoad`: When `true`, adds lazy loading to resource elements (`img`, `video`, etc.) to improve page load performance. Defaults to `false`.
- `externalLinkIcon`: Adds an icon next to external links when `true` (default) to visually distinguishing them from internal links.

> [!warning]
> Removing this plugin is _not_ recommended and will likely break the page.

## Technical Details

- Category: Transformer
- Function name: `Plugin.CrawlLinks()`.
- Source: [`quartz/plugins/transformers/links.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/transformers/links.ts).

