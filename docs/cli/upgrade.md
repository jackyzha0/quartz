---
title: quartz upgrade
---

The `upgrade` command upgrades the Quartz framework itself to the latest version by pulling changes from the official Quartz repository.

## Usage

```shell
npx quartz upgrade
```

## How it Works

When you run `npx quartz upgrade`, Quartz performs the following steps:

1. **Backs up your content** — your content folder is cached locally to prevent data loss.
2. **Pulls the latest Quartz code** — fetches and merges from the official upstream repository (`upstream/v5`) using Git.
3. **Updates dependencies** — runs `npm install` to ensure all packages match the new version.
4. **Shows what changed** — the version transition (e.g. `5.0.0 → 5.1.0`) and the release notes of every version in between, from `CHANGELOG.md`. Between releases it says how many commits were pulled.
5. **Restores plugins** — reinstalls plugins from `quartz.lock.json`. Plugins that are now [[built-in processing|built into Quartz]] are skipped.
6. **Checks your config and plugins** — runs [[cli/plugin#doctor|`npx quartz plugin doctor`]] for the new version: plugin entries that are built in now (fix with `npx quartz plugin doctor --fix`), plugins that don't support the new Quartz version, lockfile and install problems.
7. **Checks for plugin updates** — lists plugins with newer versions available.

Steps 4–7 run the code of the version you upgraded _to_, so the checks know about that version's changes. (Upgrading _from_ a Quartz older than 5.1 still runs the older steps once.)

## Handling Conflicts

Because Quartz allows you to customize almost every part of the code, upgrades can sometimes result in merge conflicts. This happens if you have modified a file that the Quartz team has also updated.

Quartz automatically handles merge conflicts in `quartz.lock.json` by backing up your lockfile before pulling and restoring it afterward. This prevents the most common source of conflicts during upgrades.

For other files, if a conflict occurs:

1. Git will mark the conflicting sections in the affected files.
2. You will need to open these files and manually choose which changes to keep.
3. After resolving the conflicts, you can commit the changes.

## Recovery

If an upgrade goes wrong or leaves your project in an unusable state, you can use the [[restore|restore]] command to recover your content from the local cache.

## Flags

The `upgrade` command supports the standard [[cli/index|common flags]] (`--directory`, `--verbose`).

## See Also

- [[cli/plugin|quartz plugin install --latest]] — update installed plugins
- [[upgrading|Upgrading Quartz]] — detailed upgrading guide
- [[restore|quartz restore]] — recover content from cache
