---
title: "Frontmatter"
tags:
  - plugin/transformer
---

This plugin parses the frontmatter of the page using the [gray-matter](https://github.com/jonschlinkert/gray-matter) library.

- This plugin (`Plugin.Frontmatter()`) should not be removed from `quartz.config.ts`, otherwise Quartz will break.
- To customize frontmatter parsing, use the configuration options of the plugin:
  - `delimiters`: the delimiters to use for the frontmatter. Can have one value (e.g. `"---"`) or separate values for opening and closing delimiters (e.g. `["---", "~~~"]`). Defaults to `"---"`.
  - `language`: the language to use for parsing the frontmatter. Can be `yaml` (default) or `toml`.

The source of this plugin can be found in [`quartz/plugins/transformers/frontmatter.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/transformers/frontmatter.ts).

See the backlinks for functionalities where this plugin is used.
