---
title: Description
tags:
  - plugin/transformer
---

This plugin generates descriptions that are used in various places:
- as metadata for the HTML `head`
- in FolderContent.tsx (TODO: What does it do there?)
- in TagContent.tsx (TODO: What does it do there?)
- in contentIndex.ts (TODO: What does it do there?)

If the frontmatter contains a `description` property, it is used (see [[authoring content#Syntax]]). Otherwise, the full text of the file is used. 

- To remove descriptions, delete all usages of `Plugin.Description()` from `quartz.config.ts`.
- To customize description generation, use the configuration options of the plugin:
  - `descriptionLength`: the maximum length of the generated description. Default is 150 characters. The cut off happens after the first _sentence_ that ends after the given length.