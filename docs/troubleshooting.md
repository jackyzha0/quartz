---
title: Troubleshooting
---

Common issues and solutions when working with Quartz.

## Reading build output

- **Errors from plugins** say which plugin failed (name, version, source), what it was doing ("while transforming the Markdown of `notes/x.md`", "component Backlinks while rendering `features/x`"), any problems Quartz already knew about that plugin, and where to report it. To confirm a plugin is the cause, disable it (`npx quartz plugin disable <name>`) and build again.
- **Problems in a file's content** (frontmatter that isn't valid YAML/TOML, a file Quartz can't read) name the file and say "This is a problem in the file's content": fix the file and build again — it's not a bug in Quartz or a plugin.
- **Plugins that fail to load** (can't be installed, their code throws on import, no plugin found in the package) are marked `✗` with the file and line where it failed. Locally the build continues without them so you can check the rest of the site; they are listed again at the top of the end-of-build summary. In CI (`CI` set, e.g. GitHub Actions, Netlify, Vercel, Cloudflare Pages) the build fails instead, so a site with a missing feature isn't deployed — set `QUARTZ_ALLOW_BROKEN_PLUGINS=1` to deploy anyway.
- **Warnings** printed while loading the config (plugins that need a newer Quartz, plugins missing data they need, deprecated plugins, layout typos, plugin entries that are now built in) are repeated in a summary at the end of the build. In CI, plugins that need a newer Quartz fail the build instead — update Quartz or the plugin, or set `QUARTZ_ALLOW_INCOMPATIBLE_PLUGINS=1` to build anyway.
- **Notes** in that summary point out links to pages that are not on your site — including links to [[RemoveDrafts|drafts]], which are the usual cause of "this link 404s". `npx quartz build --verbose` lists every such link, the order plugins run in, the built-ins and the layout of each page type.
- **Which version am I on?** `npx quartz info` prints your Quartz version, environment and plugins — include it when asking for help (see [[versioning]]).

## Build Errors

### `Could not resolve ...` or missing module errors

This usually means a plugin is not installed. Run:

```bash
npx quartz plugin install
```

This restores all plugins from your `quartz.lock.json` to `.quartz/plugins/`.

### `tsc` type errors after updating

After running `npx quartz upgrade`, type errors can occur if the update changed internal APIs that your `quartz.ts` overrides depend on. Check the changelog for breaking changes and update your overrides accordingly.

### Build is slow

Try increasing concurrency:

```bash
npx quartz build --concurrency 8
# or the shorthand:
npx quartz build -c 8
```

The default uses all available CPU cores. If you're on a memory-constrained environment (CI), reducing concurrency may actually help.

## Plugin Issues

> [!tip]
> `npx quartz plugin doctor` checks your whole plugin setup — config typos, plugins that are not installed or not built, lockfile mismatches, option typos — and suggests a fix for each problem. Run it first.

### Plugin not loading after installation

1. Run `npx quartz plugin doctor`
2. Verify the plugin appears in `quartz.config.yaml` under `plugins:`
3. Check that `enabled: true` is set (spelled `enabled`, as a boolean — `enable: true` or `enabled: "true"` do not work as expected)
4. Run `npx quartz plugin list` to confirm it's installed
5. Run `npx quartz plugin install --latest --dry-run` to check for updates

### Which plugin rendered this part of the page?

Open your browser's developer tools and inspect the element. Components provided by plugins carry `data-quartz-plugin` (the plugin name) and `data-quartz-component` (the component name) attributes on their root element. Look for the nearest ancestor with these attributes.

### Plugin options not taking effect

Make sure your YAML indentation is correct. Options must be nested under the plugin entry:

```yaml title="quartz.config.yaml"
plugins:
  - source: github:quartz-community/some-plugin
    enabled: true
    options:
      myOption: value # correct: nested under options
```

A common mistake is putting options at the wrong indentation level. Misspelled option names are reported as warnings at the start of `npx quartz build` (e.g. `unknown option "folderDefaultStat" — did you mean "folderDefaultState"?`); `npx quartz plugin config <name>` shows the options you set next to the plugin's defaults.

### `ExternalPlugin.X is not a function`

This means the plugin is referenced in `quartz.ts` but not installed. Either:

- Install it: `npx quartz plugin add github:quartz-community/plugin-name`
- Or remove the reference from `quartz.ts`

### Plugins fail to build on a fresh clone

> [!important]
> Most community plugins now ship with a pre-built `dist/` directory and skip the build step entirely. The build failure scenario described below mainly applies to plugins in development or older plugins that haven't adopted pre-built distribution.

On a brand-new clone, `npx quartz plugin install` (or the plugin step run automatically by `npx quartz create`) may report a handful of plugins failing to build — typically around 10–15 of them. The git clone and checkout still succeed, but `npm run build` inside the plugin errors out.

This happens because `quartz.lock.json` pins each plugin to a specific commit, and those older plugin commits may have been authored against earlier versions of `@quartz-community/types` / `@quartz-community/utils` whose published artifacts are no longer shipped in the dependency's git repo. The plugin's `tsup`/`tsc` build then cannot resolve the expected type declarations.

Fix it by refreshing all plugins to the latest commit on their default branch:

```bash
npx quartz plugin install --latest
```

This rewrites `quartz.lock.json` with the newest commits (which in turn pin newer `@quartz-community/*` versions whose built output is available), and rebuilds every plugin from scratch. After this step, subsequent `npx quartz plugin install` calls will restore cleanly from the refreshed lockfile.

### `plugin install` hangs, OOMs, or fails on low-end hardware

> [!note]
> Pre-built plugins are much faster and lighter on resources because they skip the `npm install` and `npm run build` steps.

By default, `npx quartz plugin install` clones, fetches, and builds plugins in parallel across all your CPU cores. Each parallel worker may run its own `npm install` and `npm run build`, which is memory-intensive. On low-end laptops, Raspberry Pi, small VPS instances, or restrictive CI runners this can exhaust RAM, trigger the OOM killer, or make the system appear to hang.

Lower the parallelism with `--concurrency` / `-c`:

```bash
# Install one plugin at a time (safest, slowest)
npx quartz plugin install --latest -c 1

# Two at a time — usually works on 4 GB machines
npx quartz plugin install --latest --concurrency 2
```

The same flag works for `plugin add` and the deprecated aliases (`plugin update`, `plugin restore`, `plugin check`, `plugin resolve`):

```bash
npx quartz plugin add github:quartz-community/some-plugin -c 1
```

If `plugin install` consistently fails near the same plugin with `-c 1`, the issue is likely with that specific plugin's build, not with concurrency — try running `--verbose` to get detailed error output, and check the plugin's own repository for known issues.

## Content Issues

### Notes not showing up

- Check that the file is in the `content/` folder
- Check that `draft: true` is not set in the frontmatter (drafts are not published — see [[RemoveDrafts|built-in draft handling]]; `configuration.drafts.publish: true` publishes them)
- If using [[ExplicitPublish]], make sure `publish: true` is set in frontmatter
- Check your [[configuration]] `ignorePatterns` to make sure the file path is not excluded

### Wikilinks not resolving

- Make sure the [[ObsidianFlavoredMarkdown]] plugin is enabled
- Make sure link resolution is on: it is [[CrawlLinks|built in]] as `configuration.links` and can be disabled there
- Check `configuration.links.markdownLinkResolution` (`shortest`, the default and Obsidian's, `absolute` or `relative`) matches how your links are written
- Verify the target note exists in your content folder and is published (links to [[RemoveDrafts|drafts]] are listed in the end-of-build summary)
- Check for case sensitivity issues in filenames

### Heading links broken after upgrading

Quartz 5.1 changed some heading ids to match GitHub: a heading containing `--` (`## Range 1--2`) now has the id `range-1--2` instead of `range-12`. Update links that hard-code the old id (`page#range-12`); wikilinks with the heading text (`[[page#Range 1--2]]`) keep working.

### Images not displaying

- Ensure images are in a folder that Quartz processes (typically `content/` or a subfolder)
- Check that the image path in your Markdown matches the actual file location
- The [[Assets]] emitter must be enabled (it is by default)
- With `publishAssets: referenced` in your [[configuration]], only files that published pages link to or embed are copied: an image used only by an unpublished note (a draft, or one [[ExplicitPublish]] leaves out) is omitted

## GitHub Sync Issues

### `fatal: --[no-]autostash option is only valid with --rebase`

You may have an outdated version of `git`. Update git to resolve this.

### `fatal: The remote end hung up unexpectedly`

This is usually due to Git's default buffer size being too small for your content. Increase it:

```bash
git config http.postBuffer 524288000
```

### Merge conflicts during sync

If `npx quartz sync` encounters merge conflicts:

1. Resolve the conflicts in your editor
2. Run `git add .` and `git commit` to complete the merge
3. Run `npx quartz sync --no-pull` to push

If you want to start over, run `npx quartz restore` to recover your content from the cache.

## Development Server Issues

### Hot reload not working

- Make sure you're using `--serve` mode: `npx quartz build --serve`
- Check that port 3001 (WebSocket) is not blocked — this is the default `--wsPort` used for hot reload notifications
- If developing remotely, use `--remoteDevHost` to set the WebSocket hostname (the protocol follows the page: `wss` on HTTPS, `ws` otherwise)

### Changes on mounted or network content are not detected

Some network filesystems and Docker bind mounts do not forward directory change events. Enable
Chokidar polling so Quartz watches existing content files directly and periodically scans for added
or deleted files:

```shell
CHOKIDAR_USEPOLLING=true CHOKIDAR_INTERVAL=1000 npx quartz build --serve
```

In PowerShell:

```powershell
$env:CHOKIDAR_USEPOLLING = "true"
$env:CHOKIDAR_INTERVAL = "1000"
npx quartz build --serve
```

Polling uses more CPU and filesystem I/O than native events. Increase `CHOKIDAR_INTERVAL` when
watching a large content directory or when immediate updates are not required.

### Port already in use

Change the port:

```bash
npx quartz build --serve --port 3000
```

## Still stuck?

- Check the [GitHub Issues](https://github.com/jackyzha0/quartz/issues) for similar problems
- Ask in the [Discord Community](https://discord.gg/cRFFHYye7t)
- Run your command with `--verbose` for more detailed error output
- Include the output of `npx quartz info` in your question
