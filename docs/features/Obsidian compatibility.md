---
tags:
  - plugin/transformer
---

Quartz was originally designed as a tool to publish Obsidian vaults as websites. Even as the scope of Quartz has widened over time, it hasn't lost the ability to seamlessly interoperate with Obsidian.

By default, Quartz ships with `Plugin.ObsidianFlavoredMarkdown` which is a transformer plugin that adds support for [Obsidian Flavored Markdown](https://help.obsidian.md/Editing+and+formatting/Obsidian+Flavored+Markdown). This includes support for features like [[wikilinks]] and [[Mermaid diagrams]].

It also ships with support for [frontmatter parsing](https://help.obsidian.md/Editing+and+formatting/Properties) with the same fields that Obsidian uses through the `Plugin.FrontMatter` transformer plugin.

Finally, Quartz also provides `Plugin.CrawlLinks` which allows you to customize Quartz's link resolution behaviour to match Obsidian.

## Configuration

- Frontmatter parsing:
  - Disabling: remove all instances of `Plugin.FrontMatter()` from `quartz.config.ts`.
  - Customize default values for frontmatter: edit `quartz/plugins/transformers/frontmatter.ts`
- Obsidian Flavored Markdown:
  - Disabling: remove all instances of `Plugin.ObsidianFlavoredMarkdown()` from `quartz.config.ts`
  - Customizing features: `Plugin.ObsidianFlavoredMarkdown` has several other options to toggle on and off:
    - `comments`: whether to enable `%%` style Obsidian comments. Defaults to `true`
    - `highlight`: whether to enable `==` style highlights. Defaults to `true`
    - `wikilinks`: whether to enable turning [[wikilinks]] into regular links. Defaults to `true`
    - `callouts`: whether to enable [[callouts]]. Defaults to `true`
    - `mermaid`: whether to enable [[Mermaid diagrams]]. Defaults to `true`
    - `parseTags`: whether to try and parse tags in the content body. Defaults to `true`
    - `parseArrows`: whether to try and parse arrows in the content body. Defaults to `true`.
    - `enableInHtmlEmbed`: whether to try and parse Obsidian flavoured markdown in raw HTML. Defaults to `false`
    - `enableYouTubeEmbed`: whether to enable embedded YouTube videos using external image Markdown syntax. Defaults to `false`
- Link resolution behaviour:
  - Disabling: remove all instances of `Plugin.CrawlLinks()` from `quartz.config.ts`
  - Changing link resolution preference: set `markdownLinkResolution` to one of `absolute`, `relative` or `shortest`
