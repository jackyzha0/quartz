---
title: 资源管理器
tags:
  - component
---

Quartz具有一个资源管理器，允许您浏览网站上的所有文件和文件夹。它支持嵌套文件夹，并且可高度自定义。

默认情况下，它显示页面上的所有文件夹和文件。要在其他位置显示资源管理器，可以编辑[[layout]].

文件夹的显示名称由`folder/index.md` 中的元数据中的`title`字段确定（更多详细信息请参阅[[authoring content|authoring content]]）。如果此文件不存在或不包含元数据，则将使用本地文件夹名称。

> [!info]
> 资源管理器默认使用本地存储来保存资源管理器的状态。这样做是为了确保在导航到不同页面时获得流畅的体验。
>
> 要从本地存储中清除/删除资源管理器状态，请删除`fileTree` 条目（有关如何在基于铬的浏览器中从本地存储删除密钥的指南，请参见[此处](https://docs.devolutions.net/kb/general-knowledge-base/clear-browser-local-storage/clear-chrome-local-storage/))。您可以通过传递`useSavedState: false` 作为参数来禁用此功能。

## 自定义

大多数配置都可以通过将选项传递给`Component.Explorer()`。

例如，以下是默认配置的样子：

```typescript title="quartz.layout.ts"
Component.Explorer({
  title: "Explorer", // title of the explorer component
  folderClickBehavior: "collapse", // what happens when you click a folder ("link" to navigate to folder page on click or "collapse" to collapse folder on click)
  folderDefaultState: "collapsed", // default state of folders ("collapsed" or "open")
  useSavedState: true, // whether to use local storage to save "state" (which folders are opened) of explorer
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

在传递自己的选项时，如果希望保留这些字段的默认值，则可以省略其中的任何或全部字段。

想进一步定制吗？

- 删除资源管理器：从 `quartz.layout.ts` 中删除 `Component.Explorer()` 
  - （可选）：删除资源管理器组件后，可以将[[table of contents|table of contents]]组件移回布局的“左”部分
- 更改“排序”、“筛选”和“映射”行为：在[[#高级自定义]]中解释
- 组件:
  - 包装器（外部组件、生成文件树等）：`quarter/components/Explorer.tsx`
  - 资源管理器节点（递归，文件夹或文件）：`quartz/components/ExplorerNode.tsx`
- 样式: `quartz/components/styles/explorer.scss`
- 脚本: `quartz/components/scripts/explorer.inline.ts`

## 高级自定义

此组件允许您完全自定义其所有行为。您可以传递自定义的“排序”、“筛选”和“映射”函数。

您可以传递的所有函数都使用`FileNode` 类，该类具有以下属性：

```ts title="quartz/components/ExplorerNode.tsx" {2-5}
export class FileNode {
  children: FileNode[]  // children of current node
  name: string  // last part of slug
  displayName: string // what actually should be displayed in the explorer
  file: QuartzPluginData | null // if node is a file, this is the file's metadata. See `QuartzPluginData` for more detail
  depth: number // depth of current node

  ... // rest of implementation
}
```

您可以传递的每个函数都是可选的。默认情况下，只会使用“排序”功能：

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

您可以为`sortFn`、 `filterFn` 和 `mapFn`传递自己的函数。所有功能将按照`order` 选项提供的顺序执行（请参见[[#自定义]]）。这些函数的行为与它们的 `Array.prototype` 对应函数类似，只是它们修改了整个`FileNode`树，而不是返回一个新的树。

有关如何使用`sort`、`filter` 和 `map`的更多信息，可以查看[Array.prototype.sort（）](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)，[Array.prototype.filter（）](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)和[Array.prototype.map（）](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)。

类型定义如下所示：

```ts
sortFn: (a: FileNode, b: FileNode) => number
filterFn: (node: FileNode) => boolean
mapFn: (node: FileNode) => void
```

> [!tip]
> 您可以检查`FileNode` 是文件夹还是类似的文件：
>
> ```ts
> if (node.file) {
>   // node is a file
> } else {
>   // node is a folder
> }
> ```

## 基础示例

These examples show the basic usage of `sort`, `map` and `filter`.

### 使用“`sort`将文件放在第一位

使用此示例，资源管理器将按字母顺序对所有内容进行排序，但将所有**文件**置于所有**文件夹**之上。

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

### 更改显示名称（`map`）

使用此示例，所有`FileNodes` （文件夹+文件）的显示名称将转换为大写。

```ts title="quartz.layout.ts"
Component.Explorer({
  mapFn: (node) => {
    node.displayName = node.displayName.toUpperCase()
  },
})
```

### 删除元素列表（`filter`）

使用此示例，您可以通过使用`omit` 集提供文件夹/文件的数组来从资源管理器中删除元素。

```ts title="quartz.layout.ts"
Component.Explorer({
  filterFn: (node) => {
    // set containing names of everything you want to filter out
    const omit = new Set(["authoring content", "tags", "hosting"])
    return !omit.has(node.name.toLowerCase())
  },
})
```

您可以通过更改`omit` 集合的条目来进行自定义。只需添加所有要删除的文件夹或文件名。

### 按标记删除文件

您可以通过`node.file?.frontmatter?`。这允许您根据文件的主题过滤掉文件，例如通过它们的标签。

```ts title="quartz.layout.ts"
Component.Explorer({
  filterFn: (node) => {
    // exclude files with the tag "explorerexclude"
    return node.file?.frontmatter?.tags?.includes("explorerexclude") !== true
  },
})
```

### 在资源管理器中显示每个元素

要覆盖从资源管理器中删除`tags` 文件夹的默认筛选功能，可以将筛选功能设置为`undefined`.。

```ts title="quartz.layout.ts"
Component.Explorer({
  filterFn: undefined, // apply no filter function, every file and folder will visible
})
```

## 高级示例

> [!tip]
> 当编写更复杂的函数时，`layout`文件可能会开始显得非常局促。
> 可以通过在另一个文件中定义函数来解决此问题。
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
> 然后可以像这样导入它们：
>
> ```ts title="quartz.layout.ts"
> import { mapFn, filterFn, sortFn } from "./functions.ts"
> Component.Explorer({
>   mapFn: mapFn,
>   filterFn: filterFn,
>   sortFn: sortFn,
> })
> ```

### 添加表情符号前缀

添加表情符号前缀(📁 对于文件夹，📄 对于文件），您可以使用这样的映射函数：

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

### 把它们放在一起

在本例中，我们将使用上述示例中的函数来自定义资源管理器：[[#添加表情符号前缀]]、[[#删除元素列表（`filter`）]]和[[#使用“`sort`将文件放在第一位]]。

```ts title="quartz.layout.ts"
Component.Explorer({
  filterFn: sampleFilterFn,
  mapFn: sampleMapFn,
  sortFn: sampleSortFn,
  order: ["filter", "sort", "map"],
})
```

请注意我们是如何在此处自定义`order`数组的。这样做是因为默认顺序最后应用`order`函数。虽然这通常工作得很好，但由于我们更改了所有显示名称的第一个字符，因此会导致意外行为。在我们的示例中，将基于表情符号前缀而不是第一个_真实_字符来应用排序。

为了解决这个问题，我们只是更改了顺序，并在更改`map` 函数中的显示名称之前应用了`sort` 函数。

### 将`sort` 与预定义的排序顺序一起使用

这里是另一个例子，其中包含文件/文件夹名称（作为slugs）的映射用于在quartz中定义资源管理器的排序顺序。所有未在`nameOrderMap` 中列出的文件/文件夹都将显示在该文件夹层次结构级别的顶部。

It's also worth mentioning, that the smaller the number set in `nameOrderMap`, the higher up the entry will be in the explorer. Incrementing every folder/file by 100, makes ordering files in their folders a lot easier. Lastly, this example still allows you to use a `mapFn` or frontmatter titles to change display names, as it uses slugs for `nameOrderMap` (which is unaffected by display name changes).
还值得一提的是，`nameOrderMap`中设置的数字越小，资源管理器中的条目就越高。将每个文件夹/文件增加100，可以更容易地对文件夹中的文件进行排序。最后，此示例仍然允许您使用`mapFn`或元数据`title`来更改显示名称，因为它使用`nameOrderMap`的slugs（不受显示名称更改的影响）。

```ts title="quartz.layout.ts"
Component.Explorer({
  sortFn: (a, b) => {
    const nameOrderMap: Record<string, number> = {
      "poetry-folder": 100,
      "essay-folder": 200,
      "research-paper-file": 201,
      "dinosaur-fossils-file": 300,
      "other-folder": 400,
    }

    let orderA = 0
    let orderB = 0

    if (a.file && a.file.slug) {
      orderA = nameOrderMap[a.file.slug] || 0
    } else if (a.name) {
      orderA = nameOrderMap[a.name] || 0
    }

    if (b.file && b.file.slug) {
      orderB = nameOrderMap[b.file.slug] || 0
    } else if (b.name) {
      orderB = nameOrderMap[b.name] || 0
    }

    return orderA - orderB
  },
})
```

作为参考，以下是quartz资源管理器窗口在该示例中的样子：

```
📖 Poetry Folder
📑 Essay Folder
    ⚗️ Research Paper File
🦴 Dinosaur Fossils File
🔮 Other Folder
```

这就是文件结构的样子：

```
index.md
poetry-folder
    index.md
essay-folder
    index.md
    research-paper-file.md
dinosaur-fossils-file.md
other-folder
    index.md
```
