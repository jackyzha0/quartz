---
tags:
  - plugin/transformer
---

[Obsidian Image Gallery](https://github.com/lucaorio/obsidian-image-gallery/) is a plugin for Obsidian which allows you to dump a series of images into a markdown document by specifying a folder with images in it.  This transformer converts the gallery information into a series of embedded images, allowing it to be viewed in Quartz.

The goal of this transformer is to locate any blocks of `img-gallery` code blocks, parse out their paths and replace them with the images.  Currently, the only part of the `img-gallery` block that is utilized is the `path` variable, everything else is ignored.


## Usage
To add a gallery to your markdown, simply follow the standard specified in [Obsidian Image Gallery's usage documentation.](https://github.com/lucaorio/obsidian-image-gallery/#usage)

## Configure
Simply add `Plugin.GalleryTransformer()` to the transformers in `quartz.config.ts`.

```typescript title="quartz.config.ts"
plugins: {
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.TableOfContents(),
      // .....
	  Plugin.GalleryTransformer(),
      // .....
    ],
    // ....
},
```

Currently, there are no additional configuration options for this transform.