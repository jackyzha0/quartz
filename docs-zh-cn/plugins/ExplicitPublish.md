---
title: ExplicitPublish
tags:
  - plugin/filter
---

该插件基于元数据中的显式`publish`标志过滤内容，只允许明确标记为发布的内容通过。这是[[RemoveDrafts]]的选择加入版本。查看[[private pages]]了解更多信息。

> [!note]
> 有关如何添加、删除或配置插件的信息，请参阅[[configuration#插件|配置]]页。

此插件没有配置选项。

## API

- 分类: 过滤器
- 函数名: `Plugin.ExplicitPublish()`.
- 源码: [`quartz/plugins/filters/explicit.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/filters/explicit.ts).
