---
title: "Editing Content in Quartz"
tags:
- setup
weight: -4
---

## Editing 
Quartz runs on top of [Hugo](https://gohugo.io/) so all notes are written in [Markdown](https://www.markdownguide.org/getting-started/).

### Folder Structure
Here's a rough overview of what's what.

**All content in your garden can found in the `/content` folder.** To make edits, you can open any of the files and make changes directly and save it. You can organize content into any folder you'd like.

**To edit the main home page, open `/content/_index.md`.**

To create a link between notes in your garden, just create a normal link using Markdown pointing to the document in question. Please note that **all links should be relative to the root `/content` path**. 

```markdown
For example, I want to link this current document to `notes/config.md`.
[A link to the config page](notes/config.md)
```

Similarly, you can put local images anywhere in the `/content` folder.

```markdown
Example image (source is in content/notes/images/example.png)
![Example Image](/content/notes/images/example.png)
```

You can also use wikilinks if that is what you are more comfortable with!

### Front Matter
Hugo is picky when it comes to metadata for files. Make sure that your title is double-quoted and that you have a title defined at the top of your file like so. You can also add tags here as well.

```yaml
---
title: "Example Title"
tags:
- example-tag
---

Rest of your content here...
```

### Obsidian
I recommend using [Obsidian](http://obsidian.md/) as a way to edit and grow your digital garden. It comes with a really nice editor and graphical interface to preview all of your local files.

This step is **highly recommended**.

> 🔗 Step 3: [How to setup your Obsidian Vault to work with Quartz](notes/obsidian.md)

## Previewing Changes
This step is purely optional and mostly for those who want to see the published version of their digital garden locally before opening it up to the internet. This is *highly recommended* but not required.

> 👀 Step 4: [Preview Quartz Changes](notes/preview%20changes.md)

For those who like to live life more on the edge, viewing the garden through Obsidian gets you pretty close to the real thing.

## Publishing Changes
Now that you know the basics of managing your digital garden using Quartz, you can publish it to the internet!

> 🌍 Step 5: [Hosting Quartz online!](notes/hosting.md)

Having problems? Checkout our [FAQ and Troubleshooting guide](notes/troubleshooting.md).
