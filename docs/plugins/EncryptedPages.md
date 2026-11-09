---
title: EncryptedPages
description: Password-protected encrypted pages with shadow content index.
tags:
  - plugin/transformer
  - plugin/emitter
image: "#FF1493"
new-in-v5: true
repository: "[quartz-community/encrypted-pages](https://github.com/quartz-community/encrypted-pages)"
enabled: true
required: false
---

Password-protected encrypted pages. Encrypts page content at build time using AES-256-GCM and decrypts client-side with the Web Crypto API. Passwords are set per-page via frontmatter. A companion emitter writes an encrypted shadow content index so unlisted encrypted pages can be dynamically revealed in graph, explorer, and search after a successful decryption — without ever leaking their metadata to visitors who do not hold the password.

> [!example] Live demo
> Try it yourself: [[EncryptedPages Demo]]. The password is `quartz`.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

## Usage

Add a `password` field to any page's frontmatter to encrypt it:

```yaml
---
title: My Secret Page
password: mysecretpassword
---
```

The page content will be encrypted at build time. Visitors must enter the correct password to view the content.

Successful passwords are cached in the browser's session storage and automatically tried on other encrypted pages for convenience.

### Hiding encrypted pages from discovery surfaces

By default, encrypted pages still appear in the graph, explorer, search, RSS, sitemap, and backlinks — visitors can see the page exists and its title, but cannot read the content without the password.

To hide an encrypted page entirely until a visitor successfully decrypts it, set `unlisted: true` in its frontmatter:

```yaml
---
title: My Secret Page
password: mysecretpassword
unlisted: true
---
```

An unlisted page:

- Is **absent** from `contentIndex.json`, `sitemap.xml`, the RSS feed, backlinks, recent notes, folder listings, tag listings, bases views, graph, explorer, and search.
- Is still emitted as HTML, so it remains accessible by direct URL.
- Has its metadata (slug, title, links, tags) written to a separate `static/encryptedContentIndex.json` file, encrypted with the page's own password.
- Is dynamically re-added to the in-memory content index when a visitor successfully decrypts it, so graph, explorer, and search reflect it for the rest of the browser session. Server-rendered listings — backlinks, recent notes, tag pages, folder listings, and [[BasesPage|bases views]] — remain statically hidden even after decryption because they are baked as HTML at build time.

To make this the default for every encrypted page on your site, set `unlistWhenEncrypted: true` in the plugin options. Individual pages can then opt back in with `unlisted: false`.

> [!note]
> The `unlisted: true` frontmatter field above only takes effect for encrypted pages when this plugin is installed. If you also want `unlisted: true` to work on **non-encrypted** pages across your site, install [[UnlistedPages]] alongside this one. The two plugins compose cleanly — when both are enabled, `unlisted: true` hides any page, encrypted or not, from every discovery surface that respects the `file.data.unlisted` convention.

### Permanently hiding encrypted pages (`stealth`)

By default, an `unlisted: true` encrypted page is _revealed_ in graph, explorer, and search after a visitor successfully decrypts it. This is usually what you want: the user just proved they know the password, so showing them the page in the sidebar makes sense for the rest of their session.

If you instead want a page that stays permanently invisible — accessible only by direct URL, even to users who have successfully decrypted other pages on the same site — set `stealth: true` in its frontmatter:

```yaml
---
title: Deep Secret
password: mysecretpassword
stealth: true
---
```

A stealth page:

- Is **absent** from every discovery surface, same as any `unlisted` page.
- Has **no entry** in the shadow content index (`encryptedContentIndex.json`). The plugin deliberately skips stealth pages when building the shadow index.
- Stays hidden even after the visitor enters the correct password. Since there is no shadow-index entry to decrypt, there is nothing to patch into the in-memory content index — graph, explorer, and search never learn the page exists. Only the decrypted HTML is visible to the user on the page itself.
- The password is still cached in session storage, so re-visiting the same stealth page will auto-unlock it.

`stealth: true` implies `unlisted: true` — you do not need to set both, and if you write `stealth: true, unlisted: false` the stealth flag wins. On non-encrypted pages `stealth: true` has no effect (there is no shadow index to skip).

Use stealth pages for "secret door" content that should only reach users who already know the exact URL: private notes linked from an external wiki, personal pages you send to specific people, or anything you never want to show up in a site-internal search even to authenticated readers.

### Bases, canvases and drawings

With Quartz 5.1 and encrypted-pages 1.1, pages rendered from files (`.base`, `.canvas`, Excalidraw drawings) are encrypted too. A drawing stored as Markdown uses the `password` in its frontmatter. A `.base`, `.canvas` or `.excalidraw` file has no frontmatter, so it is encrypted with the password of the encrypted published note that links to it (the first by slug when several do); linked only from unencrypted pages, it stays unencrypted.

## Configuration

This plugin provides a transformer, an emitter, and a component. All options are set on a single config entry and shared between the transformer and the emitter — Quartz instantiates both automatically.

- `iterations`: PBKDF2 iteration count for key derivation. Higher values are more secure but slower to unlock. Defaults to `600000`.
- `passwordField`: Frontmatter field name that holds the page password. Shared by the transformer and the emitter. Defaults to `"password"`.
- `unlistWhenEncrypted`: If `true`, every encrypted page is marked `unlisted` unless its frontmatter explicitly overrides it. Defaults to `false`.
- `outputPath`: Output path for the shadow content index, relative to Quartz's output directory. Defaults to `"static/encryptedContentIndex.json"`.

### Component options

- `className`: CSS class for the component wrapper. Defaults to `"encrypted-page-wrapper"`.

### Default options

```yaml title="quartz.config.yaml"
- source: "@quartz-community/encrypted-pages"
  enabled: true
  options:
    iterations: 600000
    passwordField: password
    unlistWhenEncrypted: false
    outputPath: static/encryptedContentIndex.json
  order: 900
```

> [!warning]
> The `EncryptedPages` transformer replaces the entire HAST tree of an encrypted page with an opaque ciphertext container. Any transformer that needs to read the real HTML must run **before** `EncryptedPages`. Quartz's built-in [[CrawlLinks|link processing]] (`configuration.links`), which populates the links used by backlinks and the shadow content index, runs at order 60, and `EncryptedPages` defaults to order 900, so this holds out of the box. If you add other transformers that read page HTML, give them an `order` below `EncryptedPages`'.

## Security

- Content is encrypted with AES-256-GCM using PBKDF2 SHA-256 key derivation.
- Plaintext is stripped from search indices, RSS feeds, and the shadow content index regardless of visibility setting.
- The shadow content index is a flat array of opaque encrypted blobs. An attacker who downloads it learns only the number of unlisted encrypted pages and the PBKDF2 iteration count — no slugs, titles, or link relationships leak.
- Passwords are set per-page in frontmatter. Avoid committing passwords to public repositories.
- This is client-side encryption of a static site. It protects against casual browsing but not against determined attackers with access to the page source.

## API

- Category: Transformer, Emitter
- Function name: `ExternalPlugin.EncryptedPages()`, `ExternalPlugin.EncryptedContentIndex()`.
- Source: [`quartz-community/encrypted-pages`](https://github.com/quartz-community/encrypted-pages)
- Install: `npx quartz plugin add @quartz-community/encrypted-pages`
