---
title: Wikilinks
---

Wikilinks were pioneered by earlier internet wikis to make it easier to write links across pages without needing to write Markdown or HTML links each time.

Quartz supports Wikilinks by default and these links are resolved by Quartz's built-in [[CrawlLinks|link processing]]. See the [Obsidian Help page on Internal Links](https://help.obsidian.md/Linking+notes+and+files/Internal+links) for more information on Wikilink syntax.

This is enabled as a part of [[Obsidian compatibility]] and can be configured and enabled/disabled from that plugin.

Wikilink matching is case-insensitive to mirror Obsidian: `[[My Note]]`, `[[my note]]`, and `[[MY NOTE]]` all resolve to the same file. The generated URL is lowercased (e.g. `my-note`).

## Syntax

- `[[Path to file]]`: produces a link to `Path to file.md` (or `Path-to-file.md`) with the text `Path to file`
- `[[Path to file | Here's the title override]]`: produces a link to `Path to file.md` with the text `Here's the title override`
- `[[Path to file#Anchor]]`: produces a link to the anchor `Anchor` in the file `Path to file.md`
- `[[Path to file#^block-ref]]`: produces a link to the specific block `block-ref` in the file `Path to file.md`

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
