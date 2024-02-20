---
title: Assets
tags:
  - plugin/emitter
---

This plugin manages and emits non-Markdown assets (like images, scripts, stylesheets, etc.) from the content directory to the output directory. It ensures that all required static assets are available in the generated site.

- To remove support for static content, delete all usages of `Plugin.Assets()` from `quartz.config.ts`.