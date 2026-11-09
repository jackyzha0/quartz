---
title: ObsidianPluginTtrpgToolsMaps
description: Renders maps made with the Obsidian plugin TTRPG Tools - Maps (zoom-map) as interactive, read-only maps.
tags:
  - plugin/transformer
  - plugin/emitter
  - plugin/component
image:
new-in-v5: true
repository: "[quartz-community/obsidian-plugin-ttrpg-tools-maps](https://github.com/quartz-community/obsidian-plugin-ttrpg-tools-maps)"
enabled: false
required: false
---

This plugin renders maps made with the Obsidian plugin [TTRPG Tools: Maps (zoom-map)](https://github.com/Jareika/zoom-map) by Jareika as interactive, read-only maps, from the same `zoommap` code blocks and marker files, without any migration. It does not edit maps: author them in Obsidian with the original plugin.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

## Usage

Embed a map in a note with a `zoommap` code block, as in Obsidian:

````markdown
```zoommap
imageBases:
  - path: assets/world-map.webp
    name: Forbidden Lands
markers: assets/world-map.webp.markers.json
minZoom: 0.3
maxZoom: 20
height: 480px
width: 100%
```
````

Marker data can also be stored in the note itself (`storage: note`), in a `%%`-comment block:

````markdown
```zoommap
image: assets/world-map.webp
storage: note
id: map-1
```

%%
ZOOMMAP-DATA id=map-1
{ "layers": [...], "markers": [...] }
/ZOOMMAP-DATA
%%
````

The map images are copied to the site.

Supported: one or more base images (with a switcher), pan and zoom (mouse wheel, drag, double-click, pinch), markers with tooltips and links, layer toggles, per-marker zoom ranges, image overlays, square and hex grids, drawings and text layers. Not supported: editing, the ruler and travel-time tools, viewport frames and the canvas render mode.

## Configuration

This plugin accepts the following configuration options:

- `blockLanguage`: The code block language that holds a map. Defaults to `"zoommap"`.
- `inlineBlockHeaderId`: The header of inline marker data blocks (`storage: note`). Defaults to `"ZOOMMAP-DATA"`.
- `defaultIconKey`: Accepted, but currently not used: a marker without an icon is always drawn as a red pin. Defaults to `"pin-red"`.
- `maxInlineDataBytes`: Reserved; marker data is always inlined into the page. Defaults to `0`.

### Default options

```yaml title="quartz.config.yaml"
- source: "@quartz-community/obsidian-plugin-ttrpg-tools-maps"
  enabled: true
  options:
    blockLanguage: zoommap
    inlineBlockHeaderId: ZOOMMAP-DATA
```

## API

- Category: Transformer, Emitter, Component
- Function names: `ExternalPlugin.TTRPGMapTransformer()` (transformer), `ExternalPlugin.TTRPGMapEmitter()` (emitter, copies the map images).
- Source: [`quartz-community/obsidian-plugin-ttrpg-tools-maps`](https://github.com/quartz-community/obsidian-plugin-ttrpg-tools-maps)
- Install: `npx quartz plugin add @quartz-community/obsidian-plugin-ttrpg-tools-maps`
