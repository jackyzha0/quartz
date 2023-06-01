import { resolveToRoot } from "../path"
import { StaticResources } from "../resources"

export interface HeadProps {
  title: string
  description: string
  slug: string
  externalResources: StaticResources
}

export default function({ title, description, slug, externalResources }: HeadProps) {
  const { css, js } = externalResources
  const baseDir = resolveToRoot(slug)
  const stylePath = baseDir + "/index.css"
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
    <base href={slug} />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link rel="stylesheet" type="text/css" href={stylePath} />
    {css.map(href => <link key={href} href={href} rel="stylesheet" type="text/css" />)}
    {js.filter(resource => resource.loadTime === "beforeDOMReady").map(resource => <script key={resource.src} src={resource.src} />)}
  </head>
}

export function beforeDOMLoaded() {

}

export function onDOMLoaded() {

}
