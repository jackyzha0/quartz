import { Root, Html, BlockContent, DefinitionContent, Paragraph, Code } from "mdast"
import { visit } from "unist-util-visit"
import { capitalize } from "../../../util/lang"
import { VFile } from "vfile"
import { PhrasingContent } from "mdast-util-find-and-replace/lib/index.js"
import { toHast } from "mdast-util-to-hast"
import { toHtml } from "hast-util-to-html"
// @ts-ignore
import calloutScript from "../../../components/scripts/callout.inline"
import { JSResource } from "../../../util/resources"

const calloutLineRegex = /^> *\[\!\w+\][+-]?.*$/gm

// from https://github.com/escwxyz/remark-obsidian-callout/blob/main/src/index.ts
const calloutRegex = /^\[\!(\w+)\]([+-]?)/

// pre-transform blockquotes
export const calloutTextTransform = (src: string | Buffer) => {
  if (src instanceof Buffer) {
    src = src.toString()
  }

  src = src.replace(calloutLineRegex, (value) => {
    // force newline after title of callout
    return value + "\n> "
  })
}

const calloutMapping = {
  note: "note",
  abstract: "abstract",
  summary: "abstract",
  tldr: "abstract",
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
} as const

function canonicalizeCallout(calloutName: string): keyof typeof calloutMapping {
  const normalizedCallout = calloutName.toLowerCase() as keyof typeof calloutMapping
  // if callout is not recognized, make it a custom one
  return calloutMapping[normalizedCallout] ?? calloutName
}

export const calloutPlugin = () => {
  const mdastToHtml = (ast: PhrasingContent | Paragraph) => {
    const hast = toHast(ast, { allowDangerousHtml: true })!
    return toHtml(hast, { allowDangerousHtml: true })
  }

  return (tree: Root, _file: VFile) => {
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
        const titleContent = match.input.slice(calloutDirective.length).trim()
        const useDefaultTitle = titleContent === "" && restOfTitle.length === 0
        const titleNode: Paragraph = {
          type: "paragraph",
          children: [
            {
              type: "text",
              value: useDefaultTitle ? capitalize(typeString) : titleContent + " ",
            },
            ...restOfTitle,
          ],
        }
        const title = mdastToHtml(titleNode)

        const toggleIcon = `<div class="fold-callout-icon"></div>`

        const titleHtml: Html = {
          type: "html",
          value: `<div
          class="callout-title"
        >
          <div class="callout-icon"></div>
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

        const classNames = ["callout", calloutType]
        if (collapse) {
          classNames.push("is-collapsible")
        }
        if (defaultState === "collapsed") {
          classNames.push("is-collapsed")
        }

        // add properties to base blockquote
        node.data = {
          hProperties: {
            ...(node.data?.hProperties ?? {}),
            className: classNames.join(" "),
            "data-callout": calloutType,
            "data-callout-fold": collapse,
          },
        }
      }
    })
  }
}

export const calloutResources = (js: JSResource[]) => {
  js.push({
    script: calloutScript,
    loadTime: "afterDOMReady",
    contentType: "inline",
  })
}
