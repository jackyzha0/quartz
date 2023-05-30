import { StaticResources } from "../resources"

interface Props {
  title: string,
  description: string,
  externalResources: StaticResources,
  baseDir: string
}

export default function({ title, description, externalResources, baseDir }: Props) {
  const { css, js } = externalResources
  const iconPath = baseDir + "/static/icon.png"
  const ogImagePath = baseDir + "/static/og-image.png"
  return <head>
    <title>{title}</title>
    <meta property="og:title" content={title} />
    <meta property="og:description" content={title} />
    <meta property="og:image" content={ogImagePath} />
    <meta property="og:width" content="1200" />
    <meta property="og:height" content="675" />
    <link rel="icon" href={iconPath} />
    <meta name="description" content={description} />
    <meta name="generator" content="Quartz" />
    <meta charSet="UTF-8" />
    {css.map(href => <link key={href} href={href} rel="stylesheet" type="text/css" />)}
    {js.filter(resource => resource.loadTime === "beforeDOMReady").map(resource => <script key={resource.src} src={resource.src} />)}
  </head>
}
