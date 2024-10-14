import { i18n } from "../i18n"
import { FullSlug, joinSegments, pathToRoot } from "../util/path"
import { JSResourceToScriptElement } from "../util/resources"
import { googleFontHref } from "../util/theme"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

interface Favicon {
  path: string
  size?: string
  mime?: string
}

interface OpenGraphImage {
  path: string
  alt?: string
  mime?: string
  width?: string
  height?: string
}

interface Options {
  favicons?: Favicon[]
  openGraph?: OpenGraphImage
}

export default ((opts?: Options) => {
  const Head: QuartzComponent = ({ cfg, fileData, externalResources }: QuartzComponentProps) => {
    const titleSuffix = cfg.pageTitleSuffix ?? ""
    const title =
      (fileData.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title) + titleSuffix
    const description =
      fileData.description?.trim() ?? i18n(cfg.locale).propertyDefaults.description
    const { css, js } = externalResources

    const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
    const path = url.pathname as FullSlug
    const baseDir = fileData.slug === "404" ? path : pathToRoot(fileData.slug!)

    const icons = opts?.favicons ?? []

    return (
      <head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        {cfg.theme.cdnCaching && cfg.theme.fontOrigin === "googleFonts" && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link rel="stylesheet" href={googleFontHref(cfg.theme)} />
          </>
        )}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {cfg.baseUrl && opts?.openGraph && (
          <>
            <meta property="og:image" content={`https://${cfg.baseUrl}/${opts.openGraph.path}`} />
            {opts.openGraph.mime && (<meta property="og:image:type" content={opts.openGraph.mime} />)}
            {opts.openGraph.width && (<meta property="og:image:width" content={opts.openGraph.path} />)}
            {opts.openGraph.height && (<meta property="og:image:height" content={opts.openGraph.height} />)}
            {opts.openGraph.alt && (<meta property="og:image:alt" content={opts.openGraph.alt} />)}
          </>
        )}
        {icons.map(({ path, size, mime }) => (
          <link rel="icon" href={joinSegments(baseDir, path)} sizes={size} type={mime} />
        ))}
        <meta name="description" content={description} />
        <meta name="generator" content="Quartz" />
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
