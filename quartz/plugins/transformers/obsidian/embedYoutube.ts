import { Root as HtmlRoot } from "hast"
import { visit } from "unist-util-visit"

const ytLinkRegex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
const ytPlaylistLinkRegex = /[?&]list=([^#?&]*)/

export const embedYoutubePlugin = () => {
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
            class: "external-embed",
            allow: "fullscreen",
            frameborder: 0,
            width: "600px",
            height: "350px",
            src: playlistId
              ? `https://www.youtube.com/embed/${videoId}?list=${playlistId}`
              : `https://www.youtube.com/embed/${videoId}`,
          }
        } else if (playlistId) {
          // YouTube playlist only.
          node.tagName = "iframe"
          node.properties = {
            class: "external-embed",
            allow: "fullscreen",
            frameborder: 0,
            width: "600px",
            height: "350px",
            src: `https://www.youtube.com/embed/videoseries?list=${playlistId}`,
          }
        }
      }
    })
  }
}
