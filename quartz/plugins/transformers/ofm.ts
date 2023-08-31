import { PluggableList } from "unified"
import { QuartzTransformerPlugin } from "../types"
import { Root, HTML, BlockContent, DefinitionContent, Code, Paragraph } from "mdast"
import { Replace, findAndReplace as mdastFindReplace } from "mdast-util-find-and-replace"
import { slug as slugAnchor } from "github-slugger"
import rehypeRaw from "rehype-raw"
import { visit } from "unist-util-visit"
import path from "path"
import { JSResource } from "../../util/resources"
// @ts-ignore
import calloutScript from "../../components/scripts/callout.inline.ts"
import { FilePath, pathToRoot, slugTag, slugifyFilePath } from "../../util/path"
import { toHast } from "mdast-util-to-hast"
import { toHtml } from "hast-util-to-html"
import { PhrasingContent } from "mdast-util-find-and-replace/lib"

export interface Options {
  comments: boolean
  highlight: boolean
  wikilinks: boolean
  callouts: boolean
  mermaid: boolean
  parseTags: boolean
  enableInHtmlEmbed: boolean
}

const defaultOptions: Options = {
  comments: true,
  highlight: true,
  wikilinks: true,
  callouts: true,
  mermaid: true,
  parseTags: true,
  enableInHtmlEmbed: false,
}

const icons = {
  infoIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`,
  pencilIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="2" x2="22" y2="6"></line><path d="M7.5 20.5 19 9l-4-4L3.5 16.5 2 22z"></path></svg>`,
  clipboardListIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path></svg>`,
  checkCircleIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>`,
  flameIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>`,
  checkIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  helpCircleIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
  alertTriangleIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
  xIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
  zapIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
  bugIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="14" x="8" y="6" rx="4"></rect><path d="m19 7-3 2"></path><path d="m5 7 3 2"></path><path d="m19 19-3-2"></path><path d="m5 19 3-2"></path><path d="M20 13h-4"></path><path d="M4 13h4"></path><path d="m10 4 1 2"></path><path d="m14 4-1 2"></path></svg>`,
  listIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>`,
  quoteIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path></svg>`,
}

const callouts = {
  note: icons.pencilIcon,
  abstract: icons.clipboardListIcon,
  info: icons.infoIcon,
  todo: icons.checkCircleIcon,
  tip: icons.flameIcon,
  success: icons.checkIcon,
  question: icons.helpCircleIcon,
  warning: icons.alertTriangleIcon,
  failure: icons.xIcon,
  danger: icons.zapIcon,
  bug: icons.bugIcon,
  example: icons.listIcon,
  quote: icons.quoteIcon,
}

const calloutMapping: Record<string, keyof typeof callouts> = {
  note: "note",
  abstract: "abstract",
  info: "info",
  todo: "todo",
  tip: "tip",
  hint: "tip",
  important: "tip",
  success: "success",
  check: "success",
  done: "success",
  question: "question",
  help: "question",
  faq: "question",
  warning: "warning",
  attention: "warning",
  caution: "warning",
  failure: "failure",
  missing: "failure",
  fail: "failure",
  danger: "danger",
  error: "danger",
  bug: "bug",
  example: "example",
  quote: "quote",
  cite: "quote",
}

function canonicalizeCallout(calloutName: string): keyof typeof callouts {
  let callout = calloutName.toLowerCase() as keyof typeof calloutMapping
  return calloutMapping[callout] ?? calloutName
}

const capitalize = (s: string): string => {
  return s.substring(0, 1).toUpperCase() + s.substring(1)
}

