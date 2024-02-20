---
title: ObsidianFlavoredMarkdown
tags:
  - plugin/transformer
---

This plugin provides support for [[Obsidian compatibility]].

> [!note]
> For information on how to add, remove or configure plugins, see the [[Configuration#Plugins|Configuration]] page.

This plugin accepts the following configuration options:

- `comments`: If `true` (default), enables parsing of `%%` style Obsidian comment blocks.
- `highlight`: If `true` (default), enables parsing of `==` style highlights within content.
- `wikilinks`:If `true` (default), turns [[wikilinks]] into regular links.
- `callouts`: If `true` (default), adds support for [[callouts|callout]] blocks for emphasizing content.
- `mermaid`: If `true` (default), enables [[Mermaid diagrams|Mermaid diagram]] rendering within Markdown files.
- `parseTags`: If `true` (default), parses and links tags within the content.
- `parseArrows`: If `true` (default), transforms arrow symbols into their HTML character equivalents.
- `parseBlockReferences`: If `true` (default), handles block references, linking to specific content blocks.
- `enableInHtmlEmbed`: If `true`, allows embedding of content directly within HTML. Defaults to `false`.
- `enableYouTubeEmbed`: If `true` (default), enables the embedding of YouTube videos using external image Markdown syntax.
- `enableVideoEmbed`: If `true` (default), enables the embedding of video files.
- `enableCheckbox`: If `true`, adds support for interactive checkboxes in content. Defaults to `false`.

> [!warning]
> Don't remove this plugin if you're using [[Obsidian compatibility|Obsidian]] to author the content!

## API

- Category: Transformer
- Function name: `Plugin.ObsidianFlavoredMarkdown()`.
- Source: [`quartz/plugins/transformers/toc.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/transformers/toc.ts).
