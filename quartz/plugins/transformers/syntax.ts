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

export const SyntaxHighlighting: QuartzTransformerPlugin<Options> = (opts?: Partial<Options>) => {
  const { theme = defaultOptions.theme || {}, keepBackground } = { ...defaultOptions, ...opts }
  const { light = defaultOptions.theme?.light, dark = defaultOptions.theme?.dark } = theme

  return {
    name: "SyntaxHighlighting",
    htmlPlugins() {
      return [
        [
          rehypePrettyCode,
          {
            theme: { light, dark },
            keepBackground,
          } as Partial<CodeOptions>,
        ],
      ]
    },
  }
}
