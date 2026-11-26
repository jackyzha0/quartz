---
title: Explorer
description: File tree explorer sidebar.
tags:
  - plugin/component
image:
repository: "[quartz-community/explorer](https://github.com/quartz-community/explorer)"
enabled: true
required: false
---

File tree explorer sidebar.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

See [[features/explorer|Explorer]] for detailed usage information.

## Configuration

This plugin accepts the following configuration options:

**YAML options** (in `quartz.config.yaml`):

- `title`: The title of the explorer. Defaults to the localized "Explorer" (see [[i18n]]).
- `folderClickBehavior`: The behavior when a folder is clicked. Can be `"link"` to navigate or `"collapse"` to toggle. Defaults to `link`.
- `folderDefaultState`: The default state of folders. Can be `"collapsed"` or `"open"`. Defaults to `collapsed`.
- `useSavedState`: Whether to use local storage to save the state of the explorer. Defaults to `true`.
- `sort`: Sort rules, applied in sequence: entries the first rule considers equal are sorted by the next one. Defaults to `[folder, title]` (folders first, then by title). See [[features/explorer#Sorting]].
- `rootFolder`: Show only this folder's contents, e.g. `Notes` or `Notes/Daily Notes`. Defaults to everything. See [[features/explorer#Several explorers]].
- `order`: The order in which `filterFn`, `mapFn` and `sortFn` run. Defaults to `[filter, map, sort]`.

**TS override options** (in `quartz.ts`, for callback functions that can't be expressed in YAML):

- `sortFn`: Custom sort function for ordering files and folders. Replaces `sort`.
- `filterFn`: Custom filter function to exclude specific nodes.
- `mapFn`: Custom map function to transform node properties (e.g. display names).

By default the explorer hides the `tags` folder (`filterFn`) and sorts folders before files, then by title in natural order (`Note 2` before `Note 10`).

### Default options

```yaml title="quartz.config.yaml"
- source: "@quartz-community/explorer"
  enabled: true
  options:
    folderClickBehavior: link
    folderDefaultState: collapsed
    useSavedState: true
  layout:
    position: left
    priority: 50
```

### TS override example

```ts title="quartz.ts"
import * as ExternalPlugin from "./.quartz/plugins"

// Must be placed before loadQuartzConfig()
ExternalPlugin.Explorer({
  mapFn: (node) => {
    node.displayName = node.displayName.toUpperCase()
    return node
  },
})
```

See [[features/explorer#Advanced customization]] for more examples.

## API

- Category: Component
- Function name: `ExternalPlugin.Explorer()`.
- Source: [`quartz-community/explorer`](https://github.com/quartz-community/explorer)
- Install: `npx quartz plugin add @quartz-community/explorer` (included in the default configuration)
