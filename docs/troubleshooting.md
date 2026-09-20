---
title: Troubleshooting
---

Common issues and solutions when working with Quartz.

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

### Plugin not loading after installation

1. Verify the plugin appears in `quartz.config.yaml` under `plugins:`
2. Check that `enabled: true` is set
3. Run `npx quartz plugin list` to confirm it's installed
4. Run `npx quartz plugin install --latest --dry-run` to verify plugin health

### Plugin options not taking effect

Make sure your YAML indentation is correct. Options must be nested under the plugin entry:

```yaml title="quartz.config.yaml"
plugins:
  - source: github:quartz-community/some-plugin
    enabled: true
    options:
      myOption: value # correct: nested under options
```

A common mistake is putting options at the wrong indentation level.

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
- Check that `draft: true` is not set in the frontmatter (the [[RemoveDrafts]] plugin filters these out)
- If using [[ExplicitPublish]], make sure `publish: true` is set in frontmatter
- Check your [[configuration]] `ignorePatterns` to make sure the file path is not excluded

### Wikilinks not resolving

- Make sure the [[ObsidianFlavoredMarkdown]] plugin is enabled
- Verify the target note exists in your content folder
- Check for case sensitivity issues in filenames

### Images not displaying

- Ensure images are in a folder that Quartz processes (typically `content/` or a subfolder)
- Check that the image path in your Markdown matches the actual file location
- The [[Assets]] emitter must be enabled (it is by default)

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
- If developing remotely, use `--remoteDevHost` to set the correct WebSocket URL

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
