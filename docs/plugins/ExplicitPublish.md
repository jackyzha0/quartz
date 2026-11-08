---
title: ExplicitPublish
description: "Only publishes pages explicitly marked with publish: true."
tags:
  - plugin/filter
image:
repository: "[quartz-community/explicit-publish](https://github.com/quartz-community/explicit-publish)"
enabled: false
required: false
---

This plugin filters content based on an explicit `publish` flag in the frontmatter, allowing only content that is explicitly marked for publication to pass through. It's the opt-in version of [[RemoveDrafts]]. See [[private pages]] for more information.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin has no configuration options.

> [!tip]
> Images and other files are copied to your site whether or not a published page uses them. Set `configuration.publishAssets: referenced` to only publish the files that published pages link to or embed.

## API

- Category: Filter
- Function name: `ExternalPlugin.ExplicitPublish()`.
- Source: [`quartz-community/explicit-publish`](https://github.com/quartz-community/explicit-publish)
- Install: `npx quartz plugin add github:quartz-community/explicit-publish`
