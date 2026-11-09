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

This plugin provides support for [Obsidian Bases](https://obsidian.md/help/bases) (`.base` files) in Quartz. It reads `.base` files from your vault, resolves matching notes based on the query definition, and renders them as interactive database-like views with support for tables, lists, cards, galleries, and boards. It uses the `default` [[layout#Page Frames|page frame]] (three-column layout with sidebars).

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

## Features

- **Table view**: Sortable columns with automatic type rendering (strings, numbers, booleans, arrays, links).
- **List view**: Compact list with metadata chips for each entry.
- **Cards view**: Card layout with an optional cover image (`image` property, `imageFit`, `imageAspectRatio`).
- **Gallery view**: Image-focused grid of thumbnails.
- **Board view**: Kanban-style columns, one per value of the grouping property (`boardProperty` or `groupBy`).
- **Multiple views**: A single `.base` file can define multiple views, displayed as switchable tabs. A base opens on its first view, as in Obsidian.
- **Embedding**: `![[Tasks.base]]` embeds a base in a note, and `![[Tasks.base#Open tasks]]` embeds one view (matched by its name as written, case-sensitively). Inline ` ```base ` code blocks work too.
- **Filters**: Recursive filter trees with `and`/`or`/`not` operators.
- **Formulas**: Computed properties via formula expressions.
- **Summaries**: Column-level aggregations (Sum, Average, Min, Max, Median, etc.).
- **Property configuration**: Custom display names for properties.
- **Link rendering**: Links (`link()`, link-valued properties such as `"[[Note]]"`) are rendered as clickable links; links to missing notes get Quartz's `broken` class.
- **Tag links**: tags in tables, lists, cards and boards link to their tag pages (when [[TagPage]] is enabled).

Map views from Obsidian are not supported: a view with an unknown type shows `Unknown view type: <type>`.

## Obsidian compatibility

bases-page 1.2 (shipped with Quartz 5.1) brings evaluation in line with Obsidian. Notable behaviour, some of it changed from earlier versions:

- `file.name` is the name without the extension for Markdown notes (`Note`) and with it for other files (`Plan.canvas`, `Tasks.base`). `file.basename` never has the extension, `file.fullname` always does (`Note.md`).
- `file.tags` lists tags as written, with `#` and their original case, inline tags first. The `tags` property holds only the frontmatter tags.
- `file.hasTag("a/b")`, `file.tags.contains("a/b")`, `containsAny` and `containsAll` also match nested tags (`a/b/c`) by whole segments, ignoring case and a leading `#`. `file.hasTag("x", "y")` is true when the note has **any** of the tags.
- Dates are shown as Obsidian shows them (moment's `L` / `L LT`) in the site's `configuration.locale`; `.format()` and `.relative()` are locale-aware. `date()` only reads ISO-style strings (`2024-03-05`, `2024-03-05 14:30`, `2024-03-05T14:30:00Z`) and `20240305`, in local time; other strings give an empty value.
- Subtracting dates gives a duration, shown like `9 days`. Durations have `.days`, `.hours`, `.minutes`, `.seconds`, `.milliseconds`, `.weeks` (fractional), and `.months`/`.years`; `duration()` takes one whole number and one unit (`1d`, `2 weeks`).
- `imageAspectRatio` on cards is height / width, as in Obsidian (0.5 is a wide cover, 2 a tall one; default 1).
- `file.folder` of a file at the root of the vault is `/`.
- `contains()`, `containsAny()` and `containsAll()` on text ignore case; on lists they are case-sensitive.
- `this`: in a base embedded in a note, `this.<key>` and `this.file` are that note's properties and file; on the `.base` page itself, `this` is the `.base` file.
- A formula error (such as an unknown function) is shown in its cell.
- `.base` files are listed in bases like other files.

With Quartz 5.1, `.base` pages follow the site's publish filters (e.g. [[ExplicitPublish]], [[RemoveDrafts]]): a `.base` file has no frontmatter, so with ExplicitPublish it is published only when a published note links to it. A `.base` page links only to the notes its views show.

## Interaction with `unlisted` pages

`BasesPage` respects the `file.data.unlisted` convention written by [[UnlistedPages]] and [[EncryptedPages]]. Pages marked `unlisted: true` (or encrypted pages with `stealth: true`) are excluded from every rendered base view — table, list, board, cards, gallery, and any custom view — regardless of whether the base's filter expression would match them. Unlisted pages also cannot be dereferenced from formulas on visible pages via `.asFile()`.

> [!note]
> Base views are **server-side rendered** HTML baked at build time. They do not update client-side after a visitor decrypts an encrypted page. Graph, explorer, and search all re-hydrate from the patched in-memory content index and show newly-unlocked pages for the rest of the browser session — base views do not, because they were materialized at build time with unlisted pages already excluded. A visitor who successfully decrypts a revealable encrypted page will see it appear in graph, explorer, and search, but **not** in any base view, until the site is rebuilt with that page listed. This is the same structural limitation that applies to backlinks, recent notes, folder listings, and tag listings.

## Configuration

This plugin accepts the following configuration options:

- `defaultViewType`: Open a base on its first view of this type. Unset by default: a base opens on its first view, as in Obsidian.
- `linkResolution`: How to resolve internal links in view renderers. Should match `configuration.links.markdownLinkResolution` (built-in [[CrawlLinks|link processing]]). Can be `"absolute"`, `"relative"`, or `"shortest"`. Defaults to `"shortest"`.
- `customViews`: A map of custom view renderers. Keys are view type names. These override built-in renderers for the same type, or add new view types. Requires a TS override.

### Default options

```yaml title="quartz.config.yaml"
- source: "@quartz-community/bases-page"
  enabled: true
  options:
    linkResolution: shortest
  order: 50
```

For custom view renderers, use a TS override in `quartz.ts`:

```ts title="quartz.ts (override)"
import * as ExternalPlugin from "./.quartz/plugins"

// Must be placed before loadQuartzConfig()
ExternalPlugin.BasesPage({
  customViews: {
    myView: ({
      entries,
      view,
      basesData,
      total,
      locale,
      slug,
      allSlugs,
      linkResolution,
      options,
      tagPages,
    }) => {
      // return JSX
    },
  },
})
```

A view renderer receives the matching `entries`, the `view` definition, the parsed `basesData`, the `total` count, the site `locale`, the page's `slug`, `allSlugs` and `linkResolution` (for resolving links), the registration's `options`, and `tagPages` (whether tags link to tag pages). Plugins can also register view types (with their own `css` and `afterDOMLoaded` script) through `viewRegistry` from `@quartz-community/bases-page/registry`.

## Expressions

Filters and formulas use the Obsidian Bases expression language (see [Obsidian's Bases syntax](https://obsidian.md/help/bases/syntax) and [functions](https://obsidian.md/help/bases/functions)). The plugin's [README](https://github.com/quartz-community/bases-page#expression-engine) lists the supported properties, functions and methods, and the compiler API exported from `@quartz-community/bases-page/compiler`.

## API

- Category: Transformer, Page Type, Component
- Function name: `ExternalPlugin.BasesPage()`.
- Source: [`quartz-community/bases-page`](https://github.com/quartz-community/bases-page)
- Install: `npx quartz plugin add @quartz-community/bases-page`
