---
title: Recent Notes
tags: component
---

Quartz can generate a list of recent notes based on some filtering and sorting criteria. The plugin is in the default `quartz.config.yaml` but disabled; set `enabled: true` on its entry. It is placed in `afterBody` by default; add a `layout` block to put it somewhere else (see [[layout]]).

```yaml title="quartz.config.yaml"
plugins:
  - source: "@quartz-community/recent-notes"
    enabled: true
    options:
      limit: 3
      showTags: true
      linkToMore: false
    layout:
      position: right
      priority: 40
```

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

## Customization

Most options are configured in the `options` section of the plugin entry in `quartz.config.yaml`:

- Changing the title from "Recent notes": set `title: "Recent writing"` in options
- Changing the number of recent notes (default 3): set `limit: 5` in options
- Display the note's tags (defaults to true): set `showTags: false` in options
- Hide generated tag pages from the list (defaults to false): set `hideTagPages: true` in options. This filters out any page whose slug lives under the conventional `tags/` prefix.
- Hide generated folder index pages from the list (defaults to false): set `hideFolderPages: true` in options. This filters out any page whose slug matches Quartz's folder-path convention (trailing slash or `index` suffix).
- Show a 'see more' link (default `false`, no link): set `linkToMore: "tags/components"` in options. This field should be a full slug to a page that exists.
- Customize filtering: requires a TS override — pass `filter: someFilterFunction` to the plugin constructor in `quartz.ts`. The filter function should have the signature `(f: QuartzPluginData) => boolean`.
- Customize sorting: requires a TS override — pass `sort: someSortFunction` to the plugin constructor in `quartz.ts`. By default, Quartz will sort by date and then tie break lexicographically. The sort function should have the signature `(f1: QuartzPluginData, f2: QuartzPluginData) => number`.
- Install: `npx quartz plugin add @quartz-community/recent-notes`
- Source: [`quartz-community/recent-notes`](https://github.com/quartz-community/recent-notes)
