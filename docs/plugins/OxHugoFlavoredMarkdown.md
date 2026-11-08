---
title: OxHugoFlavoredMarkdown
description: Compatibility for ox-hugo exported Org-mode files.
tags:
  - plugin/transformer
image:
repository: "[quartz-community/ox-hugo](https://github.com/quartz-community/ox-hugo)"
enabled: false
required: false
---

This plugin provides support for [ox-hugo](https://github.com/kaushalmodi/ox-hugo) compatibility. See [[OxHugo compatibility]] for more information.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin accepts the following configuration options:

- `wikilinks`: If `true` (default), converts Hugo `{{ relref }}` shortcodes to Quartz [[wikilinks]].
- `removePredefinedAnchor`: If `true` (default), strips predefined anchors from headings.
- `removeHugoShortcode`: If `true` (default), removes Hugo shortcode syntax (`{{}}`) from the content.
- `replaceFigureWithMdImg`: If `true` (default), replaces `<figure/>` with `![]()`.
- `replaceOrgLatex`: If `true` (default), converts Org-mode [[features/Latex|Latex]] fragments to Quartz-compatible LaTeX wrapped in `$` (for inline) and `$$` (for block equations).

> [!warning]
> While you can use this together with [[ObsidianFlavoredMarkdown]], it's not recommended because it might mutate the file in unexpected ways. Use with caution.
>
> If you use `toml` frontmatter, make sure to set `configuration.frontmatter` accordingly (see [[Frontmatter]]). See [[OxHugo compatibility]] for an example.

## API

- Category: Transformer
- Function name: `ExternalPlugin.OxHugoFlavoredMarkdown()`.
- Source: [`quartz-community/ox-hugo`](https://github.com/quartz-community/ox-hugo)
- Install: `npx quartz plugin add github:quartz-community/ox-hugo`
