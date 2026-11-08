---
title: Full-text Search
tags:
  - component
---

Full-text search in Quartz is powered by [Flexsearch](https://github.com/nextapps-de/flexsearch). It's fast enough to return search results in under 10ms for Quartzs as large as half a million words.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

It can be opened by either clicking on the search bar or pressing `⌘`/`ctrl` + `K`. The top 5 search results are shown on each query. Matching subterms are highlighted and the most relevant 30 words are excerpted. Clicking on a search result will navigate to that page.

To search content by tags, you can either press `⌘`/`ctrl` + `shift` + `K` or start your query with `#` (e.g. `#components`).

This component is also keyboard accessible: Tab and Shift+Tab will cycle forward and backward through search results and Enter will navigate to the highlighted result (first result by default). You are also able to navigate search results using `ArrowUp` and `ArrowDown`.

> [!info]
> Search reads `contentIndex.json`, which Quartz emits by default (see [[ContentIndex]]). It has no data if `configuration.contentIndex` is disabled.

### Indexing Behaviour

By default, it indexes every page on the site with **Markdown syntax removed**. This means link URLs for instance are not indexed.

It properly tokenizes Chinese, Korean, and Japenese characters and constructs separate indexes for the title, content and tags, weighing title matches above content matches.

## Customization

- Removing search: remove the `search` entry from `quartz.config.yaml` or set `enabled: false`.
- Install: `npx quartz plugin add github:quartz-community/search`
- Source: [`quartz-community/search`](https://github.com/quartz-community/search)
