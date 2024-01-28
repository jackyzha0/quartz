import { QuartzTransformerPlugin } from "../types"
import { Root, Html, BlockContent, DefinitionContent, Paragraph, Code } from "mdast"
import { Element, Literal, Root as HtmlRoot } from "hast"
import { ReplaceFunction, findAndReplace as mdastFindReplace } from "mdast-util-find-and-replace"
import { slug as slugAnchor } from "github-slugger"
import rehypeRaw from "rehype-raw"
import { SKIP, visit } from "unist-util-visit"
import path from "path"
import { JSResource } from "../../util/resources"
// @ts-ignore
import calloutScript from "../../components/scripts/callout.inline.ts"
import { FilePath, pathToRoot, slugTag, slugifyFilePath } from "../../util/path"
import { toHast } from "mdast-util-to-hast"
import { toHtml } from "hast-util-to-html"
import { PhrasingContent } from "mdast-util-find-and-replace/lib"
import { capitalize } from "../../util/lang"
import { PluggableList } from "unified"

export interface Options {
  comments: boolean
  highlight: boolean
  wikilinks: boolean
  callouts: boolean
  mermaid: boolean
  parseTags: boolean
  parseArrows: boolean
  parseBlockReferences: boolean
  enableInHtmlEmbed: boolean
  enableYouTubeEmbed: boolean
  enableVideoEmbed: boolean
}

const defaultOptions: Options = {
  comments: true,
  highlight: true,
  wikilinks: true,
  callouts: true,
  mermaid: true,
  parseTags: true,
  parseArrows: true,
  parseBlockReferences: true,
  enableInHtmlEmbed: false,
  enableYouTubeEmbed: true,
  enableVideoEmbed: true,
}

enum callouts {
  note = "note",
  abstract = "abstract",
  summary = "abstract",
  tldr = "abstract",
  info = "info",
  todo = "todo",
  tip = "tip",
  hint = "tip",
  important = "tip",
  success = "success",
  check = "success",
  done = "success",
  question = "question",
  help = "question",
  faq = "question",
  warning = "warning",
  attention = "warning",
  caution = "warning",
  failure = "failure",
  missing = "failure",
  fail = "failure",
  danger = "danger",
  error = "danger",
  bug = "bug",
  example = "example",
  quote = "quote",
  cite = "quote",
}

function canonicalizeCallout(calloutName: string): string {
  const normalizedCalloutName = calloutName.toLowerCase()
  if (normalizedCalloutName in callouts) {
    return (callouts as Record<string, string>)[normalizedCalloutName]
  }
  // if callout is not recognized, make it a custom one
  return calloutName
}

export const externalLinkRegex = /^https?:\/\//i

export const arrowRegex = new RegExp(/-{1,2}>/, "g")

