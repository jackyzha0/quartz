---
title: Custom OG Images
description: Generates Open Graph social preview images.
tags:
  - feature/emitter
image: "[[social-image-preview-dark.png]]"
repository: "[quartz-community/og-image](https://github.com/quartz-community/og-image)"
enabled: true
required: false
---

The Custom OG Images emitter plugin generates social media preview images for your pages. It uses [satori](https://github.com/vercel/satori) to convert HTML/CSS into images, allowing you to create beautiful and consistent social media preview cards for your content.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

## Features

- Automatically generates social media preview images for each page
- Supports both light and dark mode themes
- Customizable through frontmatter properties
- Fallback to default image when needed
- Full control over image design through custom components

## Configuration

> [!info] Info
>
> The `baseUrl` property in your [[configuration]] must be set properly for social images to work correctly, as they require absolute paths.

This plugin accepts the following configuration options:

```yaml title="quartz.config.yaml"
plugins:
  - source: github:quartz-community/og-image
    enabled: true
    options:
      colorScheme: lightMode # "lightMode" or "darkMode"
      width: 1200
      height: 630
      excludeRoot: false
```

For the TS override approach (needed for custom `imageStructure`):

```ts title="quartz.ts (override)"
import * as ExternalPlugin from "./.quartz/plugins"
import { defaultImage } from "./quartz/plugins/emitters/ogImage"

// Must be placed before loadQuartzConfig()
ExternalPlugin.CustomOgImages({
  colorScheme: "lightMode",
  width: 1200,
  height: 630,
  excludeRoot: false,
  imageStructure: defaultImage,
})
```

### Configuration Options

| Option                    | Type      | Default                   | Description                                                                                                                                                       |
| ------------------------- | --------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `colorScheme`             | string    | "lightMode"               | Theme to use for generating images ("darkMode" or "lightMode")                                                                                                    |
| `width`                   | number    | 1200                      | Width of the generated image in pixels                                                                                                                            |
| `height`                  | number    | 630                       | Height of the generated image in pixels                                                                                                                           |
| `excludeRoot`             | boolean   | false                     | Whether to exclude the root index page from auto-generated images                                                                                                 |
| `defaultTitle`            | string    | "Untitled"                | Fallback title when a page has no title                                                                                                                           |
| `defaultDescription`      | string    | "No description provided" | Fallback description when a page has no description                                                                                                               |
| `useGeneratedDescription` | boolean   | true                      | Use a generated description (the [[Description]] plugin's excerpt of the page) when the frontmatter has none. Set to `false` to show `defaultDescription` instead |
| `imageStructure`          | component | defaultImage              | Custom component to use for image generation                                                                                                                      |

The description on an image is, in order: the frontmatter's `socialDescription`, its `description`, the generated description (unless `useGeneratedDescription` is `false`), and finally `defaultDescription`. With the [[Description]] plugin enabled, every page with text has a generated description, so `defaultDescription` mostly shows with `useGeneratedDescription: false`.

## Frontmatter Properties

The following properties can be used to customize your link previews:

| Property            | Alias            | Summary                             |
| ------------------- | ---------------- | ----------------------------------- |
| `socialDescription` | `description`    | Description to be used for preview. |
| `socialImage`       | `image`, `cover` | Link to preview image.              |

The `socialImage` property should contain a link to an image either relative to `quartz/static`, or a full URL. If you have a folder for all your images in `quartz/static/my-images`, an example for `socialImage` could be `"my-images/cover.png"`. Alternatively, you can use a fully qualified URL like `"https://example.com/cover.png"`.

> [!info] Info
>
> The priority for what image will be used for the cover image looks like the following: `frontmatter property > generated image (if enabled) > default image`.
>
> The default image (`quartz/static/og-image.png`) will only be used as a fallback if nothing else is set. If the Custom OG Images emitter plugin is enabled, it will be treated as the new default per page, but can be overwritten by setting the `socialImage` frontmatter property for that page.

## Customization

You can fully customize how the images being generated look by passing your own component to `imageStructure`. This component takes JSX + some page metadata/config options and converts it to an image using [satori](https://github.com/vercel/satori). Vercel provides an [online playground](https://og-playground.vercel.app/) that can be used to preview how your JSX looks like as a picture. This is ideal for prototyping your custom design.

### Fonts

You will also be passed an array containing a header and a body font (where the first entry is header and the second is body). The fonts matches the ones selected in `theme.typography.header` and `theme.typography.body` from `quartz.config.yaml` and will be passed in the format required by [`satori`](https://github.com/vercel/satori). To use them in CSS, use the `.name` property (e.g. `fontFamily: fonts[1].name` to use the "body" font family).

An example of a component using the header font could look like this:

```tsx title="socialImage.tsx"
export const myImage: SocialImageOptions["imageStructure"] = (...) => {
  return <p style={{ fontFamily: fonts[0].name }}>Cool Header!</p>
}
```

> [!example]- Local fonts
>
> For cases where you use a local fonts under `static` folder, make sure to set the correct `@font-face` in `custom.scss`
>
> ```scss title="custom.scss"
> @font-face {
>   font-family: "Newsreader";
>   font-style: normal;
>   font-weight: normal;
>   font-display: swap;
>   src: url("/static/Newsreader.woff2") format("woff2");
> }
> ```
>
> Then in `quartz/util/og.tsx`, you can load the Satori fonts like so:
>
> ```tsx title="quartz/util/og.tsx"
> import { joinSegments, QUARTZ } from "../path"
> import fs from "fs"
> import path from "path"
>
> const newsreaderFontPath = joinSegments(QUARTZ, "static", "Newsreader.woff2")
> export async function getSatoriFonts(headerFont: FontSpecification, bodyFont: FontSpecification) {
>   // ... rest of implementation remains same
>   const fonts: SatoriOptions["fonts"] = [
>     ...headerFontData.map((data, idx) => ({
>       name: headerFontName,
>       data,
>       weight: headerWeights[idx],
>       style: "normal" as const,
>     })),
>     ...bodyFontData.map((data, idx) => ({
>       name: bodyFontName,
>       data,
>       weight: bodyWeights[idx],
>       style: "normal" as const,
>     })),
>     {
>       name: "Newsreader",
>       data: await fs.promises.readFile(path.resolve(newsreaderFontPath)),
>       weight: 400,
>       style: "normal" as const,
>     },
>   ]
>
>   return fonts
> }
> ```
>
> This font then can be used with your custom structure.

## Examples

Here are some example image components you can use as a starting point:

### Basic Example

This example will generate images that look as follows:

| Light                                      | Dark                                      |
| ------------------------------------------ | ----------------------------------------- |
| ![[custom-social-image-preview-light.png]] | ![[custom-social-image-preview-dark.png]] |

```tsx
import { SatoriOptions } from "satori/wasm"
import { GlobalConfiguration } from "../cfg"
import { SocialImageOptions, UserOpts } from "./imageHelper"
import { QuartzPluginData } from "../plugins/vfile"

export const customImage: SocialImageOptions["imageStructure"] = (
  cfg: GlobalConfiguration,
  userOpts: UserOpts,
  title: string,
  description: string,
  fonts: SatoriOptions["fonts"],
  fileData: QuartzPluginData,
) => {
  // How many characters are allowed before switching to smaller font
  const fontBreakPoint = 22
  const useSmallerFont = title.length > fontBreakPoint

  const { colorScheme } = userOpts
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          backgroundColor: cfg.theme.colors[colorScheme].light,
          flexDirection: "column",
          gap: "2.5rem",
          paddingTop: "2rem",
          paddingBottom: "2rem",
        }}
      >
        <p
          style={{
            color: cfg.theme.colors[colorScheme].dark,
            fontSize: useSmallerFont ? 70 : 82,
            marginLeft: "4rem",
            textAlign: "center",
            marginRight: "4rem",
            fontFamily: fonts[0].name,
          }}
        >
          {title}
        </p>
        <p
          style={{
            color: cfg.theme.colors[colorScheme].dark,
            fontSize: 44,
            marginLeft: "8rem",
            marginRight: "8rem",
            lineClamp: 3,
            fontFamily: fonts[1].name,
          }}
        >
          {description}
        </p>
      </div>
      <div
        style={{
          height: "100%",
          width: "2vw",
          position: "absolute",
          backgroundColor: cfg.theme.colors[colorScheme].tertiary,
          opacity: 0.85,
        }}
      />
    </div>
  )
}
```

### Advanced Example

The following example includes a customized social image with a custom background and formatted date:

```typescript title="custom-og.tsx"
export const og: SocialImageOptions["Component"] = (
  cfg: GlobalConfiguration,
  fileData: QuartzPluginData,
  { colorScheme }: Options,
  title: string,
  description: string,
  fonts: SatoriOptions["fonts"],
) => {
  let created: string | undefined
  let reading: string | undefined
  if (fileData.dates) {
    created = formatDate(getDate(cfg, fileData)!, cfg.locale)
  }
  const { minutes, text: _timeTaken, words: _words } = readingTime(fileData.text!)
  reading = i18n(cfg.locale).components.contentMeta.readingTime({
    minutes: Math.ceil(minutes),
  })

  const Li = [created, reading]

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        height: "100%",
        width: "100%",
        backgroundImage: `url("https://${cfg.baseUrl}/static/og-image.jpeg")`,
        backgroundSize: "100% 100%",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "radial-gradient(circle at center, transparent, rgba(0, 0, 0, 0.4) 70%)",
        }}
      />
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: "1.5rem",
          paddingTop: "4rem",
          paddingBottom: "4rem",
          marginLeft: "4rem",
        }}
      >
        <img
          src={`"https://${cfg.baseUrl}/static/icon.jpeg"`}
          style={{
            position: "relative",
            backgroundClip: "border-box",
            borderRadius: "6rem",
          }}
          width={80}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            textAlign: "left",
            fontFamily: fonts[0].name,
          }}
        >
          <h2
            style={{
              color: cfg.theme.colors[colorScheme].light,
              fontSize: "3rem",
              fontWeight: 700,
              marginRight: "4rem",
              fontFamily: fonts[0].name,
            }}
          >
            {title}
          </h2>
          <ul
            style={{
              color: cfg.theme.colors[colorScheme].gray,
              gap: "1rem",
              fontSize: "1.5rem",
              fontFamily: fonts[1].name,
            }}
          >
            {Li.map((item, index) => {
              if (item) {
                return <li key={index}>{item}</li>
              }
            })}
          </ul>
        </div>
        <p
          style={{
            color: cfg.theme.colors[colorScheme].light,
            fontSize: "1.5rem",
            overflow: "hidden",
            marginRight: "8rem",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: 7,
            WebkitBoxOrient: "vertical",
            lineClamp: 7,
            fontFamily: fonts[1].name,
          }}
        >
          {description}
        </p>
      </div>
    </div>
  )
}
```

## API

- Category: Emitter
- Function name: `ExternalPlugin.CustomOgImages()`.
- Source: [`quartz-community/og-image`](https://github.com/quartz-community/og-image)
- Install: `npx quartz plugin add github:quartz-community/og-image`
