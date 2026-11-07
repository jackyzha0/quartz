import { QuartzEmitterPlugin, QuartzPageTypePluginInstance, TreeTransform } from "../types"
import { QuartzComponent, QuartzComponentProps } from "../../components/types"
import { pageResources, renderPage } from "../../components/renderPage"
import { FullPageLayout } from "../../cfg"
import { FilePath, FullSlug, joinSegments, pathToRoot, slugifyFilePath } from "../../util/path"
import { ProcessedContent, defaultProcessedContent } from "../vfile"
import { write } from "../emitters/helpers"
import { BuildCtx, trieFromAllFiles } from "../../util/ctx"
import { StaticResources } from "../../util/resources"
import { render } from "preact-render-to-string"
import { fromHtml } from "hast-util-from-html"
import { Root as HtmlRoot } from "hast"
import fs from "fs"
import path from "path"

function getPageTypes(ctx: BuildCtx): QuartzPageTypePluginInstance[] {
  return (ctx.cfg.plugins.pageTypes ?? []) as unknown as QuartzPageTypePluginInstance[]
}

/** @internal Exported for testing only. */
export function resolveLayout(
  pageType: QuartzPageTypePluginInstance,
  sharedDefaults: Partial<FullPageLayout>,
  byPageType: Record<string, Partial<FullPageLayout>>,
): FullPageLayout {
  const overrides = byPageType[pageType.layout] ?? {}
  // Frame priority: config override > page type declaration > default
  const frame = overrides.frame ?? pageType.frame ?? "default"
  return {
    head: overrides.head ?? sharedDefaults.head!,
    header: overrides.header ?? sharedDefaults.header ?? [],
    beforeBody: overrides.beforeBody ?? sharedDefaults.beforeBody ?? [],
    pageBody: pageType.body(undefined),
    afterBody: overrides.afterBody ?? sharedDefaults.afterBody ?? [],
    left: overrides.left ?? sharedDefaults.left ?? [],
    right: overrides.right ?? sharedDefaults.right ?? [],
    footer: overrides.footer ?? sharedDefaults.footer ?? [],
    frame,
  }
}

/** @internal Exported for testing only. */
export function collectComponents(
  pageTypes: QuartzPageTypePluginInstance[],
  sharedDefaults: Partial<FullPageLayout>,
  byPageType: Record<string, Partial<FullPageLayout>>,
): QuartzComponent[] {
  const seen = new Set<QuartzComponent>()
  for (const pt of pageTypes) {
    const layout = resolveLayout(pt, sharedDefaults, byPageType)
    const all = [
      layout.head,
      ...layout.header,
      ...layout.beforeBody,
      layout.pageBody,
      ...layout.afterBody,
      ...layout.left,
      ...layout.right,
      ...layout.footer,
    ]
    for (const c of all) {
      if (c) seen.add(c)
    }
  }
  return [...seen]
}

interface DispatcherOptions {
  defaults: Partial<FullPageLayout>
  byPageType: Record<string, Partial<FullPageLayout>>
}

async function emitPage(
  ctx: BuildCtx,
  slug: FullSlug,
  tree: ProcessedContent[0],
  fileData: ProcessedContent[1]["data"],
  allFiles: ProcessedContent[1]["data"][],
  layout: FullPageLayout,
  resources: StaticResources,
  treeTransforms?: TreeTransform[],
) {
  const cfg = ctx.cfg.configuration
  // For the 404 page, use an absolute base path so assets resolve correctly
  // when the hosting provider serves 404.html from any URL depth.
  // During local dev (--serve), the dev server strips baseDir itself and
  // serves files from root, so the 404 page must use "/" to avoid requesting
  // assets under a path prefix that the dev server doesn't serve.
  const baseDir =
    slug === "404"
      ? ((ctx.argv.serve
          ? "/"
          : new URL(`https://${cfg.baseUrl ?? "example.com"}`).pathname) as FullSlug)
      : pathToRoot(slug)
  const externalResources = pageResources(baseDir, resources, ctx)
  const componentData: QuartzComponentProps = {
    ctx,
    fileData,
    externalResources,
    cfg,
    children: [],
    tree,
    allFiles,
  }

  return write({
    ctx,
    content: renderPage(cfg, slug, componentData, layout, externalResources, treeTransforms),
    slug,
    ext: ".html",
  })
}

/** @internal Exported for testing only. */
export function pageOutputPath(
  outputDir: string,
  sourcePath: FilePath,
  fileSlug?: FullSlug,
): FilePath {
  const slug = fileSlug ?? slugifyFilePath(sourcePath)
  return joinSegments(outputDir, `${slug}.html`) as FilePath
}

