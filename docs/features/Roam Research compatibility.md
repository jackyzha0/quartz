---
title: "Roam Research Compatibility"
tags:
  - feature/transformer
---

[Roam Research](https://roamresearch.com) is a note-taking tool that organizes your knowledge graph in a unique and interconnected way.

Quartz supports transforming the special Markdown syntax from Roam Research (like `{{[[components]]}}` and other formatting) into
regular Markdown via the [[RoamFlavoredMarkdown]] plugin.

The plugin is in the default `quartz.config.yaml` but disabled; set `enabled: true` on its entry:

```yaml title="quartz.config.yaml"
plugins:
  - source: "@quartz-community/obsidian-flavored-markdown"
    enabled: true
    order: 40
  - source: "@quartz-community/roam"
    enabled: true
    order: 92
```

For the TS override approach, place overrides before `loadQuartzConfig()` in `quartz.ts`:

```ts title="quartz.ts (override)"
import * as ExternalPlugin from "./.quartz/plugins"

ExternalPlugin.RoamFlavoredMarkdown()
```

> [!warning]
> With [[ObsidianFlavoredMarkdown]]'s wikilinks on (the default), syntax built on `[[…]]` — `{{[[TODO]]}}`, `{{[[DONE]]}}`, `[[>]]` — is parsed as a wikilink before this plugin runs, whatever the `order`, so it renders as a link. `^^highlight^^` and the other syntax not built on `[[…]]` work.

## Customization

This functionality is provided by the [[RoamFlavoredMarkdown]] plugin. See the plugin page for customization options.
