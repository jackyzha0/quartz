---
title: OxHugoFlavoredMarkdown
tags:
  - plugin/transformer
---

此插件提供对[ox-hugo](https://github.com/kaushalmodi/ox-hugo) 兼容性的支持。参见[[OxHugo compatibility]] 了解更多信息。

> [!note]
> 有关如何添加、删除或配置插件的信息，请参阅[[configuration#插件|配置]]页。

此插件接受以下配置选项：

- `wikilinks`: 如果为 `true` （默认值），则将Hugo的 `{{ relref }}` 短代码转换为Quartz[[wikilinks]].
- `removePredefinedAnchor`: 如果为`true` （默认值），则从标题中删除预定义的锚点。
- `removeHugoShortcode`: 如果为`true`（默认值），则从内容中删除Hugo短代码语法（`{{}}`）。
- `replaceFigureWithMdImg`:  如果为`true` （默认值），则将`<figure/>`替换为`![]()`.
- `replaceOrgLatex`: 如果为 `true`（默认值），则将Org模式[[features/Latex|Latex]] 片段转换为封装在`$`（用于内联）和 `$$`（用于块方程）中的Quartz兼容LaTeX。

> [!warning]
> 你可以将其与[[ObsidianFlavoredMarkdown]]一起使用，但不建议这样做，因为它可能会以意想不到的方式对文件进行变异。小心使用。
>
> 如果使用`toml`frontmatter，请确保配置[[Frontmatter]] 插件。参见[[OxHugo compatibility]] 例如。

## API

- 分类: 转换器
- 函数名: `Plugin.OxHugoFlavoredMarkdown()`.
- 源码: [`quartz/plugins/transformers/oxhugofm.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/transformers/oxhugofm.ts).
