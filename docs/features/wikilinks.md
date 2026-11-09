---
title: Wikilinks
---

Wikilinks were pioneered by earlier internet wikis to make it easier to write links across pages without needing to write Markdown or HTML links each time.

Quartz supports Wikilinks by default and these links are resolved by Quartz's built-in [[CrawlLinks|link processing]]. See the [Obsidian Help page on Internal Links](https://help.obsidian.md/Linking+notes+and+files/Internal+links) for more information on Wikilink syntax.

Parsing wikilinks is part of [[Obsidian compatibility]] ([[ObsidianFlavoredMarkdown]]). How links are resolved (`markdownLinkResolution`, pretty link text, broken-link styling, …) is configured under `configuration.links` (see [[CrawlLinks]]).

Wikilink matching is case-insensitive to mirror Obsidian: `[[My Note]]`, `[[my note]]`, and `[[MY NOTE]]` all resolve to the same file. The generated URL is lowercased (e.g. `my-note`).

Links behave as in Obsidian in a few more ways:

- Link paths are NFC-normalized, so a link spelled with a decomposed `é` reaches `café.md`.
- A short link to an Obsidian folder note (`[[Topic]]` for `Topic/Topic.md`) reaches the folder page.
- A Markdown link whose path is not valid percent-encoding (`[x](%zz)`) is treated as an external link.
- An image without alt text gets its path as alt text, as Obsidian names an embed: `![[pic.png]]` gets `pic.png`, and a Markdown image of a file the site doesn't have gets its decoded path (`![](missing%20pic.png)` → "missing pic.png").

## Syntax

- `[[Path to file]]`: produces a link to `Path to file.md` (or `Path-to-file.md`) with the text `Path to file`
- `[[Path to file | Here's the title override]]`: produces a link to `Path to file.md` with the text `Here's the title override`
- `[[Path to file#Anchor]]`: produces a link to the anchor `Anchor` in the file `Path to file.md`
- `[[Path to file#^block-ref]]`: produces a link to the specific block `block-ref` in the file `Path to file.md`

A `^id` at the end of a wikilink's text stays part of the link text (`[[note|a ^id]]` shows `a ^id`); it doesn't turn the paragraph into a block with that id.

### Heading anchors

Heading ids are slugs of the heading text, the same ones GitHub uses: `## My Heading` → `#my-heading`, `## Range 1--2` → `#range-1--2`. Heading links, embeds and the [[table of contents]] use the same slugs. Obsidian replaces `:`, `|`, `^`, `#` and `\` in a heading with spaces when it writes a link to it (`[[note#Colon unspaced]]` for `## Colon:unspaced`); such links and embeds reach the heading too.

### Embeds

- `![[Path to image]]`: embeds an image into the page
- `![[Path to image|100x145]]`: embeds an image into the page with dimensions 100px by 145px
- `![[Path to image|Alt text|300]]`: embeds an image with alt text and a width of 300px. Markdown images take a size the same way: `![Alt text|300](path/to/image.png)`
- `![[Path to file]]`: transclude an entire page
- `![[Path to file#Anchor]]`: transclude everything under the header `Anchor`
- `![[Path to file#^b15695]]`: transclude block with ID `^b15695`

### Styling individual images

The text between `|`s that isn't a size becomes the image's alt text: `![[diagram.png|invert center|300]]` gives `<img alt="invert center" width="300">` (likewise `![invert center](diagram.png)`). SVG files are embedded as `<object>` and get it as `aria-label`. You can use words in the alt text as flags for styles in `quartz/styles/custom.scss`, for example to invert diagrams in dark mode and to center images:

```scss title="quartz/styles/custom.scss"
// ![[diagram.png|invert]]: invert colors in dark mode (hue-rotate keeps hues roughly the same)
html[saved-theme="dark"] :is(img[alt~="invert"], object[aria-label~="invert"]) {
  filter: invert(1) hue-rotate(180deg);
}

// ![[photo.png|center]] or ![[photo.png|center|300]]: center the image
:is(img[alt~="center"], object[aria-label~="center"]) {
  display: block;
  margin-inline: auto;
}
```

`~=` matches one word of the alt text, so flags combine (`|invert center|`), and an alt text such as `|Network diagram invert|` still describes the image for screen readers.
