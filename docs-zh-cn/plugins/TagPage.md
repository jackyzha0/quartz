---
title: TagPage
tags:
  - plugin/emitter
---

这个插件为内容中使用的每个标签发出专用页面。参看[[folder and tag listings]]了解更多信息。

> [!note]
> 有关如何添加、删除或配置插件的信息，请参阅[[configuration#插件|配置]]页。

此插件没有配置选项。

这些页面是使用`quarter.layouts.ts`中的`defaultListPageLayout`显示。对于内容，将使用`TagContent`组件。如果要修改布局，必须直接编辑（`quarter/components/pages/TagContent.tsx`）。

## API

- 分类: 生成器
- 函数名: `Plugin.TagPage()`.
- 源码: [`quartz/plugins/emitters/tagPage.tsx`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/emitters/tagPage.tsx).
