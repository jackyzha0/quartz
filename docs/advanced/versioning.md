---
title: Versioning and releases
description: What Quartz's version number means, how plugins declare the Quartz versions they support, and how releases are made.
---

Quartz follows [semantic versioning](https://semver.org): `MAJOR.MINOR.PATCH`.

- **patch** (5.1.**1**) — bug fixes.
- **minor** (5.**2**.0) — new features and new APIs for plugins. Existing sites and plugins keep working.
- **major** (**6**.0.0) — breaking changes, with an upgrade guide.

Each release is a git tag (`v5.1.0`) with a [GitHub release](https://github.com/jackyzha0/quartz/releases) listing the changes, also in `CHANGELOG.md`. Quartz itself is not published to npm — your site is a clone of the repository, so its version is the one in `package.json`.

## Which version am I on?

```shell
npx quartz info
```

prints the version, where your checkout is relative to the last release, your environment and your plugins as a block you can paste into an issue or support question. The version shows as e.g. `5.1.0 (v5.1.0-4-g1a2b3c4-dirty)`: 4 commits after the `v5.1.0` release, at commit `1a2b3c4`, with local changes. `npx quartz build` and `npx quartz plugin doctor` print it too.

When asking for help, please include this output — a version number is much more useful than a commit hash of your fork.

## Plugin compatibility

Plugins declare the Quartz versions they work with in their `package.json`:

```json title="package.json"
{
  "quartz": {
    "quartzVersion": ">=5.1.0"
  }
}
```

Any [npm semver range](https://docs.npmjs.com/cli/v10/configuring-npm/package-json#dependencies) works (`>=5.1.0`, `^5.1.0`, `>=5.1.0 <7`). Quartz checks it

- when the build loads your config: locally a warning (repeated in the end-of-build summary); in CI (when the `CI` environment variable is set, as on GitHub Actions, GitLab CI, Netlify, Vercel or Cloudflare Pages) the build fails, so an incompatible plugin doesn't get deployed. Set `QUARTZ_ALLOW_INCOMPATIBLE_PLUGINS=1` to build anyway,
- in `npx quartz plugin add` and `npx quartz plugin doctor` (an error for enabled plugins),

and says whether to update Quartz (`npx quartz upgrade`) or the plugin. If an incompatible plugin later fails, the error message mentions the version mismatch as a likely cause.

### For plugin authors

- Set `quartzVersion` to the **oldest Quartz version your plugin works with**. Raise it when you start using a newer API — for example a plugin that relies on [[built-in processing]] (core-parsed frontmatter, `ctx.contentIndex`, `extendContentIndex`) needs `">=5.1.0"`.
- Prefer a lower bound (`>=5.1.0`) over a caret range: minor Quartz releases don't break plugins, so `^5` would only add an upper bound you'd have to bump at every major release. Add an upper bound when you know a major version breaks you.
- Raising `quartzVersion` is a breaking change for users on older Quartz versions: release it as a new major (or at least minor) version of your plugin and say so in its changelog.
- Pre-releases count: Quartz `5.2.0-beta.1` satisfies `>=5.1.0`.
- To retire a plugin, set `quartz.deprecated` in its `package.json` to a message saying what replaces it (for example `"Line breaks are handled by ObsidianFlavoredMarkdown 2.0+ …"`). Quartz 5.1+ warns when the plugin is enabled (in the build summary, `plugin add` and `plugin doctor`) and suggests removing it; the plugin keeps working.

## Contributing: changesets

Quartz uses [changesets](https://github.com/changesets/changesets). A pull request that changes how Quartz behaves should include one:

```shell
npx changeset
```

Choose `patch`, `minor` or `major` and describe the change for users. On every push to `v5` a "chore: release Quartz" pull request collects the pending changesets, bumps `package.json` and updates `CHANGELOG.md`; merging it tags the release and publishes the GitHub release notes. CI warns (without failing) when a pull request has no changeset.
