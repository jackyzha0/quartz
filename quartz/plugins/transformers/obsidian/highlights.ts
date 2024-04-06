import { ReplaceFunction } from "mdast-util-find-and-replace"

const highlightRegex = /==([^=]+)==/g

export const highlightRegexReplacement: [RegExp, string | ReplaceFunction] = [
  highlightRegex,
  (_value: string, ...capture: string[]) => {
    const [inner] = capture
    return {
      type: "html",
      value: `<span class="text-highlight">${inner}</span>`,
    }
  },
]
