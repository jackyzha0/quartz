---
title: TagPage
description: Generates listing pages for tags.
tags:
  - plugin/pageType
image:
repository: "[quartz-community/tag-page](https://github.com/quartz-community/tag-page)"
enabled: true
required: false
---

This plugin is a page type plugin that emits dedicated pages for each tag used in the content. It uses the `default` [[layout#Page Frames|page frame]] (three-column layout with sidebars). See [[folder and tag listings]] for more information.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin accepts the following configuration options:

- `numPages`: On the tag index page (`/tags`), the maximum number of pages listed under each tag; the tag's own page lists all of them. Defaults to `10`.
- `prefixTags`: If `true`, generated tag page titles are prefixed with the localized "Tag" label (e.g. "Tag: recipes"). Defaults to `false`.
- `sort`: A function of type `(f1: QuartzPluginData, f2: QuartzPluginData) => number{:ts}` used to sort entries. Defaults to sorting by date (newest first) and tie-breaking on lexicographical title order. Requires a TS override.

A page with a nested tag such as `#project/alpha` is listed under both `project/alpha` and `project`. Writing a note at `tags/<tag>.md` adds your own text above the generated listing.

### Default options

```yaml title="quartz.config.yaml"
- source: "@quartz-community/tag-page"
  enabled: true
  options:
    numPages: 10
    prefixTags: false
```

## API

- Category: Page Type
- Function name: `ExternalPlugin.TagPage()`.
- Source: [`quartz-community/tag-page`](https://github.com/quartz-community/tag-page)
- Install: `npx quartz plugin add @quartz-community/tag-page` (included in the default configuration)
