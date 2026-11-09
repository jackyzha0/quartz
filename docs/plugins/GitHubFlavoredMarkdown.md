---
title: GitHubFlavoredMarkdown
description: GitHub Flavored Markdown support (tables, task lists, footnotes, strikethrough).
tags:
  - plugin/transformer
image:
repository: "[quartz-community/github-flavored-markdown](https://github.com/quartz-community/github-flavored-markdown)"
enabled: true
required: false
---

This plugin enhances Markdown processing to support GitHub Flavored Markdown (GFM) which adds features like autolink literals, footnotes, strikethrough, tables and tasklists.

In addition, this plugin adds optional features for typographic refinement (such as converting straight quotes to curly quotes, dashes to en-dashes/em-dashes, and ellipses) and automatic heading links as a symbol that appears next to the heading on hover.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin accepts the following configuration options:

- `enableSmartyPants`: When true, enables typographic enhancements. Default is true.
- `linkHeadings`: When true, gives headings their `id`s and adds a link to each heading. Default is true. Setting it to `false` also turns off heading ids, so links to headings (`[[page#Heading]]`) and section embeds no longer reach them (on pages with a [[table of contents]], TableOfContents still gives headings ids).

### Default options

```yaml title="quartz.config.yaml"
- source: "@quartz-community/github-flavored-markdown"
  enabled: true
  options:
    enableSmartyPants: true
    linkHeadings: true
  order: 30
```

This plugin must run before [[ObsidianFlavoredMarkdown]] (order `30` and `40` in the default config). If you set `order` on either plugin, keep this one first.

## Heading ids

Heading ids are made from the heading as written, with the same slug function that links and the [[table of contents]] use, and match GitHub's:

- With SmartyPants on, a heading containing `--` keeps it in its id: `## Range 1--2` → `range-1--2` (before 5.1: `range-12`). Links that hard-code the old id need updating; `[[page#Range 1--2]]` keeps working.
- Obsidian writes links to headings containing `:`, `|`, `^`, `#` or `\` with spaces instead (`[[note#Colon unspaced]]` for `## Colon:unspaced`). Such headings get an extra anchor (an empty `<span class="heading-alias">` with that id), so these links and section embeds reach them.
- A same-page link written as a heading's text, such as `[x](<#My Heading>)`, points at the heading's id.

## API

- Category: Transformer
- Function name: `ExternalPlugin.GitHubFlavoredMarkdown()`.
- Source: [`quartz-community/github-flavored-markdown`](https://github.com/quartz-community/github-flavored-markdown)
- Install: `npx quartz plugin add @quartz-community/github-flavored-markdown` (included in the default configuration)
