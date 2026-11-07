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

As Quartz uses [git](https://git-scm.com/) under the hood for versioning, upgrading effectively 'pulls' in the updates from the official Quartz GitHub repository. Merge conflicts in `quartz.lock.json` are handled automatically — Quartz backs up your lockfile before pulling and restores it afterward. For other files with local changes that conflict with the updates, you may need to resolve these manually yourself (or, pull manually using `git pull origin upstream`).

> [!hint]
> Quartz will try to cache your content before upgrading to try and prevent merge conflicts. If you get a conflict mid-merge, you can stop the merge and then run `npx quartz restore` to restore your content from the cache.

If you have the [GitHub desktop app](https://desktop.github.com/), this will automatically open to help you resolve the conflicts. Otherwise, you will need to resolve this in a text editor like VSCode. For more help on resolving conflicts manually, check out the [GitHub guide on resolving merge conflicts](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line#competing-line-change-merge-conflicts).

To update your installed plugins separately, use:

```bash
npx quartz plugin install --latest
```

See the [[upgrade|CLI reference for upgrade]] for more details on available flags.

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

Then install the packages:

```bash
npm install @quartz-community/syntax-highlighting
```

Or install all default plugins at once:

```bash
npm install @quartz-community/created-modified-date @quartz-community/syntax-highlighting @quartz-community/obsidian-flavored-markdown @quartz-community/github-flavored-markdown @quartz-community/table-of-contents @quartz-community/description @quartz-community/latex @quartz-community/quartz-fonts @quartz-community/alias-redirects @quartz-community/favicon @quartz-community/og-image @quartz-community/cname @quartz-community/canvas-page @quartz-community/content-page @quartz-community/folder-page @quartz-community/tag-page @quartz-community/explorer @quartz-community/graph @quartz-community/search @quartz-community/backlinks @quartz-community/article-title @quartz-community/content-meta @quartz-community/page-title @quartz-community/darkmode @quartz-community/reader-mode @quartz-community/breadcrumbs @quartz-community/footer @quartz-community/spacer @quartz-community/bases-page @quartz-community/note-properties @quartz-community/unlisted-pages @quartz-community/encrypted-pages
```

### Do I Have to Switch?

No. The `github:` specifiers continue to work and will be supported indefinitely. They are still the recommended approach for third-party and community plugins that are not published to npm. The npm path is an optional improvement for first-party plugins.