// !?                -> optional embedding
// \[\[              -> open brace
// ([^\[\]\|\#]+)    -> one or more non-special characters ([,],|, or #) (name)
// (#[^\[\]\|\#]+)?  -> # then one or more non-special characters (heading link)
// (\|[^\[\]\#]+)? -> | then one or more non-special characters (alias)
export const wikilinkRegex = new RegExp(
  /!?\[\[([^\[\]\|\#]+)?(#+[^\[\]\|\#]+)?(\|[^\[\]\#]+)?\]\]/,
  "g",
)
const highlightRegex = new RegExp(/==([^=]+)==/, "g")
const commentRegex = new RegExp(/%%[\s\S]*?%%/, "g")
// from https://github.com/escwxyz/remark-obsidian-callout/blob/main/src/index.ts
const calloutRegex = new RegExp(/^\[\!(\w+)\]([+-]?)/)
const calloutLineRegex = new RegExp(/^> *\[\!\w+\][+-]?.*$/, "gm")
// (?:^| )              -> non-capturing group, tag should start be separated by a space or be the start of the line
// #(...)               -> capturing group, tag itself must start with #
// (?:[-_\p{L}\d\p{Z}])+       -> non-capturing group, non-empty string of (Unicode-aware) alpha-numeric characters and symbols, hyphens and/or underscores
// (?:\/[-_\p{L}\d\p{Z}]+)*)   -> non-capturing group, matches an arbitrary number of tag strings separated by "/"
const tagRegex = new RegExp(/(?:^| )#((?:[-_\p{L}\p{Emoji}\d])+(?:\/[-_\p{L}\p{Emoji}\d]+)*)/, "gu")
const blockReferenceRegex = new RegExp(/\^([-_A-Za-z0-9]+)$/, "g")
const ytLinkRegex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
const videoExtensionRegex = new RegExp(/\.(mp4|webm|ogg|avi|mov|flv|wmv|mkv|mpg|mpeg|3gp|m4v)$/)

export const ObsidianFlavoredMarkdown: QuartzTransformerPlugin<Partial<Options> | undefined> = (
  userOpts,
) => {
  const opts = { ...defaultOptions, ...userOpts }

  const mdastToHtml = (ast: PhrasingContent | Paragraph) => {
    const hast = toHast(ast, { allowDangerousHtml: true })!
    return toHtml(hast, { allowDangerousHtml: true })
  }

  return {
    name: "ObsidianFlavoredMarkdown",
    textTransform(_ctx, src) {
      // do comments at text level
      if (opts.comments) {
        if (src instanceof Buffer) {
          src = src.toString()
        }

        src = src.replace(commentRegex, "")
      }

      // pre-transform blockquotes
      if (opts.callouts) {
        if (src instanceof Buffer) {
          src = src.toString()
        }

        src = src.replace(calloutLineRegex, (value) => {
          // force newline after title of callout
          return value + "\n> "
        })
      }

      // pre-transform wikilinks (fix anchors to things that may contain illegal syntax e.g. codeblocks, latex)
      if (opts.wikilinks) {
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

      return src
    },
    markdownPlugins() {
      const plugins: PluggableList = []

      // regex replacements
      plugins.push(() => {
        return (tree: Root, file) => {
          const replacements: [RegExp, string | ReplaceFunction][] = []
          const base = pathToRoot(file.data.slug!)

          if (opts.wikilinks) {
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
                    // either |alt|dims or |dims
                    let [alt, dims] = (alias ?? "").split("|")

                    // |dims case, treat first alt slot as dims
                    if (dims === undefined) {
                      dims = alt
                      alt = ""
                    }

                    let [width, height] = dims.split("x", 2)
                    width ||= "auto"
                    height ||= "auto"
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
            ])
          }

          if (opts.highlight) {
            replacements.push([
              highlightRegex,
              (_value: string, ...capture: string[]) => {
                const [inner] = capture
                return {
                  type: "html",
                  value: `<span class="text-highlight">${inner}</span>`,
                }
              },
            ])
          }

          if (opts.parseArrows) {
            replacements.push([
              arrowRegex,
              (_value: string, ..._capture: string[]) => {
                return {
                  type: "html",
                  value: `<span>&rarr;</span>`,
                }
              },
            ])
          }

          if (opts.parseTags) {
            replacements.push([
              tagRegex,
              (_value: string, tag: string) => {
                // Check if the tag only includes numbers
                if (/^\d+$/.test(tag)) {
                  return false
                }

                tag = slugTag(tag)
                if (file.data.frontmatter?.tags?.includes(tag)) {
                  file.data.frontmatter.tags.push(tag)
                }

                return {
                  type: "link",
                  url: base + `/tags/${tag}`,
                  data: {
                    hProperties: {
                      className: ["tag-link"],
                    },
                  },
                  children: [
                    {
                      type: "text",
                      value: `#${tag}`,
                    },
                  ],
                }
              },
            ])
          }

          if (opts.enableInHtmlEmbed) {
            visit(tree, "html", (node: Html) => {
              for (const [regex, replace] of replacements) {
                if (typeof replace === "string") {
                  node.value = node.value.replace(regex, replace)
                } else {
                  node.value = node.value.replace(regex, (substring: string, ...args) => {
                    const replaceValue = replace(substring, ...args)
                    if (typeof replaceValue === "string") {
                      return replaceValue
                    } else if (Array.isArray(replaceValue)) {
                      return replaceValue.map(mdastToHtml).join("")
                    } else if (typeof replaceValue === "object" && replaceValue !== null) {
                      return mdastToHtml(replaceValue)
                    } else {
                      return substring
                    }
                  })
                }
              }
            })
          }
          mdastFindReplace(tree, replacements)
        }
      })

      if (opts.enableVideoEmbed) {
        plugins.push(() => {
          return (tree: Root, _file) => {
            visit(tree, "image", (node, index, parent) => {
              if (parent && index != undefined && videoExtensionRegex.test(node.url)) {
                const newNode: Html = {
                  type: "html",
                  value: `<video controls src="${node.url}"></video>`,
                }

                parent.children.splice(index, 1, newNode)
                return SKIP
              }
            })
          }
        })
      }

      if (opts.callouts) {
        plugins.push(() => {
          return (tree: Root, _file) => {
            visit(tree, "blockquote", (node) => {
              if (node.children.length === 0) {
                return
              }

              // find first line
              const firstChild = node.children[0]
              if (firstChild.type !== "paragraph" || firstChild.children[0]?.type !== "text") {
                return
              }

              const text = firstChild.children[0].value
              const restOfTitle = firstChild.children.slice(1)
              const [firstLine, ...remainingLines] = text.split("\n")
              const remainingText = remainingLines.join("\n")

              const match = firstLine.match(calloutRegex)
              if (match && match.input) {
                const [calloutDirective, typeString, collapseChar] = match
                const calloutType = canonicalizeCallout(typeString.toLowerCase())
                const collapse = collapseChar === "+" || collapseChar === "-"
                const defaultState = collapseChar === "-" ? "collapsed" : "expanded"
                const titleContent =
                  match.input.slice(calloutDirective.length).trim() || capitalize(calloutType)
                const titleNode: Paragraph = {
                  type: "paragraph",
                  children:
                    restOfTitle.length === 0
                      ? [{ type: "text", value: titleContent + " " }]
                      : restOfTitle,
                }
                const title = mdastToHtml(titleNode)

                const toggleIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="fold">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>`

                const titleHtml: Html = {
                  type: "html",
                  value: `<div
                  class="callout-title"
                >
                  <div class="callout-icon">${callouts[calloutType] ?? callouts.note}</div>
                  <div class="callout-title-inner">${title}</div>
                  ${collapse ? toggleIcon : ""}
                </div>`,
                }

                const blockquoteContent: (BlockContent | DefinitionContent)[] = [titleHtml]
                if (remainingText.length > 0) {
                  blockquoteContent.push({
                    type: "paragraph",
                    children: [
                      {
                        type: "text",
                        value: remainingText,
                      },
                    ],
                  })
                }

                // replace first line of blockquote with title and rest of the paragraph text
                node.children.splice(0, 1, ...blockquoteContent)

                // add properties to base blockquote
                node.data = {
                  hProperties: {
                    ...(node.data?.hProperties ?? {}),
                    className: `callout ${calloutType} ${collapse ? "is-collapsible" : ""} ${
                      defaultState === "collapsed" ? "is-collapsed" : ""
                    }`,
                    "data-callout": calloutType,
                    "data-callout-fold": collapse,
                  },
                }
              }
            })
          }
        })
      }

      if (opts.mermaid) {
        plugins.push(() => {
          return (tree: Root, _file) => {
            visit(tree, "code", (node: Code) => {
              if (node.lang === "mermaid") {
                node.data = {
                  hProperties: {
                    className: ["mermaid"],
                  },
                }
              }
            })
          }
        })
      }

      return plugins
    },
    htmlPlugins() {
      const plugins: PluggableList = [rehypeRaw]

      if (opts.parseBlockReferences) {
        plugins.push(() => {
          const inlineTagTypes = new Set(["p", "li"])
          const blockTagTypes = new Set(["blockquote"])
          return (tree: HtmlRoot, file) => {
            file.data.blocks = {}

            visit(tree, "element", (node, index, parent) => {
              if (blockTagTypes.has(node.tagName)) {
                const nextChild = parent?.children.at(index! + 2) as Element
                if (nextChild && nextChild.tagName === "p") {
                  const text = nextChild.children.at(0) as Literal
                  if (text && text.value && text.type === "text") {
                    const matches = text.value.match(blockReferenceRegex)
                    if (matches && matches.length >= 1) {
                      parent!.children.splice(index! + 2, 1)
                      const block = matches[0].slice(1)

                      if (!Object.keys(file.data.blocks!).includes(block)) {
                        node.properties = {
                          ...node.properties,
                          id: block,
                        }
                        file.data.blocks![block] = node
                      }
                    }
                  }
                }
              } else if (inlineTagTypes.has(node.tagName)) {
                const last = node.children.at(-1) as Literal
                if (last && last.value && typeof last.value === "string") {
                  const matches = last.value.match(blockReferenceRegex)
                  if (matches && matches.length >= 1) {
                    last.value = last.value.slice(0, -matches[0].length)
                    const block = matches[0].slice(1)

                    if (!Object.keys(file.data.blocks!).includes(block)) {
                      node.properties = {
                        ...node.properties,
                        id: block,
                      }
                      file.data.blocks![block] = node
                    }
                  }
                }
              }
            })

            file.data.htmlAst = tree
          }
        })
      }

      if (opts.enableYouTubeEmbed) {
        plugins.push(() => {
          return (tree: HtmlRoot) => {
            visit(tree, "element", (node) => {
              if (node.tagName === "img" && typeof node.properties.src === "string") {
                const match = node.properties.src.match(ytLinkRegex)
                const videoId = match && match[2].length == 11 ? match[2] : null
                if (videoId) {
                  node.tagName = "iframe"
                  node.properties = {
                    class: "external-embed",
                    allow: "fullscreen",
                    frameborder: 0,
                    width: "600px",
                    height: "350px",
                    src: `https://www.youtube.com/embed/${videoId}`,
                  }
                }
              }
            })
          }
        })
      }

      return plugins
    },
    externalResources() {
      const js: JSResource[] = []

      if (opts.callouts) {
        js.push({
          script: calloutScript,
          loadTime: "afterDOMReady",
          contentType: "inline",
        })
      }

      if (opts.mermaid) {
        js.push({
          script: `
          import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.esm.min.mjs';
          const darkMode = document.documentElement.getAttribute('saved-theme') === 'dark'
          mermaid.initialize({
            startOnLoad: false,
            securityLevel: 'loose',
            theme: darkMode ? 'dark' : 'default'
          });
          document.addEventListener('nav', async () => {
            await mermaid.run({
              querySelector: '.mermaid'
            })
          });
          `,
          loadTime: "afterDOMReady",
          moduleType: "module",
          contentType: "inline",
        })
      }

      return { js }
    },
  }
}

declare module "vfile" {
  interface DataMap {
    blocks: Record<string, Element>
    htmlAst: HtmlRoot
  }
}
