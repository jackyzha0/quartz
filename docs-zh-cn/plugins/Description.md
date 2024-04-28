---
title: Description
tags:
  - plugin/transformer
---

此插件生成的描述用作HTML`head`的元数据，[[RSS订阅]] 和[[folder and tag listings]] 中如果没有正文内容，则使用描述作为标题和列表之间的文本。

如果元数据中包含 `description` 属性，则使用它（请参见[[authoring content#语法|创作内容]]）。否则，插件将尽最大努力使用内容的前几句话来达到目标描述长度。

> [!note]
> 有关如何添加、删除或配置插件的信息，请参阅[[configuration#插件|配置]]页。

此插件接受以下配置选项：

- `descriptionLength`: 生成的描述的最大长度。默认值为150个字符。截断发生在第一个内容之后，该内容在给定长度之后结束。
- `replaceExternalLinks`: 如果为`true` （默认值），则用描述中的域和路径替换外部链接（例如`https://domain.tld/some_page/another_page?query=hello&target=world`替换为`domain.tld/some_page/aother_page`）。

## API

- 分类: 转换器
- 函数名: `Plugin.Description()`.
- 源码: [`quartz/plugins/transformers/description.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/transformers/description.ts).
