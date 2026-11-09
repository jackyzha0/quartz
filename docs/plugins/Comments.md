---
title: Comments
description: Comment section powered by Giscus.
tags:
  - plugin/component
image: "[[giscus-results.png]]"
repository: "[quartz-community/comments](https://github.com/quartz-community/comments)"
enabled: false
required: false
---

Adds a comment section to the bottom of each page, backed by [Giscus](https://giscus.app/) (GitHub Discussions). Giscus is currently the only provider.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

See [[features/comments|Comments]] for setup instructions.

## Configuration

This plugin accepts the following configuration options:

- `provider`: The comment provider to use. Defaults to `giscus`, the only supported provider.
- `options`: Provider-specific options. `repo`, `repoId`, `category` and `categoryId` are **required**; get them from the [Giscus site](https://giscus.app/).
  - `repo`: The GitHub repository to use for comments (`owner/name`).
  - `repoId`: The ID of the GitHub repository.
  - `category`: The discussion category to use.
  - `categoryId`: The ID of the discussion category.
  - `lang`: The language for the comment system. Defaults to `en`.
  - `themeUrl`: URL to a folder with custom themes. Defaults to `https://<baseUrl>/static/giscus`.
  - `lightTheme`: Filename for the light theme CSS file. Defaults to `light`.
  - `darkTheme`: Filename for the dark theme CSS file. Defaults to `dark`.
  - `mapping`: How to map pages to discussions (`url`, `title`, `og:title`, `specific`, `number`, `pathname`). Defaults to `url`.
  - `strict`: Use strict title matching. Defaults to `true`.
  - `reactionsEnabled`: Whether to enable reactions for the main post. Defaults to `true`.
  - `inputPosition`: Where to put the comment input box relative to the comments (`top` or `bottom`). Defaults to `bottom`.

Set `comments: false` in a page's frontmatter to hide the comment section on that page.

### Default options

The plugin is disabled by default. The default configuration contains:

```yaml title="quartz.config.yaml"
- source: "@quartz-community/comments"
  enabled: false
  options:
    provider: giscus
    options: {}
  layout:
    position: afterBody
    priority: 10
```

To enable it, set `enabled: true` and fill in the required options, for example:

```yaml title="quartz.config.yaml"
- source: "@quartz-community/comments"
  enabled: true
  options:
    provider: giscus
    options:
      repo: jackyzha0/quartz
      repoId: MDEwOlJlcG9zaXRvcnkzODcyMTMyMDg
      category: Announcements
      categoryId: DIC_kwDOFxRnmM4B-Xg6
  layout:
    position: afterBody
    priority: 10
```

## API

- Category: Component
- Function name: `ExternalPlugin.Comments()`.
- Source: [`quartz-community/comments`](https://github.com/quartz-community/comments)
- Install: `npx quartz plugin add @quartz-community/comments`
