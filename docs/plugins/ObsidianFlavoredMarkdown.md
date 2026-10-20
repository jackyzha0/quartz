---
title: ObsidianFlavoredMarkdown
description: Obsidian-specific Markdown extensions (wikilinks, callouts, highlights, tags, embeds).
tags:
  - plugin/transformer
image:
repository: "[quartz-community/obsidian-flavored-markdown](https://github.com/quartz-community/obsidian-flavored-markdown)"
enabled: true
required: false
---

This plugin provides support for [[Obsidian compatibility]].

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin accepts the following configuration options:

- `comments`: If `true` (default), enables parsing of `%%` style Obsidian comment blocks.
- `highlight`: If `true` (default), enables parsing of `==` style highlights within content.
- `wikilinks`:If `true` (default), turns [[wikilinks]] into regular links.
- `callouts`: If `true` (default), adds support for [[callouts|callout]] blocks for emphasizing content.
- `mermaid`: If `true` (default), enables [[Mermaid diagrams|Mermaid diagram]] parsing within Markdown files.
- `diagramRenderer`: `"mermaid"` (default) or `"pele"`. Which engine draws Mermaid fences. [Pele](https://pele.run) is opt-in; Mermaid.js is deprecated.
- `parseTags`: If `true` (default), parses and links tags within the content.
- `parseBlockReferences`: If `true` (default), handles block references, linking to specific content blocks.
- `enableInHtmlEmbed`: If `true`, allows embedding of content directly within HTML. Defaults to `false`.
- `enableYouTubeEmbed`: If `true` (default), enables the embedding of YouTube videos and playlists using external image Markdown syntax.
- `enableTweetEmbed`: If `true` (default), enables the embedding of tweets as static blockquotes from Twitter/X URLs.
- `enableVideoEmbed`: If `true` (default), enables the embedding of video files.
- `enableCheckbox`: If `true`, adds support for interactive checkboxes in content, including custom task characters (e.g. `- [?]`, `- [!]`, `- [/]`). Defaults to `false`.
- `enableObsidianUri`: If `true` (default), marks `obsidian://` protocol links with a CSS class and data attribute for custom styling.

> [!note]
> The `disableBrokenWikilinks` option previously lived on this plugin. It has moved to [[CrawlLinks]], which owns link resolution and can honor the configured `markdownLinkResolution` strategy when deciding whether a link is broken. Users upgrading from earlier Quartz v5 betas should move the option from `ObsidianFlavoredMarkdown` to `CrawlLinks`.

> [!warning]
> Don't remove this plugin if you're using [[Obsidian compatibility|Obsidian]] to author the content!

## API

- Category: Transformer
- Function name: `ExternalPlugin.ObsidianFlavoredMarkdown()`.
- Source: [`quartz-community/obsidian-flavored-markdown`](https://github.com/quartz-community/obsidian-flavored-markdown)
- Install: `npx quartz plugin add github:quartz-community/obsidian-flavored-markdown`
