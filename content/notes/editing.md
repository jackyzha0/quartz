---
title: "Editing Content in Quartz"
---

## Editing 
Quartz runs on top of [Hugo](https://gohugo.io/) so all notes are written in [Markdown](https://www.markdownguide.org/getting-started/).

**All content in your garden can found in the `/content` folder.** To make edits, you can open any of the files and make changes directly and save it. You can organize content into any folder you'd like.

To create a link, just create a normal link using Markdown pointing to the document in question. Please note that **all links should be relative to the root `/content` path**. 

```markdown
For example, I want to link this current document to `config.md`.
[A link to the config page](config.md)
```

### Obsidian
I *strongly* recommend using [Obsidian](http://obsidian.md/) as a way to edit and grow your digital garden. It comes with a really nice editor and graphical interface to preview all of my local files.

**🔗 [How to link your Obsidian Vault](notes/obsidian.md)**

Of course, all the files are in Markdown so you could just use your favourite text editor of choice, I'm not going to stop you!

## Previewing Changes
This step is purely optional and mostly for those who want to see the published version of their digital garden locally before opening it up to the internet. For those who like to live life more on the edge, viewing the garden through Obsidian gets you pretty close to the real thing.

###  Installing Hugo
Hugo is the static site generator that powers Quartz. If you'd like to preview your site locally, [install Hugo](https://gohugo.io/getting-started/installing/).

```
# Navigate to your local Quartz folder
$ cd <location-of-your-local-quartz>

# Start local server
$ hugo server

# View your site in a browser at http://localhost:1313/
```

### Install `hugo-obsidian`
This step is **doubly optional** and only applies to those who want to see their Interactive Graph and backlinks locally while previewing changes on the site. 

Ensure you have Go (>= 1.16) installed.

```shell
# Clone the Repository
$ git clone https://github.com/jackyzha0/hugo-obsidian.git

# Install and link `hugo-obsidian` locally
$ go install .

# Navigate to your local Quartz folder
$ cd <location-of-your-local-quartz>

# Scrape all links in your Quartz folder and generate info for Quartz
$ hugo-obsidian -input=content -output=data
```

Afterwards, start the Hugo server as shown above and your local backlinks and interactive graph should be populated!

## Publishing Changes
Now that you know the basics of managing your digital garden using Quartz, you can publish it to the internet!

🌍 [Hosting Quartz online!](notes/hosting.md)

Having problems? Checkout our [FAQ and Troubleshooting guide](notes/troubleshooting.md).