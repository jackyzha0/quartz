import { QuartzEmitterPlugin, QuartzPageTypePluginInstance, TreeTransform } from "../types"
import { QuartzComponent, QuartzComponentProps } from "../../components/types"
import { pageResources, renderPage } from "../../components/renderPage"
import { FullPageLayout } from "../../cfg"
import {
  FilePath,
  FullSlug,
  SimpleSlug,
  joinSegments,
  pathToRoot,
  simplifySlug,
  slugifyFilePath,
} from "../../util/path"
import { ProcessedContent, defaultProcessedContent } from "../vfile"
import { write } from "../emitters/helpers"
import { BuildCtx, trieFromAllFiles } from "../../util/ctx"
import { StaticResources } from "../../util/resources"
import { render } from "preact-render-to-string"
import { fromHtml } from "hast-util-from-html"
import { Root as HtmlRoot } from "hast"
import { toHtml } from "hast-util-to-html"
import { unified } from "unified"
import { htmlToJsx } from "../../util/jsx"
import { trace } from "../../util/trace"
import { attributeError, originOf } from "../../util/pluginErrors"
import { rejectingFilter } from "../../processors/filter"
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
    // layout.sidebars, with a page type's override merged per side
    sidebars: { ...sharedDefaults.sidebars, ...overrides.sidebars },
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

export type VirtualEntry = {
  tree: ProcessedContent[0]
  vfile: ProcessedContent[1]
  layout: FullPageLayout
  vpSlug: FullSlug
  /**
   * Generated by a page type that renders source files (it declares `fileExtensions`, e.g. a
   * `.base` or `.canvas` file): the page stands for a file and belongs in the folder hierarchy.
   */
  fileBacked: boolean
}

/**
 * Run every page type's `generate` and turn the virtual pages it returns into processed
 * content. `generate` may be async (Quartz 5.1+), e.g. to run the transformer chain or
 * esbuild; page types run one after another in priority order, as before. Virtual pages
 * (except the 404 page) are added to `ctx.virtualPages`.
 *
 * Pages of page types that render files (`fileExtensions`: `.base`, `.canvas`, …) go through the
 * site's filters first, with `file.data.referencedBy` set; a page a filter rejects is dropped, so
 * it is neither emitted nor listed (content index, folder pages, explorer, search) nor embeddable.
 */
export async function generateVirtualPages(
  pageTypes: QuartzPageTypePluginInstance[],
  content: ProcessedContent[],
  ctx: BuildCtx,
  defaults: Partial<FullPageLayout>,
  byPageType: Record<string, Partial<FullPageLayout>>,
): Promise<VirtualEntry[]> {
  const cfg = ctx.cfg.configuration
  const virtualEntries: VirtualEntry[] = []
  let references: Map<SimpleSlug, FullSlug[]> | undefined
  for (const pt of pageTypes) {
    if (!pt.generate) continue
    const virtualPages = await pt.generate({ content, cfg, ctx })
    const layout = resolveLayout(pt, defaults, byPageType)
    const fileBacked = (pt.fileExtensions?.length ?? 0) > 0
    for (const vp of virtualPages) {
      const vpSlug = vp.slug as FullSlug
      const vpRelativePath = (vpSlug + ".md") as FilePath
      const [tree, vfile] = defaultProcessedContent({
        slug: vpSlug,
        relativePath: vpRelativePath,
        frontmatter: { title: vp.title, tags: [] },
        ...vp.data,
      })
      if (fileBacked) {
        // A page that stands for a file is published on the same terms as a note: the site's
        // filters decide, seeing the frontmatter the page type gives it (an `.excalidraw.md`
        // drawing's own) and which published pages link to it (bases-page#11).
        references ??= referencesByTarget(content)
        vfile.data.referencedBy = references.get(simplifySlug(vpSlug)) ?? []
        if (rejectingFilter(ctx, [tree, vfile]) !== undefined) continue
      }
      if (vpSlug !== "404") {
        ctx.virtualPages.push([tree, vfile])
      }
      virtualEntries.push({ tree, vfile, layout, vpSlug, fileBacked })
    }
  }
  return virtualEntries
}

/**
 * @internal Exported for testing only.
 *
 * For each link target, the published pages that link to or embed it (`file.data.links`), in
 * content order.
 */
export function referencesByTarget(content: ProcessedContent[]): Map<SimpleSlug, FullSlug[]> {
  const references = new Map<SimpleSlug, FullSlug[]>()
  for (const [, file] of content) {
    const slug = file.data.slug
    if (!slug) continue
    for (const target of new Set(file.data.links ?? [])) {
      const from = references.get(target)
      if (from) from.push(slug)
      else references.set(target, [slug])
    }
  }
  return references
}

/**
 * @internal Exported for testing only.
 *
 * The folder hierarchy (`ctx.trie`, used by folder pages and breadcrumbs): the source files plus
 * the virtual pages that stand for files (`.base`, `.canvas`, …), so a folder holding only such
 * files still has a node with them as children (jackyzha0/quartz#2576). Tag and folder pages
 * are left out — they are listings, not files.
 */
export function folderTrie(
  allFiles: ProcessedContent[1]["data"][],
  virtualEntries: VirtualEntry[],
) {
  const fileBacked = virtualEntries
    .filter((ve) => ve.fileBacked)
    // the trie takes folder display names from file paths; a virtual page has only relativePath
    .map((ve) => ({
      ...ve.vfile.data,
      filePath: ve.vfile.data.filePath ?? ve.vfile.data.relativePath,
    }))
  return trieFromAllFiles([...allFiles, ...fileBacked])
}

