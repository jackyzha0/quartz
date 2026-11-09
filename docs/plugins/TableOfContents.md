---
title: TableOfContents
description: Generates and renders a table of contents from headings.
tags:
  - plugin/transformer
  - plugin/component
image: https://images.unsplash.com/photo-1768527338896-3765921e992d
repository: "[quartz-community/table-of-contents](https://github.com/quartz-community/table-of-contents)"
enabled: true
required: false
---

This plugin generates a table of contents (TOC) for Markdown documents. See [[table of contents]] for more information.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin accepts the following configuration options:

- `maxDepth`: Limits the depth of headings included in the TOC, ranging from `1` (top level headings only) to `6` (all heading levels). Default is `3`.
- `minEntries`: The TOC is only shown when it has more than this many entries. Default is `1` (a page needs at least two headings).
- `showByDefault`: If `true` (default), the TOC should be displayed by default. Can be overridden per page with the `enableToc` frontmatter key.
- `collapseByDefault`: If `true`, the TOC will start in a collapsed state. Default is `false`.
- `layout`: The visual layout of the TOC component. Can be `"modern"` or `"legacy"`. Default is `"modern"`.

As in Obsidian's outline, headings inside blockquotes and callouts are left out. Entries link to the heading ids that [[GitHubFlavoredMarkdown]] gives the headings (read from the rendered headings, with the same slug function as a fallback), so they always match, including for repeated headings (`-1`, `-2`).

One plugin entry provides both the transformer that collects the headings and the component that displays them; its `layout` places the component:

### Default options

```yaml title="quartz.config.yaml"
- source: "@quartz-community/table-of-contents"
  enabled: true
  options:
    maxDepth: 3
    minEntries: 1
    showByDefault: true
    collapseByDefault: false
    layout: modern
  order: 50
  layout:
    position: right
    priority: 30
```

## API

- Category: Transformer, Component
- Function names: `ExternalPlugin.TableOfContents()` (component), `ExternalPlugin.TableOfContentsTransformer()` (transformer).
- Source: [`quartz-community/table-of-contents`](https://github.com/quartz-community/table-of-contents)
- Install: `npx quartz plugin add @quartz-community/table-of-contents` (included in the default configuration)
