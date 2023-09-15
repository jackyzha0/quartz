---
title: "Explorer"
tags:
  - component
---

Quartz features an explorer that allows you to navigate all files and folders on your site. It supports nested folders and has options for customization.

By default, it will show all folders and files on your page. To display the explorer in a different spot, you can edit the [[layout]].

> [!info]
> The explorer uses local storage by default to save the state of your explorer. This is done to ensure a smooth experience when navigating to different pages.
>
> To clear/delete the explorer state from local storage, delete the `fileTree` entry (guide on how to delete a key from local storage in chromium based browsers can be found [here](https://docs.devolutions.net/kb/general-knowledge-base/clear-browser-local-storage/clear-chrome-local-storage/)). You can disable this by passing `useSavedState: false` as an argument.

## Customization

Most configuration can be done by passing in options to `Component.Explorer()`.

For example, here's what the default configuration looks like:

```typescript title="quartz.layout.ts"
Component.Explorer({
  title: "Explorer", // title of the explorer component
  folderClickBehavior: "collapse", // what happens when you click a folder ("link" to navigate to folder page on click or "collapse" to collapse folder on click)
  folderDefaultState: "collapsed", // default state of folders ("collapsed" or "open")
  useSavedState: true, // wether to use local storage to save "state" (which folders are opened) of explorer
})
```

When passing in your own options, you can omit any or all of these fields if you'd like to keep the default value for that field.

Want to customize it even more?

- Removing table of contents: remove `Component.Explorer()` from `quartz.layout.ts`
  - (optional): After removing the explorer component, you can move the [[table of contents]] component back to the `left` part of the layout
- Component:
  - Wrapper (Outer component, generates file tree, etc): `quartz/components/Explorer.tsx`
  - Explorer node (recursive, either a folder or a file): `quartz/components/ExplorerNode.tsx`
- Style: `quartz/components/styles/explorer.scss`
- Script: `quartz/components/scripts/explorer.inline.ts`
