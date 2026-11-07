---
title: CrawlLinks
description: Built-in link resolution (formerly the crawl-links plugin). Configured under configuration.links.
aliases:
  - links
  - crawl-links
tags:
  - plugin/transformer
  - built-in
image:
enabled: true
required: true
---

Link processing is [[built-in processing|built into Quartz]] (it used to be the `crawl-links` plugin). It rewrites links and embedded resources (images, videos, SVG embeds, …) so they point to the right place from any page, adds the `internal` / `external` / `alias` / `broken` classes, and records each page's outgoing links in `file.data.links` — used by [[features/backlinks|backlinks]], the [[graph view]], the content index and the `has-backlinks` layout condition. See [[Obsidian compatibility]] for more information.

Configure it under `configuration.links` in `quartz.config.yaml`:

```yaml title="quartz.config.yaml"
configuration:
  links:
    markdownLinkResolution: shortest
```

Options:

- `markdownLinkResolution`: Sets the strategy for resolving Markdown paths, can be `"absolute"`, `"relative"` or `"shortest"` (default; the `crawl-links` plugin defaulted to `"absolute"`). You should use the same setting here as in [[Obsidian compatibility|Obsidian]].
  - `absolute`: Path relative to the root of the content folder.
  - `relative`: Path relative to the file you are linking from.
  - `shortest`: Name of the file. If this isn't enough to identify the file, use the full absolute path.
- `prettyLinks`: If `true` (default), simplifies links by removing folder paths, making them more user friendly (e.g. `folder/deeply/nested/note` becomes `note`).
- `openLinksInNewTab`: If `true`, configures external links to open in a new tab. Defaults to `false`.
- `lazyLoad`: If `true`, adds lazy loading to resource elements (`img`, `video`, etc.) to improve page load performance. Defaults to `false`.
- `externalLinkIcon`: Adds an icon next to external links when `true` (default) to visually distinguishing them from internal links.
- `disableBrokenWikilinks`: If `true`, internal links whose resolved slug is not present in the site (i.e. no matching file under `markdownLinkResolution`) gain an additional `broken` CSS class alongside `internal`, so they can be styled distinctly. Defaults to `false`. Applies to both wikilinks and regular Markdown links, since both are indistinguishable `<a>` elements by the time links are processed.
- `enabled`: set to `false` to turn link processing off (not recommended — links break on nested pages and backlinks/graph are empty).
- `order`: position among transformers. Defaults to `60`, after the Markdown flavour plugins (e.g. [[ObsidianFlavoredMarkdown]] at `40`) that turn wikilinks into links.

> [!note]
> An existing `@quartz-community/crawl-links` entry in `quartz.config.yaml` is applied to `configuration.links` automatically. Run `npx quartz plugin doctor --fix` to move it.

## API

- Category: Transformer (built-in)
- Source: [`quartz/plugins/builtins/links.ts`](https://github.com/jackyzha0/quartz/blob/v5/quartz/plugins/builtins/links.ts)
- Can be replaced by a plugin that declares `quartz.capabilities.provides.data: ["links"]` (see [[built-in processing#Replacing a built-in]]).
