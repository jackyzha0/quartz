import { TextTransformerPlugin } from "../../types"

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
export const OxHugoFlavouredMarkdownReplaceOrgLatex: TextTransformerPlugin = () => {
  return {
    name: "OxHugoFlavouredMarkdownReplaceOrgLatex",
    transformation(_ctx, src) {
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

      return src
    },
  }
}
