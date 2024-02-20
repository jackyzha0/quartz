---
title: ExplicitPublish
tags:
  - plugin/filter
---

This plugin filters content based on an explicit `publish` flag in the frontmatter, allowing only content that is explicitly marked for publication (set to `true`) to pass through. It's kind of the opposite of [[RemoveDrafts]].

- To add this functionality, add `Plugin.ExplicitPublish()` to the `filters` section of `quartz.config.ts`.