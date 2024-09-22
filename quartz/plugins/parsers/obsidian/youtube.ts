import { QuartzParser } from "../../types"
import { ReplaceFunction, findAndReplace as mdastFindReplace } from "mdast-util-find-and-replace"
import { JSResource } from "../../../util/resources"
import { visit } from "unist-util-visit"
import { Root } from "mdast"
import { Element, Literal, Root as HtmlRoot } from "hast"
import { Pluggable } from "unified"

interface Options {
  enabled: Boolean
}

const defaultOptions: Options = {
  enabled: true,
}

const ytLinkRegex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
const ytPlaylistLinkRegex = /[?&]list=([^#?&]*)/

export const ObsidianYouTube: QuartzParser<Partial<Options>> = (userOpts) => {
  const opts: Options = { ...defaultOptions, ...userOpts }
  return {
    name: "ObsidianYouTube",
    textTransform(_ctx, src: string | Buffer) {
      if (src instanceof Buffer) {
        src = src.toString()
      }
      return src
    },
    markdownPlugins(_file, _tree) {
      return [new RegExp(""), ""] as [RegExp, string | ReplaceFunction]
    },
    htmlPlugins(tree, _file) {
      if (opts.enabled) {
        return () => {
          visit(tree, "element", (node) => {
            if (node.tagName === "img" && typeof node.properties.src === "string") {
              const match = node.properties.src.match(ytLinkRegex)
              const videoId = match && match[2].length == 11 ? match[2] : null
              const playlistId = node.properties.src.match(ytPlaylistLinkRegex)?.[1]
              if (videoId) {
                // YouTube video (with optional playlist)
                node.tagName = "iframe"
                node.properties = {
                  class: "external-embed youtube",
                  allow: "fullscreen",
                  frameborder: 0,
                  width: "600px",
                  src: playlistId
                    ? `https://www.youtube.com/embed/${videoId}?list=${playlistId}`
                    : `https://www.youtube.com/embed/${videoId}`,
                }
              } else if (playlistId) {
                // YouTube playlist only.
                node.tagName = "iframe"
                node.properties = {
                  class: "external-embed youtube",
                  allow: "fullscreen",
                  frameborder: 0,
                  width: "600px",
                  src: `https://www.youtube.com/embed/videoseries?list=${playlistId}`,
                }
              }
            }
          })
        }
      }
      return {} as Pluggable
    },
    externalResources() {
      const js = {} as JSResource
      return js
    },
  }
}
