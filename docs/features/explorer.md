---
title: "Explorer"
tags:
  - component
---

Quartz features an explorer that allows you to navigate all files and folders on your site. It supports nested folders and is highly customizable.

> [!info]
> The Explorer is now a community plugin. This demonstrates how external plugins can extend Quartz functionality while serving as a reference implementation for plugin developers.

## Installation

The Explorer is part of the default `quartz.config.yaml`. If your config doesn't have it, add it with:

```bash
npx quartz plugin add @quartz-community/explorer
```

This adds an entry like this to your `quartz.config.yaml`:

```yaml title="quartz.config.yaml"
plugins:
  - source: "@quartz-community/explorer"
    enabled: true
    layout:
      position: left
      priority: 50
```

## Features

By default, it shows all folders and files on your page. To display the explorer in a different spot, you can edit the [[layout]].

Display names for folders get determined by the `title` frontmatter field in `folder/index.md` (more detail in [[authoring content | Authoring Content]]). If this file does not exist or does not contain frontmatter, the local folder name will be used instead.

> [!info]
> The explorer uses local storage by default to save the state of your explorer. This is done to ensure a smooth experience when navigating to different pages.
>
> To clear/delete the explorer state from local storage, delete the `fileTree` entry (guide on how to delete a key from local storage in chromium based browsers can be found [here](https://developer.chrome.com/docs/devtools/storage/localstorage)). You can disable this by passing `useSavedState: false` as an argument.

## Customization

Most configuration can be done through the plugin's `options`.

For example, here's what the default configuration looks like:

```yaml title="quartz.config.yaml"
plugins:
  - source: "@quartz-community/explorer"
    enabled: true
    options:
      title: Explorer # defaults to the translated "Explorer"
      folderClickBehavior: link # "link" to navigate or "collapse" to toggle
      folderDefaultState: collapsed # "collapsed" or "open"
      useSavedState: true
    layout:
      position: left
      priority: 50
```

### Sorting

`sort` is a list of rules. Each folder's entries are sorted by the first rule; entries it considers equal are sorted by the next one, and so on. A rule is `{ by: <key>, direction: asc | desc }` (`direction` defaults to `asc`), or just the key. As in [[Bases]] views, `direction` may also be written `ASC` / `DESC`, and `by` as `property`.

| `by`     | Sorts by                                                                                                                                                                                               |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `folder` | Folders before files (`desc`: files before folders)                                                                                                                                                    |
| `title`  | The displayed name (the page title), in natural order: `Note 2` before `Note 10`, case-insensitive                                                                                                     |
| `name`   | The file or folder name, whatever the title or `mapFn` (e.g. numbered names: `10 Research`)                                                                                                            |
| `date`   | The page's date, as `defaultDateType` picks it (created, modified or published). A folder's date is its index page's date when that page sets one in its frontmatter, else the date of its newest page |
| `tag`    | The page's tags in the order they are written: first tags compared, then second tags when those are equal, and so on. With `firstTagOnly: true`, only the first tags                                   |

Entries without a date or tags come after the others, in either direction. The default is `[folder, title]`. Newest first, folders still on top:

```yaml title="quartz.config.yaml"
plugins:
  - source: "@quartz-community/explorer"
    enabled: true
    options:
      sort:
        - folder
        - { by: date, direction: desc }
        - title
```

Grouped by first tag, newest first within a tag:

```yaml
sort:
  - by: tag
    firstTagOnly: true
  - by: date
    direction: desc
```

A `sortFn` set in `quartz.ts` replaces `sort`. Sorting runs at the `sort` step of `order`, so with the default order it sees the names `mapFn` set. `order: [filter, sort, map]` sorts by the original names, for example to strip [Johnny.Decimal](https://johnnydecimal.com/) prefixes in `mapFn` while keeping the numbered order.

### Several explorers

List the plugin once per explorer, each entry with its own options and layout. `rootFolder` shows only one folder's contents (a folder path as in your vault, or its slug):

```yaml title="quartz.config.yaml"
plugins:
  - source: "@quartz-community/explorer"
    enabled: true
    layout:
      position: left
      priority: 50
  - source: "@quartz-community/explorer"
    enabled: true
    options:
      title: Notes
      rootFolder: Notes/Daily Notes
    layout:
      position: left
      priority: 55
      display: desktop-only # one menu button on phones
```

Opened folders are remembered per folder, so a folder shown in both explorers is open or closed in both; scroll positions are kept per explorer. Options set in a TypeScript override apply to every entry.

### Custom functions

For custom sort, filter, and map functions, use the TS override in `quartz.ts`:

```ts title="quartz.ts"
import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import * as ExternalPlugin from "./.quartz/plugins"

// Advanced: pass callback functions that can't be expressed in YAML
ExternalPlugin.Explorer({
  sortFn: (a, b) => {
    /* ... */
  },
  filterFn: (node) => {
    /* ... */
  },
  mapFn: (node) => {
    /* ... */
  },
  order: ["filter", "map", "sort"],
})

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout()
```

> [!info] How overrides work
> When you call `ExternalPlugin.Explorer({...})` in `quartz.ts`, the options are recorded and merged with the YAML configuration when the component is instantiated during the build. Options set in `quartz.ts` take precedence over those in `quartz.config.yaml`, following this order: `plugin defaults < YAML options < quartz.ts overrides`.
>
> If you have two plugins that export the same name (e.g. two different Explorer plugins installed via `--name`), use the `plugins` map to disambiguate:
>
> ```ts title="quartz.ts"
> import * as ExternalPlugin from "./.quartz/plugins"
> ExternalPlugin.plugins["my-explorer"].Explorer({ mapFn: ... })
> ```

When passing in your own options, you can omit any or all of these fields if you'd like to keep the default value for that field.

Want to customize it even more?

- Removing explorer: remove the `explorer` entry from `quartz.config.yaml` or set `enabled: false`
  - (optional): After removing the explorer component, you can move the [[table of contents | Table of Contents]] component back to the `left` part of the layout
- Changing the sort order: [[#Sorting]]
- Custom `sort`, `filter` and `map` functions: explained in [[#Advanced customization]]

## Advanced customization

This component allows you to fully customize all of its behavior. You can pass a custom `sort`, `filter` and `map` function.
All functions you can pass work with the `FileTrieNode` class, which has the following properties:

```ts title="@quartz-community/explorer"
class FileTrieNode {
  isFolder: boolean
  children: Array<FileTrieNode>
  data: ContentDetails | null
}
```

```ts
export type ContentDetails = {
  slug: FullSlug
  title: string
  links: SimpleSlug[]
  tags: string[]
  content: string
  date?: string // ISO 8601, the date `defaultDateType` picks (Quartz 5.3+)
  dateFromFrontmatter?: true // the date is set in the page's frontmatter (Quartz 5.3+)
}
```

To sort by date, use `sort: [{ by: date, direction: desc }]` (see [[#Sorting]]), or compare `a.data?.date` in a `sortFn`.

Every function you can pass is optional. By default, only a `sort` function will be used:

```ts title="Default sort function"
// Sort order: folders first, then files. Sort folders and files alphabetically
ExternalPlugin.Explorer({
  sortFn: (a, b) => {
    if ((!a.isFolder && !b.isFolder) || (a.isFolder && b.isFolder)) {
      return a.displayName.localeCompare(b.displayName, undefined, {
        numeric: true,
        sensitivity: "base",
      })
    }

    if (!a.isFolder && b.isFolder) {
      return 1
    } else {
      return -1
    }
  },
})
```

---

You can pass your own functions for `sortFn`, `filterFn` and `mapFn`. All functions will be executed in the order provided by the `order` option (see [[#Customization]]). These functions behave similarly to their `Array.prototype` counterpart, except they modify the entire `FileNode` tree in place instead of returning a new one.

For more information on how to use `sort`, `filter` and `map`, you can check [Array.prototype.sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort), [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) and [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map).

Type definitions look like this:

```ts
type SortFn = (a: FileTrieNode, b: FileTrieNode) => number
type FilterFn = (node: FileTrieNode) => boolean
type MapFn = (node: FileTrieNode) => void
```

## Basic examples

These examples show the basic usage of `sort`, `map` and `filter`.

### Use `sort` to put files first

Files before folders, everything by title:

```yaml title="quartz.config.yaml"
plugins:
  - source: "@quartz-community/explorer"
    enabled: true
    options:
      sort:
        - { by: folder, direction: desc }
        - title
```

The same with a sort function in the TS override:

```ts title="quartz.ts (override)"
ExternalPlugin.Explorer({
  sortFn: (a, b) => {
    if (a.isFolder === b.isFolder) return a.displayName.localeCompare(b.displayName)
    return a.isFolder ? 1 : -1
  },
})
```

### Change display names (`map`)

Using this example, the display names of all `FileNodes` (folders + files) will be converted to full upper case.

```ts title="quartz.ts (override)"
ExternalPlugin.Explorer({
  mapFn: (node) => {
    node.displayName = node.displayName.toUpperCase()
    return node
  },
})
```

> [!note]
> The `mapFn`, `filterFn`, and `sortFn` options require JavaScript callback functions and cannot be expressed in YAML. Use the TS override for these. Sorting by folder, title, name, date or tag needs no code: see [[#Sorting]].

### Remove list of elements (`filter`)

Using this example, you can remove elements from your explorer by providing an array of folders/files to exclude.
Note that this example filters on the title but you can also do it via slug or any other field available on `FileTrieNode`.

```ts title="quartz.ts (override)"
ExternalPlugin.Explorer({
  filterFn: (node) => {
    // set containing names of everything you want to filter out
    const omit = new Set(["authoring content", "tags", "advanced"])

    // can also use node.slug or by anything on node.data
    // note that node.data is only present for files that exist on disk
    // (e.g. implicit folder nodes that have no associated index.md)
    return !omit.has(node.displayName.toLowerCase())
  },
})
```

### Remove files by tag

You can access the tags of a file by `node.data.tags`.

```ts title="quartz.ts (override)"
ExternalPlugin.Explorer({
  filterFn: (node) => {
    // exclude files with the tag "explorerexclude"
    return node.data?.tags?.includes("explorerexclude") !== true
  },
})
```

### Show every element in explorer

By default, the explorer will filter out the `tags` folder.
To override the default filter function, you can set the filter function to `undefined`.

```ts title="quartz.ts (override)"
ExternalPlugin.Explorer({
  filterFn: undefined, // apply no filter function, every file and folder will visible
})
```

## Advanced examples

> [!tip]
> When writing more complicated functions, the `quartz.ts` file can start to look very cramped.
> You can fix this by defining your sort functions outside of the component
> and passing it in.
>
> ```ts title="quartz.ts"
> import * as ExternalPlugin from "./.quartz/plugins"
> import type { ExplorerOptions } from "./.quartz/plugins"
>
> const mapFn: ExplorerOptions["mapFn"] = (node) => {
>   // implement your function here
> }
> const filterFn: ExplorerOptions["filterFn"] = (node) => {
>   // implement your function here
> }
> const sortFn: ExplorerOptions["sortFn"] = (a, b) => {
>   // implement your function here
> }
>
> ExternalPlugin.Explorer({
>   // ... your other options
>   mapFn,
>   filterFn,
>   sortFn,
> })
> ```

### Add emoji prefix

To add emoji prefixes (📁 for folders, 📄 for files), you could use a map function in `quartz.ts`:

```ts title="quartz.ts (override)"
ExternalPlugin.Explorer({
  mapFn: (node) => {
    if (node.isFolder) {
      node.displayName = "📁 " + node.displayName
    } else {
      node.displayName = "📄 " + node.displayName
    }
  },
})
```
