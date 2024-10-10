---
title: AliasRedirects
tags:
  - plugin/emitter
---

This plugin emits HTML redirect pages for aliases and permalinks defined in the frontmatter of content files.

For example, A `foo.md` has the following frontmatter

```md title="foo.md"
---
title: "Foo"
alias:
  - "bar"
---
```

The target `host.me/bar` will be redirected to `host.me/foo`

Note that these are permanent redirect.

The emitter supports the following aliases:

- `aliases`
- `alias`

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin has no configuration options.

## API

- Category: Emitter
- Function name: `Plugin.AliasRedirects()`.
- Source: [`quartz/plugins/emitters/aliases.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/emitters/aliases.ts).
