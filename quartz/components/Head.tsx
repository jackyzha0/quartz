import { FullSlug, _stripSlashes, joinSegments, pathToRoot } from "../util/path"
import { JSResourceToScriptElement } from "../util/resources"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import satori from "satori"
import * as fs from "fs"

const robotoData = await (
  await fetch("https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf")
).arrayBuffer()

async function generateSvg(title: string, filePath: string) {
  const svg = await satori(
    <div
      style={{
        color: "black",
        backgroundColor: "green",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 64,
      }}
    >
      {title}
    </div>,
    {
      width: 1200,
      height: 675,
      fonts: [
        {
          name: "Roboto",
          // Use `fs` (Node.js only) or `fetch` to read the font as Buffer/ArrayBuffer and provide `data` here.
          data: robotoData,
          weight: 400,
          style: "normal",
        },
      ],
    },
  )

  fs.writeFileSync(`public/static/${filePath}.svg`, svg)
}

export default (() => {
  function Head({ cfg, fileData, externalResources }: QuartzComponentProps) {
    const dir = "public/static"
    const slug = fileData.filePath
    const filePath = slug?.replaceAll("/", "-")
    const ogArr = slug?.split("/")
    const ogTitle = fileData.frontmatter?.title ?? "Untitled"

    // const title = fileData?.fron
    // console.log("filePath: ", filePath)
    // if (ogTitle && filePath) {
    console.log("OG title: ", ogTitle)
    generateSvg(ogTitle as string, filePath as string)
    // }

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir)
    }
    const title = fileData.frontmatter?.title ?? "Untitled"
    const description = fileData.description?.trim() ?? "No description provided"
    const { css, js } = externalResources

    const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
    const path = url.pathname as FullSlug
    const baseDir = fileData.slug === "404" ? path : pathToRoot(fileData.slug!)

    const iconPath = joinSegments(baseDir, "static/icon.png")
    const ogImagePath = `https://${cfg.baseUrl}/static/og-image.png`
    const ogImagePathNew = `https://${cfg.baseUrl}/static/${filePath}.svg`

    return (
      <head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
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
