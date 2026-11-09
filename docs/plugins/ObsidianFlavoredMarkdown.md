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

- `preset`: How Markdown is parsed (via [remark-obsidian](https://github.com/quartz-community/remark-obsidian)).
  - `"legacy"` (default) parses exactly as Obsidian does, so pages render as they do in the app. It replaces Quartz's Markdown parser, so syntax extensions added by other plugins are not consulted, and only YAML (`---`) [[Frontmatter|frontmatter]] is recognized.
  - `"strict"` parses CommonMark and GFM as specified, plus Obsidian's syntax, and keeps other plugins' syntax extensions working. Use it for TOML (`+++`) or custom frontmatter delimiters, or plugins that add Markdown syntax.
- `strictLineBreaks`: Obsidian's "Strict line breaks" setting. `false` (the default under `preset: "legacy"`) renders a single line break inside a paragraph as a `<br>`, as in Obsidian's default reading view. `true` (the default under `preset: "strict"`) renders it as a space, as CommonMark does. This replaces the deprecated [[HardLineBreaks]] plugin.
- `comments`: If `true` (default), enables parsing of `%%` style Obsidian comment blocks.
- `highlight`: If `true` (default), enables parsing of `==` style highlights within content. A highlight that starts with a colour emoji (🔴 🟠 🟡 🟢 🔵 🟣, or the matching squares) is coloured as in Obsidian 1.14, e.g. `==🔴 urgent==`.
- `wikilinks`: If `true` (default), turns [[wikilinks]] into regular links.
- `callouts`: If `true` (default), adds support for [[callouts|callout]] blocks for emphasizing content.
- `mermaid`: If `true` (default), enables [[Mermaid diagrams|Mermaid diagram]] parsing within Markdown files.
- `diagramRenderer`: `"mermaid"` (default) or `"pele"`. Which engine draws Mermaid fences. [Pele](https://pele.run) is opt-in; Mermaid.js is deprecated.
- `parseTags`: If `true` (default), parses and links tags within the content.
- `parseBlockReferences`: If `true` (default), handles block references, linking to specific content blocks.
- `enableInHtmlEmbed`: If `true`, allows embedding of content directly within HTML. Defaults to `false`.
- `enableYouTubeEmbed`: If `true` (default), enables the embedding of YouTube videos and playlists using external image Markdown syntax.
- `enableTweetEmbed`: If `true` (default), enables the embedding of tweets as static blockquotes from Twitter/X URLs.
- `enableVideoEmbed`: If `true` (default), enables the embedding of video files.
- `enableCheckbox`: If `true`, adds support for interactive checkboxes in content, including custom task characters (e.g. `- [?]`, `- [!]`, `- [/]`). Defaults to `false`; the default `quartz.config.yaml` turns it on.
- `enableObsidianUri`: If `true` (default), marks `obsidian://` protocol links with a CSS class and data attribute for custom styling.

Also supported:

- Inline footnotes (`text^[note]`) are numbered together with regular footnotes.
- Obsidian's image size suffix on Markdown images: `![alt|300](image.png)` and `![alt|100x145](image.png)` set the width (and height).
- An image embed without alt text (`![[pic.png]]`, `![[pic.png|100]]`) gets the path as alt text, as in Obsidian, which also names a missing image.
- A block reference inside a wikilink (`[[note#^id]]`) only links to that block; at the end of a paragraph it no longer gives the paragraph that block id.
- Inline tags only link to tag pages that exist.

This plugin must run after [[GitHubFlavoredMarkdown]] (order `40` and `30` in the default config): where both claim the same character (`~~` strikethrough, for example), the plugin registered later wins.

### Default options

```yaml title="quartz.config.yaml"
- source: "@quartz-community/obsidian-flavored-markdown"
  enabled: true
  options:
    enableInHtmlEmbed: false
    enableCheckbox: true
  order: 40
```

> [!note]
> The `disableBrokenWikilinks` option previously lived on this plugin. It has moved to the built-in [[CrawlLinks|link processing]] as `configuration.links.disableBrokenWikilinks`, which owns link resolution and honors the configured `markdownLinkResolution` strategy when deciding whether a link is broken. If you upgrade from an earlier Quartz v5 beta, move the option from this plugin's `options` to `configuration.links`.

> [!warning]
> Don't remove this plugin if you're using [[Obsidian compatibility|Obsidian]] to author the content!

## API

- Category: Transformer
- Function name: `ExternalPlugin.ObsidianFlavoredMarkdown()`.
- Source: [`quartz-community/obsidian-flavored-markdown`](https://github.com/quartz-community/obsidian-flavored-markdown)
- Install: `npx quartz plugin add @quartz-community/obsidian-flavored-markdown` (included in the default configuration)
