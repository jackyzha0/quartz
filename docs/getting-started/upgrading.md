---
title: "Upgrading Quartz"
aliases:
  - upgrading
---

> [!note]
> This is specifically a guide for upgrading your Quartz to a more recent update. If you are coming from Quartz 4 or Quartz 3, check out the [[migrating|migration guide]] for more info.

To fetch the latest Quartz updates, simply run

```bash
npx quartz upgrade
```

As Quartz uses [git](https://git-scm.com/) under the hood for versioning, upgrading effectively 'pulls' in the updates from the official Quartz GitHub repository. Merge conflicts in `quartz.lock.json` are handled automatically — Quartz backs up your lockfile before pulling and restores it afterward. For other files with local changes that conflict with the updates, you may need to resolve these manually yourself (or pull manually with `git pull upstream v5`).

> [!hint]
> Quartz will try to cache your content before upgrading to try and prevent merge conflicts. If you get a conflict mid-merge, you can stop the merge and then run `npx quartz restore` to restore your content from the cache.

If you have the [GitHub desktop app](https://desktop.github.com/), this will automatically open to help you resolve the conflicts. Otherwise, you will need to resolve this in a text editor like VSCode. For more help on resolving conflicts manually, check out the [GitHub guide on resolving merge conflicts](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line#competing-line-change-merge-conflicts).

To update your installed plugins separately, use:

```bash
npx quartz plugin install --latest
```

See the [[upgrade|CLI reference for upgrade]] for more details on available flags.

## Upgrading from 5.0 to 5.1

Run the upgrade, then let `plugin doctor` update your config:

```bash
npx quartz upgrade
npx quartz plugin doctor --fix
```

`upgrade` shows the release notes since your version and runs `plugin doctor` for you. `--fix` moves the entries of plugins that are now [[built-in processing|built into Quartz]] (`crawl-links`, `remove-draft`, `content-index`, and note-properties' `delimiters`/`language` options) into `configuration.links`, `drafts`, `contentIndex` and `frontmatter`, and removes their unused pins from `quartz.lock.json`. Until you run it, those entries keep working and are applied automatically.

### Changes you may notice

- **Line breaks**: a single line break inside a paragraph now renders as `<br>`, as in Obsidian's reading view ([[ObsidianFlavoredMarkdown]] 2.0). Set `strictLineBreaks: true` in its options to keep the old behaviour (a space). The [[HardLineBreaks]] plugin is deprecated and no longer in the default config; Quartz warns while it is enabled.
- **Plugin order**: [[GitHubFlavoredMarkdown]] now runs before ObsidianFlavoredMarkdown (`order` 30, then 40). If your config sets `order` for either, keep GitHubFlavoredMarkdown first. Strikethrough (`~~`) now follows Obsidian's rules.
- **Heading ids**: a heading containing `--` gets the same id as on GitHub (`## Range 1--2` → `#range-1--2`, was `#range-12`). Links that hard-code an old id need updating; `[[page#Range 1--2]]` keeps working.
- **Bases** behave as in Obsidian 1.15 ([[BasesPage]] 1.2): `file.name` of a Markdown note has no extension (`Note`; `file.fullname` has it), `file.tags` keeps `#` and the original case, nested tags match (`#project` finds `#project/x`), the cards' `imageAspectRatio` is height/width (it was inverted), a base opens on its first view, and subtracting dates gives a duration (`(due - today()).days`).
- **Permalinks** are now the page's address: `permalink: page` publishes the note at `/page`, and its file path redirects there. Before, the permalink only redirected to the file path. See [[authoring-content|frontmatter fields]].
- **Frontmatter**: `---js` / `---javascript` frontmatter is refused, and invalid frontmatter (e.g. broken YAML) stops the build with an error naming the file.
- **Plugins in CI**: builds with `CI` set (GitHub Actions, Cloudflare Pages, Netlify, Vercel, …) fail on plugins that fail to load or need a newer Quartz. Set `QUARTZ_ALLOW_BROKEN_PLUGINS=1` or `QUARTZ_ALLOW_INCOMPATIBLE_PLUGINS=1` to deploy anyway. See [[troubleshooting#Reading build output]].

### New options

- `configuration.prefetch` (default `viewport`): pages are fetched before their links are followed. See [[prefetching]].
- `configuration.publishAssets: referenced` copies only the files published pages use, so files used only by unpublished notes stay private (default `all`).
- `layout.sidebars`: how sidebars taller than the screen behave (`fit`, `scroll`, `static`). See [[layout#Sidebar modes]].

See [[whats-new#New in 5.1|What's new in 5.1]] for everything else.

### Layout System Changes

The `footer` layout slot is now an array of components, consistent with other layout slots like `header`, `left`, and `right`. Additionally, `header` and `footer` are now configurable layout positions — plugins can declare `layout: { position: header }` or `layout: { position: footer }` in their YAML config.

**If you override layouts in `quartz.ts`**, update any `footer` assignments to use arrays:

```ts title="quartz.ts"
// Before
export const layout = await loadQuartzLayout({
  defaults: { footer: MyFooterComponent },
})

// After
export const layout = await loadQuartzLayout({
  defaults: { footer: [MyFooterComponent] },
})
```

**If you have a custom page frame**, update the `render` function to iterate the footer array:

```tsx
// Before
render({ footer: Footer, ...rest }: PageFrameProps) {
  return <Footer {...componentData} />
}

// After
render({ footer, ...rest }: PageFrameProps) {
  return footer.map((F) => <F {...componentData} />)
}
```

Both changes are caught by TypeScript at compile time — running `npx quartz build` will show the error.

No changes are needed for `quartz.config.yaml` — the YAML format is unchanged.

### Cleaning Up Unused Plugins

If you've removed plugins from your configuration during an upgrade, you can clean up the leftover files:

```bash
npx quartz plugin prune --dry-run  # preview what would be removed
npx quartz plugin prune            # remove orphaned plugins
```

See the [[cli/plugin#prune|plugin prune reference]] for more details.

## Switching to npm Plugin Specifiers

First-party Quartz plugins are now published to npm under the `@quartz-community` scope. If your `quartz.config.yaml` uses `github:` specifiers, you can optionally switch to npm specifiers for faster installs and better version pinning.

### Why Switch?

- **Faster installs**: npm packages are cached locally and don't require git cloning
- **Version pinning**: npm uses semver ranges, so you control when to update
- **No build step**: npm packages ship pre-built, unlike git sources which may need to build on install

### How to Migrate

Update each plugin source in your `quartz.config.yaml` from the `github:` format to the quoted npm format:

```yaml
# Before
plugins:
  - source: github:quartz-community/syntax-highlighting
    enabled: true

# After
plugins:
  - source: "@quartz-community/syntax-highlighting"
    enabled: true
```

> [!important]
> The `@` scoped name must be quoted in YAML. Use double quotes around the source value.

The default plugins are already dependencies in Quartz's `package.json`, so `npm i` installs them — no separate install step is needed. For other npm plugins, use `npx quartz plugin add "@scope/plugin-name"`, which installs the package and adds the entry for you.

### Do I Have to Switch?

No. The `github:` specifiers continue to work and will be supported indefinitely. They are still the recommended approach for third-party and community plugins that are not published to npm. The npm path is an optional improvement for first-party plugins.
