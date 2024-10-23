import { HtmlTransformerPlugin, QuartzTransformerPlugin } from "../../types"
import rehypePrettyCode, { Options as CodeOptions, Theme as CodeTheme } from "rehype-pretty-code"

interface Theme extends Record<string, CodeTheme> {
  light: CodeTheme
  dark: CodeTheme
}

interface Options {
  theme?: Theme
  keepBackground?: boolean
}

const defaultOptions: Options = {
  theme: {
    light: "github-light",
    dark: "github-dark",
  },
  keepBackground: false,
}

export const SyntaxHighlighting: HtmlTransformerPlugin<Partial<Options>> = (userOpts) => {
  const opts: CodeOptions = { ...defaultOptions, ...userOpts }

  return {
    name: "SyntaxHighlighting",
    transformation() {
      return [[rehypePrettyCode, opts]]
    },
  }
}
