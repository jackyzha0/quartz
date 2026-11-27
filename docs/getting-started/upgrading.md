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

## Upgrading from 5.3.0 to 5.3.1

5.3.1 is a patch release: fixes from a test audit of Quartz and its plugins, many checked against Obsidian. Upgrade as usual:

```bash
npx quartz upgrade
npx quartz plugin install --latest
```

### Changes you may notice

Most of these make a page look the way Obsidian shows it, so an existing site can look different after the upgrade.

- **[[Bases]] sorting**: text sorts naturally ("Chapter 2" before "Chapter 10") and ignores case, also for the default order by file name. Empty values come last in both directions, including descending sorts. A column that mixes types sorts numbers, dates and durations by value and everything else as text. Group order follows the same rules.
- **[[Bases]] filters and formulas**, as in Obsidian:
  - `not:` leaves out a note that matches _any_ of its conditions (it left out only notes matching all of them).
  - `status == null` matches notes without `status`, and `status != null` no longer keeps them.
  - `"5" == 5` and `1 == true` are true, two strings compare as text (`"10" > "9"` is false), and an empty list counts as false.
  - A formula can use a formula defined after it. `x / 0` shows ∞. `sum()`, `mean()`, `min()` and `max()` skip text and booleans, and are empty without numbers. `number("abc")` is an error.
- **[[Bases]] group headings** show their value as a cell does: dates in the local format (not an ISO timestamp, sometimes of the previous day), durations as "4 days", links as the note's name, booleans as a checkbox.
- **[[CanvasPage|Canvas]] edges** leave and enter each card through the side they name, with Obsidian's curve, and the arrow points into that side. An edge without sides joins the sides that face each other (it joined the cards' centres).
- **Folder pages**: a folder whose own `index.md` is unlisted shows that note, with the folder listing below it. A generated folder page used to replace it.
- **Tag links under a base path**: inline `#tag` links from notes two or more folders deep stay on the site. On a site served under a sub-path, such as a GitHub Pages project site, they went to `/tags/…` and returned 404.
- **Locales without a translation** (such as `sv-SE`) no longer crash the build: Quartz uses a translation of the same language, else English, and prints a warning. Dates still use your locale.
- **`npx quartz plugin install --latest`** no longer fails because a _disabled_ plugin can't be updated (for example an old `quartz-themes` entry). It prints a warning with the command to remove the entry.

## Upgrading from 5.2 to 5.3

Quartz 5.3 needs **Node.js 22.22 or later**. Then upgrade as usual:

```bash
npx quartz upgrade
npx quartz plugin install --latest
```

### Changes you may notice

