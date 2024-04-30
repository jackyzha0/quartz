import { Root } from "mdast"
import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"

interface Options {
  embeds: "twitter"[]
}

export const SocialEmbeds: QuartzTransformerPlugin<Options> = (userOpts?: Options) => {
  const twitterEmbed = userOpts?.embeds?.includes("twitter") ?? false
  return {
    name: "SocialEmbeds",
    markdownPlugins() {
      return [
        () => {
          return (tree: Root) => {
            visit(tree, "image", (node) => {
              if (twitterEmbed && node?.url?.startsWith("https://twitter.com")) {
                const tweetId = getTweetIdFromUrl(node.url)
                if (tweetId) {
                  const twitterHtml = {
                    type: "html",
                    value: `<blockquote class="twitter-tweet"><a href="${node.url}"></a></blockquote>`,
                  }
                  Object.assign(node, twitterHtml)
                }
              }
            })
          }
        },
      ]
    },
    externalResources() {
      return {
        js: [
          twitterEmbed && {
            src: "https://platform.twitter.com/widgets.js",
            loadTime: "beforeDOMReady",
            contentType: "external",
            async: true,
          },
        ].filter(Boolean) as any[],
      }
    },
  }
}

function getTweetIdFromUrl(url: string): string | undefined {
  const match = url.match(/\/status\/(\d+)/)
  return match ? match[1] : undefined
}
