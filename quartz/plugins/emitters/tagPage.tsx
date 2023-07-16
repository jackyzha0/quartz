import { QuartzEmitterPlugin } from "../types"
import { QuartzComponentProps } from "../../components/types"
import HeaderConstructor from "../../components/Header"
import BodyConstructor from "../../components/Body"
import { pageResources, renderPage } from "../../components/renderPage"
import { ProcessedContent, defaultProcessedContent } from "../vfile"
import { FullPageLayout } from "../../cfg"
import { CanonicalSlug, FilePath, ServerSlug } from "../../path"

export const TagPage: QuartzEmitterPlugin<FullPageLayout> = (opts) => {
  if (!opts) {
    throw new Error("TagPage must be initialized with options specifiying the components to use")
  }

  const { head: Head, header, beforeBody, pageBody: Content, left, right, footer: Footer } = opts
  const Header = HeaderConstructor()
  const Body = BodyConstructor()

  return {
    name: "TagPage",
    getQuartzComponents() {
      return [Head, Header, Body, ...header, ...beforeBody, Content, ...left, ...right, Footer]
    },
    async emit(_contentDir, cfg, content, resources, emit): Promise<FilePath[]> {
      const fps: FilePath[] = []
      const allFiles = content.map(c => c[1].data)

      const tags: Set<string> = new Set(allFiles.flatMap(data => data.frontmatter?.tags ?? []))
      const tagDescriptions: Record<string, ProcessedContent> = Object.fromEntries([...tags].map(tag => ([
        tag, defaultProcessedContent({ slug: `tags/${tag}` as ServerSlug, frontmatter: { title: `Tag: ${tag}`, tags: [] } })
      ])))

      for (const [tree, file] of content) {
        const slug = file.data.slug!
        if (slug.startsWith("tags/")) {
          const tag = slug.slice("tags/".length)
          if (tags.has(tag)) {
            tagDescriptions[tag] = [tree, file]
          }
        }
      }

      for (const tag of tags) {
        const slug = `tags/${tag}` as CanonicalSlug
        const externalResources = pageResources(slug, resources)
        const [tree, file] = tagDescriptions[tag]
        const componentData: QuartzComponentProps = {
          fileData: file.data,
          externalResources,
          cfg,
          children: [],
          tree,
          allFiles
        }

        const content = renderPage(
          slug,
          componentData,
          opts,
          externalResources
        )

        const fp = file.data.slug + ".html" as FilePath
        await emit({
          content,
          slug: file.data.slug!,
          ext: ".html",
        })

        fps.push(fp)
      }
      return fps
    }
  }
}
