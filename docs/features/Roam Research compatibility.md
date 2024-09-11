---
title: "Roam Research Compatibility"
tags:
  - feature/transformer
---

[Roam Research](https://roamresearch.com) is a note-taking tool that organizes your knowledge graph in a unique and interconnected way. Since the markdown exported from Roam Research includes specific `{{[[components]]}}` and formatting that may not be directly compatible with Quartz, we need to transform it. This is achieved with the [[RoamFlavoredMarkdown]] plugin.

```typescript title="quartz.config.ts"
plugins: {
  transformers: [
    // ...
    Plugin.RoamFlavoredMarkdown(),
    Plugin.ObsidianFlavoredMarkdown(),
    // ...
  ],
},
```

## Usage

By default, Quartz does not recognize markdown files exported from `Roam Research` as they contain unique identifiers and components specific to Roam. You are responsible for exporting your `Roam Research` notes as markdown files and then using this transformer to make them compatible with Quartz. This process ensures that your knowledge graph is seamlessly integrated into your static site, maintaining the rich interconnections between your notes.

## Configuration

This functionality is provided by the [[RoamFlavoredMarkdown]] plugin. See the plugin page for customization options.

## Note

As seen above placement of `Plugin.RoamFlavoredMarkdown()` within `quartz.config.ts` is very important. It must come before `Plugin.ObsidianFlavoredMarkdown()`.
