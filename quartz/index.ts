import path from "path"
import { QuartzConfig } from "./cfg"
import { PerfTimer } from "./perf"
import { rimraf } from "rimraf"
import { globby } from "globby"
import chalk from "chalk"
import http from "http"
import serveHandler from "serve-handler"
import { createProcessor, parseMarkdown } from "./processors/parse"
import { filterContent } from "./processors/filter"
import { emitContent } from "./processors/emit"

interface Argv {
  directory: string
  verbose: boolean
  output: string
  clean: boolean
  serve: boolean
  port: number
}

export function buildQuartz(cfg: QuartzConfig) {
  return async (argv: Argv, version: string) => {
    console.log(chalk.bgGreen.black(`\n Quartz v${version} \n`))
    const perf = new PerfTimer()
    const output = argv.output

    if (argv.verbose) {
      const pluginCount = Object.values(cfg.plugins).flat().length
      const pluginNames = (key: 'transformers' | 'filters' | 'emitters') => cfg.plugins[key].map(plugin => plugin.name)
      console.log(`Loaded ${pluginCount} plugins`)
      console.log(`  Transformers: ${pluginNames('transformers').join(", ")}`)
      console.log(`  Filters: ${pluginNames('filters').join(", ")}`)
      console.log(`  Emitters: ${pluginNames('emitters').join(", ")}`)
    }

    // clean
    if (argv.clean) {
      perf.addEvent('clean')
      await rimraf(output)
      if (argv.verbose) {
        console.log(`Cleaned output directory \`${output}\` in ${perf.timeSince('clean')}`)
      }
    }

    // glob
    perf.addEvent('glob')
    const fps = await globby('**/*.md', {
      cwd: argv.directory,
      ignore: cfg.configuration.ignorePatterns,
      gitignore: true,
    })

    if (argv.verbose) {
      console.log(`Found ${fps.length} input files in ${perf.timeSince('glob')}`)
    }

    const processor = createProcessor(cfg.plugins.transformers)
    const filePaths = fps.map(fp => `${argv.directory}${path.sep}${fp}`)
    const parsedFiles = await parseMarkdown(processor, argv.directory, filePaths, argv.verbose)
    const filteredContent = filterContent(cfg.plugins.filters, parsedFiles, argv.verbose)
    await emitContent(argv.directory, output, cfg, filteredContent, argv.verbose)
    console.log(chalk.green(`Done in ${perf.timeSince()}`))

    if (argv.serve) {
      const server = http.createServer(async (req, res) => {
        return serveHandler(req, res, {
          public: output,
          directoryListing: false
        })
      })
      server.listen(argv.port)
      console.log(`Started a Quartz server listening at http://localhost:${argv.port}`)
      console.log('hint: exit with ctrl+c')
    }
  }
}
