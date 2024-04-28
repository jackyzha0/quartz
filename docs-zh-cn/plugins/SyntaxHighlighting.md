---
title: SyntaxHighlighting
tags:
  - plugin/transformer
---

该插件用于为Quartz中的代码块添加语法高亮显示。参见 [[syntax highlighting]]了解更多信息。

> [!note]
>有关如何添加、删除或配置插件的信息，请参阅[[configuration#插件|配置]]页。

此插件接受以下配置选项：

- `theme`: 一个[与Shikiji捆绑在一起的主题](https://shikiji.netlify.app/themes)的独立id。一个用于亮模式，一个用于暗模式。默认为`theme: { light: "github-light", dark: "github-dark" }`。
- `keepBackground`: 如果设置为`true`，将使用Shikiji主题的背景。使用`false` （默认值）时，将使用Quartz主题颜色作为背景。

此外，您还可以进一步覆盖`quartz/styles/syntax.scss`文件中的颜色。
## API

- 分类: 转换器
- 函数名: `Plugin.SyntaxHighlighting()`.
- 源码: [`quartz/plugins/transformers/syntax.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/transformers/syntax.ts).
