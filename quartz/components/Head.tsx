import { resolveToRoot } from "../path"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

function Head({ fileData, externalResources }: QuartzComponentProps) {
  const slug = fileData.slug!
  const title = fileData.frontmatter?.title ?? "Untitled"
  const description = fileData.description ?? "No description provided"
  const { css, js } = externalResources
  const baseDir = resolveToRoot(slug)
  const iconPath = baseDir + "/static/icon.png"
  const ogImagePath = baseDir + "/static/og-image.png"

  return <head>
    <title>{title}</title>
    <meta charSet="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={title} />
    <meta property="og:image" content={ogImagePath} />
    <meta property="og:width" content="1200" />
    <meta property="og:height" content="675" />
    <link rel="icon" href={iconPath} />
    <meta name="description" content={description} />
    <meta name="generator" content="Quartz" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    {css.map(href => <link key={href} href={href} rel="stylesheet" type="text/css" spa-preserve />)}
    {js.filter(resource => resource.loadTime === "beforeDOMReady").map(resource => <script key={resource.src} {...resource} spa-preserve />)}
  </head>
}

export default (() => Head) satisfies QuartzComponentConstructor
