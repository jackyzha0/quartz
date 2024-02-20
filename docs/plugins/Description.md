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

> [!note]
> For information on how to add, remove or configure plugins, see the [[Configuration#Plugins|Configuration]] page.

This plugin accepts the following configuration options:

- `descriptionLength`: the maximum length of the generated description. Default is 150 characters. The cut off happens after the first _sentence_ that ends after the given length.

> [!warning]
> This plugin needs the `Component.TableOfContents` component in `quartz.layout.ts` to determine where to display the TOC. Without it, nothing will be displayed.

## Technical Details

- Category: Transformer
- Function name: `Plugin.Description()`.
- Source: [`quartz/plugins/transformers/description.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/transformers/description.ts).

