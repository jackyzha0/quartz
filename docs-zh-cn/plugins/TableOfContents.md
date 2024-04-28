---
title: TableOfContents
tags:
  - plugin/transformer
---

This plugin generates a table of contents (TOC) for Markdown documents. See [[table of contents]] for more information.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin accepts the following configuration options:

- `maxDepth`: Limits the depth of headings included in the TOC, ranging from `1` (top level headings only) to `6` (all heading levels). Default is `3`.
- `minEntries`: The minimum number of heading entries required for the TOC to be displayed. Default is `1`.
- `showByDefault`: If `true` (default), the TOC should be displayed by default. Can be overridden by frontmatter settings.
- `collapseByDefault`: If `true`, the TOC will start in a collapsed state. Default is `false`.

> [!warning]
> This plugin needs the `Component.TableOfContents` component in `quartz.layout.ts` to determine where to display the TOC. Without it, nothing will be displayed. They should always be added or removed together.

## API

- Category: Transformer
- Function name: `Plugin.TableOfContents()`.
- Source: [`quartz/plugins/transformers/toc.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/transformers/toc.ts).
