import { QuartzTransformerPlugin } from "../types"
import { relative, relativeToRoot, slugify } from "../../path"
import path from "path"
import { visit } from 'unist-util-visit'
import isAbsoluteUrl from "is-absolute-url"

interface Options {
  /** How to resolve Markdown paths */
  markdownLinkResolution: 'absolute' | 'relative'
  /** Strips folders from a link so that it looks nice */
  prettyLinks: boolean
}

const defaultOptions: Options = {
  markdownLinkResolution: 'absolute',
  prettyLinks: true
}

export const ResolveLinks: QuartzTransformerPlugin<Partial<Options> | undefined> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "LinkProcessing",
    markdownPlugins() {
      return []
    },
    htmlPlugins() {
      return [() => {
        return (tree, file) => {
          const curSlug = file.data.slug!
          const transformLink = (target: string) => {
            const targetSlug = slugify(decodeURI(target).trim())
            if (opts.markdownLinkResolution === 'relative' && !path.isAbsolute(targetSlug)) {
              return './' + relative(curSlug, targetSlug)
            } else {
              return './' + relativeToRoot(curSlug, targetSlug)
            }
          }

          visit(tree, 'element', (node, _index, _parent) => {
            // rewrite all links
            if (
              node.tagName === 'a' &&
              node.properties &&
              typeof node.properties.href === 'string'
            ) {
              node.properties.className = isAbsoluteUrl(node.properties.href) ? "external" : "internal"

              // don't process external links or intra-document anchors
              if (!(isAbsoluteUrl(node.properties.href) || node.properties.href.startsWith("#"))) {
                node.properties.href = transformLink(node.properties.href)
              }

              // rewrite link internals if prettylinks is on
              if (opts.prettyLinks && node.children.length === 1 && node.children[0].type === 'text') {
                node.children[0].value = path.basename(node.children[0].value)
              }
            }

            // transform all images
            if (
              node.tagName === 'img' &&
              node.properties &&
              typeof node.properties.src === 'string'
            ) {
              if (!isAbsoluteUrl(node.properties.src)) {
                const ext = path.extname(node.properties.src)
                node.properties.src = transformLink(path.join("assets", node.properties.src)) + ext
              }
            }
          })
        }
      }]
    }
  }
}
