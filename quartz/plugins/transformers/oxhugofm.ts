import { QuartzTransformerPlugin } from "../types"

export interface Options {
  /** Replace {{ relref }} with quartz wikilinks []() */
  wikilinks: boolean
  /** Remove pre-defined anchor (see https://ox-hugo.scripter.co/doc/anchors/) */
  removePredefinedAnchor: boolean
  /** Remove hugo shortcode syntax */
  removeHugoShortcode: boolean
  /** Replace <figure/> with ![]() */
  replaceFigureWithMdImg: boolean

  /** Replace org latex fragments with $ and $$ */
  replaceOrgLatex: boolean
}

const defaultOptions: Options = {
  wikilinks: true,
  removePredefinedAnchor: true,
  removeHugoShortcode: true,
  replaceFigureWithMdImg: true,
  replaceOrgLatex: true,
}

const relrefRegex = new RegExp(/\[([^\]]+)\]\(\{\{< relref "([^"]+)" >\}\}\)/, "g")
const predefinedHeadingIdRegex = new RegExp(/(.*) {#(?:.*)}/, "g")
const hugoShortcodeRegex = new RegExp(/{{(.*)}}/, "g")
const figureTagRegex = new RegExp(/< ?figure src="(.*)" ?>/, "g")
// \\\\\( -> matches \\(
// (.+?) -> Lazy match for capturing the equation
// \\\\\) -> matches \\)
const inlineLatexRegex = new RegExp(/\\\\\((.+?)\\\\\)/, "g")
// (?:\\begin{equation}|\\\\\(|\\\\\[) -> start of equation
// ([\s\S]*?) -> Matches the block equation
// (?:\\\\\]|\\\\\)|\\end{equation}) -> end of equation
const blockLatexRegex = new RegExp(
  /(?:\\begin{equation}|\\\\\(|\\\\\[)([\s\S]*?)(?:\\\\\]|\\\\\)|\\end{equation})/,
  "g",
)
// \$\$[\s\S]*?\$\$ -> Matches block equations
// \$.*?\$ -> Matches inline equations
const quartzLatexRegex = new RegExp(/\$\$[\s\S]*?\$\$|\$.*?\$/, "g")

/**
 * ox-hugo is an org exporter backend that exports org files to hugo-compatible
 * markdown in an opinionated way. This plugin adds some tweaks to the generated
 * markdown to make it compatible with quartz but the list of changes applied it
 * is not exhaustive.
 * */
export const OxHugoFlavouredMarkdown: QuartzTransformerPlugin<Partial<Options> | undefined> = (
  userOpts,
) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "OxHugoFlavouredMarkdown",
    textTransform(_ctx, src) {
      if (opts.wikilinks) {
        src = src.toString()
        src = src.replaceAll(relrefRegex, (value, ...capture) => {
          const [text, link] = capture
          return `[${text}](${link})`
        })
      }

      if (opts.removePredefinedAnchor) {
        src = src.toString()
        src = src.replaceAll(predefinedHeadingIdRegex, (value, ...capture) => {
          const [headingText] = capture
          return headingText
        })
      }

      if (opts.removeHugoShortcode) {
        src = src.toString()
        src = src.replaceAll(hugoShortcodeRegex, (value, ...capture) => {
          const [scContent] = capture
          return scContent
        })
      }

      if (opts.replaceFigureWithMdImg) {
        src = src.toString()
        src = src.replaceAll(figureTagRegex, (value, ...capture) => {
          const [src] = capture
          return `![](${src})`
        })
      }

      if (opts.replaceOrgLatex) {
        src = src.toString()
        src = src.replaceAll(inlineLatexRegex, (value, ...capture) => {
          const [eqn] = capture
          return `$${eqn}$`
        })
        src = src.replaceAll(blockLatexRegex, (value, ...capture) => {
          const [eqn] = capture
          return `$$${eqn}$$`
        })

        // ox-hugo escapes _ as \_
        src = src.replaceAll(quartzLatexRegex, (value) => {
          return value.replaceAll("\\_", "_")
        })
      }
      return src
    },
  }
}
