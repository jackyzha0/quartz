---
title: AliasRedirects
description: Generates redirect pages from frontmatter aliases and case-preserving URLs.
tags:
  - plugin/emitter
image: https://images.unsplash.com/photo-1601735479770-bb5de9dbe844
repository: "[quartz-community/alias-redirects](https://github.com/quartz-community/alias-redirects)"
enabled: true
required: false
---

This plugin emits HTML redirect pages so that old URLs redirect to the canonical page. It handles two types of redirects:

1. **Frontmatter aliases**: Redirect pages for aliases defined in your content's frontmatter.
2. **Case-preserving redirects**: Automatic redirect pages for URLs that changed due to Quartz v5's lowercase slug normalization.

### Frontmatter Aliases

If `foo.md` has the following frontmatter:

```md title="foo.md"
---
title: "Foo"
aliases:
  - "bar"
---
```

The target `host.me/bar` will be permanently redirected to `host.me/foo`.

The emitter supports the following frontmatter fields:

- `aliases`
- `alias`

A note with a `permalink` is published at its permalink, and its file path becomes a redirect as well: `notes/foo.md` with `permalink: foo` lives at `host.me/foo`, and `host.me/notes/foo` redirects there. An alias that is another page's address (or the page's own) is skipped with a warning, so a redirect never replaces a page.

### Case-Preserving Redirects

Quartz v5 normalizes all URLs to lowercase. If you are migrating from v4 (which preserved the original casing), previously indexed URLs containing uppercase letters (e.g. `/Diary/My-Note`) would return 404 errors.

When `enableCaseRedirects` is enabled (the default), this plugin automatically detects files whose original path differs from the lowercased slug and generates redirect pages at the original-case URL. For example, if your content directory contains `Diary/2026-01-01.md`, the plugin generates:

- The canonical page at `/diary/2026-01-01` (produced by the normal build)
- A redirect page at `/Diary/2026-01-01` (produced by this plugin)

The redirect page includes proper SEO signals:

- `<meta http-equiv="refresh" content="0; url=...">` for an instant redirect
- `<link rel="canonical">` pointing to the lowercase URL
- `<meta name="robots" content="noindex">` to prevent duplicate indexing

This preserves search engine rankings and ensures inbound links continue to work.

> [!note]
> Case-preserving redirects have no effect on case-insensitive filesystems (macOS, Windows) where the server already resolves either casing to the same file. The plugin automatically detects the filesystem type and skips redirect generation when unnecessary.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin accepts the following configuration options:

- `enableCaseRedirects`: If `true` (default), automatically generates redirect pages for URLs that changed casing due to v5's lowercase normalization. Set to `false` to disable this behavior.

## API

- Category: Emitter
- Function name: `ExternalPlugin.AliasRedirects()`.
- Source: [`quartz-community/alias-redirects`](https://github.com/quartz-community/alias-redirects)
- Install: `npx quartz plugin add @quartz-community/alias-redirects` (included in the default configuration)