// !?               -> optional embedding
// \[\[             -> open brace
// ([^\[\]\|\#]+)   -> one or more non-special characters ([,],|, or #) (name)
// (#[^\[\]\|\#]+)? -> # then one or more non-special characters (heading link)
// (|[^\[\]\|\#]+)? -> | then one or more non-special characters (alias)
const wikilinkRegex = new RegExp(/!?\[\[([^\[\]\|\#]+)?(#[^\[\]\|\#]+)?(\|[^\[\]\|\#]+)?\]\]/, "g")
const highlightRegex = new RegExp(/==([^=]+)==/, "g")
const commentRegex = new RegExp(/%%(.+)%%/, "g")
// from https://github.com/escwxyz/remark-obsidian-callout/blob/main/src/index.ts
const calloutRegex = new RegExp(/^\[\!(\w+)\]([+-]?)/)
const calloutLineRegex = new RegExp(/^> *\[\!\w+\][+-]?.*$/, "gm")
// (?:^| )              -> non-capturing group, tag should start be separated by a space or be the start of the line
// #(...)               -> capturing group, tag itself must start with #
// (?:[-_\p{L}])+       -> non-capturing group, non-empty string of (Unicode-aware) alpha-numeric characters, hyphens and/or underscores
// (?:\/[-_\p{L}]+)*)   -> non-capturing group, matches an arbitrary number of tag strings separated by "/"
const tagRegex = new RegExp(/(?:^| )#((?:[-_\p{L}\d])+(?:\/[-_\p{L}\d]+)*)/, "gu")

export const ObsidianFlavoredMarkdown: QuartzTransformerPlugin<Partial<Options> | undefined> = (
  userOpts,
) => {
  const opts = { ...defaultOptions, ...userOpts }

  const mdastToHtml = (ast: PhrasingContent | Paragraph) => {
    const hast = toHast(ast, { allowDangerousHtml: true })!
    return toHtml(hast, { allowDangerousHtml: true })
  }
  const findAndReplace = opts.enableInHtmlEmbed
    ? (tree: Root, regex: RegExp, replace?: Replace | null | undefined) => {
        if (replace) {
          visit(tree, "html", (node: HTML) => {
            if (typeof replace === "string") {
              node.value = node.value.replace(regex, replace)
            } else {
              node.value = node.value.replaceAll(regex, (substring: string, ...args) => {
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
          })
        }

        mdastFindReplace(tree, regex, replace)
      }
    : mdastFindReplace

  return {
    name: "ObsidianFlavoredMarkdown",
    textTransform(_ctx, src) {
      // pre-transform blockquotes
      if (opts.callouts) {
        src = src.toString()
        src = src.replaceAll(calloutLineRegex, (value) => {
          // force newline after title of callout
          return value + "\n> "
        })
      }

      // pre-transform wikilinks (fix anchors to things that may contain illegal syntax e.g. codeblocks, latex)
      if (opts.wikilinks) {
        src = src.toString()
        src = src.replaceAll(wikilinkRegex, (value, ...capture) => {
          const [rawFp, rawHeader, rawAlias] = capture
          const fp = rawFp ?? ""
          const anchor = rawHeader?.trim().slice(1)
          const displayAnchor = anchor ? `#${slugAnchor(anchor)}` : ""
          const displayAlias = rawAlias ?? rawHeader?.replace("#", "|") ?? ""
          const embedDisplay = value.startsWith("!") ? "!" : ""
          return `${embedDisplay}[[${fp}${displayAnchor}${displayAlias}]]`
        })
      }

      return src
    },
    markdownPlugins() {
      const plugins: PluggableList = []
      if (opts.wikilinks) {
        plugins.push(() => {
          return (tree: Root, _file) => {
            findAndReplace(tree, wikilinkRegex, (value: string, ...capture: string[]) => {
              let [rawFp, rawHeader, rawAlias] = capture
              const fp = rawFp?.trim() ?? ""
              const anchor = rawHeader?.trim() ?? ""
              const alias = rawAlias?.slice(1).trim()

              // embed cases
              if (value.startsWith("!")) {
                const ext: string = path.extname(fp).toLowerCase()
                const url = slugifyFilePath(fp as FilePath)
                if ([".png", ".jpg", ".jpeg", ".gif", ".bmp", ".svg"].includes(ext)) {
                  const dims = alias ?? ""
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
                } else if (ext === "") {
                  // TODO: note embed
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
            })
          }
        })
      }

      if (opts.highlight) {
        plugins.push(() => {
          return (tree: Root, _file) => {
            findAndReplace(tree, highlightRegex, (_value: string, ...capture: string[]) => {
              const [inner] = capture
              return {
                type: "html",
                value: `<span class="text-highlight">${inner}</span>`,
              }
            })
          }
        })
      }

      if (opts.comments) {
        plugins.push(() => {
          return (tree: Root, _file) => {
            findAndReplace(tree, commentRegex, (_value: string, ..._capture: string[]) => {
              return {
                type: "text",
                value: "",
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
              const restChildren = firstChild.children.slice(1)
              const [firstLine, ...remainingLines] = text.split("\n")
              const remainingText = remainingLines.join("\n")

              const match = firstLine.match(calloutRegex)
              if (match && match.input) {
                const [calloutDirective, typeString, collapseChar] = match
                const calloutType = canonicalizeCallout(
                  typeString.toLowerCase() as keyof typeof calloutMapping,
                )
                const collapse = collapseChar === "+" || collapseChar === "-"
                const defaultState = collapseChar === "-" ? "collapsed" : "expanded"
                const titleContent =
                  match.input.slice(calloutDirective.length).trim() || capitalize(calloutType)
                const titleNode: Paragraph = {
                  type: "paragraph",
                  children: [{ type: "text", value: titleContent + " " }, ...restChildren],
                }
                const title = mdastToHtml(titleNode)

                const toggleIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="fold">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>`

                const titleHtml: HTML = {
                  type: "html",
                  value: `<div
                  class="callout-title"
                >
                  <div class="callout-icon">${callouts[calloutType]}</div>
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
                    className: `callout ${collapse ? "is-collapsible" : ""} ${
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

      if (opts.parseTags) {
        plugins.push(() => {
          return (tree: Root, file) => {
            const base = pathToRoot(file.data.slug!)
            findAndReplace(tree, tagRegex, (_value: string, tag: string) => {
              tag = slugTag(tag)
              if (file.data.frontmatter && !file.data.frontmatter.tags.includes(tag)) {
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
            })
          }
        })
      }

      return plugins
    },
    htmlPlugins() {
      return [rehypeRaw]
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
