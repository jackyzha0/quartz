---
title: "CreatedModifiedDate"
tags:
  - plugin/transformer
---

该插件使用三个潜在的数据源来确定文档的创建、修改和发布日期：前端元数据、Git历史记录和文件系统。查看 [[authoring content#语法|创作内容]] 了解详细信息。

> [!note]
> 有关如何添加、删除或配置插件的信息，请参阅[[configuration#插件|配置]]页。

此插件接受以下配置选项：

- `priority`: 要查询日期信息的数据源。最高优先级优先。可能的值有`"frontmatter"`、`"git"`和`"filesystem"`.。默认为`["frontmatter", "git", "filesystem"]`。

> [!warning]
> `quartz.config.ts`.如果日期依赖`git`，请确保在`quartz.config.ts`中将`defaultDateType` 设置为`modified` 。
>
> 本地文件的`filesystem` 日期可能与最终日期不匹配，这取决于你怎样[[hosting]]您的Quartz。在这种情况下，最好使用`git` 或 `frontmatter`来保证日期正确。

## API

- 分类: 转换器
- 函数名: `Plugin.CreatedModifiedDate()`.
- 源码: [`quartz/plugins/transformers/lastmod.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/transformers/lastmod.ts).
