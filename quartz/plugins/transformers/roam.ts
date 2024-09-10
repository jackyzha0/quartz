import { QuartzTransformerPlugin } from "../types"
import { PluggableList } from "unified"
import { SKIP, visit } from "unist-util-visit"
import { ReplaceFunction, findAndReplace as mdastFindReplace } from "mdast-util-find-and-replace"
import { Root, Html, Paragraph, Text, Link, Parent } from "mdast"
import { Node } from "unist"
import { VFile } from "vfile"
import { BuildVisitor } from "unist-util-visit"

export interface Options {
  orComponent: boolean
  TODOComponent: boolean
  DONEComponent: boolean
  videoComponent: boolean
  audioComponent: boolean
  pdfComponent: boolean
  blockquoteComponent: boolean
  tableComponent: boolean
  attributeComponent: boolean
}

const defaultOptions: Options = {
  orComponent: true,
  TODOComponent: true,
  DONEComponent: true,
  videoComponent: true,
  audioComponent: true,
  pdfComponent: true,
  blockquoteComponent: true,
  tableComponent: true,
  attributeComponent: true,
}

const orRegex = new RegExp(/{{or:(.*?)}}/, "g")
const TODORegex = new RegExp(/{{.*?\bTODO\b.*?}}/, "g")
const DONERegex = new RegExp(/{{.*?\bDONE\b.*?}}/, "g")
const videoRegex = new RegExp(/{{.*?\[\[video\]\].*?\:(.*?)}}/, "g")
const youtubeRegex = new RegExp(
  /{{.*?\[\[video\]\].*?(https?:\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?[\w\?=]*)?)}}/,
  "g",
)

// const multimediaRegex = new RegExp(/{{.*?\b(video|audio)\b.*?\:(.*?)}}/, "g")

const audioRegex = new RegExp(/{{.*?\[\[audio\]\].*?\:(.*?)}}/, "g")
const pdfRegex = new RegExp(/{{.*?\[\[pdf\]\].*?\:(.*?)}}/, "g")
const blockquoteRegex = new RegExp(/(\[\[>\]\])\s*(.*)/, "g")
const roamHighlightRegex = new RegExp(/\^\^(.+)\^\^/, "g")
const roamItalicRegex = new RegExp(/__(.+)__/, "g")
const tableRegex = new RegExp(/- {{.*?\btable\b.*?}}/, "g") /* TODO */
const attributeRegex = new RegExp(/\b\w+(?:\s+\w+)*::/, "g") /* TODO */

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

export const RoamFlavoredMarkdown: QuartzTransformerPlugin<Partial<Options> | undefined> = (
  userOpts,
) => {
  const opts = { ...defaultOptions, ...userOpts }

  return {
    name: "RoamFlavoredMarkdown",
    markdownPlugins() {
      const plugins: PluggableList = []

      plugins.push(() => {
        return (tree: Root, file: VFile) => {
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

          // Roam italic syntax
          replacements.push([
            roamItalicRegex,
            (_value: string, match: string) => ({
              type: "emphasis",
              children: [{ type: "text", value: match }],
            }),
          ])

          // Roam highlight syntax
          replacements.push([
            roamHighlightRegex,
            (_value: string, inner: string) => ({
              type: "html",
              value: `<span class="text-highlight">${inner}</span>`,
            }),
          ])

          if (opts.orComponent) {
            replacements.push([
              orRegex,
              (match: string) => {
                const matchResult = match.match(/{{or:(.*?)}}/)
                if (matchResult === null) {
                  return { type: "html", value: "" }
                }
                const optionsString: string = matchResult[1]
                const options: string[] = optionsString.split("|")
                const selectHtml: string = `<select>${options.map((option: string) => `<option value="${option}">${option}</option>`).join("")}</select>`
                return { type: "html", value: selectHtml }
              },
            ])
          }

          if (opts.TODOComponent) {
            replacements.push([
              TODORegex,
              () => ({
                type: "html",
                value: `<input type="checkbox" disabled>`,
              }),
            ])
          }

          if (opts.DONEComponent) {
            replacements.push([
              DONERegex,
              () => ({
                type: "html",
                value: `<input type="checkbox" checked disabled>`,
              }),
            ])
          }

          if (opts.blockquoteComponent) {
            replacements.push([
              blockquoteRegex,
              (_match: string, _marker: string, content: string) => ({
                type: "html",
                value: `<blockquote>${content.trim()}</blockquote>`,
              }),
            ])
          }

          mdastFindReplace(tree, replacements)
        }
      })

      return plugins
    },
  }
}
