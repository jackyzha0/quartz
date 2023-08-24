---
title: Wikilinks
---

Wikilinks were pioneered by earlier internet wikis to make it easier to write links across pages without needing to write Markdown or HTML links each time.

Quartz supports Wikilinks by default and these links are resolved by Quartz using `Plugin.CrawlLinks`. See the [Obsidian Help page on Internal Links](https://help.obsidian.md/Linking+notes+and+files/Internal+links) for more information on Wikilink syntax.

This is enabled as a part of [[Obsidian compatibility]] and can be configured and enabled/disabled from that plugin.

## Syntax

- `[[Path to file]]`: produces a link to `Path to file` with the text `Path to file`
- `[[Path to file | Here's the title override]]`: produces a link to `Path to file` with the text `Here's the title override`
- `[[Path to file#Anchor]]`: produces a link to the anchor `Anchor` in the file `Path to file`

> [!warning]
> Currently, Quartz does not support block references or note embed syntax.
