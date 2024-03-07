---
title: TagPage
tags:
  - plugin/emitter
---

This plugin emits dedicated pages for each tag used in the content. See [[folder and tag listings]] for more information.

> [!note]
> For information on how to add, remove or configure plugins, see the [[Configuration#Plugins|Configuration]] page.

This plugin has no configuration options.

The pages are displayed using the `defaultListPageLayout` in `quartz.layouts.ts`. For the content, the `TagContent` component is used. If you want to modify the layout, you must edit it directly (`quartz/components/pages/TagContent.tsx`).

## API

- Category: Emitter
- Function name: `Plugin.TagPage()`.
- Source: [`quartz/plugins/emitters/tagPage.tsx`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/emitters/tagPage.tsx).
