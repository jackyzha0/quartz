---
title: 最近的笔记
tags:
  - component
---

默认情况下，Quartz可以根据一些过滤和排序标准生成最近的笔记列表[[layout]] ，您可以在`quartz.layout.ts`中添加`Component.RecentNotes`。
## 自定义

- 更改标题"Recent notes"：将一个附加参数传递给`Component.RecentNotes({ title: "Recent writing" })`
- 更改最近笔记的数量：将一个附加参数传递给`Component.RecentNotes({ limit: 5 })` 
- 显示“查看更多”链接：向“组件”传递一个附加参数。`Component.RecentNotes({ linkToMore: "tags/components" })`。此字段应该是已存在页面的完整slug。
- 自定义筛选：将一个附加参数传递给`Component.RecentNotes({ filter: someFilterFunction })`。筛选函数应该是签名为`(f: QuartzPluginData) => boolean`.的函数。
- 自定义排序：将一个附加参数传递给`Component.RecentNotes({ sort: someSortFunction })`。默认情况下，Quartz将按日期排序，然后以文字方式平局。排序函数应该是签名为`(f1: QuartzPluginData, f2: QuartzPluginData) => number`的函数。有关示例，请参阅 `quartz/components/PageList.tsx` 中的`byDateAndAlphabetical`。
- 组件: `quartz/components/RecentNotes.tsx`
- 样式: `quartz/components/styles/recentNotes.scss`
