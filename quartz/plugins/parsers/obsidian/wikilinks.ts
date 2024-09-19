import { QuartzParserPlugin } from "../../types"
import { ReplaceFunction, findAndReplace as mdastFindReplace } from "mdast-util-find-and-replace"
import { FilePath, splitAnchor, slugifyFilePath } from "../../../util/path"
import { JSResource } from "../../../util/resources"
import { Root } from "mdast"
import { Pluggable } from "unified"

interface Options {
  enabled: Boolean
}

const defaultOptions: Options = {
  enabled: true,
}

const externalLinkRegex = /^https?:\/\//i

// ^\|([^\n])+\|\n(\|) -> matches the header row
// ( ?:?-{3,}:? ?\|)+  -> matches the header row separator
// (\|([^\n])+\|\n)+   -> matches the body rows
const tableRegex = new RegExp(/^\|([^\n])+\|\n(\|)( ?:?-{3,}:? ?\|)+\n(\|([^\n])+\|\n?)+/gm)

// matches any wikilink, only used for escaping wikilinks inside tables
const tableWikilinkRegex = new RegExp(/(!?\[\[[^\]]*?\]\])/g)

// !?                 -> optional embedding
// \[\[               -> open brace
// ([^\[\]\|\#]+)     -> one or more non-special characters ([,],|, or #) (name)
// (#[^\[\]\|\#]+)?   -> # then one or more non-special characters (heading link)
// (\\?\|[^\[\]\#]+)? -> optional escape \ then | then one or more non-special characters (alias)
const wikilinkRegex = new RegExp(
  /!?\[\[([^\[\]\|\#\\]+)?(#+[^\[\]\|\#\\]+)?(\\?\|[^\[\]\#]+)?\]\]/g,
)

const wikilinkImageEmbedRegex = new RegExp(
  /^(?<alt>(?!^\d*x?\d*$).*?)?(\|?\s*?(?<width>\d+)(x(?<height>\d+))?)?$/,
)

export const ObsidianWikilinks: QuartzParserPlugin<Partial<Options>> = (userOpts) => {
  const opts: Options = { ...defaultOptions, ...userOpts }
  return {
    name: "ObsidianWikilinks",
    textTransform(_ctx, src: string | Buffer) {
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
    markdownPlugins(_ctx) {
      const plug: Pluggable = (tree: Root, path) => {
        const replacements: [RegExp, string | ReplaceFunction][] = []
        replacements.push([
          wikilinkRegex,
          (value: string, ...capture: string[]) => {
            let [rawFp, rawHeader, rawAlias] = capture
            const fp = rawFp?.trim() ?? ""
            const anchor = rawHeader?.trim() ?? ""
            const alias = rawAlias?.slice(1).trim()

            // embed cases
            if (value.startsWith("!")) {
              const ext: string = path.extname(fp).toLowerCase()
              const url = slugifyFilePath(fp as FilePath)
              if ([".png", ".jpg", ".jpeg", ".gif", ".bmp", ".svg", ".webp"].includes(ext)) {
                const match = wikilinkImageEmbedRegex.exec(alias ?? "")
                const alt = match?.groups?.alt ?? ""
                const width = match?.groups?.width ?? "auto"
                const height = match?.groups?.height ?? "auto"
                return {
                  type: "image",
                  url,
                  data: {
                    hProperties: {
                      width,
                      height,
                      alt,
                    },
                  },
                }
              } else if ([".mp4", ".webm", ".ogv", ".mov", ".mkv"].includes(ext)) {
                return {
                  type: "html",
                  value: `<video src="${url}" controls></video>`,
                }
              } else if ([".mp3", ".webm", ".wav", ".m4a", ".ogg", ".3gp", ".flac"].includes(ext)) {
                return {
                  type: "html",
                  value: `<audio src="${url}" controls></audio>`,
                }
              } else if ([".pdf"].includes(ext)) {
                return {
                  type: "html",
                  value: `<iframe src="${url}" class="pdf"></iframe>`,
                }
              } else {
                const block = anchor
                return {
                  type: "html",
                  data: { hProperties: { transclude: true } },
                  value: `<blockquote class="transclude" data-url="${url}" data-block="${block}" data-embed-alias="${alias}"><a href="${
                    url + anchor
                  }" class="transclude-inner">Transclude of ${url}${block}</a></blockquote>`,
                }
              }

              // otherwise, fall through to regular link
            }

            // internal link
            const url = fp + anchor
            return {
              type: "link",
              url,
              children: [
                {
                  type: "text",
                  value: alias ?? fp,
                },
              ],
            }
          },
        ])
        mdastFindReplace(tree, replacements)
      }
      return plug
    },
    htmlPlugins() {
      const plug: Pluggable = () => {}
      return plug
    },
    externalResources() {
      const js = {} as JSResource
      return js
    },
  }
}
