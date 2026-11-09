---
title: "Graph View"
tags:
  - component
---

Quartz features a graph-view that can show both a local graph view and a global graph view.

- The local graph view shows files that either link to the current file or are linked from the current file. In other words, it shows all notes that are _at most_ one hop away.
- The global graph view can be toggled by clicking the graph icon on the top-right of the local graph view. It shows _all_ the notes in your graph and how they connect to each other.

> [!info]
> The Graph View is now a community plugin. This demonstrates how external plugins can extend Quartz functionality while serving as a reference implementation for plugin developers.

## Installation

The Graph View is part of the default `quartz.config.yaml`. If your config doesn't have it, add it with:

```bash
npx quartz plugin add @quartz-community/graph
```

This adds an entry like this to your `quartz.config.yaml`:

```yaml title="quartz.config.yaml"
plugins:
  - source: "@quartz-community/graph"
    enabled: true
    layout:
      position: right
      priority: 10
```

## Features

By default, the node radius is proportional to the total number of incoming and outgoing internal links from that file.

Additionally, similar to how browsers highlight visited links a different colour, the graph view will also show nodes that you have visited in a different colour.

> [!info]
> Graph View reads `contentIndex.json`, which Quartz emits by default (see [[ContentIndex]]). It is empty if `configuration.contentIndex` is disabled.

## Customization

Most configuration can be done through the plugin's `options`.

For example, here's what the default configuration looks like:

```yaml title="quartz.config.yaml"
plugins:
  - source: "@quartz-community/graph"
    enabled: true
    options:
      localGraph:
        drag: true
        zoom: true
        depth: 1
        scale: 1.1
        repelForce: 0.5
        centerForce: 0.3
        linkDistance: 30
        fontSize: 0.6
        opacityScale: 1
        removeTags: []
        showTags: true
        focusOnHover: false
        enableRadial: false
      globalGraph:
        drag: true
        zoom: true
        depth: -1
        scale: 0.9
        repelForce: 0.5
        centerForce: 0.2
        linkDistance: 30
        fontSize: 0.6
        opacityScale: 1
        removeTags: []
        showTags: true
        focusOnHover: true
        enableRadial: true
    layout:
      position: right
      priority: 10
```

When passing in your own options, you can omit any or all of these fields if you'd like to keep the default value for that field.

Want to customize it even more?

- Removing graph view: remove the `graph` entry from `quartz.config.yaml` or set `enabled: false`
- Component source: https://github.com/quartz-community/graph
