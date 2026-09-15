import sourceMapSupport from "source-map-support"
sourceMapSupport.install(options)
import cfg from "../quartz"
import { BuildCtx, WorkerSerializableBuildCtx } from "./util/ctx"
import { FilePath } from "./util/path"
import { resolveSlugify } from "./util/slugify"
import {
  createFileParser,
  createHtmlProcessor,
  createMarkdownParser,
  createMdProcessor,
} from "./processors/parse"
import { options } from "./util/sourcemap"
import { MarkdownContent, ProcessedContent } from "./plugins/vfile"

// each worker thread resolves its own copy: `slugify` can't cross the
// thread boundary (WorkerSerializableBuildCtx omits it), and it's a cheap,
// pure function of `cfg.plugins.transformers`.
const slugify = resolveSlugify(cfg.plugins.transformers)

// only called from worker thread
export async function parseMarkdown(
  partialCtx: WorkerSerializableBuildCtx,
  fps: FilePath[],
): Promise<MarkdownContent[]> {
  const ctx: BuildCtx = {
    ...partialCtx,
    cfg,
    slugify,
  }
  return await createFileParser(ctx, fps)(createMdProcessor(ctx))
}

// only called from worker thread
export function processHtml(
  partialCtx: WorkerSerializableBuildCtx,
  mds: MarkdownContent[],
): Promise<ProcessedContent[]> {
  const ctx: BuildCtx = {
    ...partialCtx,
    cfg,
    slugify,
  }
  return createMarkdownParser(ctx, mds)(createHtmlProcessor(ctx))
}
