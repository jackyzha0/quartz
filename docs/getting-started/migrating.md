---
title: "Migrating to Quartz 5"
aliases:
  - "migrating from Quartz 3"
  - "migrating from Quartz 4"
---

This guide covers migrating to Quartz 5 from previous versions. If you're already on Quartz 5 and want to update to the latest version, see [[upgrading|Upgrading Quartz]] instead.

If you're new to Quartz entirely, skip this guide and follow the [[installation|installation guide]] instead.

## Before You Start: Save Your Content

Before switching branches, make sure your content is safe. Switching to v5 will replace the files in your working directory with the v5 codebase, so your v4 content folder won't be visible until you restore it.

Copy your content folder somewhere outside the repo before switching:

```bash
# macOS / Linux
cp -r content /tmp/quartz-content

# Windows (PowerShell)
Copy-Item -Recurse content $env:TEMP\quartz-content
```

> [!note] Your old branch is preserved
> Switching branches does **not** delete your v4 (or v3/hugo) branch. You can always switch back with `git checkout v4` to access your old content and configuration.

## Getting the v5 Branch

Whether you're coming from Quartz 4 or Quartz 3, the first step is the same: get the v5 branch onto your machine and push it to your repository.

```bash
# Add the official Quartz repository as a remote called "upstream" (skip if already set)
git remote add upstream https://github.com/jackyzha0/quartz.git

# Fetch the v5 branch from the official repository
git fetch upstream v5

# Create a local v5 branch from the official one
git checkout -b v5 upstream/v5

# Install dependencies
npm i

# Push v5 to your GitHub repository
git push -u origin v5
```

## Setting Up Your Site

Once you're on v5, run the interactive setup to configure your site and import your content:

```bash
npx quartz create
```

This will prompt you for:

- A **template** (`default`, `obsidian`, `ttrpg`, `blog`, `docs`) — pick the one closest to your old setup. `obsidian` is recommended if you use an Obsidian vault.
- A **content strategy** — choose "Copy" and point it to your backed-up content folder.

If you skipped the `create` wizard or need to restore your content manually:

```bash
# macOS / Linux
cp -r /tmp/quartz-content/* content/

# Windows (PowerShell)
Copy-Item -Recurse $env:TEMP\quartz-content\* content\
```

`create` also installs the plugins the chosen template references, so there is no separate install step.

## What Changed in v5

