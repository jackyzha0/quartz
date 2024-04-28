---
title: 关系图谱
tags:
  - component
---

Quartz features a graph-view that can show both a local graph view and a global graph view.
Quartz具有一个关系图谱，可以显示局部关系和全局关系。

- 局部关系图谱显示链接到当前文件或从当前文件链接的文件。换言之，它显示了最多一跳的所有笔记。
- 单击局部关系图谱右上角的图形图标可以切换全局图形视图。它显示了所有笔记以及它们是如何相互连接的。

默认情况下，笔记半径与该文件的传入和传出内部链接的总数成比例。

此外，与浏览器以不同颜色突出显示访问过的链接类似，关系图谱也将以不同颜色显示您访问过的节点。

> [!info]
> 关系图谱要求`ContentIndex` 生成器插件存在于[[configuration]]中。

## 自定义

Most configuration can be done by passing in options to `Component.Graph()`.
大多数配置都可以通过将选项传递给`Component.Graph()`。

例如，以下是默认配置的样子：

```typescript title="quartz.layout.ts"
Component.Graph({
  localGraph: {
    drag: true, // whether to allow panning the view around
    zoom: true, // whether to allow zooming in and out
    depth: 1, // how many hops of notes to display
    scale: 1.1, // default view scale
    repelForce: 0.5, // how much nodes should repel each other
    centerForce: 0.3, // how much force to use when trying to center the nodes
    linkDistance: 30, // how long should the links be by default?
    fontSize: 0.6, // what size should the node labels be?
    opacityScale: 1, // how quickly do we fade out the labels when zooming out?
    removeTags: [], // what tags to remove from the graph
    showTags: true, // whether to show tags in the graph
  },
  globalGraph: {
    drag: true,
    zoom: true,
    depth: -1,
    scale: 0.9,
    repelForce: 0.5,
    centerForce: 0.3,
    linkDistance: 30,
    fontSize: 0.6,
    opacityScale: 1,
    removeTags: [], // what tags to remove from the graph
    showTags: true, // whether to show tags in the graph
  },
})
```

在传递自己的选项时，如果希望保留这些字段的默认值，则可以省略其中的任何或全部字段。

想进一步定制吗？

- 删除关系图谱：从`quartz.layout.ts`中删除`Component.Graph()` 。
- 组件: `quartz/components/Graph.tsx`
- 样式: `quartz/components/styles/graph.scss`
- 脚本: `quartz/components/scripts/graph.inline.ts`
