---
title: BasesPage
description: Renders Obsidian Bases files as database-style views.
tags:
  - plugin/pageType
  - plugin/component
image:
new-in-v5: true
repository: "[quartz-community/bases-page](https://github.com/quartz-community/bases-page)"
enabled: true
required: false
---

This plugin provides support for [Obsidian Bases](https://obsidian.md/help/bases) (`.base` files) in Quartz. It reads `.base` files from your vault, resolves matching notes based on the query definition, and renders them as interactive database-like views with support for tables, lists, cards, and maps. It uses the `default` [[layout#Page Frames|page frame]] (three-column layout with sidebars).

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

## Features

- **Table view**: Sortable columns with automatic type rendering (strings, numbers, booleans, arrays, links).
- **List view**: Compact list with metadata chips for each entry.
- **Cards view**: Card layout with optional image property support.
- **Map view**: Placeholder for future map-based visualization.
- **Multiple views**: A single `.base` file can define multiple views, displayed as switchable tabs.
- **Filters**: Recursive filter trees with `and`/`or`/`not` operators.
- **Formulas**: Computed properties via formula expressions.
- **Summaries**: Column-level aggregations (Sum, Average, Min, Max, Median, etc.).
- **Property configuration**: Custom display names for properties.
- **Link rendering**: Wikilinks and Markdown links within cell values are rendered as clickable links.

## Interaction with `unlisted` pages

`BasesPage` respects the `file.data.unlisted` convention written by [[UnlistedPages]] and [[EncryptedPages]]. Pages marked `unlisted: true` (or encrypted pages with `stealth: true`) are excluded from every rendered base view — table, list, board, cards, gallery, and any custom view — regardless of whether the base's filter expression would match them. Unlisted pages also cannot be dereferenced from formulas on visible pages via `.asFile()`.

> [!note]
> Base views are **server-side rendered** HTML baked at build time. They do not update client-side after a visitor decrypts an encrypted page. Graph, explorer, and search all re-hydrate from the patched in-memory content index and show newly-unlocked pages for the rest of the browser session — base views do not, because they were materialized at build time with unlisted pages already excluded. A visitor who successfully decrypts a revealable encrypted page will see it appear in graph, explorer, and search, but **not** in any base view, until the site is rebuilt with that page listed. This is the same structural limitation that applies to backlinks, recent notes, folder listings, and tag listings.

## Configuration

This plugin accepts the following configuration options:

- `defaultViewType`: The default view type when none is specified in the `.base` file. Defaults to `"table"`.
- `linkResolution`: How to resolve internal links in view renderers. Should match the `markdownLinkResolution` setting of the [[CrawlLinks]] plugin. Can be `"absolute"`, `"relative"`, or `"shortest"`. Defaults to `"shortest"`.
- `customViews`: A map of custom view renderers. Keys are view type names. These override built-in renderers for the same type, or add new view types. Requires a TS override.

### Default options

```yaml title="quartz.config.yaml"
- source: github:quartz-community/bases-page
  enabled: true
```

For custom view renderers, use a TS override in `quartz.ts`:

```ts title="quartz.ts (override)"
import * as ExternalPlugin from "./.quartz/plugins"

// Must be placed before loadQuartzConfig()
ExternalPlugin.BasesPage({
  defaultViewType: "table",
  customViews: {
    myView: ({ entries, view, basesData, total, locale }) => {
      // return JSX
    },
  },
})
```

## API

- Category: Page Type, Component
- Function name: `ExternalPlugin.BasesPage()`.
- Source: [`quartz-community/bases-page`](https://github.com/quartz-community/bases-page)
- Install: `npx quartz plugin add github:quartz-community/bases-page`
