---
title: StackedPages
description: Binder-style tabs of the pages you visited, beside the page.
tags:
  - plugin/component
image:
new-in-v5: true
repository: "[quartz-community/stacked-pages](https://github.com/quartz-community/stacked-pages)"
enabled: false
required: false
---

Binder-style stacked pages: every page you open is added as a tab, and the tabs are shown as strips beside the page content, like the tabs of a ring binder. Pages you came from sit on the left of the current page, pages you went back from on the right, so you can retrace your path through your notes.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

## Usage

Once enabled, navigation works as usual: links are not intercepted, so heading anchors, [[popover previews]] and [[SPA Routing]] keep working. After each navigation the page is added as a tab right after the current one (or, if it already has a tab, that tab becomes current). The binder appears once there are at least two tabs.

The tabs are kept in the browser's `sessionStorage`: they survive reloads and navigation within the tab, but are not part of the URL and are not shared between browser tabs.

Below `mobileBreakpoint` (800px by default) the binder is hidden.

### Interactions

- **Click a tab**: navigates to that page.
- **Close a tab**: click its × button. Closing the current tab navigates to the nearest remaining one.
- **Tab limit**: with more than `maxTabs` tabs, the oldest tab furthest from the current one is dropped.

## Configuration

This plugin accepts the following configuration options:

- `maxTabs`: Maximum number of tabs kept. Defaults to `8`.
- `mobileBreakpoint`: Viewport width (in pixels) below which the binder is hidden. Defaults to `800`.
- `showSpines`: Whether to draw the coloured spine accent on each tab. Defaults to `true`.
- `animateTransitions`: Accepted, but currently has no effect. Defaults to `true`.

### Default options

The default config has a disabled entry for this plugin. Set `enabled: true` to use it:

```yaml title="quartz.config.yaml"
- source: "@quartz-community/stacked-pages"
  enabled: true
  options:
    maxTabs: 8
    mobileBreakpoint: 800
    showSpines: true
  layout:
    position: afterBody
    priority: 50
    display: all
```

## API

- Category: Component
- Function name: `ExternalPlugin.StackedPages()`.
- Source: [`quartz-community/stacked-pages`](https://github.com/quartz-community/stacked-pages)
- Install: `npx quartz plugin add @quartz-community/stacked-pages`
