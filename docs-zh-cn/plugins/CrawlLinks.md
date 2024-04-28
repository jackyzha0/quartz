---
title: CrawlLinks
tags:
  - plugin/transformer
---

这个插件解析链接并处理它们以指向正确的位置。嵌入式链接（如图像）也需要它。参见[[Obsidian compatibility]]了解更多信息。

> [!note]
> 有关如何添加、删除或配置插件的信息，请参阅[[configuration#插件|配置]]页。

此插件接受以下配置选项：

- 设置解析Markdown路径的策略，可以是“绝对”、“相对”或“最短”。您应该在此处使用与[[Obsidian compatibility|Obsidian]]中相同的设置。
  - `absolute`: 相对于内容文件夹根的路径。
  - `relative`: 相对于要链接的文件的路径。
  - `shortest`: 文件的名称。如果这还不足以识别文件，请使用完整的绝对路径。
- `prettyLinks`: 如果为`true`（默认值），则通过删除文件夹路径简化链接，使其更便于用户使用（例如，`folder/deeply/nested/note`变为`note`）。
- `openLinksInNewTab`: 如果为`true`，则将外部链接配置为在新选项卡中打开。默认值为`false`。
- `lazyLoad`: 如果是`true`，则向资源元素（“img”、“video”等）添加延迟加载，以提高页面加载性能。默认为`false`。
- `externalLinkIcon`: 当为`true`（默认值）时，在外部链接旁边添加一个图标，以便在视觉上将它们与内部链接区分开来。

> [!warning]
> 不建议删除此插件，这可能会破坏页面。

## API

- 分类: 转换器
- 函数名: `Plugin.CrawlLinks()`.
- 源码: [`quartz/plugins/transformers/links.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/transformers/links.ts).
