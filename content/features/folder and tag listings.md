---
title: Folder and Tag Listings
tags:
  - plugin/emitter
---

Quartz creates listing pages for any folders and tags you have.

## Folder Listings

Quartz will generate an index page for all the pages under that folder. This includes any content that is multiple levels deep.

Additionally, Quartz will also generate pages for subfolders. Say you have a note in a nested folder `content/abc/def/note.md`. Then, Quartz would generate a page for all the notes under `abc` _and_ a page for all the notes under `abc/def`.

By default, Quartz will title the page `Folder: <name of folder>` and no description. You can override this by creating an `index.md` file in the folder with the `title` [[authoring content#Syntax|frontmatter]] field. Any content you write in this file will also be used in the description of the folder.

## Tag Listings

Quartz will also create an index page for each unique tag in your vault and render a list of all notes with that tag.

Quartz also supports tag hierarchies as well (e.g. `plugin/emitter`) and will also render a separate tag page for each layer of the tag hierarchy. It will also create a default global tag index page at `/tags` that displays a list of all the tags in your Quartz.

## Customization

The layout for both the folder and content pages can be customized. By default, they use the `defaultListPageLayout` in `quartz.layouts.ts`. If you'd like to make more involved changes to the layout and don't mind editing some [[creating components|Quartz components]], you can take a look at `quartz/components/pages/FolderContent.tsx` and `quartz/components/pages/TagContent.tsx` respectively.

- Removing folder listings: remove `Plugin.FolderPage()` from `emitters` in `quartz.config.ts`
- Removing tag listings: remove `Plugin.TagPage()` from `emitters` in `quartz.config.ts`
