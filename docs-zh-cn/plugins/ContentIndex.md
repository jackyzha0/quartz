---
title: ContentIndex
tags:
  - plugin/emitter
---

这个插件为您的站点同时发出RSS和XML站点地图。[[RSS订阅]] 允许用户订阅您网站上的内容，网站地图允许搜索引擎更好地为您的网站编制索引。该插件还发出一个`contentIndex.json` 文件，供搜索和图形等动态前端组件使用。

这个插件生成网站内容的综合索引，生成额外的资源，如网站地图、RSS提要和

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.
> 有关如何添加、删除或配置插件的信息，请参阅[[configuration#插件|配置]]页。

此插件接受以下配置选项：

- `enableSiteMap`: 如果为`true` （默认值），则生成一个站点地图XML文件（`sitemap.xml`），列出内容发现中搜索引擎的所有站点URL。
- `enableRSS`: 如果为`true` （默认值），则生成包含最新内容更新的RSS提要（`index.xml`）。
- `rssLimit`: 定义RSS提要中包含的最大条目数，有助于关注最新或相关的内容。默认为“10”。
- `rssFullHtml`: 如果为`true`，则RSS提要包含完整的HTML内容。否则，它只包括摘要。
- `includeEmptyFiles`: 如果为`true`（默认值），则不包含正文的内容文件将包含在生成的索引和资源中。

## API

- 分类: 生成器
- 函数名: `Plugin.ContentIndex()`.
- 源码: [`quartz/plugins/emitters/contentIndex.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/emitters/contentIndex.ts).
