---
title: Backlinks
tags:
  - component
---

A backlink for a note is a link from another note to that note. Links in the backlink pane also feature rich [[popover previews]] if you have that feature enabled.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

## Customization

- Removing backlinks: remove the `backlinks` entry from `quartz.config.yaml` or set `enabled: false`.
- Hide when empty: hide `Backlinks` if given page doesn't contain any backlinks (default to `true`). To disable this, set `hideWhenEmpty: false` in the plugin options in `quartz.config.yaml`.
- Install: `npx quartz plugin add @quartz-community/backlinks`
- Source: [`quartz-community/backlinks`](https://github.com/quartz-community/backlinks)
