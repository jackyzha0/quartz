---
title: Plugins
image:
---

Quartz's functionality is provided by a collection of first-party community plugins. Each plugin can be enabled, disabled, and configured via `quartz.config.yaml`. See [[configuration#Plugins|Configuration]] for details on how to manage plugins.

> [!info] Internal vs Community Plugins
> Quartz has two kinds of plugins:
>
> - **Community plugins** are standalone repositories under [`quartz-community`](https://github.com/quartz-community), published to npm. In TS overrides, they use `ExternalPlugin.X()` (imported from `./.quartz/plugins`).
> - **Internal plugins** are built into Quartz core (Assets, Static, ComponentResources, NotFoundPage). In TS overrides, they use `Plugin.X()` (imported from `./quartz/plugins`).
>
> Frontmatter parsing, link processing, drafts and the content index are [[built-in processing]], configured under `configuration` rather than listed as plugins.

## Plugin types

Quartz plugins fall into several categories:

- **Transformers** process content during the build, e.g. highlighting syntax, rendering math, or adding Obsidian syntax.
- **Filters** decide which content files to include or exclude from the output.
- **Emitters** write other output files, e.g. alias redirects, social images, or a `CNAME` file.
- **Page Types** generate HTML pages — one per content file, folder, tag, canvas, or bases view.
- **Components** render UI elements in the page layout (sidebars, headers, footers, etc.).

To write your own, see [[making plugins]].

## First-party plugins

```base
filters:
  and:
    - file.ext == "md"
    - file.inFolder("plugins")
    - "!file.name.startsWith('index')"
    - "!file.name.contains('Demo')"
    - "!file.name.contains('Static')"
    - "!file.name.contains('Assets')"
    - "!file.name.contains('ComponentResources')"
    - "!file.name.contains('NotFoundPage')"
formulas:
  category: |
    if(file.hasTag("plugin/transformer"), "Transformer",
    if(file.hasTag("plugin/filter"), "Filter",
    if(file.hasTag("plugin/pageType"), "Page Type",
    if(file.hasTag("plugin/emitter"), "Emitter",
    if(file.hasTag("plugin/component"), "Component",
    "Other")))))
properties:
  title:
    displayName: Plugin
  repository:
    displayName: Repository
  enabled:
    displayName: Enabled
  required:
    displayName: Required
  description:
    displayName: Description
views:
  - type: table
    name: All Plugins
    groupBy:
      property: formula.category
      direction: ASC
    order:
      - title
      - repository
      - enabled
      - required
      - description
    sort:
      - property: formula.category
        direction: ASC
      - property: title
        direction: ASC
  - type: table
    name: Transformers
    filters:
      and:
        - file.hasTag("plugin/transformer")
    order:
      - title
      - repository
      - enabled
      - required
      - description
    sort:
      - property: title
        direction: ASC
  - type: table
    name: Filters
    filters:
      and:
        - file.hasTag("plugin/filter")
    order:
      - title
      - repository
      - enabled
      - required
      - description
    sort:
      - property: title
        direction: ASC
  - type: table
    name: Page Types
    filters:
      and:
        - file.hasTag("plugin/pageType")
    order:
      - title
      - repository
      - enabled
      - required
      - description
    sort:
      - property: title
        direction: ASC
  - type: table
    name: Emitters
    filters:
      and:
        - file.hasTag("plugin/emitter")
    order:
      - title
      - repository
      - enabled
      - required
      - description
    sort:
      - property: title
        direction: ASC
  - type: table
    name: Components
    filters:
      and:
        - file.hasTag("plugin/component")
    order:
      - title
      - repository
      - enabled
      - required
      - description
    sort:
      - property: title
        direction: ASC

```

> [!note] Multi-category plugins
> Some plugins span multiple categories. **TableOfContents** is both a transformer and a component. **EncryptedPages** is a transformer, emitter, and component. They appear in each relevant category above.
