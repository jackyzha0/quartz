import { QuartzTransformerPlugin } from "../types"
import { visit } from "unist-util-visit"
import { Root } from "hast"

// Options supported here should be in sync with what GLightbox supports:
// https://github.com/biati-digital/glightbox
interface Options {
  /** Name of the effect on lightbox open. */
  openEffect: "zoom" | "fade" | "none"
  /** Name of the effect on lightbox close. */
  closeEffect: "zoom" | "fade" | "none"
  /** Name of the effect on slide change. */
  slideEffect: "slide" | "zoom" | "fade" | "none"
  /** Show or hide the close button. */
  closeButton: boolean
}

const defaultOptions: Options = {
  openEffect: "zoom",
  closeEffect: "zoom",
  slideEffect: "slide",
  closeButton: true,
}

export const Lightbox: QuartzTransformerPlugin<Partial<Options>> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "Lightbox",
    htmlPlugins(ctx) {
      return [
        () => {
          return (tree: Root, file) => {
            visit(tree, "element", (node, _index, _parent) => {
              if (
                node.tagName === "img" &&
                node.properties &&
                typeof node.properties.src === "string"
              ) {
                // Add Image Lightbox support
                const classes = (node.properties.className ?? []) as string[]
                classes.push("glightbox")

                node.properties.className = classes
              }
            })
          }
        },
      ]
    },
    externalResources() {
      return {
        css: ["https://cdnjs.cloudflare.com/ajax/libs/glightbox/3.3.0/css/glightbox.min.css"],
        js: [
          {
            src: "https://cdnjs.cloudflare.com/ajax/libs/glightbox/3.3.0/js/glightbox.min.js",
            loadTime: "afterDOMReady",
            contentType: "external",
          },
          {
            contentType: "inline",
            loadTime: "afterDOMReady",
            // GLightbox needs to be reloaded whenever there's a page content change
            // to make sure it loads all the images in the new page content.
            // Ref: https://quartz.jzhao.xyz/advanced/creating-components#scripts-and-interactivity
            script: `
document.addEventListener("nav", () => {
  const lightbox = GLightbox(${JSON.stringify(opts)});
});
`.trim(),
          },
        ],
      }
    },
  }
}