- **Block anchors**: a block's id is now `^id` and links to it are `#^id` (`[[note#^para-1]]` → `note#^para-1`, was `note#para-1`), as in Obsidian, where blocks and headings are separate namespaces: block `^para-1` and heading `## Para 1` no longer share an id, so `[[#^para-1]]` and `[[#Para 1]]` each land on their own target. Links inside the site are regenerated; old `#id` URLs of blocks from outside the site now go to the top of the page (or to a heading of that name). CSS or scripts that select a block by id need `#\^para-1` (or `getElementById`).
- **Unresolved links**: `configuration.links.disableBrokenWikilinks` is now on by default. Links to pages that don't exist get the `broken` class and are styled as unresolved, as in Obsidian. Links to pages a filter removes (drafts, unpublished notes) are marked the same way, with `data-filtered="<filter>"`. Set `links.disableBrokenWikilinks: false` to style them as before.
- **Mermaid diagrams** render with [Pele](https://pele.run) by default, as in Obsidian, inside a `<div class="mermaid">` rather than a code block. Set `diagramRenderer: mermaid` on [[ObsidianFlavoredMarkdown]] to keep Mermaid.js. See [[Mermaid diagrams]].
- **Block wrappers**: each top-level block of a note is wrapped in the `div` Obsidian puts it in (`div.el-p > p`, `div.el-h2 > h2`). Custom CSS that selects a page's blocks as direct children (`article > p`) no longer matches. Select them without `>`, or set `blockWrappers: false` on ObsidianFlavoredMarkdown.
- **Transclusions** use Obsidian's embed markup: the title of a whole-note embed is a `div.markdown-embed-title` (it was an `h1`), and the content is in `div.markdown-embed-content`. It looks the same without a theme. Custom CSS for transclusions may need new selectors.
- **Page structure**: the centre column is a `<main>` (it was a `div`; the `center` class is unchanged) and the default frame's sidebars are `<aside>` elements. Page listings use `h2` titles (they were `h3`) at the same size. Footnote links keep the `internal` class but no longer have `internal-link`.
- **Colours**: the templates' `gray` and `tertiary` colours meet WCAG AA contrast. Your site keeps the colours in its own `quartz.config.yaml`. To adopt the new ones, set them under `configuration.theme.colors`:

  ```yaml title="quartz.config.yaml"
  configuration:
    theme:
      colors:
        lightMode:
          gray: "#727272" # was #b8b8b8
          tertiary: "#587971" # was #84a59d
        darkMode:
          gray: "#7f7f7f" # was #646464
  ```

- **Folding**: the `obsidian` template folds headings and lists. Other sites can turn it on with `foldHeadings` and `foldLists` on ObsidianFlavoredMarkdown.
- **Stylesheets**: component styles are one `component-<hash>.css` file instead of one per component. The styles are unchanged.
- **Frontmatter** is read as YAML 1.2. Frontmatter with only comments has no properties, as in Obsidian, instead of being reported as invalid.
- **Custom TypeScript**: type checking (`npm run check`) uses TypeScript 7 with `moduleResolution: bundler`. Code that imports a package's internal files may need to import from the package itself.

### New options

- `extends` (experimental) and `before`/`after` on plugin entries. See [[configuration#Extending the default configuration]].
- `configuration.slugs.stripDiacritics`. See [[configuration#General Configuration]].
- The layout conditions `is-index`, `is-folder-index` and `not-<condition>`. See [[layout#Conditional Rendering]].
- [[plugins/Explorer|Explorer]]: `sort`, `rootFolder`, and `order` in YAML. [[GitHubFlavoredMarkdown]]: `singleTilde`, `replacements`. [[ObsidianFlavoredMarkdown]]: `math`, `markdownEmbeds`, `blockWrappers`, `foldHeadings`, `foldLists`. [[CanvasPage]]: `wheelBehavior`, `textNodeMarkdown`.

See [[whats-new#New in 5.3|What's new in 5.3]] for everything else.

## Upgrading from 5.1 to 5.2

```bash
npx quartz upgrade
npx quartz plugin doctor --fix
```

`--fix` moves the Fonts plugin's entry (`@quartz-community/quartz-fonts`) into `configuration.fonts`, now that font loading is built in. Until you run it, the entry keeps working and is applied automatically.

### Changes you may notice

- **Themes**: [[ThemesCore]] 3 converts Obsidian themes at build time, so the `@quartz-themes/<theme>` packages are no longer needed. Theme ids from 2.x (`tokyo-night`) keep working. The `aspects`, `include`, `calloutStyle` and `fonts` options were removed.
- **Callouts and transclusions** render as `<div>` elements, as in Obsidian (callouts were `<blockquote>`). Callout titles are in `.callout-title-inner` without a `<p>`. Custom CSS for either may need new selectors.
- **Bases** columns are labelled with the property's name (`priority`, `file name`) instead of title case (`Priority`, `Name`). Set `propertyLabels: title` on [[BasesPage]] for the old labels.
- **Permalinks** with `.` or `..` segments are ignored with a warning.
- **Fonts**: configured `body`, `code` and `interface` fonts now apply under an Obsidian theme, and the interface and heading fonts are loaded from Google Fonts like the others.

See [[whats-new#New in 5.2|What's new in 5.2]] for everything else.

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
