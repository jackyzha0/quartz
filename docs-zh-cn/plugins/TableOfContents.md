---
title: TableOfContents
tags:
  - plugin/transformer
---

这个插件为Markdown文档生成一个目录（TOC）。参看[[table of contents]]了解更多信息。

> [!note]
> 有关如何添加、删除或配置插件的信息，请参阅[[configuration#插件|配置]]页。

此插件接受以下配置选项：

- `maxDepth`: 限制目录中所列标题的深度，范围从`1`（仅限顶级标题）到`6`（所有标题级别）。默认值为`3`。
- `minEntries`: 显示目录所需的最小标题条目数。默认值为`1。
- `showByDefault`: 如果`true`（默认值），则默认情况下应显示TOC。可以被元数据设置覆盖。
- `collapseByDefault`: 如果`true`，TOC将以折叠状态开始。默认值为`false`。

> [!warning]
> 此插件需要`Component.TableOfContents`组件，以确定在何处显示TOC。没有它，什么都不会显示。应始终将它们在一起添加或删除。

## API

- 分类: 转换器
- 函数名: `Plugin.TableOfContents()`.
- 源码: [`quartz/plugins/transformers/toc.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/transformers/toc.ts).