/** @internal Exported for testing only. */
export async function removeStalePageOutput(
  outputDir: string,
  sourcePath: FilePath,
  currentSlugs: ReadonlySet<FullSlug>,
  fileSlug?: FullSlug,
): Promise<FilePath | undefined> {
  const slug = fileSlug ?? slugifyFilePath(sourcePath)
  if (currentSlugs.has(slug)) return

  const outputPath = pageOutputPath(outputDir, sourcePath, slug)
  await fs.promises.rm(outputPath, { force: true })
  return outputPath
}

/**
 * Render each virtual page's Body component to HTML and parse it to a hast tree,
 * populating both the ProcessedContent tree and vfile.data.htmlAst so that
 * transclusion (e.g. ![[file.canvas]]) can inline the virtual page's content.
 */
function populateVirtualPageHtmlAst(
  virtualEntries: Array<{
    tree: ProcessedContent[0]
    vfile: ProcessedContent[1]
    layout: FullPageLayout
    vpSlug: FullSlug
  }>,
  ctx: BuildCtx,
  allFiles: ProcessedContent[1]["data"][],
  resources: StaticResources,
) {
  const cfg = ctx.cfg.configuration
  for (const ve of virtualEntries) {
    const BodyComponent = ve.layout.pageBody
    const externalResources = pageResources(pathToRoot(ve.vpSlug), resources, ctx)
    const componentData: QuartzComponentProps = {
      ctx,
      fileData: ve.vfile.data,
      externalResources,
      cfg,
      children: [],
      tree: ve.tree,
      allFiles,
    }
    try {
      const htmlString = render(BodyComponent(componentData))
      const htmlAst = fromHtml(htmlString, { fragment: true }) as HtmlRoot
      ve.vfile.data.htmlAst = htmlAst
    } catch {
      // Body rendering failed — leave htmlAst empty so transclusion falls
      // back to the default title-only display.
    }
  }
}

