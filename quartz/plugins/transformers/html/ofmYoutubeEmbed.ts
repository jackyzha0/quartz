import { HtmlTransformerPlugin } from "../../types"
import { Element, Root as HtmlRoot } from "hast"
import rehypeRaw from "rehype-raw"
import { visit } from "unist-util-visit"
import { PluggableList } from "unified"

const ytLinkRegex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
const ytPlaylistLinkRegex = /[?&]list=([^#?&]*)/

export const ObsidianFlavoredMarkdownYouTubeEmbed: HtmlTransformerPlugin = () => {
  return {
    name: "ObsidianFlavoredMarkdownYouTubeEmbed",
    transformation() {
      const plugins: PluggableList = [rehypeRaw]

      plugins.push(() => {
        return (tree: HtmlRoot) => {
          visit(tree, "element", (node) => {
            if (node.tagName === "img" && typeof node.properties.src === "string") {
              const match = node.properties.src.match(ytLinkRegex)
              const videoId = match && match[2].length == 11 ? match[2] : null
              const playlistId = node.properties.src.match(ytPlaylistLinkRegex)?.[1]
              if (videoId) {
                // YouTube video (with optional playlist)
                node.tagName = "iframe"
                node.properties = {
                  class: "external-embed youtube",
                  allow: "fullscreen",
                  frameborder: 0,
                  width: "600px",
                  src: playlistId
                    ? `https://www.youtube.com/embed/${videoId}?list=${playlistId}`
                    : `https://www.youtube.com/embed/${videoId}`,
                }
              } else if (playlistId) {
                // YouTube playlist only.
                node.tagName = "iframe"
                node.properties = {
                  class: "external-embed youtube",
                  allow: "fullscreen",
                  frameborder: 0,
                  width: "600px",
                  src: `https://www.youtube.com/embed/videoseries?list=${playlistId}`,
                }
              }
            }
          })
        }
      })

      return plugins
    },
  }
}
