import path from "path"
import fs from "fs"
import { QuartzConfig } from "../cfg"
import { PerfTimer } from "../perf"
import { getStaticResourcesFromPlugins } from "../plugins"
import { EmitCallback } from "../plugins/types"
import { ProcessedContent } from "../plugins/vfile"
import { QUARTZ, slugify } from "../path"
import { globbyStream } from "globby"

export async function emitContent(output: string, cfg: QuartzConfig, content: ProcessedContent[], verbose: boolean) {
  const perf = new PerfTimer()


  const staticResources = getStaticResourcesFromPlugins(cfg.plugins)
  const emit: EmitCallback = async ({ slug, ext, content }) => {
    const pathToPage = path.join(output, slug + ext)
    const dir = path.dirname(pathToPage)
    await fs.promises.mkdir(dir, { recursive: true })
    await fs.promises.writeFile(pathToPage, content)
    return pathToPage
  }

  let emittedFiles = 0
  for (const emitter of cfg.plugins.emitters) {
    const emitted = await emitter.emit(content, staticResources, emit)
    emittedFiles += emitted.length

    if (verbose) {
      for (const file of emitted) {
        console.log(`[emit:${emitter.name}] ${file}`)
      }
    }
  }

  const staticPath = path.join(QUARTZ, "static")
  await fs.promises.cp(staticPath, path.join(output, "static"), { recursive: true })

  // glob all non MD/MDX/HTML files in content folder and copy it over
  const assetsPath = path.join("public", "assets")
  for await (const fp of globbyStream("**", {
    ignore: ["**/*.{md,mdx,html}"],
    cwd: "./content",
  })) {
    const ext = path.extname(fp as string)
    const src = path.join("content", fp as string)
    const dest = path.join(assetsPath, slugify(fp as string) + ext)
    const dir = path.dirname(dest)
    await fs.promises.mkdir(dir, { recursive: true }) // ensure dir exists
    await fs.promises.copyFile(src, dest)
    emittedFiles += 1
    if (verbose) {
      console.log(`[emit:Assets] ${dest}`)
    }
  }

  if (verbose) {
    console.log(`[emit:Static] ${path.join(output, "static", "**")}`)
    console.log(`Emitted ${emittedFiles} files to \`${output}\` in ${perf.timeSince()}`)
  }
}
