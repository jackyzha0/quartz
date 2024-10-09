import { MarkdownTransformerPlugin } from "../../types"
import { PluggableList } from "unified"
import { visit } from "unist-util-visit"
import { ReplaceFunction, findAndReplace as mdastFindReplace } from "mdast-util-find-and-replace"
import { Root, Html, Paragraph, Text, Link, Parent } from "mdast"
import { VFile } from "vfile"
import { BuildVisitor } from "unist-util-visit"

export interface Options {
  videoComponent: boolean
  audioComponent: boolean
  pdfComponent: boolean
}

const defaultOptions: Options = {
  videoComponent: true,
  audioComponent: true,
  pdfComponent: true,
}

function isSpecialEmbed(node: Paragraph): boolean {
  if (node.children.length !== 2) return false

  const [textNode, linkNode] = node.children
  return (
    textNode.type === "text" &&
    textNode.value.startsWith("{{[[") &&
    linkNode.type === "link" &&
    linkNode.children[0].type === "text" &&
    linkNode.children[0].value.endsWith("}}")
  )
}

function transformSpecialEmbed(node: Paragraph, opts: Options): Html | null {
  const [textNode, linkNode] = node.children as [Text, Link]
  const embedType = textNode.value.match(/\{\{\[\[(.*?)\]\]:/)?.[1]?.toLowerCase()
  const url = linkNode.url.slice(0, -2) // Remove the trailing '}}'

  switch (embedType) {
    case "audio":
      return opts.audioComponent
        ? {
            type: "html",
            value: `<audio controls>
          <source src="${url}" type="audio/mpeg">
          <source src="${url}" type="audio/ogg">
          Your browser does not support the audio tag.
        </audio>`,
          }
        : null
    case "video":
      if (!opts.videoComponent) return null
      // Check if it's a YouTube video
      const youtubeMatch = url.match(
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/,
      )
      if (youtubeMatch) {
        const videoId = youtubeMatch[1].split("&")[0] // Remove additional parameters
        const playlistMatch = url.match(/[?&]list=([^#\&\?]*)/)
        const playlistId = playlistMatch ? playlistMatch[1] : null

        return {
          type: "html",
          value: `<iframe
            class="external-embed youtube"
            width="600px"
            height="350px"
            src="https://www.youtube.com/embed/${videoId}${playlistId ? `?list=${playlistId}` : ""}"
            frameborder="0"
            allow="fullscreen"
          ></iframe>`,
        }
      } else {
        return {
          type: "html",
          value: `<video controls>
            <source src="${url}" type="video/mp4">
            <source src="${url}" type="video/webm">
            Your browser does not support the video tag.
          </video>`,
        }
      }
    case "pdf":
      return opts.pdfComponent
        ? {
            type: "html",
            value: `<embed src="${url}" type="application/pdf" width="100%" height="600px" />`,
          }
        : null
    default:
      return null
  }
}

export const RoamFlavoredMarkdownSpecialEmbeds: MarkdownTransformerPlugin<Partial<Options>> = (
  userOpts,
) => {
  const opts = { ...defaultOptions, ...userOpts }

  return {
    name: "RoamFlavoredMarkdownSpecialEmbeds",
    transformation() {
      const plugins: PluggableList = []

      plugins.push(() => {
        return (tree: Root, _file: VFile) => {
          const replacements: [RegExp, ReplaceFunction][] = []

          // Handle special embeds (audio, video, PDF)
          if (opts.audioComponent || opts.videoComponent || opts.pdfComponent) {
            visit(tree, "paragraph", ((node: Paragraph, index: number, parent: Parent | null) => {
              if (isSpecialEmbed(node)) {
                const transformedNode = transformSpecialEmbed(node, opts)
                if (transformedNode && parent) {
                  parent.children[index] = transformedNode
                }
              }
            }) as BuildVisitor<Root, "paragraph">)
          }

          mdastFindReplace(tree, replacements)
        }
      })

      return plugins
    },
  }
}
