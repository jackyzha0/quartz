---
title: Plugin capabilities
---

Quartz plugins cooperate through channels the type system can't see:

- `file.data` keys (e.g. built-in [[CrawlLinks|link processing]] writes `links`, [[plugins/Backlinks|backlinks]] reads it),
- DOM classes queried by client scripts (OFM's mermaid script looks for syntax-highlighting's `.clipboard-button`),
- browser globals and document events (`fetchData`, `addCleanup`, `nav`, `themechange`),
- emitted files (`static/contentIndex.json`, read by search, explorer and graph),
- CSS custom properties.

When the provider of one of these is disabled, the consumer usually breaks _silently_: an empty backlinks list, wikilinks that 404, or — worst — `draft: true` pages being published because no plugin parsed the frontmatter. **Capabilities** let a plugin declare what it provides and needs, so `quartz build` can say what is wrong:

```
⚠ Plugin "backlinks" requires data "links", but no enabled plugin provides it — enable "configuration.links". (the backlinks list is always empty)
```

> [!note]
> Capabilities are opt-in and advisory. Plugins without them behave exactly as before, and an unsatisfied requirement is a warning, never a build failure.

## Declaring capabilities

Add `capabilities` to the `quartz` field of your plugin's `package.json`:

```json
{
  "quartz": {
    "name": "backlinks",
    "capabilities": {
      "provides": {},
      "requires": {
        "data": [
          { "name": "links", "from": "crawl-links", "reason": "the backlinks list is always empty" }
        ]
      },
      "optional": {
        "data": [
          {
            "name": "frontmatter",
            "from": "note-properties",
            "reason": "titles fall back to file names"
          }
        ]
      }
    }
  }
}
```

| Section    | Meaning                                                                   | Unsatisfied →          |
| ---------- | ------------------------------------------------------------------------- | ---------------------- |
| `provides` | What this plugin makes available. Plain strings.                          | —                      |
| `requires` | Needed for the plugin to work correctly.                                  | build warning          |
| `optional` | Used when present; the plugin degrades gracefully (you must handle that). | info (not printed yet) |

Each section maps a **kind** to a list:

| Kind      | Names                                                         | Example                      |
| --------- | ------------------------------------------------------------- | ---------------------------- |
| `data`    | `file.data` / `fileData` keys (vfile `DataMap`)               | `"links"`                    |
| `dom`     | CSS selector rendered into pages or added by a script         | `".clipboard-button"`        |
| `globals` | browser globals defined by scripts                            | `"fetchData"`                |
| `events`  | `document` CustomEvents dispatched                            | `"themechange"`              |
| `files`   | emitted paths relative to the site root (leading `/` ignored) | `"static/contentIndex.json"` |
| `cssVars` | CSS custom properties defined                                 | `"--secondary"`              |

A requirement is either a name, or `{ "name", "from"?, "reason"? }`:

- `from` — plugin name(s) (the manifest `name`, e.g. `"crawl-links"`) known to provide it. It is used for the "enable …" hint, **and** a requirement counts as satisfied whenever a plugin named in `from` is enabled, even if that plugin predates capability declarations. Always set `from` for first-party providers: it keeps new consumers working with old providers.
- `reason` — what breaks without it, appended to the warning.

Names are matched exactly (after trimming). Unknown kinds or malformed entries are ignored and reported, never fatal.

### Provided by Quartz itself

These never need a provider plugin (`coreCapabilities()` in `quartz/plugins/loader/capabilities.ts`):

- data: `slug`, `filePath`, `relativePath`
- dom: `#quartz-body`, `.page`, `.center`, `article`, `.popover-hint`, `.sidebar`
- globals: `fetchData`, `addCleanup`, `spaNavigate`
- events: `nav` (always), `prenav` (only with `enableSPA`)

