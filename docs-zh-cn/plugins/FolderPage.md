---
title: FolderPage
tags:
  - plugin/emitter
---

This plugin generates index pages for folders, creating a listing page for each folder that contains multiple content files. See [[folder and tag listings]] for more information.
此插件为文件夹生成索引页，为包含多个内容文件的每个文件夹创建一个列表页。查看[[folder and tag listings]]了解更多信息。

举例: [[高级/|高级]]

> [!note]
> 有关如何添加、删除或配置插件的信息，请参阅[[configuration#插件|配置]]页。

此插件没有配置选项。

这些页面是使用`quarter.layouts.ts`中的`defaultListPageLayout`显示。对于内容，将使用`FolderContent`组件。如果要修改布局，必须直接对其进行编辑（`quartz/components/pages/FolderContent.tsx`）。

## API

- 分类: 生成器
- 函数名: `Plugin.FolderPage()`.
- 源码: [`quartz/plugins/emitters/folderPage.tsx`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/emitters/folderPage.tsx).
