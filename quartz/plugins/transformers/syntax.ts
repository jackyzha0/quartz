import { QuartzTransformerPlugin } from "../types"
import rehypePrettyCode, { Options as CodeOptions } from "rehype-pretty-code"
import { BuiltinTheme } from "shikiji"

interface Theme {
  light?: BuiltinTheme
  dark?: BuiltinTheme
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

export const SyntaxHighlighting: QuartzTransformerPlugin<Options> = (userOpts?: Partial<Options>) => {
  const opts = { ...defaultOptions, ...userOpts }

  return {
    name: "SyntaxHighlighting",
    htmlPlugins() {
      return [
        [
          rehypePrettyCode,
					opts as Partial<CodeOptions>,
        ],
      ]
    },
  }
}
