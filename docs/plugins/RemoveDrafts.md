---
title: RemoveDrafts
description: Built-in draft handling (formerly the remove-draft plugin). Pages with draft true are not published.
aliases:
  - drafts
  - remove-draft
tags:
  - plugin/filter
  - built-in
image:
enabled: true
required: false
---

Draft handling is [[built-in processing|built into Quartz]] (it used to be the `remove-draft` plugin): pages with `draft: true` in their frontmatter are not published. This prevents [[private pages]] from being published. All other pages are left intact.

Configure it under `configuration.drafts` in `quartz.config.yaml`:

- `publish`: set to `true` to publish drafts anyway, e.g. for a preview deployment. Defaults to `false`.
- `enabled`: `false` has the same effect as `publish: true`.

```yaml title="quartz.config.yaml"
configuration:
  drafts:
    publish: false
```

> [!note]
> An existing `@quartz-community/remove-draft` entry is handled automatically (a disabled entry means drafts are published). Run `npx quartz plugin doctor --fix` to move it.

For the opposite approach — only publish pages marked `publish: true` — enable [[ExplicitPublish]].

## API

- Category: Filter (built-in)
- Source: [`quartz/plugins/builtins/drafts.ts`](https://github.com/jackyzha0/quartz/blob/v5/quartz/plugins/builtins/drafts.ts)