Quartz 5 introduces a community plugin system that fundamentally changes how plugins and components are managed. Most plugins that were built into Quartz 4 are now standalone community plugins maintained under the [quartz-community](https://github.com/quartz-community) organization.

Key changes:

- **Configuration format**: TypeScript (`quartz.config.ts`, `quartz.layout.ts`) → YAML (`quartz.config.yaml`)
- **Plugin system**: Plugins are now standalone packages. The default ones are npm packages that ship with Quartz; others are added with `npx quartz plugin add`
- **Import pattern**: Community plugins use `ExternalPlugin.X()` (from `.quartz/plugins`) instead of `Plugin.X()` (from `./quartz/plugins`)
- **Layout structure**: `quartz.layout.ts` is gone — layout position is now a per-plugin property in `quartz.config.yaml`
- **Page types**: A new plugin category for page rendering (content, folder, tag pages)
- **URL casing**: All generated URLs are now lowercased and hyphenated (e.g. `My Notes/Hello World.md` → `/my-notes/hello-world`). In v4, the original casing of file and folder names was preserved in URLs.
- **Line breaks**: a single line break inside a paragraph renders as `<br>`, as in Obsidian (v4 rendered a space). Set `strictLineBreaks: true` in the [[ObsidianFlavoredMarkdown]] options for the v4 behaviour.
- **Heading ids**: heading ids follow GitHub, so some differ from v4 (`## Range 1--2` → `#range-1--2`, was `#range-12`). Links that hard-code an old id need updating; `[[page#Range 1--2]]` keeps working.

### URL Casing and SEO

If your v4 site had URLs with uppercase letters, those URLs will return 404 errors after upgrading to v5. This also affects search engine indexing, since Google treats URLs as [case-sensitive](https://developers.google.com/search/docs/crawling-indexing/url-structure).

The [[AliasRedirects]] plugin (enabled by default) automatically handles this. During build, it detects files whose original path contained uppercase characters and generates redirect pages at the old URLs. These redirect pages include proper SEO signals (`<link rel="canonical">`, `<meta http-equiv="refresh">`, `<meta name="robots" content="noindex">`) so that search engines transfer ranking to the new lowercase URLs.

No manual configuration is needed — the plugin is enabled by default and the case redirect behavior is on by default. If you want to disable it, set `enableCaseRedirects: false` in the plugin options:

```yaml title="quartz.config.yaml"
plugins:
  - source: github:quartz-community/alias-redirects
    enabled: true
    options:
      enableCaseRedirects: false
```

> [!tip] Hosting on Netlify?
> Netlify automatically lowercases all URLs and issues server-side 301 redirects. If you're hosting on Netlify, the case redirect pages aren't strictly necessary, but they don't hurt either.

> [!note] Most users don't need to worry about these details
> If you used the default Quartz 4 configuration (or only changed settings that `npx quartz create` prompts for), the setup wizard handles everything. The details below are for users who had custom plugin configurations.

### Plugin Reference Table

Mapping v4 plugin names to v5 equivalents:

| v4                                  | v5                                          | Type                  |
| ----------------------------------- | ------------------------------------------- | --------------------- |
| `Plugin.FrontMatter()`              | built in (`configuration.frontmatter`)      | Internal              |
| `Plugin.CreatedModifiedDate()`      | `ExternalPlugin.CreatedModifiedDate()`      | Community             |
| `Plugin.SyntaxHighlighting()`       | `ExternalPlugin.SyntaxHighlighting()`       | Community             |
| `Plugin.ObsidianFlavoredMarkdown()` | `ExternalPlugin.ObsidianFlavoredMarkdown()` | Community             |
| `Plugin.GitHubFlavoredMarkdown()`   | `ExternalPlugin.GitHubFlavoredMarkdown()`   | Community             |
| `Plugin.CrawlLinks()`               | built in (`configuration.links`)            | Internal              |
| `Plugin.Description()`              | `ExternalPlugin.Description()`              | Community             |
| `Plugin.Latex()`                    | `ExternalPlugin.Latex()`                    | Community             |
| `Plugin.RemoveDrafts()`             | built in (`configuration.drafts`)           | Internal              |
| `Plugin.ContentPage()`              | `ExternalPlugin.ContentPage()`              | Community (pageTypes) |
| `Plugin.FolderPage()`               | `ExternalPlugin.FolderPage()`               | Community (pageTypes) |
| `Plugin.TagPage()`                  | `ExternalPlugin.TagPage()`                  | Community (pageTypes) |
| `Plugin.NotFoundPage()`             | `Plugin.PageTypes.NotFoundPageType()`       | Internal (pageTypes)  |
| `Plugin.ComponentResources()`       | `Plugin.ComponentResources()` (unchanged)   | Internal              |
| `Plugin.Assets()`                   | `Plugin.Assets()` (unchanged)               | Internal              |
| `Plugin.Static()`                   | `Plugin.Static()` (unchanged)               | Internal              |
| `Plugin.AliasRedirects()`           | `ExternalPlugin.AliasRedirects()`           | Community             |
| `Plugin.ContentIndex()`             | built in (`configuration.contentIndex`)     | Internal              |

Component layout mapping (`ExternalPlugin` is imported from `./.quartz/plugins` in `quartz.ts`):

| v4 Layout                     | v5 Layout                                |
| ----------------------------- | ---------------------------------------- |
| `Component.Explorer()`        | `ExternalPlugin.Explorer()`              |
| `Component.Graph()`           | `ExternalPlugin.Graph()`                 |
| `Component.Search()`          | `ExternalPlugin.Search()`                |
| `Component.Backlinks()`       | `ExternalPlugin.Backlinks()`             |
| `Component.Darkmode()`        | `ExternalPlugin.Darkmode()`              |
| `Component.Footer()`          | `ExternalPlugin.Footer()`                |
| `Component.TableOfContents()` | `ExternalPlugin.TableOfContents()`       |
| `Component.Head()`            | `Component.Head()` (unchanged, internal) |
| `Component.Spacer()`          | `ExternalPlugin.Spacer()`                |

If you edited a component's source in `quartz/components/` (for example `Footer.tsx`), that no longer works: components are now installed plugins. See [[customizing components]] for the v5 ways to change them.

## Updating Your CI/CD

Quartz 5 requires plugins to be installed before building. Add a plugin install step and (optionally) caching to your CI pipeline.

Here's the recommended pattern, based on the project's own GitHub Actions:

```yaml
- name: Cache dependencies
  uses: actions/cache@v5
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-

- name: Cache Quartz plugins
  uses: actions/cache@v5
  with:
    path: .quartz/plugins
    key: ${{ runner.os }}-plugins-${{ hashFiles('quartz.lock.json') }}
    restore-keys: |
      ${{ runner.os }}-plugins-

- run: npm ci

- name: Install Quartz plugins
  run: npx quartz plugin install

- name: Build Quartz
  run: npx quartz build
```

The plugin cache uses `quartz.lock.json` as the cache key, so plugins are only re-downloaded when the lockfile changes.

For non-GitHub CI providers (Cloudflare, Vercel, Netlify), the build command should be:

```shell
npx quartz plugin install && npx quartz build
```

See [[hosting]] for provider-specific setup details.

## Setting Your Default Branch to v5

After verifying your site builds and deploys correctly, update your repository's default branch to `v5`:

1. Go to your repository on GitHub
2. Navigate to **Settings** → **General**
3. Under **Default branch**, click the switch icon next to your current default branch
4. Select `v5` from the dropdown and click **Update**
5. Confirm the change

This ensures that new clones, pull requests, and GitHub Pages deployments all target v5 by default. Your old v4 branch remains available for reference.

> [!warning] Update your CI triggers
> If your CI workflow triggers on a specific branch (e.g. `branches: [v4]`), make sure to update it to `v5`. See the [[hosting]] guide for examples.

## Notes for Quartz 3 Users

If you're coming from Quartz 3 (the Hugo-based version), follow the same steps above — get the v5 branch, run `npx quartz create`, and import your content. There is no need to go through Quartz 4 first.

### Key changes from Quartz 3

1. **Hugo is gone**: Quartz now uses a Node-based static-site generation process. No more Go templates or `hugo-obsidian`.
2. **Full hot-reload**: The development server (`npx quartz build --serve`) re-processes all content on every change.
3. **JSX instead of Go templates**: Layout components are written in JSX (JavaScript XML), which is significantly easier to customize.
4. **New plugin system**: See [[configuration#Plugins|Plugins]] for details on the extensible plugin architecture.

### Things to update

- Update your deploy scripts — see the [[hosting]] guide.
- Ensure your default branch on GitHub is updated to `v5`.
- [[folder and tag listings|Folder and tag listings]] have changed:
  - Folder descriptions go under `content/<folder-name>/index.md`
  - Tag descriptions go under `content/tags/<tag-name>.md`
- Custom CSS may need updates if you depended on specific HTML hierarchy or class names from Quartz 3.
