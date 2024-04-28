---
title: RemoveDrafts
tags:
  - plugin/filter
---

此插件从您的vault中筛选出内容，以便只提供最终确定的内容。这样可以防止[[private pages]]禁止发布。默认情况下，它会过滤掉标题中带有`draft: true` 的所有页面，并保留所有其他页面不变。

> [!note]
> 有关如何添加、删除或配置插件的信息，请参阅[[configuration#插件|配置]]页。

此插件没有配置选项。

## API

- 分类: 过滤器
- 函数名: `Plugin.RemoveDrafts()`.
- 源码: [`quartz/plugins/filters/draft.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/filters/draft.ts).
