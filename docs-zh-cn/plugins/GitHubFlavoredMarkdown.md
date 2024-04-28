---
title: GitHubFlavoredMarkdown
tags:
  - plugin/transformer
---

该插件增强了Markdown处理，以支持GitHub风格的Markdown（GFM），它添加了自动链接文字、脚注、删除线、表和任务列表等功能。

此外，该插件还添加了可选的排版优化功能（如将直引号转换为花引号，将短划线转换为英文短划线和省略号），并将自动标题链接作为悬停时显示在标题旁边的符号。

> [!note]
> 有关如何添加、删除或配置插件的信息，请参阅[[configuration#插件|配置]]页。

此插件接受以下配置选项：

- `enableSmartyPants`: 如果为`true`，则启用排版增强功能。默认值为`true`。
- `linkHeadings`: 如果为`true`，则自动向标题添加链接。默认值为`true`。

## API

- 分类: 转换器
- 函数名: `Plugin.GitHubFlavoredMarkdown()`.
- 源码: [`quartz/plugins/transformers/gfm.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/transformers/gfm.ts).
