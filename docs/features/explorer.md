---
title: "Explorer"
tags:
  - component
---

Quartz features an explorer that allows you to navigate all files and folders on your site. It supports nested folders and is highly customizable.

> [!info]
> The Explorer is now a community plugin. This demonstrates how external plugins can extend Quartz functionality while serving as a reference implementation for plugin developers.

## Installation

The Explorer is available as a community plugin from GitHub:

```bash
npm install github:quartz-community/explorer --legacy-peer-deps
```

Then add it to your `quartz.config.yaml`:

```yaml title="quartz.config.yaml"
plugins:
  - source: github:quartz-community/explorer
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

Most configuration can be done by passing in options to `Explorer()`.

For example, here's what the default configuration looks like:

```yaml title="quartz.config.yaml"
plugins:
  - source: github:quartz-community/explorer
    enabled: true
    options:
      title: Explorer
      folderClickBehavior: collapse # "link" to navigate or "collapse" to toggle
      folderDefaultState: collapsed # "collapsed" or "open"
      useSavedState: true
    layout:
      position: left
      priority: 50
```

For advanced options like custom sort, filter, and map functions, use the TS override in `quartz.ts`:

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
- Changing `sort`, `filter` and `map` behavior: explained in [[#Advanced customization]]

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
}
```

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

Using this example, the explorer will alphabetically sort everything.

```yaml title="quartz.config.yaml"
plugins:
  - source: github:quartz-community/explorer
    enabled: true
    options:
      # Simple options go in YAML
      title: Explorer
      folderDefaultState: collapsed
```

Custom sort functions require the TS override:

```ts title="quartz.ts (override)"
ExternalPlugin.Explorer({
  sortFn: (a, b) => {
    return a.displayName.localeCompare(b.displayName)
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
> The `mapFn`, `filterFn`, and `sortFn` options require JavaScript callback functions and cannot be expressed in YAML. Use the TS override for these.

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
