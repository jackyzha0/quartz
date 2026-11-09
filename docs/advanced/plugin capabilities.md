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
          {
            "name": "links",
            "from": "quartz:links",
            "reason": "the backlinks list is always empty"
          }
        ]
      },
      "optional": {
        "data": [
          {
            "name": "frontmatter",
            "from": "quartz:frontmatter",
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

- `from` — plugin name(s) (the manifest `name`, e.g. `"syntax-highlighting"`) known to provide it. It is used for the "enable …" hint, **and** a requirement counts as satisfied whenever a plugin named in `from` is enabled, even if that plugin predates capability declarations. Always set `from` for first-party providers: it keeps new consumers working with old providers. [[built-in processing|Built-ins]] are named `quartz:frontmatter`, `quartz:links`, `quartz:drafts` and `quartz:contentIndex` (the names of the plugins they replaced, `crawl-links`, `remove-draft` and `content-index`, work too).
- `reason` — what breaks without it, appended to the warning.

Names are matched exactly (after trimming). Unknown kinds or malformed entries are ignored and reported, never fatal.

### Provided by Quartz itself

These never need a provider plugin (`coreCapabilities()` in `quartz/plugins/loader/capabilities.ts`):

- data: `slug`, `filePath`, `relativePath`
- dom: `#quartz-body`, `.page`, `.center`, `article`, `.popover-hint`, `.sidebar`
- globals: `fetchData`, `addCleanup`, `spaNavigate`, `quartzStaticUrl`, `quartzPrefetch` (the last is only set while [[prefetching]] is on)
- events: `nav` (always), `prenav` (only with `enableSPA`)

Note that `fetchData` is a promise for `static/contentIndex.json`, which Quartz emits by default ([[ContentIndex|built-in content index]]). Declare `files: ["static/contentIndex.json"]` if you read it. Since Quartz 5.1, `fetchData` resolves to `{}` (with a console warning) when the file is missing, instead of rejecting.

## How the check works

`loadQuartzConfig()` calls `validatePluginCapabilities()` after loading manifests:

1. Collect `provides` of core and every **enabled** plugin.
2. For each enabled plugin with `capabilities`, check each `requires` / `optional` entry. Satisfied if provided, or if a plugin listed in `from` is enabled.
3. Only if something is missing, also read the manifests of **disabled** entries in `quartz.config.yaml` to suggest which one to enable.
4. Warnings are printed once per process (main thread only).

The check is static: it cannot see option-dependent behaviour (e.g. `syntax-highlighting` with `clipboard: false` still "provides" `.clipboard-button`) or pipeline order: for that, set [[plugin manifest#defaultOrder|`defaultOrder`]] (and [[plugin manifest#dependencies|`dependencies`]]: a missing dependency or one ordered after your plugin fails the build, a disabled one is a warning).

## Writing robust consumers

Declaring a requirement is not a substitute for handling its absence. For `optional` (and ideally `requires`) capabilities:

- Guard DOM lookups: `const btn = pre.querySelector(".clipboard-button"); if (btn) { … }` — never `getComputedStyle(maybeNull)`.
- Default data: `file.data.links ?? []`, `fileData.dates?.created`.
- Wrap `await fetchData` in `try`/`catch` and accept an empty object.

## Built-ins as providers

Quartz's [[built-in processing]] steps take part in the check like plugins: when enabled, built-in frontmatter provides `frontmatter`, `aliases` and `frontmatterLinks`, built-in links provides `links`, and the built-in content index provides `static/contentIndex.json`. Built-in links also provides the DOM classes `.internal`, `.external` and `.broken`, and the content index `sitemap.xml`. When one is turned off, warnings suggest `configuration.<key>` (a `from: "crawl-links"` or `"quartz:links"` hint is shown as `configuration.links`).

The same declarations decide replacement: an enabled plugin that `provides` `data: ["frontmatter"]`, `data: ["links"]` or `files: ["static/contentIndex.json"]` replaces the matching built-in. Built-in drafts can't be replaced.

## Who declares capabilities

In Quartz 5.1, these first-party plugins declare capabilities: `backlinks`, `description`, `syntax-highlighting`, `obsidian-flavored-markdown` and `search` (and the plugins replaced by built-ins: `note-properties`, `crawl-links`, `remove-draft`, `content-index`). Plugins without declarations are never checked and never cause warnings, so third-party plugins can add them at their own pace.

Not implemented (yet): printing unsatisfied `optional` requirements, turning warnings into errors, ordering checks between transformers, and option-aware `provides`. The capability types are not exported from `@quartz-community/types`; the schema above is the contract.