export const PageTypeDispatcher: QuartzEmitterPlugin<Partial<DispatcherOptions>> = (userOpts) => {
  const defaults = userOpts?.defaults ?? {}
  const byPageType = userOpts?.byPageType ?? {}

  return {
    name: "PageTypeDispatcher",
    getQuartzComponents(ctx) {
      const pageTypes = getPageTypes(ctx)
      return collectComponents(pageTypes, defaults, byPageType)
    },
    async *emit(ctx, content, resources) {
      const pageTypes = [...getPageTypes(ctx)].sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))
      const cfg = ctx.cfg.configuration
      const allFiles = content.map((c) => c[1].data)

      // Collect tree transforms from all page type plugins
      const treeTransforms: TreeTransform[] = pageTypes.flatMap(
        (pt) => pt.treeTransforms?.(ctx) ?? [],
      )

      // Ensure trie is available for components that need folder hierarchy (e.g. FolderContent)
      ctx.trie ??= trieFromAllFiles(allFiles)

      // Phase 1: Generate all virtual pages first so their data is available in allFiles
      // for transclude resolution in renderPage (e.g. ![[file.canvas]], ![[file.base]])
      const virtualEntries: Array<{
        tree: ProcessedContent[0]
        vfile: ProcessedContent[1]
        layout: FullPageLayout
        vpSlug: FullSlug
      }> = []
      for (const pt of pageTypes) {
        if (!pt.generate) continue
        const virtualPages = pt.generate({ content, cfg, ctx })
        const layout = resolveLayout(pt, defaults, byPageType)
        for (const vp of virtualPages) {
          const vpSlug = vp.slug as FullSlug
          const vpRelativePath = (vpSlug + ".md") as FilePath
          const [tree, vfile] = defaultProcessedContent({
            slug: vpSlug,
            relativePath: vpRelativePath,
            frontmatter: { title: vp.title, tags: [] },
            ...vp.data,
          })
          if (vpSlug !== "404") {
            ctx.virtualPages.push([tree, vfile])
          }
          virtualEntries.push({ tree, vfile, layout, vpSlug })
        }
      }

      // Merge virtual page data into allFiles before populating htmlAst so that
      // Body components rendered during populateVirtualPageHtmlAst can resolve
      // cross-virtual-page embeds (e.g. a .base file embedded in a .canvas file).
      // The vfile.data objects are shared by reference, so htmlAst set on earlier
      // entries becomes visible to later entries in the same pass.
      const allFilesWithVirtual = [...allFiles, ...virtualEntries.map((ve) => ve.vfile.data)]

      // Render Body components to populate htmlAst for transclusion
      populateVirtualPageHtmlAst(virtualEntries, ctx, allFilesWithVirtual, resources)

      // Phase 2: Emit regular pages (with virtual page data available for transclusion)
      for (const [tree, file] of content) {
        const slug = file.data.slug!
        const fileData = file.data
        for (const pt of pageTypes) {
          if (pt.match({ slug, fileData, cfg })) {
            const layout = resolveLayout(pt, defaults, byPageType)
            yield emitPage(
              ctx,
              slug,
              tree,
              fileData,
              allFilesWithVirtual,
              layout,
              resources,
              treeTransforms,
            )
            break
          }
        }
      }

      // Phase 3: Emit virtual pages
      for (const ve of virtualEntries) {
        yield emitPage(
          ctx,
          ve.vpSlug,
          ve.tree,
          ve.vfile.data,
          allFilesWithVirtual,
          ve.layout,
          resources,
          treeTransforms,
        )
      }
    },
    async *partialEmit(ctx, content, resources, changeEvents) {
      const pageTypes = [...getPageTypes(ctx)].sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0))
      const cfg = ctx.cfg.configuration
      const allFiles = content.map((c) => c[1].data)

      // Collect tree transforms from all page type plugins
      const treeTransforms: TreeTransform[] = pageTypes.flatMap(
        (pt) => pt.treeTransforms?.(ctx) ?? [],
      )

      // Rebuild trie on partial emit to reflect file changes
      ctx.trie = trieFromAllFiles(allFiles)

      const currentSlugs = new Set(
        allFiles.flatMap((file) => (file.slug ? [file.slug] : [])),
      ) as Set<FullSlug>
      const changedSlugs = new Set<string>()
      for (const changeEvent of changeEvents) {
        if (path.extname(changeEvent.path).toLowerCase() !== ".md") continue

        const slug = changeEvent.file?.data.slug ?? slugifyFilePath(changeEvent.path)
        if (currentSlugs.has(slug)) {
          // A remaining source may have taken ownership after a slug collision.
          changedSlugs.add(slug)
        } else {
          await removeStalePageOutput(ctx.argv.output, changeEvent.path, currentSlugs, slug)
        }
      }

      // Phase 1: Generate all virtual pages first so their data is available in allFiles
      const virtualEntries: Array<{
        tree: ProcessedContent[0]
        vfile: ProcessedContent[1]
        layout: FullPageLayout
        vpSlug: FullSlug
      }> = []
      for (const pt of pageTypes) {
        if (!pt.generate) continue
        const virtualPages = pt.generate({ content, cfg, ctx })
        const layout = resolveLayout(pt, defaults, byPageType)
        for (const vp of virtualPages) {
          const vpSlug = vp.slug as FullSlug
          const vpRelativePath = (vpSlug + ".md") as FilePath
          const [tree, vfile] = defaultProcessedContent({
            slug: vpSlug,
            relativePath: vpRelativePath,
            frontmatter: { title: vp.title, tags: [] },
            ...vp.data,
          })
          if (vpSlug !== "404") {
            ctx.virtualPages.push([tree, vfile])
          }
          virtualEntries.push({ tree, vfile, layout, vpSlug })
        }
      }

      const allFilesWithVirtual = [...allFiles, ...virtualEntries.map((ve) => ve.vfile.data)]

      // Render Body components to populate htmlAst for transclusion
      populateVirtualPageHtmlAst(virtualEntries, ctx, allFilesWithVirtual, resources)

      // Phase 2: Emit changed regular pages
      for (const [tree, file] of content) {
        const slug = file.data.slug!
        if (!changedSlugs.has(slug)) continue

        const fileData = file.data
        for (const pt of pageTypes) {
          if (pt.match({ slug, fileData, cfg })) {
            const layout = resolveLayout(pt, defaults, byPageType)
            yield emitPage(
              ctx,
              slug,
              tree,
              fileData,
              allFilesWithVirtual,
              layout,
              resources,
              treeTransforms,
            )
            break
          }
        }
      }

      // Phase 3: Emit virtual pages
      for (const ve of virtualEntries) {
        yield emitPage(
          ctx,
          ve.vpSlug,
          ve.tree,
          ve.vfile.data,
          allFilesWithVirtual,
          ve.layout,
          resources,
          treeTransforms,
        )
      }
    },
  }
}
