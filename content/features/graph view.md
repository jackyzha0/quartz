---
title: "Graph View"
tags:
- component
---

Quartz features a graph-view that can show both a local graph view and a global graph view. 

- The local graph view shows files that either link to the current file or are linked from the current file. In other words, it shows all notes that are *at most* one hop away.
- The global graph view can be toggled by clicking the graph icon on the top-right of the local graph view. It shows *all* the notes in your graph and how they connect to each other.

By default, the node radius is proportional to the total number of incoming and outgoing internal links from that file.

Additionally, similar to how browsers highlight visited links a different colour, the graph view will also show nodes that you have visited in a different colour.

> [!info]
> Graph View requires the `ContentIndex` emitter plugin to be present in the [[configuration]].

## Customization
Most configuration can be done by passing in options to `Component.Graph()`.

For example, here's what the default configuration looks like:

```typescript title="quartz.config.ts"
Component.Graph({
  localGraph: {
    drag: true, // whether to allow panning the view around
    zoom: true, // whether to allow zooming in and out
    depth: 1,   // how many hops of notes to display
    scale: 1.1, // default view scale
    repelForce: 0.5,  // how much nodes should repel each other
    centerForce: 0.3, // how much force to use when trying to center the nodes
    linkDistance: 30, // how long should the links be by default?
    fontSize: 0.6,    // what size should the node labels be?
    opacityScale: 1   // how quickly do we fade out the labels when zooming out?
  },
  globalGraph: {
    drag: true,
    zoom: true,
    depth: -1,
    scale: 0.9,
    repelForce: 0.5,
    centerForce: 0.3,
    linkDistance: 30,
    fontSize: 0.6,
    opacityScale: 1
  }
})
```

When passing in your own options, you can omit any or all of these fields if you'd like to keep the default value for that field.

Want to customize it even more?

- Removing graph view: delete all usages of `Component.Graph()` from `quartz.config.ts`.
- Component: `quartz/components/Graph.tsx`
- Style: `quartz/components/styles/graph.scss`
- Script: `quartz/components/scripts/graph.inline.ts`