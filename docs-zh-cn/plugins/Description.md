---
title: Description
tags:
  - plugin/transformer
---

This plugin generates descriptions that are used as metadata for the HTML `head`, the [[RSS Feed]] and in [[folder and tag listings]] if there is no main body content, the description is used as the text between the title and the listing.

If the frontmatter contains a `description` property, it is used (see [[authoring content#Syntax]]). Otherwise, the plugin will do its best to use the first few sentences of the content to reach the target description length.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin accepts the following configuration options:

- `descriptionLength`: the maximum length of the generated description. Default is 150 characters. The cut off happens after the first _sentence_ that ends after the given length.
- `replaceExternalLinks`: If `true` (default), replace external links with their domain and path in the description (e.g. `https://domain.tld/some_page/another_page?query=hello&target=world` is replaced with `domain.tld/some_page/another_page`).

## API

- Category: Transformer
- Function name: `Plugin.Description()`.
- Source: [`quartz/plugins/transformers/description.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/transformers/description.ts).
