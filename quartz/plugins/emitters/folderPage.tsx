import { QuartzEmitterPlugin } from "../types"
import { QuartzComponentProps } from "../../components/types"
import HeaderConstructor from "../../components/Header"
import BodyConstructor from "../../components/Body"
import { pageResources, renderPage } from "../../components/renderPage"
import { ProcessedContent, defaultProcessedContent } from "../vfile"
import { FullPageLayout } from "../../cfg"
import path from "path"

export const FolderPage: QuartzEmitterPlugin<FullPageLayout> = (opts) => {
  if (!opts) {
    throw new Error("ErrorPage must be initialized with options specifiying the components to use")
  }

  const { head: Head, header, beforeBody, pageBody: Content, left, right, footer: Footer } = opts
  const Header = HeaderConstructor()
  const Body = BodyConstructor()

  return {
    name: "FolderPage",
    getQuartzComponents() {
      return [Head, Header, Body, ...header, ...beforeBody, Content, ...left, ...right, Footer]
    },
    async emit(_contentDir, cfg, content, resources, emit): Promise<string[]> {
      const fps: string[] = []
      const allFiles = content.map(c => c[1].data)

      const folders: Set<string> = new Set(allFiles.flatMap(data => data.slug ? [path.dirname(data.slug)] : []))

      // remove special prefixes
      folders.delete(".")
      folders.delete("tags")

      const folderDescriptions: Record<string, ProcessedContent> = Object.fromEntries([...folders].map(folder => ([
        folder, defaultProcessedContent({ slug: folder, frontmatter: { title: `Folder: ${folder}`, tags: [] } })
      ])))

      for (const [tree, file] of content) {
        const slug = file.data.slug!
        if (folders.has(slug)) {
          folderDescriptions[slug] = [tree, file]
        }
      }

      for (const folder of folders) {
        const slug = folder 
        const externalResources = pageResources(slug, resources)
        const [tree, file] = folderDescriptions[folder]
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

        const fp = file.data.slug + ".html"
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
