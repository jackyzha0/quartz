---
title: ObsidianFlavoredMarkdown
tags:
  - plugin/transformer
---

此插件提供对[[Obsidian compatibility]]支持。

> [!note]
> 有关如何添加、删除或配置插件的信息，请参阅[[configuration#插件|配置]]页。

此插件接受以下配置选项：

- `comments`: 如果为`true`（默认值），则启用对`%%`样式的Obsidian注释块的分析。
- `highlight`: 如果为`true`（默认值），则启用对内容中`==`样式高亮显示的解析。
- `wikilinks`: 如果为`true`（默认值），则转到[[wikilinks]] 转换为常规链接。
- `callouts`: 如果为`true`（默认值），则添加对的支持[[callouts|callout]]块，用于强调内容。
- `mermaid`: 如果为`true`（默认值），则启用[[Mermaid diagrams]]在Markdown文件中渲染。
- `parseTags`: 如果为`true` （默认值），则解析并链接内容中的标签。
- `parseArrows`: 如果为`true` （默认值），则将箭头符号转换为等效的HTML字符。
- `parseBlockReferences`: 如果为`true` （默认值），则处理块引用，链接到特定的内容块。
- `enableInHtmlEmbed`: 如果为`true`,，则允许直接在HTML中嵌入内容。默认为`false`。
- `enableYouTubeEmbed`: 如果`true`（默认值），则启用使用外部图像Markdown语法嵌入YouTube视频和播放列表。
- `enableVideoEmbed`: 如果为`true` （默认值），则启用视频文件的嵌入。
- `enableCheckbox`: 如果为`true`，则添加对内容中交互式复选框的支持。默认为`false`.。

> [!warning]
> 请不要移除这个插件，如果您正在使用[[Obsidian compatibility|Obsidian]] 来编写内容！

## API

- 分类: 转换器
- 函数名 `Plugin.ObsidianFlavoredMarkdown()`.
- 源码: [`quartz/plugins/transformers/toc.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/transformers/toc.ts).
