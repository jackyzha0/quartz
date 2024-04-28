---
title: AliasRedirects
tags:
  - plugin/emitter
---

这个插件为内容文件元数据定义的别名和永久链接生成HTML重定向页面。

例如，`foo.md` 具有以下元数据

```md title="foo.md"
---
title: "Foo"
alias:
  - "bar"
---
```

目标`host.me/bar`将重定向到`host.me/foo``

请注意，这些是永久重定向。

生成器支持以下别名：

- `aliases`
- `alias`

> [!note]
> 有关如何添加、删除或配置插件的信息，请参阅[[configuration#Plugins|配置]]页。

此插件没有配置选项。

## API

- 分类: 生成器
- 函数名: `Plugin.AliasRedirects()`.
- 源码: [`quartz/plugins/emitters/aliases.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/emitters/aliases.ts).
