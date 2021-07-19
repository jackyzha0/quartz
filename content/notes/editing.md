---
title: "Editing Content in Quartz"
---

## Editing 
Quartz runs on top of [Hugo](https://gohugo.io/) so all notes are written in [Markdown](https://www.markdownguide.org/getting-started/).

### Obsidian
I *strongly* recommend using [Obsidian](http://obsidian.md/) as a way to edit and grow your digital garden. It comes with a really nice editor and graphical interface to preview all of my local files.

**🔗 [How to link your Obsidian Vault](notes/obsidian.md)**

Of course, all the files are in Markdown so you could just use your favourite text editor of choice.

### Ignoring Files
Only want to publish a subset of all of your notes? Don't worry, Quartz makes this a simple two-step process.

❌ [Excluding pages from being published](notes/ignore-notes.md)

### Folder Structure
Here's a rough overview of what's what.

**All content in your garden can found in the `/content` folder.** To make edits, you can open any of the files and make changes directly and save it. You can organize content into any folder you'd like.

**To edit the main home page, open `/content/_index.md`.** This is the home page which is slightly special. You don't need front matter here!

To create a link between notes in your garden, just create a normal link using Markdown pointing to the document in question. Please note that **all links should be relative to the root `/content` path**. 

```markdown
For example, I want to link this current document to `notes/config.md`.
[A link to the config page](notes/config.md)
```

### Front Matter
Hugo is picky when it comes to metadata for files. Ensure that you have a title defined at the top of your file like so:

```markdown
---
title: "Example Title"
---

Rest of your content here...
```

## Previewing Changes
This step is purely optional and mostly for those who want to see the published version of their digital garden locally before opening it up to the internet. This is *highly recommended*.

👀 [Preview Quartz Changes](notes/preview-changes.md)

For those who like to live life more on the edge, viewing the garden through Obsidian gets you pretty close to the real thing.

## Publishing Changes
Now that you know the basics of managing your digital garden using Quartz, you can publish it to the internet!

🌍 [Hosting Quartz online!](notes/hosting.md)

Having problems? Checkout our [FAQ and Troubleshooting guide](notes/troubleshooting.md).