Note that `fetchData` is a promise for `static/contentIndex.json`, which Quartz emits by default ([[ContentIndex|built-in content index]]). Declare `files: ["static/contentIndex.json"]` if you read it. Since this release `fetchData` resolves to `{}` (with a console warning) when the file is missing, instead of rejecting.

## How the check works

`loadQuartzConfig()` calls `validatePluginCapabilities()` after loading manifests:

1. Collect `provides` of core and every **enabled** plugin.
2. For each enabled plugin with `capabilities`, check each `requires` / `optional` entry. Satisfied if provided, or if a plugin listed in `from` is enabled.
3. Only if something is missing, also read the manifests of **disabled** entries in `quartz.config.yaml` to suggest which one to enable.
4. Warnings are printed once per process (main thread only).

The check is static: it cannot see option-dependent behaviour (e.g. `syntax-highlighting` with `clipboard: false` still "provides" `.clipboard-button`) or pipeline order (see the `dependencies` / `defaultOrder` checks for that).

## Writing robust consumers

Declaring a requirement is not a substitute for handling its absence. For `optional` (and ideally `requires`) capabilities:

- Guard DOM lookups: `const btn = pre.querySelector(".clipboard-button"); if (btn) { … }` — never `getComputedStyle(maybeNull)`.
- Default data: `file.data.links ?? []`, `fileData.dates?.created`.
- Wrap `await fetchData` in `try`/`catch` and accept an empty object.

## Built-ins as providers

Quartz's [[built-in processing]] steps take part in the check like plugins: when enabled, built-in frontmatter provides `frontmatter`, `aliases` and `frontmatterLinks`, built-in links provides `links`, and the built-in content index provides `static/contentIndex.json`. When one is turned off, warnings suggest `configuration.<key>` (and a `from: "crawl-links"` hint is shown as `configuration.links`).

The same declarations decide replacement: an enabled plugin that `provides` `data: ["frontmatter"]`, `data: ["links"]` or `files: ["static/contentIndex.json"]` replaces the matching built-in.

## Migration path

1. **Now (this change):** core checker + declarations on a representative set of first-party plugins: `note-properties`, `crawl-links`, `backlinks`, `description`, `content-index`, `syntax-highlighting`, `obsidian-flavored-markdown`, `remove-draft`, `search`.
2. **Next, first-party plugins** — drafts derived from the workspace catalog (`just catalog show <plugin>` in the dev-mode workspace lists data read/written, DOM classes and scripts):

   | Plugin                                      | Draft                                                                                                |
   | ------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
   | `explicit-publish`                          | requires data `frontmatter` (built in)                                                               |
   | `graph`, `explorer`                         | requires files `static/contentIndex.json` (built in); optional events `themechange` from darkmode    |
   | `recent-notes`, `content-meta`              | optional data `dates` from created-modified-date                                                     |
   | `alias-redirects`                           | requires data `aliases` (built in)                                                                   |
   | `table-of-contents`                         | provides data `toc`, `collapseToc`                                                                   |
   | `created-modified-date`                     | provides data `dates`, `defaultDateType`                                                             |
   | `unlisted-pages`, `encrypted-pages`         | provide data `unlisted` (encrypted-pages also `encrypted`, events `render`, `content-index-updated`) |
   | `darkmode`                                  | provides events `themechange`                                                                        |
   | `og-image`, `folder-page`, `tag-page`       | optional data `description` from description, `dates` from created-modified-date                     |
   | `canvas-page`, `obsidian-plugin-excalidraw` | optional dom `.explorer` (they style it) from explorer                                               |

3. **Third-party plugins:** add declarations at their own pace; nothing changes for them otherwise.
4. **Later (proposals, not implemented):** print `optional` infos with `quartz build --verbose`; a `strictCapabilities` option that turns warnings into errors; ordering checks for `data` between transformers (needs a `phase` per provided key); option-aware provides; a `transforms` kind for "rewrites links" style contracts (OFM currently uses crawl-links' `.internal` class as a proxy); exporting these types from `@quartz-community/types`.
