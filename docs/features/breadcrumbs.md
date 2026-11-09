---
title: "Breadcrumbs"
tags:
  - component
---

Breadcrumbs provide a way to navigate a hierarchy of pages within your site using a list of its parent folders.

By default, the element at the very top of your page is the breadcrumb navigation bar (can also be seen at the top on this page!).

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

## Customization

Most configuration can be done via the `options` section of the breadcrumbs plugin entry in `quartz.config.yaml`.

For example, here's what the default configuration looks like:

```yaml title="quartz.config.yaml"
plugins:
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
      condition: not-index # no breadcrumbs on the home page
```

For the TS override approach:

```ts title="quartz.ts (override)"
import * as ExternalPlugin from "./.quartz/plugins"

// Must be placed before loadQuartzConfig()
ExternalPlugin.Breadcrumbs({
  spacerSymbol: "❯",
  rootName: "Home",
  resolveFrontmatterTitle: true,
  showCurrentPage: true,
})
```

When passing in your own options, you can omit any or all of these fields if you'd like to keep the default value for that field.

You can also adjust where the breadcrumbs will be displayed by changing the `layout.position` field in the plugin entry in `quartz.config.yaml` (see [[layout]]).

Want to customize it even more?

- Removing breadcrumbs: remove the `breadcrumbs` entry from `quartz.config.yaml` or set `enabled: false`.
- Install: `npx quartz plugin add @quartz-community/breadcrumbs`
- Source: [`quartz-community/breadcrumbs`](https://github.com/quartz-community/breadcrumbs)
