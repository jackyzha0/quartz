import { FullSlug, _stripSlashes, joinSegments, pathToRoot } from "../util/path"
import { JSResourceToScriptElement } from "../util/resources"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import satori, { SatoriOptions } from "satori"
import * as fs from "fs"
import { getSatoriFont } from "../util/fonts"
import { GlobalConfiguration } from "../cfg"
import sharp from "sharp"

/**
 * Generates social image (OG/twitter standard) and saves it as `.web` inside the public folder
 * @param title what title to use
 * @param description what description to use
 * @param fileName what fileName to use when writing to disk
 * @param headerFontName name of font to use for header (must be google font)
 * @param bodyFontName name of font to use for body (must be google font)
 * @param cfg `GlobalConfiguration` of quartz
 */
async function generateSocialImage(
  title: string,
  description: string,
  fileName: string,
  fontsPromise: Promise<SatoriOptions["fonts"]>,
  cfg: GlobalConfiguration,
  colorScheme: "lightMode" | "darkMode",
) {
  const fonts = await fontsPromise

  // How many characters are allowed before switching to smaller font
  const fontBreakPoint = 22
  const useSmallerFont = title.length > fontBreakPoint
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
    </div>,
    {
      width: ogHeight,
      height: ogWidth,
      fonts: fonts,
    },
  )

  // Convert svg directly to webp (with additional compression)
  const compressed = await sharp(Buffer.from(svg)).webp({ quality: 40 }).toBuffer()

  // Write to file system
  fs.writeFileSync(`${imageDir}/${fileName}.${extension}`, compressed)
}

const ogHeight = 1200
const ogWidth = 676
const extension = "webp"

const imageDir = "public/static/social-images"
export default (() => {
  let fontsPromise: Promise<SatoriOptions["fonts"]>
  function Head({ cfg, fileData, externalResources }: QuartzComponentProps) {
    if (!fontsPromise) {
      fontsPromise = getSatoriFont(cfg.theme.typography.header, cfg.theme.typography.body)
    }
    const slug = fileData.filePath
    const filePath = slug?.replaceAll("/", "-")
    const title = fileData.frontmatter?.title ?? "Untitled"
    const description = fileData.description?.trim() ?? "No description provided"

    generateSocialImage(title, description, filePath as string, fontsPromise, cfg, "lightMode")

    if (!fs.existsSync(imageDir)) {
      fs.mkdirSync(imageDir, { recursive: true })
    }
    const { css, js } = externalResources

    const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
    const path = url.pathname as FullSlug
    const baseDir = fileData.slug === "404" ? path : pathToRoot(fileData.slug!)

    const iconPath = joinSegments(baseDir, "static/icon.png")
    // TODO: use default image if undefined
    const ogImageDefaultPath = `https://${cfg.baseUrl}/static/og-image.png`
    const ogImagePath = `https://${cfg.baseUrl}/${imageDir.replace(
      "public/",
      "",
    )}/${filePath}.${extension}`

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
        <meta property="og:image:type" content={`image/${extension}`} />
        <meta property="og:image:alt" content={fileData.description} />
        <meta property="og:image:width" content={"" + ogWidth} />
        <meta property="og:image:height" content={"" + ogHeight} />
        <meta property="og:image:url" content={ogImagePath} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta property="twitter:url" content={`https://${cfg.baseUrl}/${fileData.slug}`}></meta>
        <meta property="twitter:domain" content={cfg.baseUrl}></meta>
        {cfg.baseUrl && <meta name="twitter:image" content={ogImagePath} />}
        {cfg.baseUrl && <meta property="og:image" content={ogImagePath} />}
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
