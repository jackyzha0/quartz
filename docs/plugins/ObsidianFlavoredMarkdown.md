---
title: ObsidianFlavoredMarkdown
tags:
  - plugin/transformer
---

This plugin extends Markdown processing to include features commonly used in Obsidian, such as enhanced link handling, callouts, mermaid diagrams, checkboxes, and more.

- To ignore Obsidian specific markdown parsing, delete all usages of `Plugin.ObsidianFlavoredMarkdown()` from `quartz.config.ts`. Don't do this if you're using Obsidian to author the content!
- To customize markdown parsing, use the configuration options of the plugin:
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