/** Renders a page's (already rendered and processed) tree as its body. */
const RenderedBody: QuartzComponent = ({ fileData, tree }: QuartzComponentProps) =>
  htmlToJsx((fileData.filePath ?? fileData.relativePath ?? fileData.slug) as FilePath, tree)

/**
 * @internal Exported for testing only.
 *
 * Run the transformers' `virtualPageHtmlPlugins` on the rendered body (`file.data.htmlAst`) of a
 * page that stands for a file — e.g. encrypted-pages encrypting a canvas. When they change the
 * tree, the page shows the changed tree instead of rendering its body again. A page whose body
 * failed to render, or that a plugin throws on, is left unpublished: emitting it unprocessed could
 * publish what the plugin protects.
 */
export function processVirtualPageHtml(
  ve: VirtualEntry,
  ctx: BuildCtx,
  content: ProcessedContent[],
): boolean {
  if (!ve.fileBacked) return true
  const transformers = (ctx.cfg.plugins?.transformers ?? []).filter((t) => t.virtualPageHtmlPlugins)
  if (transformers.length === 0) return true
  // its body failed to render: there is nothing to process, and it can't be emitted processed
  const htmlAst = ve.vfile.data.htmlAst
  if (!htmlAst) return false

  const before = toHtml(htmlAst, { allowDangerousHtml: true })
  for (const transformer of transformers) {
    try {
      const processor = unified().use(transformer.virtualPageHtmlPlugins!(ctx, content))
      ve.vfile.data.htmlAst = processor.runSync(ve.vfile.data.htmlAst!, ve.vfile) as HtmlRoot
    } catch (err) {
      const file = ve.vfile.data.relativePath ?? ve.vpSlug
      trace(
        `Failed to process the HTML of \`${file}\``,
        attributeError(err, { origin: originOf(transformer), stage: "html", file }) as Error,
      )
      return false
    }
  }
  const processed = ve.vfile.data.htmlAst!
  if (toHtml(processed, { allowDangerousHtml: true }) !== before) {
    ve.tree = processed
    ve.layout = { ...ve.layout, pageBody: RenderedBody }
    // emitters that run later (content index, assets, …) read the page from ctx.virtualPages
    const item = ctx.virtualPages.find(([, vfile]) => vfile === ve.vfile)
    if (item) item[0] = processed
  }
  return true
}

/**
 * Render each virtual page's Body component to HTML and parse it to a hast tree,
 * populating vfile.data.htmlAst so that transclusion (e.g. ![[file.canvas]]) can inline the
 * virtual page's content, then run `virtualPageHtmlPlugins` on it (pages that stand for files).
 * Returns the entries to emit: those whose processing failed are removed from `ctx.virtualPages`.
 */
function populateVirtualPageHtmlAst(
  virtualEntries: VirtualEntry[],
  ctx: BuildCtx,
  allFiles: ProcessedContent[1]["data"][],
  resources: StaticResources,
  content: ProcessedContent[],
): VirtualEntry[] {
  const cfg = ctx.cfg.configuration
  const failed = new Set<VirtualEntry>()
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
    // processed right after rendering, so later bodies that embed this page see the result
    if (!processVirtualPageHtml(ve, ctx, content)) {
      failed.add(ve)
      ve.vfile.data.htmlAst = undefined
    }
  }
  if (failed.size === 0) return virtualEntries
  const failedData = new Set([...failed].map((ve) => ve.vfile.data))
  ctx.virtualPages = ctx.virtualPages.filter(([, vfile]) => !failedData.has(vfile.data))
  return virtualEntries.filter((ve) => !failed.has(ve))
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
      const virtualEntries = await generateVirtualPages(
        pageTypes,
        content,
        ctx,
        defaults,
        byPageType,
      )

      if (virtualEntries.some((ve) => ve.fileBacked)) {
        ctx.trie = folderTrie(allFiles, virtualEntries)
      }

      // Merge virtual page data into allFiles before populating htmlAst so that
      // Body components rendered during populateVirtualPageHtmlAst can resolve
      // cross-virtual-page embeds (e.g. a .base file embedded in a .canvas file).
      // The vfile.data objects are shared by reference, so htmlAst set on earlier
      // entries becomes visible to later entries in the same pass.
      const allFilesWithVirtual = [...allFiles, ...virtualEntries.map((ve) => ve.vfile.data)]

      // Render Body components to populate htmlAst for transclusion
      const entriesToEmit = populateVirtualPageHtmlAst(
        virtualEntries,
        ctx,
        allFilesWithVirtual,
        resources,
        content,
      )

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
      for (const ve of entriesToEmit) {
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
      const virtualEntries = await generateVirtualPages(
        pageTypes,
        content,
        ctx,
        defaults,
        byPageType,
      )

      ctx.trie = folderTrie(allFiles, virtualEntries)

      const allFilesWithVirtual = [...allFiles, ...virtualEntries.map((ve) => ve.vfile.data)]

      // Render Body components to populate htmlAst for transclusion
      const entriesToEmit = populateVirtualPageHtmlAst(
        virtualEntries,
        ctx,
        allFilesWithVirtual,
        resources,
        content,
      )

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
      for (const ve of entriesToEmit) {
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

declare module "vfile" {
  interface DataMap {
    /**
     * On a page that stands for a file (`.base`, `.canvas`, …): the published pages that link to
     * or embed it. Set before the site's filters see the page, e.g. so explicit-publish can publish
     * a file that has no frontmatter when a published note links to it.
     */
    referencedBy: FullSlug[]
  }
}
