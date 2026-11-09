---
title: CanvasPage
description: Renders JSON Canvas files as interactive, pannable pages.
tags:
  - plugin/pageType
image: "#7852ee"
new-in-v5: true
repository: "[quartz-community/canvas-page](https://github.com/quartz-community/canvas-page)"
enabled: true
required: false
---

This plugin is a page type plugin that renders [JSON Canvas](https://jsoncanvas.org) (`.canvas`) files as interactive, pannable and zoomable canvas pages. It uses a custom `"canvas"` [[layout#Page Frames|page frame]] that provides a fullscreen, always-on canvas experience with a togglable left sidebar for navigation. It supports the full [JSON Canvas 1.0 spec](https://jsoncanvas.org/spec/1.0/), including text nodes with Markdown rendering, file nodes that link to other pages in your vault, link nodes for external URLs, and group nodes for visual organization. Edges between nodes are rendered as SVG paths with optional labels, arrow markers, and colors.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin accepts the following configuration options:

- `enableInteraction`: Whether to enable pan and zoom interaction on the canvas. Default: `true{:ts}`.
- `initialZoom`: The initial zoom level when the canvas is first displayed. Default: `1{:ts}`.
- `minZoom`: The minimum zoom level allowed when zooming out. Default: `0.1{:ts}`.
- `maxZoom`: The maximum zoom level allowed when zooming in. Default: `5{:ts}`.

### Canvas Frame

The canvas-page plugin provides its own `"canvas"` page frame via the [[layout#Page Frames|Frame Registry]]. This frame:

- Renders the canvas in **fullscreen mode** by default (100vw × 100vh), giving the canvas maximum screen space — leaning into the "endless canvas" concept of JSON Canvas.
- Provides a **togglable left sidebar** that slides in from the left edge. This is the only layout slot available — it renders the same components as the `left` sidebar on content pages (e.g., Explorer, Search, Page Title).
- The sidebar toggle button (hamburger/close icon) is positioned in the top-left corner.
- Canvas controls (zoom in, zoom out, reset) are positioned on the right side.
- On mobile, the sidebar overlays the canvas rather than pushing it aside.

Users can override this frame via `quartz.config.yaml` if needed:

```yaml title="quartz.config.yaml"
layout:
  byPageType:
    canvas:
      template: default # Use standard three-column layout instead
```

### Features

- **Text nodes**: Render Markdown content including headings, bold, italic, strikethrough, lists, links, and code blocks via [GFM](https://github.github.com/gfm/) support.
- **File nodes**: Link to other pages in your vault. Supports popover previews on hover.
- **Link nodes**: Reference external URLs.
- **Group nodes**: Visual grouping containers with optional labels and background colors.
- **Edges**: SVG connections between nodes with optional labels, arrow markers, and colors. Supports all four sides (top, right, bottom, left) and both preset colors (1–6) and custom hex colors.
- **Togglable sidebar**: Hamburger button in the top-left corner toggles the left sidebar for navigation. Press `Escape` or click the close button to dismiss.
- **Preset colors**: Six preset colors (red, orange, yellow, green, cyan, purple) plus custom hex colors (`#RRGGBB`) for nodes and edges.

## API

- Category: Page Type
- Function name: `ExternalPlugin.CanvasPage()`.
- Source: [`quartz-community/canvas-page`](https://github.com/quartz-community/canvas-page)
- Install: `npx quartz plugin add @quartz-community/canvas-page` (included in the default configuration)
