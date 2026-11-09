---
title: quartz plugin
---

The `plugin` command is the heart of the Quartz v5 plugin management system. it allows you to install, configure, and update plugins directly from the command line.

Quartz plugins come from two kinds of sources:

- **npm packages** (`@quartz-community/explorer`) — the default plugins. They are installed into `node_modules/` by `npm install` / `npm ci` and versioned by `package.json` and `package-lock.json`.
- **Git repositories and local directories** (`github:owner/repo`, `./my-plugin`) — cloned or symlinked into `.quartz/plugins/`. Their exact commits are pinned in `quartz.lock.json`.

Wherever a command takes a plugin name you can use the full name (`@quartz-community/explorer`), the source as written in `quartz.config.yaml`, or the short name (`explorer`). Misspelled names get a "did you mean" suggestion.

Every subcommand exits with a non-zero status when something fails (a clone, a build, an unknown plugin name), so `npx quartz plugin install && npx quartz build` stops in CI instead of building a site with missing plugins.

## Subcommands

### list

List all configured plugins: Git/local plugins with their pinned commit, npm plugins with their installed version, and any plugins that are in `quartz.config.yaml` but not installed yet.

```shell
npx quartz plugin list
```

### add

Add a new plugin from npm or a Git repository. The plugin is installed (Git plugins are pinned in `quartz.lock.json`, npm packages recorded in `package.json`), and added to `quartz.config.yaml` with its default options — enabled unless the plugin is disabled by default.

```shell
npx quartz plugin add @quartz-community/graph   # an npm package, as the default config uses
npx quartz plugin add github:username/repo
npx quartz plugin add username/repo   # same as github:username/repo
```

To install from a specific branch or ref, append `#ref` to the source:

```shell
npx quartz plugin add github:username/repo#my-branch
npx quartz plugin add git+https://github.com/username/repo.git#my-branch
npx quartz plugin add https://github.com/username/repo.git#my-branch
```

You can also add a plugin from a local directory. This is useful for local development or airgapped environments:

```shell
npx quartz plugin add ./path/to/my-plugin
npx quartz plugin add ../sibling-plugin
npx quartz plugin add /absolute/path/to/plugin
```

Local plugins are symlinked into `.quartz/plugins/`, so any changes you make to the source directory are reflected immediately without re-installing.

When a branch is specified, it is stored in the lockfile. All subsequent commands (`install`, `prune`) will respect that branch automatically. Use `install --latest` to fetch the latest commit from that branch.

`plugin add` will not create duplicate entries: if a plugin with the same name is already configured (for example `@quartz-community/graph` when you add `github:someone/graph`), it is skipped with a hint. Remove the existing plugin first, or use `--as <name>` to install the second one under a different name. If the plugin is already present in `.quartz/plugins/` but missing from the config (e.g. after you deleted its entry by hand), `add` adds it back to the config without re-cloning.

