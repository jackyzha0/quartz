---
title: RemoveDrafts
tags:
  - plugin/filter
---

This plugin is designed to filter out draft content from the publishing pipeline, so only finalized content is made available. It operates by checking the `draft` flag in the frontmatter of each file. When it's set to `true`, the content is filtered out.

- To disable this functionality, delete all usages of `Plugin.RemoveDrafts()` from `quartz.config.ts`.