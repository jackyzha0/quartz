---
title: "Frontmatter"
tags:
  - plugin/transformer
---

This plugin parses the frontmatter of the page using the [gray-matter](https://github.com/jonschlinkert/gray-matter) library. See [[authoring content#Syntax]], [[Obsidian compatibility]] and [[OxHugo compatibility]] for more information.

这个插件使用 [gray-matter](https://github.com/jonschlinkert/gray-matter) 库解析页面的元数据，[[Obsidian compatibility]] 和[[OxHugo compatibility]] 了解更多信息。

> [!note]
> 有关如何添加、删除或配置插件的信息，请参阅[[configuration#插件|配置]]页。

此插件接受以下配置选项：

- `delimiters`: 用于标题的分隔符。可以有一个值（例如`"---"`），也可以有单独的值用于打开和关闭分隔符（例如`["---", "~~~"]`）。默认为`"---"`。
- `language`: 用于解析元数据的语言。可以是`yaml` （默认值）或`toml`。

> [!warning]
> 此插件不得删除，否则Quartz将损坏。

## API

- 分类: 转换器
- 函数名: `Plugin.Frontmatter()`.
- 源码: [`quartz/plugins/transformers/frontmatter.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/transformers/frontmatter.ts).
