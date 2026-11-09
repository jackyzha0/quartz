---
title: Bases Support
tags:
  - component
---

Quartz supports rendering [Obsidian Bases](https://obsidian.md/help/bases) (`.base` files) as interactive database-like views. Bases files define queries over your vault's notes and display the results in configurable views such as tables, lists, cards, galleries, and boards.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

Bases support is provided by the [[BasesPage]] plugin, which is enabled by default. See the plugin page for configuration options, built-in views, notes on the expression language, and how to extend with custom views.

## Changed in Quartz 5.1 (bases-page 1.2)

Bases now behave like Obsidian's in many details. If you upgrade, check filters and formulas that rely on the old behaviour:

- A base opens on its **first view** (it used to open on the first table view); `defaultViewType` has no default.
- `file.name` of a Markdown note has no extension (`Note`); other files keep it (`Plan.canvas`). `file.fullname` always has it.
- `file.tags` keeps `#` and the tags' original case; the `tags` property holds only frontmatter tags. `hasTag()` matches nested tags and is true if **any** of the given tags match.
- Dates display in the site's locale; `date()` only parses ISO-style strings. Subtracting dates gives a duration (`9 days`) with `.days`, `.hours`, … fields.
- `imageAspectRatio` is height / width; `file.folder` of a root file is `/`; `contains()` on text ignores case.
- `this` in an embedded base refers to the embedding note.
- Tags link to tag pages; links to missing notes are marked broken.
- `.base` pages follow the site's publish filters, such as [[ExplicitPublish]].

See [[BasesPage#Obsidian compatibility]] for details.

## Demo

![[Base.base]]

## Customization

- Install: `npx quartz plugin add @quartz-community/bases-page`
- Source: [`quartz-community/bases-page`](https://github.com/quartz-community/bases-page)
