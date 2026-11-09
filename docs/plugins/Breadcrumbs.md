---
title: Breadcrumbs
description: Breadcrumb navigation trail.
tags:
  - plugin/component
image:
repository: "[quartz-community/breadcrumbs](https://github.com/quartz-community/breadcrumbs)"
enabled: true
required: false
---

Navigation breadcrumb trail.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

See [[features/breadcrumbs|Breadcrumbs]] for detailed usage information.

## Configuration

This plugin accepts the following configuration options:

- `spacerSymbol`: The symbol to use between breadcrumb items. Defaults to `"❯"`.
- `rootName`: The name of the root page. Defaults to `Home`.
- `resolveFrontmatterTitle`: Whether to use the `title` frontmatter field for breadcrumb items. Defaults to `true`.
- `showCurrentPage`: Whether to show the current page in the breadcrumb trail. Defaults to `true`.

### Default options

```yaml title="quartz.config.yaml"
- source: "@quartz-community/breadcrumbs"
  enabled: true
  options:
    spacerSymbol: "❯"
    rootName: Home
    resolveFrontmatterTitle: true
    showCurrentPage: true
  layout:
    position: beforeBody
    priority: 5
    condition: not-index
```

## API

- Category: Component
- Function name: `ExternalPlugin.Breadcrumbs()`.
- Source: [`quartz-community/breadcrumbs`](https://github.com/quartz-community/breadcrumbs)
- Install: `npx quartz plugin add @quartz-community/breadcrumbs`
