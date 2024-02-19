---
title: "Plugin.SyntaxHighlighting()"
tags:
  - plugin/transformer
---

- To remove syntax highlighting, delete all usages of `Plugin.SyntaxHighlighting()` from `quartz.config.ts`.
- To customize syntax highlighting, use the configuration options of the plugin:
	- `theme`: a separate id of one of the [themes bundled with Shikiji](https://shikiji.netlify.app/themes). One for light mode and one for dark mode. Defaults to `theme: { light: "github-light", dark: "github-dark" }`.
	- `keepBackground`: If set to `true`, the background of the Shikiji theme will be used. With `false` (default) the Quartz theme color for background will be used instead.
- In addition, you can further override the colours in the `quartz/styles/syntax.scss` file.

The source of this plugin can be found in [`quartz/plugins/transformers/syntax.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/transformers/syntax.ts).

See the backlinks for functionalities where this plugin is used.
