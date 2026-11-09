---
title: Description
description: Generates page descriptions for metadata and previews.
tags:
  - plugin/transformer
image:
repository: "[quartz-community/description](https://github.com/quartz-community/description)"
enabled: true
required: false
---

This plugin generates descriptions that are used as metadata for the HTML `head`, the [[RSS Feed]] and in [[folder and tag listings]] if there is no main body content, the description is used as the text between the title and the listing.

If the frontmatter contains a `description` property, it is used (see [[authoring content#Syntax]]). Otherwise, the plugin builds one from the first sentences of the content.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin accepts the following configuration options:

- `descriptionLength`: the target length of the generated description. Default is 150 characters. Whole sentences are added as long as the description stays within this length; the sentence that would exceed it is left out. The first sentence is always kept, however long it is.
- `maxDescriptionLength`: the hard maximum length of the generated description. If it exceeds this (e.g. a long first sentence), it is truncated with an ellipsis. Default is 300 characters. A `description` from the frontmatter is not truncated.
- `replaceExternalLinks`: If `true` (default), replace external links in both generated and frontmatter descriptions with their domain and path in the description (e.g. `https://domain.tld/some_page/another_page?query=hello&target=world` is replaced with `domain.tld/some_page/another_page`).

### Default options

```yaml title="quartz.config.yaml"
- source: "@quartz-community/description"
  enabled: true
  options:
    descriptionLength: 150
    maxDescriptionLength: 300
    replaceExternalLinks: true
  order: 70
```

## API

- Category: Transformer
- Function name: `ExternalPlugin.Description()`.
- Source: [`quartz-community/description`](https://github.com/quartz-community/description)
- Install: `npx quartz plugin add @quartz-community/description`
