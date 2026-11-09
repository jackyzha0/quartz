---
title: NotFoundPage
tags:
  - plugin/pageType
image:
---

This plugin emits a 404 (Not Found) page for broken or non-existent URLs. It uses the `minimal` [[layout#Page Frames|page frame]] (no sidebars, no header or beforeBody chrome — only content and footer) to present a clean error page.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin has no configuration options.

## API

- Category: Page Type
- Internal plugin: always runs and has no entry in `quartz.config.yaml`. Its layout can be changed under `layout.byPageType.404` (see [[layout#Per-page-type overrides]]).
- Source: [`quartz/plugins/pageTypes/404.ts`](https://github.com/jackyzha0/quartz/blob/v5/quartz/plugins/pageTypes/404.ts)
