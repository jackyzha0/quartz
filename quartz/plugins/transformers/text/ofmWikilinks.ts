import { TextTransformerPlugin } from "../../types"
import { Paragraph } from "mdast"
import { Element, Root as HtmlRoot } from "hast"
import { splitAnchor } from "../../../util/path"
import { toHast } from "mdast-util-to-hast"
import { toHtml } from "hast-util-to-html"
import { PhrasingContent } from "mdast-util-find-and-replace/lib"

export const externalLinkRegex = /^https?:\/\//i

// !?                 -> optional embedding
// \[\[               -> open brace
// ([^\[\]\|\#]+)     -> one or more non-special characters ([,],|, or #) (name)
// (#[^\[\]\|\#]+)?   -> # then one or more non-special characters (heading link)
// (\\?\|[^\[\]\#]+)? -> optional escape \ then | then one or more non-special characters (alias)
export const wikilinkRegex = new RegExp(
  /!?\[\[([^\[\]\|\#\\]+)?(#+[^\[\]\|\#\\]+)?(\\?\|[^\[\]\#]+)?\]\]/g,
)

// ^\|([^\n])+\|\n(\|) -> matches the header row
// ( ?:?-{3,}:? ?\|)+  -> matches the header row separator
// (\|([^\n])+\|\n)+   -> matches the body rows
export const tableRegex = new RegExp(/^\|([^\n])+\|\n(\|)( ?:?-{3,}:? ?\|)+\n(\|([^\n])+\|\n?)+/gm)

// matches any wikilink, only used for escaping wikilinks inside tables
export const tableWikilinkRegex = new RegExp(/(!?\[\[[^\]]*?\]\])/g)

export const ObsidianFlavoredMarkdownWikilinks: TextTransformerPlugin = () => {
  const mdastToHtml = (ast: PhrasingContent | Paragraph) => {
    const hast = toHast(ast, { allowDangerousHtml: true })!
    return toHtml(hast, { allowDangerousHtml: true })
  }

  return {
    name: "ObsidianFlavoredMarkdownWikilinks",
    transformation(_ctx, src) {
      // pre-transform wikilinks (fix anchors to things that may contain illegal syntax e.g. codeblocks, latex)

      if (src instanceof Buffer) {
        src = src.toString()
      }

      // replace all wikilinks inside a table first
      src = src.replace(tableRegex, (value) => {
        // escape all aliases and headers in wikilinks inside a table
        return value.replace(tableWikilinkRegex, (_value, raw) => {
          // const [raw]: (string | undefined)[] = capture
          let escaped = raw ?? ""
          escaped = escaped.replace("#", "\\#")
          // escape pipe characters if they are not already escaped
          escaped = escaped.replace(/((^|[^\\])(\\\\)*)\|/g, "$1\\|")

          return escaped
        })
      })

      // replace all other wikilinks
      src = src.replace(wikilinkRegex, (value, ...capture) => {
        const [rawFp, rawHeader, rawAlias]: (string | undefined)[] = capture

        const [fp, anchor] = splitAnchor(`${rawFp ?? ""}${rawHeader ?? ""}`)
        const blockRef = Boolean(rawHeader?.match(/^#?\^/)) ? "^" : ""
        const displayAnchor = anchor ? `#${blockRef}${anchor.trim().replace(/^#+/, "")}` : ""
        const displayAlias = rawAlias ?? rawHeader?.replace("#", "|") ?? ""
        const embedDisplay = value.startsWith("!") ? "!" : ""

        if (rawFp?.match(externalLinkRegex)) {
          return `${embedDisplay}[${displayAlias.replace(/^\|/, "")}](${rawFp})`
        }

        return `${embedDisplay}[[${fp}${displayAnchor}${displayAlias}]]`
      })

      return src
    },
  }
}

declare module "vfile" {
  interface DataMap {
    blocks: Record<string, Element>
    htmlAst: HtmlRoot
  }
}
