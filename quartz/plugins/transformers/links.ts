import { QuartzTransformerPlugin } from "../types"
import { relativeToRoot, slugify, trimPathSuffix } from "../../path"
import path from "path"
import { visit } from 'unist-util-visit'
import isAbsoluteUrl from "is-absolute-url"

interface Options {
  /** How to resolve Markdown paths */
  markdownLinkResolution: 'absolute' | 'relative'
  /** Strips folders from a link so that it looks nice */
  prettyLinks: boolean
  indexAnchorLinks: boolean
  indexExternalLinks: boolean
}

const defaultOptions: Options = {
  markdownLinkResolution: 'absolute',
  prettyLinks: true,
  indexAnchorLinks: false,
  indexExternalLinks: false,
}

export const CrawlLinks: QuartzTransformerPlugin<Partial<Options> | undefined> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "LinkProcessing",
    htmlPlugins() {
      return [() => {
        return (tree, file) => {
          const curSlug = file.data.slug!
          const transformLink = (target: string) => {
            const targetSlug = slugify(decodeURI(target).trim())
            if (opts.markdownLinkResolution === 'relative' && !path.isAbsolute(targetSlug)) {
              // TODO
              // return './' + relative(curSlug, targetSlug)
            } else {
              return './' + relativeToRoot(curSlug, targetSlug)
            }
          }

          const outgoing: Set<string> = new Set()
          visit(tree, 'element', (node, _index, _parent) => {
            // rewrite all links
            if (
              node.tagName === 'a' &&
              node.properties &&
              typeof node.properties.href === 'string'
            ) {
              let dest = node.properties.href
              node.properties.className = isAbsoluteUrl(dest) ? "external" : "internal"


              // don't process external links or intra-document anchors
              if (!(isAbsoluteUrl(dest) || dest.startsWith("#"))) {
                node.properties.href = transformLink(dest)
              }
              
              dest = node.properties.href
              if (dest.startsWith(".")) {
                const normalizedPath = path.normalize(path.join(curSlug, dest))
                outgoing.add(trimPathSuffix(normalizedPath))
              } else if (dest.startsWith("#")) {
                if (opts.indexAnchorLinks) {
                  outgoing.add(dest)
                }
              } else {
                if (opts.indexExternalLinks) {
                  outgoing.add(dest)
                }
              }

              // rewrite link internals if prettylinks is on
              if (opts.prettyLinks && node.children.length === 1 && node.children[0].type === 'text') {
                node.children[0].value = path.basename(node.children[0].value)
              }
            }

            // transform all other resources that may use links
            if (
              ["img", "video", "audio", "iframe"].includes(node.tagName) &&
              node.properties &&
              typeof node.properties.src === 'string'
            ) {
              if (!isAbsoluteUrl(node.properties.src)) {
                const ext = path.extname(node.properties.src)
                node.properties.src = transformLink(path.join("assets", node.properties.src)) + ext
              }
            }
          })

          file.data.links = [...outgoing]
        }
      }]
    }
  }
}

declare module 'vfile' {
  interface DataMap {
    links: string[]
  }
}
