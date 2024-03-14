---
title: Folder and Tag Listings
tags:
  - feature/emitter
---

Quartz emits listing pages for any folders and tags you have.

## Folder Listings

Quartz will generate an index page for all the pages under that folder. This includes any content that is multiple levels deep.

Additionally, Quartz will also generate pages for subfolders. Say you have a note in a nested folder `content/abc/def/note.md`. Then Quartz would generate a page for all the notes under `abc` _and_ a page for all the notes under `abc/def`.

You can link to the folder listing by referencing its name, plus a trailing slash, like this: `[[advanced/]]` (results in [[advanced/]]).

By default, Quartz will title the page `Folder: <folder name>` and no description. You can override this by creating an `index.md` file in the folder with the `title` [[authoring content#Syntax|frontmatter]] field. Any content you write in this file will also be used in the folder description.

For example, for the folder `content/posts`, you can add another file `content/posts/index.md` to add a specific description for it.

## Tag Listings

Quartz will also create an index page for each unique tag in your vault and render a list of all notes with that tag.

Quartz also supports tag hierarchies as well (e.g. `plugin/emitter`) and will also render a separate tag page for each level of the tag hierarchy. It will also create a default global tag index page at `/tags` that displays a list of all the tags in your Quartz.

You can link to the tag listing by referencing its name with a `tag/` prefix, like this: `[[tags/plugin]]` (results in [[tags/plugin]]).

As with folder listings, you can also provide a description and title for a tag page by creating a file for each tag. For example, if you wanted to create a custom description for the #component tag, you would create a file at `content/tags/component.md` with a title and description.

## Customization

The folder listings are a functionality of the [[FolderPage]] plugin, the tag listings of the [[TagPage]] plugin. See the plugin pages for customization options.
