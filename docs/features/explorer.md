---
title: "Explorer"
tags:
  - component
---

Quartz features an explorer that allows you to navigate all files and folders on your site. It supports nested folders and is highly customizable.

By default, it shows all folders and files on your page. To display the explorer in a different spot, you can edit the [[layout]].

Display names for folders get determined by the `title` frontmatter field in `folder/index.md` (more detail in [[authoring content | Authoring Content]]). If this file does not exist or does not contain frontmatter, the local folder name will be used instead.

> [!info]
> The explorer uses local storage by default to save the state of your explorer. This is done to ensure a smooth experience when navigating to different pages.
>
> To clear/delete the explorer state from local storage, delete the `fileTree` entry (guide on how to delete a key from local storage in chromium based browsers can be found [here](https://docs.devolutions.net/kb/general-knowledge-base/clear-browser-local-storage/clear-chrome-local-storage/)). You can disable this by passing `useSavedState: false` as an argument.

## Customization

Most configuration can be done by passing in options to `Component.Explorer()`.

For example, here's what the default configuration looks like:

```typescript title="quartz.layout.ts"
Component.Explorer({
  title: "Explorer", // title of the explorer component
  folderClickBehavior: "collapse", // what happens when you click a folder ("link" to navigate to folder page on click or "collapse" to collapse folder on click)
  folderDefaultState: "collapsed", // default state of folders ("collapsed" or "open")
  useSavedState: true, // wether to use local storage to save "state" (which folders are opened) of explorer
  // Sort order: folders first, then files. Sort folders and files alphabetically
  sortFn: (a, b) => {
    ... // default implementation shown later
  },
  filterFn: filterFn: (node) => node.name !== "tags", // filters out 'tags' folder
  mapFn: undefined,
  // what order to apply functions in
  order: ["filter", "map", "sort"],
})
```

When passing in your own options, you can omit any or all of these fields if you'd like to keep the default value for that field.

Want to customize it even more?

- Removing table of contents: remove `Component.Explorer()` from `quartz.layout.ts`
  - (optional): After removing the explorer component, you can move the [[table of contents | Table of Contents]] component back to the `left` part of the layout
- Changing `sort`, `filter` and `map` behavior: explained in [[#Advanced customization]]
- Component:
  - Wrapper (Outer component, generates file tree, etc): `quartz/components/Explorer.tsx`
  - Explorer node (recursive, either a folder or a file): `quartz/components/ExplorerNode.tsx`
- Style: `quartz/components/styles/explorer.scss`
- Script: `quartz/components/scripts/explorer.inline.ts`

## Advanced customization

This component allows you to fully customize all of its behavior. You can pass a custom `sort`, `filter` and `map` function.
All functions you can pass work with the `FileNode` class, which has the following properties:

```ts title="quartz/components/ExplorerNode.tsx" {2-5}
export class FileNode {
  children: FileNode[]  // children of current node
  name: string  // last part of slug
  displayName: string // what actually should be displayed in the explorer
  file: QuartzPluginData | null // set if node is a file, see `QuartzPluginData` for more detail
  depth: number // depth of current node

  ... // rest of implementation
}
```

Every function you can pass is optional. By default, only a `sort` function will be used:

```ts title="Default sort function"
// Sort order: folders first, then files. Sort folders and files alphabetically
Component.Explorer({
  sortFn: (a, b) => {
    if ((!a.file && !b.file) || (a.file && b.file)) {
      // sensitivity: "base": Only strings that differ in base letters compare as unequal. Examples: a ≠ b, a = á, a = A
      // numeric: true: Whether numeric collation should be used, such that "1" < "2" < "10"
      return a.displayName.localeCompare(b.displayName, undefined, {
        numeric: true,
        sensitivity: "base",
      })
    }
    if (a.file && !b.file) {
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
sortFn: (a: FileNode, b: FileNode) => number
filterFn: (node: FileNode) => boolean
mapFn: (node: FileNode) => void
```

> [!tip]
> You can check if a `FileNode` is a folder or a file like this:
>
> ```ts
> if (node.file) {
>   // node is a file
> } else {
>   // node is a folder
> }
> ```

## Basic examples

These examples show the basic usage of `sort`, `map` and `filter`.

### Use `sort` to put files first

Using this example, the explorer will alphabetically sort everything, but put all **files** above all **folders**.

```ts title="quartz.layout.ts"
Component.Explorer({
  sortFn: (a, b) => {
    if ((!a.file && !b.file) || (a.file && b.file)) {
      return a.displayName.localeCompare(b.displayName)
    }
    if (a.file && !b.file) {
      return -1
    } else {
      return 1
    }
  },
})
```

### Change display names (`map`)

Using this example, the display names of all `FileNodes` (folders + files) will be converted to full upper case.

```ts title="quartz.layout.ts"
Component.Explorer({
  mapFn: (node) => {
    node.displayName = node.displayName.toUpperCase()
  },
})
```

### Remove list of elements (`filter`)

Using this example, you can remove elements from your explorer by providing an array of folders/files using the `omit` set.

```ts title="quartz.layout.ts"
Component.Explorer({
  filterFn: (node) => {
    // set containing names of everything you want to filter out
    const omit = new Set(["authoring content", "tags", "hosting"])
    return !omit.has(node.name.toLowerCase())
  },
})
```

You can customize this by changing the entries of the `omit` set. Simply add all folder or file names you want to remove.

### Show every element in explorer

To override the default filter function that removes the `tags` folder from the explorer, you can set the filter function to `undefined`.

```ts title="quartz.layout.ts"
Component.Explorer({
  filterFn: undefined, // apply no filter function, every file and folder will visible
})
```

## Advanced examples

### Add emoji prefix

To add emoji prefixes (📁 for folders, 📄 for files), you could use a map function like this:

```ts title="quartz.layout.ts"
Component.Explorer({
  mapFn: (node) => {
    // dont change name of root node
    if (node.depth > 0) {
      // set emoji for file/folder
      if (node.file) {
        node.displayName = "📄 " + node.displayName
      } else {
        node.displayName = "📁 " + node.displayName
      }
    }
  },
})
```

### Putting it all together

In this example, we're going to customize the explorer by using functions from examples above to [[#Add emoji prefix | add emoji prefixes]], [[#remove-list-of-elements-filter| filter out some folders]] and [[#use-sort-to-put-files-first | sort with files above folders]].

```ts title="quartz.layout.ts"
Component.Explorer({
  filterFn: sampleFilterFn,
  mapFn: sampleMapFn,
  sortFn: sampleSortFn,
  order: ["filter", "sort", "map"],
})
```

Notice how we customized the `order` array here. This is done because the default order applies the `sort` function last. While this normally works well, it would cause unintended behavior here, since we changed the first characters of all display names. In our example, `sort` would be applied based off the emoji prefix instead of the first _real_ character.

To fix this, we just changed around the order and apply the `sort` function before changing the display names in the `map` function.

> [!tip]
> When writing more complicated functions, the `layout` file can start to look very cramped.
> You can fix this by defining your functions in another file.
>
> ```ts title="functions.ts"
> import { Options } from "./quartz/components/ExplorerNode"
> export const mapFn: Options["mapFn"] = (node) => {
>   // implement your function here
> }
> export const filterFn: Options["filterFn"] = (node) => {
>   // implement your function here
> }
> export const sortFn: Options["sortFn"] = (a, b) => {
>   // implement your function here
> }
> ```
>
> You can then import them like this:
>
> ```ts title="quartz.layout.ts"
> import { mapFn, filterFn, sortFn } from "./functions.ts"
> Component.Explorer({
>   mapFn: mapFn,
>   filterFn: filterFn,
>   sortFn: sortFn,
> })
> ```
