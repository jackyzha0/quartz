import { ReplaceFunction } from "mdast-util-find-and-replace"
import { SKIP } from "unist-util-visit"

export const arrowRegex = /(-{1,2}>|={1,2}>|<-{1,2}|<={1,2})/g

const arrowMapping: Record<string, string> = {
  "->": "&rarr;",
  "-->": "&rArr;",
  "=>": "&rArr;",
  "==>": "&rArr;",
  "<-": "&larr;",
  "<--": "&lArr;",
  "<=": "&lArr;",
  "<==": "&lArr;",
}

export const arrowRegexReplacement: [RegExp, string | ReplaceFunction] = [
  arrowRegex,
  (value: string, ..._capture: string[]) => {
    const maybeArrow = arrowMapping[value]
    if (maybeArrow === undefined) return SKIP
    return {
      type: "html",
      value: `<span>${maybeArrow}</span>`,
    }
  },
]
