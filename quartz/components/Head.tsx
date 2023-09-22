import { FullSlug, _stripSlashes, joinSegments, pathToRoot } from "../util/path"
import { JSResourceToScriptElement } from "../util/resources"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import satori from "satori"
import * as fs from "fs"
import { getTtfFromGfont } from "../util/fonts"
import { GlobalConfiguration } from "../cfg"
import { Resvg } from "@resvg/resvg-js"

// const robotoData = await (
//   await fetch("https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf")
// ).arrayBuffer()

async function generateSvg(
  title: string,
  description: string,
  filePath: string,
  fontName: string,
  cfg: GlobalConfiguration,
) {
  const font = (await getTtfFromGfont(fontName)) as ArrayBuffer
  const svg = await satori(
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
          backgroundColor: cfg.theme.colors.lightMode.light,
          flexDirection: "column",
          gap: "2.5rem",
        }}
      >
        <div
          style={{
            color: cfg.theme.colors.lightMode.dark,
            fontSize: 80,
          }}
        >
          {title}
        </div>
        <div
          style={{
            color: cfg.theme.colors.lightMode.dark,
            fontSize: 42,
            marginLeft: "10rem",
            marginRight: "10rem",
            lineClamp: 3,
          }}
        >
          {description}
        </div>
      </div>
      <div
        style={{
          height: "100%",
          width: "2vw",
          position: "absolute",
          backgroundColor: cfg.theme.colors.lightMode.tertiary,
          opacity: 0.8,
        }}
      />
    </div>,
    {
      width: 1200,
      height: 675,
      fonts: [
        {
          name: fontName,
          data: font,
          weight: 800,
          style: "normal",
        },
        {
          name: fontName,
          data: font,
          weight: 400,
          style: "normal",
        },
      ],
    },
  )
  const resvg = new Resvg(svg)
  const pngData = resvg.render()
  const pngBuffer = pngData.asPng()
  fs.writeFileSync(`public/static/${filePath}.png`, pngBuffer)
}

export default (() => {
  let font: Promise<ArrayBuffer | undefined>
  function Head({ cfg, fileData, externalResources }: QuartzComponentProps) {
    if (!font) {
      font = getTtfFromGfont(cfg.theme.typography.header)
    }
    const dir = "public/static"
    const slug = fileData.filePath
    const filePath = slug?.replaceAll("/", "-")
    const ogArr = slug?.split("/")
    const title = fileData.frontmatter?.title ?? "Untitled"
    const description = fileData.description?.trim() ?? "No description provided"

    generateSvg(title, description, filePath as string, cfg.theme.typography.header, cfg)
    // }

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
    const { css, js } = externalResources

    const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
    const path = url.pathname as FullSlug
    const baseDir = fileData.slug === "404" ? path : pathToRoot(fileData.slug!)

    const iconPath = joinSegments(baseDir, "static/icon.png")
    const ogImagePath = `https://${cfg.baseUrl}/static/og-image.png`
    const ogImagePathNew = `https://${cfg.baseUrl}/static/${filePath}.png`

    return (
      <head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="og:site_name" content={cfg.pageTitle}></meta>
        <meta property="og:url" content={`https://${cfg.baseUrl}/${fileData.slug}`}></meta>
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta property="og:description" content={description} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta property="twitter:url" content={`https://${cfg.baseUrl}/${fileData.slug}`}></meta>
        <meta property="twitter:domain" content={cfg.baseUrl}></meta>
        {cfg.baseUrl && <meta name="twitter:image" content={ogImagePathNew} />}
        {cfg.baseUrl && <meta property="og:image" content={ogImagePathNew} />}
        <meta property="og:width" content="1200" />
        <meta property="og:height" content="675" />
        <link rel="icon" href={iconPath} />
        <meta name="description" content={description} />
        <meta name="generator" content="Quartz" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        {css.map((href) => (
          <link key={href} href={href} rel="stylesheet" type="text/css" spa-preserve />
        ))}
        {js
          .filter((resource) => resource.loadTime === "beforeDOMReady")
          .map((res) => JSResourceToScriptElement(res, true))}
      </head>
    )
  }

  return Head
}) satisfies QuartzComponentConstructor
