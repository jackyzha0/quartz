---
title: "Migrating from Quartz 3"
---

As you already have Quartz locally, you don't need to fork or clone it again. Simply just checkout the alpha branch, install the dependencies, and import your old vault.

```bash
git checkout v4-alpha
git pull upstream v4-alpha
npm i
npx quartz create
```

When running `npx quartz create`, you will be prompted as to how to initialize your content folder. Here, you can choose to import or link your previous content folder and Quartz should work just as you expect it to.

## Key changes

1. **Removing Hugo and `hugo-obsidian`**: Hugo worked well for earlier versions of Quartz but it also made it hard for people outside of the Golang and Hugo communities to fully understand what Quartz was doing under the hood and be able to properly customize it to their needs. Quartz 4 now uses a Node-based static-site generation process which should lead to a much more helpful error messages and an overall smoother user experience.
2. **Full-hot reload**: The many rough edges of how `hugo-obsidian` integrated with Hugo meant that watch mode didn't re-trigger `hugo-obsidian` to update the content index. This lead to a lot of weird cases where the watch mode output wasn't accurate. Quartz 4 now uses a cohesive parse, filter, and emit pipeline which gets run on every change so hot-reloads are always accurate.
3. **Replacing Go template syntax with JSX**: Quartz 3 used [Go templates](https://pkg.go.dev/text/template) to create layouts for pages. However, the syntax isn't great for doing any sort of complex rendering (like [text processing](https://github.com/jackyzha0/quartz/blob/hugo/layouts/partials/textprocessing.html)) and it got very difficult to make any meaningful layout changes to Quartz 3. Quartz 4 uses an extension of JavaScript syntax called JSX which allows you to write layout code that looks like HTML in JavaScript which is significantly easier to understand and maintain.
4. **A new extensible [[configuration]] and [[configuration#Plugins|plugin]] system**: Quartz 3 was hard to configure without technical knowledge of how Hugo's partials worked. Extensions were even hard to make. Quartz 4's configuration and plugin system is designed to be extended by users while making updating to new versions of Quartz easy.

## Things to update

- Some HTML layout may not be the same between Quartz 3 and Quartz 4. If you depended on a particular HTML hierarchy or class names, you may need to update your custom CSS to reflect these changes.
- If you customized the layout of Quartz 3, you may need to translate these changes from Go templates back to JSX as Quartz 4 no longer uses Hugo. For components, check out the guide on [[creating components]] for more details on this.
- You will also need to update your deploy scripts. See the [[hosting]] guide for more details.
