---
title: ObsidianPluginExcalidraw
description: Renders Obsidian Excalidraw drawings as interactive pages.
tags:
  - plugin/pageType
  - plugin/filter
  - plugin/component
image:
new-in-v5: true
repository: "[quartz-community/obsidian-plugin-excalidraw](https://github.com/quartz-community/obsidian-plugin-excalidraw)"
enabled: false
required: false
---

This plugin is a page type plugin that renders drawings made with the [Obsidian Excalidraw plugin](https://github.com/zsviczian/obsidian-excalidraw-plugin) (`.excalidraw.md` and `.excalidraw` files) as full-page SVG drawings you can pan and zoom. Like [[CanvasPage]], it uses a page frame of its own (`"excalidraw"`): the drawing fills the page, with a togglable left sidebar.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

A drawing gets a page at its file's path (`Drawings/Plan.excalidraw.md` → `/Drawings/Plan.excalidraw`), titled after the file and tagged `excalidraw`. A drawing stored as Markdown is taken out of the regular notes (so it isn't also rendered as text), but keeps its frontmatter: `publish`, `draft`, `password` and other filters apply to it as to a note. [[Bases]] list drawings with their real paths.

Supported:

- Shapes, text, arrows, lines and freedraw strokes in Excalidraw's hand-drawn style
- Images, either stored in the drawing or embedded from the vault (matched by file name)
- Embedded notes (`[[note]]`), rendered with their content, and embedded web pages (as sandboxed iframes)
- Light and dark mode, using Excalidraw's own dark-mode colours
- Both `json` and `compressed-json` drawing data

## Configuration

This plugin accepts the following configuration options:

- `enableInteraction`: Whether to enable pan and zoom (drag, scroll wheel, and zoom buttons). Defaults to `true`.
- `darkMode`: `"auto"` (follows the site's light/dark mode), `"light"` or `"dark"`. Defaults to `"auto"`.
- `exportPadding`: Padding around the drawing, in pixels. Defaults to `20`.

### Default options

```yaml title="quartz.config.yaml"
- source: "@quartz-community/obsidian-plugin-excalidraw"
  enabled: true
  options:
    enableInteraction: true
    darkMode: auto
    exportPadding: 20
```

To use the standard three-column layout instead of the full-page frame:

```yaml title="quartz.config.yaml"
layout:
  byPageType:
    excalidraw:
      template: default
```

## API

- Category: Page Type, Filter, Component
- Function name: `ExternalPlugin.ExcalidrawPage()`.
- Source: [`quartz-community/obsidian-plugin-excalidraw`](https://github.com/quartz-community/obsidian-plugin-excalidraw)
- Install: `npx quartz plugin add @quartz-community/obsidian-plugin-excalidraw`
