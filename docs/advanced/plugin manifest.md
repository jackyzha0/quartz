---
title: Plugin manifest
---

The `quartz` field of a plugin's `package.json` is its **manifest**: it tells Quartz what kind of plugin it is, where it runs in the pipeline, which components and frames it ships and what it needs. Quartz reads it from the installed package (`node_modules/<package>/package.json` for npm plugins, `.quartz/plugins/<name>/package.json` for Git and local plugins). See [[making plugins]] for how to write the plugin itself.

```json title="package.json"
{
  "name": "@you/my-plugin",
  "version": "1.2.0",
  "description": "Adds reading times",
  "exports": {
    ".": { "types": "./dist/index.d.ts", "import": "./dist/index.js" },
    "./components": {
      "types": "./dist/components/index.d.ts",
      "import": "./dist/components/index.js"
    }
  },
  "quartz": {
    "name": "my-plugin",
    "displayName": "My Plugin",
    "category": ["transformer", "component"],
    "quartzVersion": ">=5.1.0",
    "defaultOrder": 70,
    "defaultEnabled": true,
    "defaultOptions": { "wordsPerMinute": 200 },
    "configSchema": {
      "type": "object",
      "properties": { "wordsPerMinute": { "type": "number" } },
      "additionalProperties": false
    },
    "components": {
      "ReadingTime": {
        "displayName": "Reading time",
        "description": "Shows how long a page takes to read",
        "defaultPosition": "beforeBody",
        "defaultPriority": 40
      }
    },
    "capabilities": {
      "provides": { "data": ["readingTime"] }
    }
  }
}
```

## Fields

| Field             | Type                                   | Default                         |
| ----------------- | -------------------------------------- | ------------------------------- |
| `name`            | `string`                               | the package / directory name    |
| `displayName`     | `string`                               | `name`                          |
| `description`     | `string`                               | the package's `description`     |
| `category`        | category, or an array of categories    | detected from the entry module  |
| `quartzVersion`   | semver range                           | none (works with every version) |
| `deprecated`      | `string`                               | none                            |
| `dependencies`    | `string[]` (plugin sources)            | `[]`                            |
| `defaultOrder`    | `number`                               | `50`                            |
| `defaultEnabled`  | `boolean`                              | `true`                          |
| `defaultOptions`  | object                                 | `{}`                            |
| `configSchema`    | JSON Schema of the options object      | none                            |
| `components`      | `{ [exportName]: { displayName, … } }` | none                            |
| `frames`          | `{ [exportName]: { exportName } }`     | none                            |
| `requiresInstall` | `boolean`                              | `false`                         |
| `capabilities`    | `{ provides?, requires?, optional? }`  | none                            |

`author` and `homepage` fall back to the package's own fields; the bug-report link Quartz prints when a plugin fails comes from the package's `bugs` or `repository` field.

### `name`, `displayName`, `description`

`name` is the short name Quartz uses in error messages and that other plugins name in the `from` of their [[plugin capabilities|capability]] requirements. `displayName` (used in dependency errors) and `description` describe the plugin to people, e.g. in the TUI.

### Version

Quartz uses the package's `version`. A `quartz.version` field (the plugin template used to ship one) is only used when the package has no `version`, so you don't need to keep it in sync.

### `category`

One of `"transformer"`, `"filter"`, `"emitter"`, `"pageType"` or `"component"`, or an array for a plugin that is several things at once (e.g. `["transformer", "component"]`). For each processing category (everything except `component`), Quartz looks for the plugin's factory in the entry module (`.`): the `default` export, else a `plugin` export, else the only exported function, else the exported function that returns an instance with that category's methods when called without options. A plugin with several processing categories should therefore not have a `default` export, since Quartz would use it for every category.

