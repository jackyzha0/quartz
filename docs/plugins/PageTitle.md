---
title: PageTitle
description: Renders the site title as a home link.
tags:
  - plugin/component
image:
repository: "[quartz-community/page-title](https://github.com/quartz-community/page-title)"
enabled: true
required: false
---

This plugin renders the site-wide page title (configured via the `pageTitle` field in [[configuration]]) as a clickable link to the home page. It typically appears in the left sidebar.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin has no configuration options. The displayed title is controlled by the `pageTitle` field in `quartz.config.yaml`.

## API

- Category: Component
- Function name: `ExternalPlugin.PageTitle()`.
- Source: [`quartz-community/page-title`](https://github.com/quartz-community/page-title)
- Install: `npx quartz plugin add @quartz-community/page-title` (included in the default configuration)
