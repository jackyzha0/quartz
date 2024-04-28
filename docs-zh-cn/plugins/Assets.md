---
title: Assets
tags:
  - plugin/emitter
---

这个插件会在您的内容文件夹中生成所有非Markdown静态资产（如图像、视频、HTML等）。该插件支持全局[[configuration]]中的`ignorePatterns`.

请注意，所有静态资产都可以通过其在您生成的网站上的路径访问，即：`host.me/path/to/static.pdf`

> [!note]
> 有关如何添加、删除或配置插件的信息，请参阅[[configuration#Plugins|配置]]页。

此插件没有配置选项。

## API

- 分类: 生成器
- 函数名: `Plugin.Assets()`.
- 源码: [`quartz/plugins/emitters/assets.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/emitters/assets.ts).
