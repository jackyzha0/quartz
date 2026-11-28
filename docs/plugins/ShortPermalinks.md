---
title: ShortPermalinks
description: Generate stable short URLs as static redirect pages.
aliases:
  - shortPermalinks
  - short-permalinks
tags:
  - plugin/emitter
  - built-in
image:
enabled: false
required: false
---

ShortPermalinks is an opt-in [[built-in processing|built-in emitter]] that creates a short URL for every published page. It hashes the page's source path with SHA-256 and writes a static redirect such as `/s/4GFU84zQ`. The link stays the same across builds and content edits; moving or renaming the source file changes it.

This is useful when non-ASCII page names become long after percent encoding, or when a compact URL is easier to share. Redirects use a canonical link, an immediate meta refresh and a JavaScript fallback. The generated pages need no server-side redirect support.

Enable it under `configuration.shortPermalinks` in `quartz.config.yaml`:

```yaml title="quartz.config.yaml"
configuration:
  shortPermalinks:
    prefix: s
    hashLength: 8
    onCollision: disambiguation-page
```

Options:

- `prefix`: URL path under which short links are written. Defaults to `s`.
- `hashLength`: number of base62 characters from the SHA-256 path hash. Defaults to `8`; valid values are `1` through `43`.
- `onCollision`: what happens if truncated hashes collide. IDs that differ only in case are treated as a collision on case-insensitive output filesystems. `disambiguation-page` (the default) writes a page linking to every match; `skip` writes no short link for that hash. If any match is [[UnlistedPages|unlisted]], the colliding short link is skipped to keep unlisted pages out of the listing.
- `enabled`: explicitly enable or disable the emitter. Supplying the object above, or the shorthand `shortPermalinks: true`, enables it.
- `order`: emitter order. Defaults to `70`.

ShortPermalinks skips URLs occupied by a content page or an AliasRedirects redirect. In watch mode, redirects for deleted or renamed source files are removed on the next rebuild.

## API

- Category: Emitter (built-in, opt-in)
- Source: [`quartz/plugins/builtins/shortPermalinks.ts`](https://github.com/jackyzha0/quartz/blob/v5/quartz/plugins/builtins/shortPermalinks.ts)
