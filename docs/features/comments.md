---
title: Comments
tags:
  - component
---

Quartz can add a comment section to your pages with the [[plugins/Comments|Comments]] plugin, so readers can leave comments on your site.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

![[giscus-example.png]]

As of today, only [Giscus](https://giscus.app/) is supported out of the box but PRs to support other providers are welcome!

## Providers

### Giscus

First, make sure that the [[setting up your GitHub repository|GitHub]] repository you are using for your Quartz meets the following requirements:

1. The **repository is [public](https://docs.github.com/en/github/administering-a-repository/managing-repository-settings/setting-repository-visibility#making-a-repository-public)**, otherwise visitors will not be able to view the discussion.
2. The **[giscus](https://github.com/apps/giscus) app is installed**, otherwise visitors will not be able to comment and react.
3. The **Discussions feature is turned on** by [enabling it for your repository](https://docs.github.com/en/github/administering-a-repository/managing-repository-settings/enabling-or-disabling-github-discussions-for-a-repository).

Then, use the [Giscus site](https://giscus.app/#repository) to figure out what your `repoId` and `categoryId` should be. Make sure you select `Announcements` for the Discussion category.

![[giscus-repo.png]]

![[giscus-discussion.png]]

After entering both your repository and selecting the discussion category, Giscus will compute some IDs that you'll need to provide back to Quartz. You won't need to manually add the script yourself as Quartz will handle that part for you but will need these values in the next step!

![[giscus-results.png]]

Finally, in `quartz.config.yaml`, enable the comments plugin (it is in the default configuration but disabled) and fill in the values you got from above:

```yaml title="quartz.config.yaml"
plugins:
  - source: "@quartz-community/comments"
    enabled: true
    options:
      provider: giscus
      options:
        repo: jackyzha0/quartz
        repoId: MDEwOlJlcG9zaXRvcnkzODcyMTMyMDg
        category: Announcements
        categoryId: DIC_kwDOFxRnmM4B-Xg6
        lang: en
    layout:
      position: afterBody
      priority: 10
```

For the TS override approach:

```ts title="quartz.ts (override)"
// If using quartz.ts overrides instead of YAML:
import * as ExternalPlugin from "./.quartz/plugins"
import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout({
  defaults: {
    afterBody: [
      ExternalPlugin.Comments({
        provider: "giscus",
        options: {
          repo: "jackyzha0/quartz",
          repoId: "MDEwOlJlcG9zaXRvcnkzODcyMTMyMDg",
          category: "Announcements",
          categoryId: "DIC_kwDOFxRnmM4B-Xg6",
          lang: "en",
        },
      }),
    ],
  },
})
```

> [!note]
> If the plugin is not in your configuration, install it first: `npx quartz plugin add @quartz-community/comments`

### Customization

Quartz also exposes a few of the other Giscus options as well and you can provide them the same way `repo`, `repoId`, `category`, and `categoryId` are provided.

```ts
type Options = {
  provider: "giscus"
  options: {
    repo: `${string}/${string}`
    repoId: string
    category: string
    categoryId: string

    // Url to folder with custom themes
    // defaults to 'https://${baseUrl}/static/giscus'
    themeUrl?: string

    // filename for light theme .css file
    // defaults to 'light'
    lightTheme?: string

    // filename for dark theme .css file
    // defaults to 'dark'
    darkTheme?: string

    // how to map pages -> discussions
    // defaults to 'url'
    mapping?: "url" | "title" | "og:title" | "specific" | "number" | "pathname"

    // use strict title matching
    // defaults to true
    strict?: boolean

    // whether to enable reactions for the main post
    // defaults to true
    reactionsEnabled?: boolean

    // where to put the comment input box relative to the comments
    // defaults to 'bottom'
    inputPosition?: "top" | "bottom"

    // set your preference language here
    // defaults to 'en'
    lang?: string
  }
}
```

#### Custom CSS theme

Quartz supports custom themes for Giscus. By default Giscus loads `light.css` and `dark.css` from `https://<baseUrl>/static/giscus`, which Quartz ships in `quartz/static/giscus/` (this needs `baseUrl` to be set to your real domain). To use a custom CSS theme, place the `.css` file inside the `quartz/static/giscus` folder and set the configuration values.

For example, if you have a light theme `light-theme.css`, a dark theme `dark-theme.css`, and your Quartz site is hosted at `https://example.com/`:

```yaml title="quartz.config.yaml"
plugins:
  - source: "@quartz-community/comments"
    enabled: true
    options:
      provider: giscus
      options:
        # Other options...
        themeUrl: "https://example.com/static/giscus" # corresponds to quartz/static/giscus/
        lightTheme: light-theme # corresponds to light-theme.css in quartz/static/giscus/
        darkTheme: dark-theme # corresponds to dark-theme.css in quartz/static/giscus/
```

```ts title="quartz.ts (override)"
import * as ExternalPlugin from "./.quartz/plugins"
import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"

const config = await loadQuartzConfig()
export default config
export const layout = await loadQuartzLayout({
  defaults: {
    afterBody: [
      ExternalPlugin.Comments({
        provider: "giscus",
        options: {
          // Other options...
          themeUrl: "https://example.com/static/giscus",
          lightTheme: "light-theme",
          darkTheme: "dark-theme",
        },
      }),
    ],
  },
})
```

#### Conditionally display comments

Quartz can conditionally display the comment box based on a field `comments` in the frontmatter. By default, all pages will display comments, to disable it for a specific page, set `comments` to `false`.

```
---
title: Comments disabled here!
comments: false
---
```
