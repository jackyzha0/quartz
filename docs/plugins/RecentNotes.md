---
title: RecentNotes
description: Displays a list of recently modified notes.
tags:
  - plugin/component
image:
repository: "[quartz-community/recent-notes](https://github.com/quartz-community/recent-notes)"
enabled: false
required: false
---

Shows the most recent notes, newest first, by each page's default date (`defaultDateType` of [[CreatedModifiedDate]]: `modified` in the default config).

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

See [[recent notes]] for detailed usage information.

## Configuration

This plugin accepts the following configuration options:

- `title`: The title of the recent notes section. Defaults to the localized "Recent Notes" (see [[i18n]]).
- `limit`: The maximum number of recent notes to display. Defaults to `3`.
- `showTags`: Whether to display the tags for each note. Defaults to `true`.
- `linkToMore`: The slug of a page that lists more notes (e.g. `tags/` or a folder). When set and there are more notes than `limit`, a "See N more →" link is shown. Defaults to `false` (no link).
- `hideTagPages`: Whether to hide tag pages from the list. Defaults to `false`.
- `hideFolderPages`: Whether to hide folder pages from the list. Defaults to `false`.

Pages hidden with [[UnlistedPages]] are always left out.

**TS override options** (in `quartz.ts`, for callback functions that can't be expressed in YAML):

- `filter`: `(f: QuartzPluginData) => boolean{:ts}`, which pages to include. Defaults to all.
- `sort`: `(f1: QuartzPluginData, f2: QuartzPluginData) => number{:ts}`. Defaults to newest first, tie-breaking on title.

### Default options

The default config has a disabled entry without a `layout`; the component then goes after the page body (`afterBody`, priority `50`). To enable it:

```yaml title="quartz.config.yaml"
- source: "@quartz-community/recent-notes"
  enabled: true
  options:
    limit: 3
    showTags: true
    linkToMore: false
    hideTagPages: false
    hideFolderPages: false
  layout:
    position: afterBody
    priority: 50
```

### TS override example

```ts title="quartz.ts"
import * as ExternalPlugin from "./.quartz/plugins"

// Must be placed before loadQuartzConfig()
ExternalPlugin.RecentNotes({
  filter: (f) => f.slug?.startsWith("blog/") ?? false,
})
```

## API

- Category: Component
- Function name: `ExternalPlugin.RecentNotes()`.
- Source: [`quartz-community/recent-notes`](https://github.com/quartz-community/recent-notes)
- Install: `npx quartz plugin add @quartz-community/recent-notes`
