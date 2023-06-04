import path from "path"
import fs from "fs"
import { QuartzConfig } from "../cfg"
import { PerfTimer } from "../perf"
import { emitComponentResources, getStaticResourcesFromPlugins } from "../plugins"
import { EmitCallback } from "../plugins/types"
import { ProcessedContent } from "../plugins/vfile"
import { QUARTZ, slugify } from "../path"
import { globbyStream } from "globby"
import chalk from "chalk"

export async function emitContent(contentFolder: string, output: string, cfg: QuartzConfig, content: ProcessedContent[], verbose: boolean) {
  const perf = new PerfTimer()
  const emit: EmitCallback = async ({ slug, ext, content }) => {
    const pathToPage = path.join(output, slug + ext)
    const dir = path.dirname(pathToPage)
    await fs.promises.mkdir(dir, { recursive: true })
    await fs.promises.writeFile(pathToPage, content)
    return pathToPage
  }

  const staticResources = getStaticResourcesFromPlugins(cfg.plugins)
  emitComponentResources(cfg.configuration, staticResources, cfg.plugins, emit)

  let emittedFiles = 0
  for (const emitter of cfg.plugins.emitters) {
    try {
      const emitted = await emitter.emit(cfg.configuration, content, staticResources, emit)
      emittedFiles += emitted.length

      if (verbose) {
        for (const file of emitted) {
          console.log(`[emit:${emitter.name}] ${file}`)
        }
      }
    } catch (err) {
      console.log(chalk.red(`Failed to emit from plugin \`${emitter.name}\`: `) + err)
      process.exit(1)
    }
  }

  const staticPath = path.join(QUARTZ, "static")
  await fs.promises.cp(staticPath, path.join(output, "static"), { recursive: true })
  if (verbose) {
    console.log(`[emit:Static] ${path.join(output, "static", "**")}`)
  }

  // glob all non MD/MDX/HTML files in content folder and copy it over
  const assetsPath = path.join("public", "assets")
  for await (const fp of globbyStream("**", {
    ignore: ["**/*.md"],
    cwd: contentFolder,
  })) {
    const ext = path.extname(fp as string)
    const src = path.join(contentFolder, fp as string)
    const dest = path.join(assetsPath, slugify(fp as string) + ext)
    const dir = path.dirname(dest)
    await fs.promises.mkdir(dir, { recursive: true }) // ensure dir exists
    await fs.promises.copyFile(src, dest)
    emittedFiles += 1
    if (verbose) {
      console.log(`[emit:Assets] ${dest}`)
    }
  }

  console.log(`Emitted ${emittedFiles} files to \`${output}\` in ${perf.timeSince()}`)
}
