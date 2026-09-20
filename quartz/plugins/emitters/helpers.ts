import path from "path"
import fs from "fs"
import { BuildCtx } from "../../util/ctx"
import { FilePath, FullSlug, joinSegments } from "../../util/path"
import { Readable } from "stream"

type WriteOptions = {
  ctx: BuildCtx
  slug: FullSlug
  ext: `.${string}` | ""
  content: string | Buffer | Readable
}

// the output dir is cleaned once per process, so a dir we've made stays made. holding the
// promise rather than a flag keeps a concurrent write from racing a half-finished mkdir.
const ensuredDirs = new Map<string, Promise<string | undefined>>()

export const write = async ({ ctx, slug, ext, content }: WriteOptions): Promise<FilePath> => {
  const pathToPage = joinSegments(ctx.argv.output, slug + ext) as FilePath
  const dir = path.dirname(pathToPage)
  let ensured = ensuredDirs.get(dir)
  if (!ensured) {
    ensured = fs.promises.mkdir(dir, { recursive: true })
    ensuredDirs.set(dir, ensured)
  }
  await ensured
  await fs.promises.writeFile(pathToPage, content)
  return pathToPage
}
