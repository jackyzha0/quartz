import path from "path"
import { slug as slugAnchor } from "github-slugger"
import { ReplaceFunction } from "mdast-util-find-and-replace"
import { FilePath, slugifyFilePath } from "../../../util/path"
export const externalLinkRegex = /^https?:\/\//i

// !?                -> optional embedding
// \[\[              -> open brace
// ([^\[\]\|\#]+)    -> one or more non-special characters ([,],|, or #) (name)
// (#[^\[\]\|\#]+)?  -> # then one or more non-special characters (heading link)
// (\|[^\[\]\#]+)?   -> | then one or more non-special characters (alias)
export const wikilinkRegex = /!?\[\[([^\[\]\|\#]+)?(#+[^\[\]\|\#]+)?(\|[^\[\]\#]+)?\]\]/g

const wikilinkImageEmbedRegex = /^(?<alt>(?!^\d*x?\d*$).*?)?(\|?\s*?(?<width>\d+)(x(?<height>\d+))?)?$/

// pre-transform wikilinks (fix anchors to things that may contain illegal syntax e.g. codeblocks, latex)
export const wikilinkTextTransform = (src: string | Buffer) => {
  if (src instanceof Buffer) {
    src = src.toString()
  }

  src = src.replace(wikilinkRegex, (value, ...capture) => {
    const [rawFp, rawHeader, rawAlias]: (string | undefined)[] = capture

    const fp = rawFp ?? ""
    const anchor = rawHeader?.trim().replace(/^#+/, "")
    const blockRef = Boolean(anchor?.startsWith("^")) ? "^" : ""
    const displayAnchor = anchor ? `#${blockRef}${slugAnchor(anchor)}` : ""
    const displayAlias = rawAlias ?? rawHeader?.replace("#", "|") ?? ""
    const embedDisplay = value.startsWith("!") ? "!" : ""

    if (rawFp?.match(externalLinkRegex)) {
      return `${embedDisplay}[${displayAlias.replace(/^\|/, "")}](${rawFp})`
    }

    return `${embedDisplay}[[${fp}${displayAnchor}${displayAlias}]]`
  })
}

export const wikilinkRegexReplacment: [RegExp, string | ReplaceFunction] = [
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
          value: `<iframe src="${url}"></iframe>`,
        }
      } else {
        const block = anchor
        return {
          type: "html",
          data: { hProperties: { transclude: true } },
          value: `<blockquote class="transclude" data-url="${url}" data-block="${block}"><a href="${
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
]
