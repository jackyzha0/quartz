---
title: Graph
description: Interactive link graph visualization.
tags:
  - plugin/component
image:
repository: "[quartz-community/graph](https://github.com/quartz-community/graph)"
enabled: true
required: false
---

Interactive graph visualization.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

See [[graph view]] for detailed usage information.

## Configuration

This plugin accepts the following configuration options:

- `localGraph`: Options for the local graph view.
- `globalGraph`: Options for the global graph view.

Both `localGraph` and `globalGraph` accept the following options:

- `drag`: Enable dragging nodes. Defaults to `true`.
- `zoom`: Enable zooming. Defaults to `true`.
- `depth`: The depth of the graph. Defaults to `1` for local and `-1` (all pages) for global.
- `scale`: The initial scale of the graph. Defaults to `1.1` for local and `0.9` for global.
- `repelForce`: The force that pushes nodes apart. Defaults to `0.5`.
- `centerForce`: The force that pulls nodes to the center. Defaults to `0.3` for local and `0.2` for global.
- `linkDistance`: The distance between linked nodes. Defaults to `30`.
- `fontSize`: The font size of node labels. Defaults to `0.6`.
- `opacityScale`: The scale of node opacity. Defaults to `1`.
- `removeTags`: Tag nodes to leave out of the graph. Defaults to `[]`.
- `showTags`: Whether to show tags as nodes in the graph. Defaults to `true`.
- `enableRadial`: Whether to enable radial layout. Defaults to `false` for local and `true` for global.
- `focusOnHover`: Whether to focus on the hovered node. Defaults to `false` for local and `true` for global.

### Default options

```yaml title="quartz.config.yaml"
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

## API

- Category: Component
- Function name: `ExternalPlugin.Graph()`.
- Source: [`quartz-community/graph`](https://github.com/quartz-community/graph)
- Install: `npx quartz plugin add @quartz-community/graph` (included in the default configuration)
