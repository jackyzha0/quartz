---
title: "Social Media Preview Cards"
---

A lot of social media platforms can display a rich preview for your website when sharing a link (most notably, a cover image, a title and a description). Quartz automatically handles most of this for you with reasonable defaults, but for more control, you can customize these by setting [[#Properties | Frontmatter Properties]].

Quartz can also dynamically generate and use new cover images for every page to be used in link previews on social media for you. To get started with this, set `generateSocialImages: true` in `quartz.config.ts`.

## Showcase

After enabling `generateSocialImages` in `quartz.config.ts`, the social media link preview for [[authoring content | Authoring Content]] looks like this:

| Light                               | Dark                               |
| ----------------------------------- | ---------------------------------- |
| ![[social-image-preview-light.png]] | ![[social-image-preview-dark.png]] |

For testing, it is recommended to use [opengraph.xyz](https://www.opengraph.xyz/) to see what the link to your page will look like on various platforms (more info under [[#local testing]]).

## Customization

You can customize how images will be generated in the quartz config.

For example, here's what the default configuration looks like if you set `generateSocialImages: true`:

```typescript title="quartz.config.ts"
generateSocialImages: {
  colorScheme: "lightMode", // what colors to use for generating image, same as theme colors from config, valid values are "darkMode" and "lightMode"
  width: 1200, // width to generate with (in pixels)
  height: 676, // height to generate with (in pixels)
  imageStructure: defaultImage // import from `socialImage.tsx`, recommended to add your own one there as well
}
```

> [!info] Info
>
> To change the default config, you can pass an object containing all config options you want to customize to `generateSocialImages`.
> As a simple example, if you want to change the theme, you can pass `generateSocialImages: { colorScheme: "darkMode" }`

---

### Frontmatter Properties

> [!tip] Hint
>
> Overriding social media preview properties via frontmatter still works even if `generateSocialImages` is disabled.

The following properties can be used to customize your link previews:

| Property            | Alias            | Summary                             |
| ------------------- | ---------------- | ----------------------------------- |
| `socialDescription` | `description`    | Description to be used for preview. |
| `socialImage`       | `image`, `cover` | Link to preview image.              |

The `socialImage` property should contain a link to an image relative to `quartz/static`. If you have a folder for all your images in `quartz/static/my-images`, an example for `socialImage` could be `"my-images/cover.png"`.

> [!info] Info
>
> The priority for what image will be used for the cover image looks like the following: `frontmatter property> generated image (if enabled) > default image`.
>
> The default image (`quartz/static/og-image.png`) will only be used as a fallback if nothing else is set. If `generateSocialImages` is enabled, it will be treated as the new default per page, but can be overwritten by setting the `socialImage` frontmatter property for that page.

---

### Fully customized image generation

You can fully customize how the images being generated look by passing your own component to `generateSocialImages.imageStructure`. This component takes html/css + some page metadata/config options and converts it to an image using [satori](https://github.com/vercel/satori). Vercel provides an [online playground](https://og-playground.vercel.app/) that can be used to preview how your html/css looks like as a picture. This is ideal for prototyping your custom design.

It is recommended to write your own image components in `quartz/util/socialImage.tsx` or any other `.tsx` file, as passing them to the config won't work otherwise. An example of the default image component can be found in `socialImage.tsx` in `defaultImage()`.

> [!tip] Hint
>
> Satori only supports a subset of all valid CSS properties. All supported properties can be found in their [documentation](https://github.com/vercel/satori#css).

Your custom image component should have the `SocialImageOptions["imageStructure"]` type, to make development easier for you. Using a component of this type, you will be passed the following variables:

```ts
imageStructure: (
  cfg: GlobalConfiguration, // global quartz config (useful for getting theme colors and other info)
  userOpts: UserOpts, // options passed to `generateSocialImage`
  title: string, // title of current page
  description: string, // description of current page
  fonts: SatoriOptions["fonts"], // header + body font
) => JSXInternal.Element
```

Now, you can let your creativity flow and design your own image component! For reference and some cool tips, you can check how the markup for the default image looks.

> [!example] Examples
>
> Here are some examples for markup you may need to get started:
>
> - Get a theme color
>
>   `cfg.theme.colors[colorScheme].<colorName>`, where `<colorName>` corresponds to a key in `ColorScheme` (defined at the top of `quartz/util/theme.ts`)
>
> - Use the page title/description
>
>   `<p>{title}</p>`/`<p>{description}</p>`
>
> - Use a font family
>
>   Detailed in the Fonts chapter below

---

### Fonts

You will also be passed an array containing a header and a body font (where the first entry is header and the second is body). The fonts matches the ones selected in `theme.typography.header` and `theme.typography.body` from `quartz.config.ts` and will be passed in the format required by [`satori`](https://github.com/vercel/satori). To use them in CSS, use the `.name` property (e.g. `fontFamily: fonts[1].name` to use the "body" font family).

An example of a component using the header font could look like this:

```tsx title="socialImage.tsx"
export const myImage: SocialImageOptions["imageStructure"] = (...) => {
  return <p style={{ fontFamily: fonts[0].name }}>Cool Header!</p>
}
```

### Local testing

To test how the full preview of your page is going to look even before deploying, you can forward the port you're serving quartz on. In VSCode, this can easily be achieved following [this guide](https://code.visualstudio.com/docs/editor/port-forwarding) (make sure to set `Visibility` to `public` if testing on external tools like [opengraph.xyz](https://www.opengraph.xyz/)).

If you have `generateSocialImages` enabled, you can check out all generated images under `public/static/social-images`.

## Technical info

Images will be generated as `.webp` files, which helps to keep images small (the average image takes ~`19kB`). They are also compressed further using [sharp](https://sharp.pixelplumbing.com/).

When using images, the appropriate [Open Graph](https://ogp.me/) and [Twitter](https://developer.twitter.com/en/docs/twitter-for-websites/cards/guides/getting-started) meta tags will be set to ensure they work and look as expected.
