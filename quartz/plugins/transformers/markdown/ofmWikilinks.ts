import { MarkdownTransformerPlugin } from "../../types"
import { Root } from "mdast"
import { ReplaceFunction, findAndReplace as mdastFindReplace } from "mdast-util-find-and-replace"
import path from "path"
import { FilePath, slugifyFilePath } from "../../../util/path"
import { PluggableList } from "unified"

// !?                 -> optional embedding
// \[\[               -> open brace
// ([^\[\]\|\#]+)     -> one or more non-special characters ([,],|, or #) (name)
// (#[^\[\]\|\#]+)?   -> # then one or more non-special characters (heading link)
// (\\?\|[^\[\]\#]+)? -> optional escape \ then | then one or more non-special characters (alias)
export const wikilinkRegex = new RegExp(
  /!?\[\[([^\[\]\|\#\\]+)?(#+[^\[\]\|\#\\]+)?(\\?\|[^\[\]\#]+)?\]\]/g,
)

const wikilinkImageEmbedRegex = new RegExp(
  /^(?<alt>(?!^\d*x?\d*$).*?)?(\|?\s*?(?<width>\d+)(x(?<height>\d+))?)?$/,
)

export const ObsidianFlavoredMarkdownWikilinks: MarkdownTransformerPlugin = () => {
  return {
    name: "ObsidianFlavoredMarkdownWikilinks",
    transformation(_ctx) {
      const plugins: PluggableList = []

      // regex replacements
      plugins.push(() => {
        return (tree: Root, _file) => {
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
                } else if (
                  [".mp3", ".webm", ".wav", ".m4a", ".ogg", ".3gp", ".flac"].includes(ext)
                ) {
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
      })

      return plugins
    },
  }
}
