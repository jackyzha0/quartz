---
title: Comments
tags:
  - component
---

Quartz also has the ability to hook into various providers to enable readers to leave comments on your site.

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

Finally, in `quartz.layout.ts`, edit the `afterBody` field of `sharedPageComponents` to include the following options but with the values you got from above:

```ts title="quartz.layout.ts"
afterBody: [
  Component.Comments({
    provider: 'giscus',
    options: {
      // from data-repo
      repo: 'jackyzha0/quartz',
      // from data-repo-id
      repoId: 'MDEwOlJlcG9zaXRvcnkzODcyMTMyMDg',
      // from data-category
      category: 'Announcements',
      // from data-category-id
      categoryId: 'DIC_kwDOFxRnmM4B-Xg6',
    }
  }),
],
```

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
  }
}
```
