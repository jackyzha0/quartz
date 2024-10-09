import { TextTransformerPlugin } from "../../types"

const hugoShortcodeRegex = new RegExp(/{{(.*)}}/, "g")

/**
 * ox-hugo is an org exporter backend that exports org files to hugo-compatible
 * markdown in an opinionated way. This plugin adds some tweaks to the generated
 * markdown to make it compatible with quartz but the list of changes applied it
 * is not exhaustive.
 * */
export const OxHugoFlavouredMarkdownRemoveHugoShortcode: TextTransformerPlugin = () => {
  return {
    name: "OxHugoFlavouredMarkdownRemoveHugoShortcode",
    transformation(_ctx, src) {
      src = src.toString()
      src = src.replaceAll(hugoShortcodeRegex, (value, ...capture) => {
        const [scContent] = capture
        return scContent
      })

      return src
    },
  }
}