A plugin whose categories are all `"component"` is loaded differently: Quartz imports its entry module for its side effects, calls its `init(options)` export if there is one (see [[creating components#Receiving YAML Options in Component-Only Plugins|receiving YAML options]]) and loads its components.

Without a `category`, Quartz tries to detect it from the entry module; if it can't and the plugin declares no components, the plugin is skipped with an error. Set it.

### `quartzVersion`

The Quartz versions the plugin works with, as a semver range (`">=5.1.0"`). Locally a mismatch is a warning; in CI the build fails. See [[versioning#For plugin authors]].

### `deprecated`

A message saying why the plugin is deprecated and what replaces it. Quartz 5.1+ warns while the plugin is enabled (during the build, in `plugin add` and in `plugin doctor`); the plugin keeps working.

### `dependencies`

Other plugins that must run for this one to work, as plugin sources. Each one is matched **exactly** against the `source` of the entries in `quartz.config.yaml`: `"@quartz-community/foo"` doesn't match an entry `github:quartz-community/foo`, so use the form the default config uses (the npm package name for official plugins). The build **fails** when a dependency isn't in the config at all, when it runs later than the plugin (its order is higher), or when dependencies form a cycle. A dependency that is in the config but disabled is a warning.

Don't declare `crawl-links`, `remove-draft` or `content-index`: they are [[built-in processing]] since Quartz 5.1, which treats such a dependency as satisfied by the built-in, but Quartz 5.0 fails the build when the plugin is not in the config. Declare what you need from them as [[plugin capabilities|capabilities]] instead (`requires: { data: ["links"] }`), and order your plugin after them with `defaultOrder`.

### `defaultOrder`

Where the plugin runs among plugins of the same category, lower first, when the user's config entry sets no `order`. Built-ins take part in the same scale (on equal order a built-in runs first). For transformers:

| Order | Transformer                                    |
| ----- | ---------------------------------------------- |
| 0     | built-in frontmatter (`file.data.frontmatter`) |
| 10    | `created-modified-date`                        |
| 20    | `syntax-highlighting`                          |
| 30    | `github-flavored-markdown`                     |
| 40    | `obsidian-flavored-markdown`                   |
| 50    | default                                        |
| 60    | built-in links (`file.data.links`)             |
| 70    | `description`                                  |

A transformer that reads `file.data.links` must do so in `htmlPlugins` (it isn't set yet while `markdownPlugins` run) and have an order above 60. Filters and emitters run in order too (the built-in drafts filter and content index emitter are at 50), although emitters run in parallel.

### `defaultEnabled`, `defaultOptions`

`npx quartz plugin add` writes the plugin's entry with `enabled: defaultEnabled`, `order: defaultOrder` and `options: defaultOptions`, so a later change to `defaultOrder` only reaches entries without an `order`. When Quartz loads the plugin, it merges the options as `{ ...defaultOptions, ...options from quartz.config.yaml, ...options from quartz.ts }` and passes the result to the factory (or to `init`).

### `configSchema`

A JSON Schema for the options object. Quartz warns about likely mistakes in a plugin's `options` when it loads the config and in `npx quartz plugin doctor`:

- an option name that looks like a typo of a known one (`did you mean …?`), or any unknown option when the schema sets `"additionalProperties": false`;
- a value of the wrong type (`properties.<name>.type`, with `"integer"` counted as a number);
- a value not in `properties.<name>.enum`.

Options are known from `properties` and from the keys of `defaultOptions`; without a schema, types are inferred from `defaultOptions`, and a value of the same type as an option's default is always accepted.

First-party plugins declare their options as `optionSchema` instead, a flat map of option name to type that [Quartz Syncer](https://github.com/saberzero1/quartz-syncer) also uses for its settings. Quartz reads it the same way, with `"enum"` plus `values` for a choice:

```json title="package.json"
"optionSchema": {
  "limit": { "type": "number", "description": "How many notes to list" },
  "mode": { "type": "enum", "values": ["light", "dark"] },
  "showTags": { "type": "boolean" }
}
```

### `components`

The components the plugin provides, keyed by export name. Quartz imports them from the package's **`./components`** export (not the entry module) and registers each name it finds there; a name missing from `./components` is reported as a warning. Each entry can set:

- `displayName`, `description`: describe the component, e.g. in the TUI;
- `defaultPosition`: the layout slot used when the user's `layout:` block has no `position` (`header`, `left`, `right`, `beforeBody`, `afterBody` or `footer`). Without either, the component isn't placed;
- `defaultPriority`: the order within that slot when the user sets none (default 50, lower first).

See [[creating components]].

### `frames`

[[layout#Page Frames|Page frames]] the plugin provides, keyed by export name, loaded from the package's `./frames` export. See [[making plugins#Providing Custom Frames]].

### `requiresInstall`

Set it when the plugin needs native packages that can't be bundled (e.g. `sharp`). Quartz then installs the plugin's `peerDependencies` (except the packages it shares with plugins, like Preact) into the site when it installs the plugin from Git. See [[making plugins#Plugins with Native Dependencies]].

### `capabilities`

What the plugin provides to and needs from other plugins (`file.data` keys, DOM classes, globals, events, files, CSS variables), so Quartz can warn when a provider is missing. See [[plugin capabilities]].
