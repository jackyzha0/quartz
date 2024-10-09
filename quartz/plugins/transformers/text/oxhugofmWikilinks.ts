import { TextTransformerPlugin } from "../../types"

const relrefRegex = new RegExp(/\[([^\]]+)\]\(\{\{< relref "([^"]+)" >\}\}\)/, "g")

/**
 * ox-hugo is an org exporter backend that exports org files to hugo-compatible
 * markdown in an opinionated way. This plugin adds some tweaks to the generated
 * markdown to make it compatible with quartz but the list of changes applied it
 * is not exhaustive.
 * */
export const OxHugoFlavouredMarkdownWikilinks: TextTransformerPlugin = () => {
  return {
    name: "OxHugoFlavouredMarkdownWikilinks",
    transformation(_ctx, src) {
      src = src.toString()
      src = src.replaceAll(relrefRegex, (value, ...capture) => {
        const [text, link] = capture
        return `[${text}](${link})`
      })

      return src
    },
  }
}
