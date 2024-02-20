---
title: ObsidianFlavoredMarkdown
tags:
  - plugin/transformer
---

This plugin extends Markdown processing to include features commonly used in Obsidian, such as enhanced link handling, callouts, mermaid diagrams, checkboxes, and more.

> [!note]
> For information on how to add, remove or configure plugins, see the [[Configuration#Plugins|Configuration]] page.

This plugin accepts the following configuration options:

- `comments`: When `true` (default), enables parsing of comment blocks.
- `highlight`: When `true` (default), highlights text within content.
- `wikilinks`:When `true` (default), adds wikilink support.
- `callouts`: When `true` (default), adds support for callout blocks for emphasizing content.
- `mermaid`: When `true` (default), enables Mermaid diagram rendering within Markdown files.
- `parseTags`: When `true` (default), parses and links tags within the content.
- `parseArrows`: When `true` (default), transforms arrow symbols into their HTML character equivalents.
- `parseBlockReferences`: When `true` (default), handles block references, linking to specific content blocks.
- `enableInHtmlEmbed`: When `true`, allows embedding of content directly within HTML. Defaults to `false`.
- `enableYouTubeEmbed`: When `true` (default), enables the embedding of YouTube videos.
- `enableVideoEmbed`: When `true` (default), enables the embedding of video files.
- `enableCheckbox`: When `true`, adds support for interactive checkboxes in content. Defaults to `false`.

> [!warning]
> Don't remove this plugin if you're using Obsidian to author the content!

## Technical Details

- Category: Transformer
- Function name: `Plugin.ObsidianFlavoredMarkdown()`.
- Source: [`quartz/plugins/transformers/toc.ts`](https://github.com/jackyzha0/quartz/blob/v4/quartz/plugins/transformers/toc.ts).

