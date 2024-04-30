---
title: "Social Media Embeds"
tags:
  - plugin/transformer
---

This plugin adds Social Media Embedding support to Quartz.

```markdown
![](https://twitter.com/_jzhao/status/1693407629153067193)
```

becomes:

![](https://twitter.com/_jzhao/status/1693407629153067193)

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin accepts the following configuration options:

- `embeds`: A list of social media sites to embed content from, as a list of strings. Accepted values are currently: `"twitter"`.

## API

- Category: Transformer
- Function name: `Plugin.SocialEmbeds()`.
- Source: [`quartz/plugins/transformers/socialEmbeds.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/transformers/socialEmbeds.ts).