> [!tip]
> `plugin add` also accepts `--concurrency` / `-c` to limit how many remote repositories are cloned and built at the same time. This is the same flag documented under [[#install]] and is useful when adding several plugins at once on low-end hardware.

### remove

Remove a plugin: deletes its entry from `quartz.config.yaml`, and for Git/local plugins also its directory in `.quartz/plugins/` and its lockfile entry.

```shell
npx quartz plugin remove plugin-name
npx quartz plugin remove explorer        # short name of @quartz-community/explorer
```

For npm plugins the package stays in `node_modules/` (most of them ship with Quartz). If another configured plugin declares a dependency on the one you removed, a warning tells you so.

### install

Install plugins for your Quartz project. By default, this installs all plugins listed in your `quartz.lock.json` file, at exactly the pinned commits (including plugins installed from a repository subdirectory).

```shell
npx quartz plugin install
```

If there is no `quartz.lock.json` yet, `install` falls back to installing the Git/local plugins from `quartz.config.yaml` and writes the lockfile — commit it to pin those versions. If only npm plugins are configured there is nothing to do and the command says so. When `quartz.config.yaml` lists Git plugins that are missing from the lockfile, `install` prints them with a hint to run `install --from-config`.

> [!note]
> `npx quartz build` also installs any configured Git plugin that is missing from `.quartz/plugins/`, and checks out the commit pinned in `quartz.lock.json` when there is one. Running `plugin install` first is still recommended in CI, because it fails loudly when a plugin cannot be installed.

#### Flags

- `--from-config`: Synchronize plugins with `quartz.config.yaml` instead of the lockfile. This will install missing plugins and prune orphaned ones.
- `--latest`: Fetch the latest version of plugins from their remote sources instead of using the version in the lockfile.
- `--clean`: Only restore plugins whose directory is missing; existing directories are left untouched.
- `--dry-run`: Preview the changes without actually installing or removing any files.
- `--concurrency`, `-c`: Maximum number of plugins to clone, fetch, and build in parallel. Defaults to the number of CPU cores. Lower this (e.g. `-c 1` or `-c 2`) on memory- or CPU-constrained machines where the default parallelism causes failures, OOMs, or hangs. See [[#Installing on low-end hardware]] below.

#### Positional Arguments

- `[names..]`: Optional list of specific plugin names to install or update.

```shell
# Update specific plugins to latest
npx quartz plugin install --latest plugin-a plugin-b

# Preview what would be installed from config
npx quartz plugin install --from-config --dry-run
```

### enable / disable

Toggle a plugin's status in your `quartz.config.yaml` without removing its files.

```shell
npx quartz plugin enable plugin-name
npx quartz plugin disable plugin-name
```

The CLI edits `quartz.config.yaml` in place: your comments, quoting and key order are preserved, and the file is only rewritten when something actually changed.

### config

View or modify the options of a specific plugin.

```shell
# View the options you set, plus the plugin defaults you have not overridden
npx quartz plugin config explorer

# Set values (repeatable; values are parsed as JSON when possible)
npx quartz plugin config explorer --set folderDefaultState=open --set useSavedState=false

# Nested option keys use dots
npx quartz plugin config graph --set localGraph.depth=2

# Remove an option so the plugin default applies again
npx quartz plugin config explorer --unset folderDefaultState
```

Options are checked against the plugin's documented defaults (the `defaultOptions` and optional `configSchema` in its manifest). A likely typo or a value of the wrong type prints a warning, for example:

```
⚠ @quartz-community/explorer: unknown option "folderDefaultStat" — did you mean "folderDefaultState"?
⚠ @quartz-community/explorer: option "useSavedState" should be a boolean (default: true), got string "yes"
```

The same warnings are printed at the start of `npx quartz build`, along with misspelled entry keys such as `enable:` instead of `enabled:`. They never stop the build.

### doctor

Check your plugin setup without changing anything:

```shell
npx quartz plugin doctor
npx quartz plugin doctor --verbose   # also show informational notes
npx quartz plugin doctor --fix       # move settings of plugins that are now built into Quartz
```

`doctor` reports, with a suggested fix for each problem:

- YAML syntax errors in `quartz.config.yaml`
- misspelled or invalid entry keys (`enable:`, `option:`, `layout.positon`), non-boolean `enabled` values, and entries without `enabled` (treated as disabled)
- unparseable sources and plugins configured twice
- npm plugins that are not installed, and Git/local plugins that are not installed, not pinned in `quartz.lock.json`, checked out at a different commit than the lockfile pins, or whose source changed
- broken local plugin symlinks and plugins without a built entry point (`dist/`)
- option typos and type mismatches, and declared plugin dependencies that are missing or disabled
- plugins that don't support your Quartz version (their `quartzVersion`, see [[versioning#Plugin compatibility]])
- deprecated plugins (their `quartz.deprecated` message names the replacement)
- entries for plugins that are now [[built-in processing|built into Quartz]] (`crawl-links`, `remove-draft`, `content-index`) and note-properties' `delimiters`/`language` options; `--fix` moves them into `configuration` (`links`, `drafts`, `contentIndex`, `frontmatter`), keeping your comments, and removes the now unused pins from `quartz.lock.json`
- lockfile entries that are no longer configured (clean up with `prune`)

It exits with status 1 when it finds errors, so it can run as a CI check.

### prune

Remove installed plugins that are no longer referenced in your `quartz.config.yaml`. This is useful for cleaning up after removing plugin entries from your configuration.

> [!note]
> Running `plugin install --from-config` also removes orphaned plugins as part of its synchronization. Use `prune` when you only want to clean up without installing anything new.

```shell
npx quartz plugin prune
```

Use `--dry-run` to preview which plugins would be removed without making changes:

```shell
npx quartz plugin prune --dry-run
```

## Common Workflows

### Adding and Enabling a Plugin

`plugin add` installs the plugin and enables it right away (unless the plugin is disabled by default — the command then tells you how to enable it):

```shell
npx quartz plugin add github:quartz-community/example
npx quartz plugin enable example   # only needed for plugins that are disabled by default
```

### Something is not working

Start with:

```shell
npx quartz plugin doctor
```

### Updating Everything

To keep your plugins fresh:

```shell
npx quartz plugin install --latest
```

### Installing on low-end hardware

By default, `plugin install` and `plugin add` clone, fetch, and build plugins in parallel across all your CPU cores. On memory-constrained machines (low-end laptops, Raspberry Pi, small VPS instances, restrictive CI runners) this can exhaust RAM or overwhelm the system because each worker may kick off its own `npm install` / `npm run build` at the same time.

> [!note]
> Most community plugins now ship with a pre-built `dist/` directory. When Quartz finds this, it skips the installation and build steps entirely, making the process much faster and lighter on resources. This section is primarily relevant for plugins in development or those that don't provide pre-built distribution.

If `plugin install` fails, hangs, or OOMs on your machine, lower the concurrency with `--concurrency` / `-c`:

```shell
# Install one plugin at a time (safest, slowest)
npx quartz plugin install --latest -c 1

# Two at a time — usually a good balance on 4 GB machines
npx quartz plugin install --latest --concurrency 2
```

The same flag works on `plugin add` and the other plugin subcommands that perform parallel work:

```shell
npx quartz plugin add github:quartz-community/some-plugin -c 1
```

### Managing Configuration

If you want to change a plugin setting without opening the YAML file:

```shell
npx quartz plugin config explorer --set useSavedState=true
```

### Cleaning Up Unused Plugins

If you've removed plugins from your config and want to clean up leftover files:

```shell
npx quartz plugin prune --dry-run  # preview first
npx quartz plugin prune            # remove orphaned plugins
```

### Setting Up from Config

When setting up on a new machine or in CI, `install --from-config` ensures your installed plugins match your config — installing missing plugins and removing any that are no longer referenced:

```shell
npx quartz plugin install --from-config
```

### Testing with Branches

If a plugin author has a fix or feature on a separate branch, you can install it directly without waiting for a release to the default branch:

```shell
# Install from a feature branch
npx quartz plugin add github:username/repo#fix/some-bug

# Later, switch back to the default branch by re-adding without a ref
npx quartz plugin remove repo
npx quartz plugin add github:username/repo
```

The branch ref is tracked in `quartz.lock.json`, so `install --latest` will continue to follow the specified branch until the plugin is re-added without one.

Both `prune` and `install --from-config` will fall back to `quartz.config.default.yaml` if no `quartz.config.yaml` is present.

### Local Plugin Development

For local plugin development or airgapped environments, you can add a plugin from a local directory:

```shell
npx quartz plugin add ./my-local-plugin
```

Local plugins are symlinked into `.quartz/plugins/`, so changes reflect immediately. When you run `install --latest`, local plugins are rebuilt (npm install + npm run build) without any git operations.

> [!note]
> Local symlinked plugins typically use this build-on-install fallback because the `dist/` directory is usually gitignored during development.

The `install --latest --dry-run` command will show local plugins with a "local" status instead of checking for remote updates.

To switch a local plugin back to a git source:

```shell
npx quartz plugin remove my-local-plugin
npx quartz plugin add github:username/my-local-plugin
```

### Subdirectory (Monorepo) Plugins

Some plugins live in a subdirectory of a larger repository rather than at the root. For these, you can specify the plugin source as an object in `quartz.config.yaml` with a `subdir` field:

```yaml title="quartz.config.yaml"
plugins:
  - source:
      repo: "https://github.com/username/monorepo.git"
      subdir: plugin
    enabled: true
```

This tells Quartz to clone the full repository but install only the contents of the specified subdirectory.

You can combine `subdir` with `ref` to pin a branch or tag, and `name` to override the plugin directory name:

```yaml title="quartz.config.yaml"
plugins:
  - source:
      repo: "https://github.com/username/monorepo.git"
      subdir: packages/my-plugin
      ref: v2.0
      name: my-plugin
    enabled: true
```

See [[configuration#Advanced Source Options|Advanced Source Options]] for the full reference on object source fields.

> [!note]
> The `plugin add` CLI command works with string sources. To use the object source format with `subdir`, edit `quartz.config.yaml` directly, then run `npx quartz plugin install --from-config` to install it.

## Migration from Deprecated Commands

| Old command                           | New equivalent                                      |
| ------------------------------------- | --------------------------------------------------- |
| `npx quartz plugin restore`           | `npx quartz plugin install --clean`                 |
| `npx quartz plugin update`            | `npx quartz plugin install --latest`                |
| `npx quartz plugin update my-plugin`  | `npx quartz plugin install --latest my-plugin`      |
| `npx quartz plugin check`             | `npx quartz plugin install --latest --dry-run`      |
| `npx quartz plugin resolve`           | `npx quartz plugin install --from-config`           |
| `npx quartz plugin resolve --dry-run` | `npx quartz plugin install --from-config --dry-run` |

The old commands still work as hidden aliases but will print a deprecation warning.

## Plugin Status

Running the plugin command without any subcommand shows a status dashboard of all installed plugins, including whether updates are available:

```shell
npx quartz plugin
```

This displays each plugin with its source, commit (or npm version), enabled/disabled status, and checks Git plugins for available updates in parallel. npm plugins are updated together with Quartz (`npx quartz upgrade`). A misspelled subcommand (e.g. `npx quartz plugin lst`) is reported as an error with a suggestion instead of falling back to this dashboard. For the full interactive management interface, use [[tui|npx quartz tui]] instead.
