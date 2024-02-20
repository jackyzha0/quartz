---
title: CNAME
tags:
  - plugin/emitter
---

This plugin generates a `CNAME` file as part of the site's output. This is needed for configuring custom domain names on platforms like GitHub Pages. The domain name is extracted from the site's base URL, which is then written to a `CNAME` file in the root of the output directory.

- To add this functionality, add `Plugin.CNAME()` to the `emitters` section of `quartz.config.ts`.