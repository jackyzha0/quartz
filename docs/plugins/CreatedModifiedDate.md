---
title: "CreatedModifiedDate"
tags:
  - plugin/transformer
---

This plugin determines the created, modified, and published dates for a document using three potential data sources: front matter metadata, Git history, and the filesystem.

If it encounters invalid date formats, it defaults to the current date.

- To remove dates from all pages, delete all usages of `Plugin.CreatedModifiedDate()` from `quartz.config.ts`.
- To customize date parsing, use the configuration options of the plugin:
  - `priority`: the data sources to consult for date information. Highest priority first. Possible values are `"frontmatter"`, `"git"`, and `"filesystem"`. Defaults to `"frontmatter", "git", "filesystem"]`.

The source of this plugin can be found in [`quartz/plugins/transformers/lastmod.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/transformers/lastmod.ts).

See the backlinks for functionalities where this plugin is used.
