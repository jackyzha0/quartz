import 'source-map-support/register.js'
import path from "path"
import { PerfTimer } from "./perf"
import { rimraf } from "rimraf"
import { globby, isGitIgnored } from "globby"
import chalk from "chalk"
import http from "http"
import serveHandler from "serve-handler"
import { parseMarkdown } from "./processors/parse"
import { filterContent } from "./processors/filter"
import { emitContent } from "./processors/emit"
import cfg from "../quartz.config"
import { FilePath } from "./path"
import chokidar from "chokidar"
import { ProcessedContent } from './plugins/vfile'
import WebSocket, { WebSocketServer } from 'ws'

interface Argv {
  directory: string
  verbose: boolean
  output: string
  serve: boolean
  port: number
}

export default async function buildQuartz(argv: Argv, version: string) {
  console.log(chalk.bgGreen.black(`\n Quartz v${version} \n`))
  const perf = new PerfTimer()
  const output = argv.output

  const pluginCount = Object.values(cfg.plugins).flat().length
  const pluginNames = (key: 'transformers' | 'filters' | 'emitters') => cfg.plugins[key].map(plugin => plugin.name)
  if (argv.verbose) {
    console.log(`Loaded ${pluginCount} plugins`)
    console.log(`  Transformers: ${pluginNames('transformers').join(", ")}`)
    console.log(`  Filters: ${pluginNames('filters').join(", ")}`)
    console.log(`  Emitters: ${pluginNames('emitters').join(", ")}`)
  }

  // clean
  perf.addEvent('clean')
  await rimraf(output)
  console.log(`Cleaned output directory \`${output}\` in ${perf.timeSince('clean')}`)

  // glob
  perf.addEvent('glob')
  const fps = await globby('**/*.md', {
    cwd: argv.directory,
    ignore: cfg.configuration.ignorePatterns,
    gitignore: true,
  })
  console.log(`Found ${fps.length} input files from \`${argv.directory}\` in ${perf.timeSince('glob')}`)

  const filePaths = fps.map(fp => `${argv.directory}${path.sep}${fp}` as FilePath)
  const parsedFiles = await parseMarkdown(cfg.plugins.transformers, argv.directory, filePaths, argv.verbose)
  const filteredContent = filterContent(cfg.plugins.filters, parsedFiles, argv.verbose)
  await emitContent(argv.directory, output, cfg, filteredContent, argv.serve, argv.verbose)
  console.log(chalk.green(`Done processing ${fps.length} files in ${perf.timeSince()}`))

  if (argv.serve) {
    const wss = new WebSocketServer({ port: 3001 })
    const connections: WebSocket[] = []
    wss.on('connection', ws => connections.push(ws))

    const ignored = await isGitIgnored()
    const contentMap = new Map<FilePath, ProcessedContent>()
    for (const content of parsedFiles) {
      const [_tree, vfile] = content
      contentMap.set(vfile.data.filePath!, content)
    }

    async function rebuild(fp: string, action: 'add' | 'change' | 'unlink') {
      perf.addEvent('rebuild')
      if (!ignored(fp)) {
        console.log(chalk.yellow(`Detected change in ${fp}, rebuilding...`))
        const fullPath = `${argv.directory}${path.sep}${fp}` as FilePath
        if (action === 'add' || action === 'change') {
          const [parsedContent] = await parseMarkdown(cfg.plugins.transformers, argv.directory, [fullPath], argv.verbose)
          contentMap.set(fullPath, parsedContent)
        } else if (action === 'unlink') {
          contentMap.delete(fullPath)
        }

        await rimraf(output)
        const parsedFiles = [...contentMap.values()]
        const filteredContent = filterContent(cfg.plugins.filters, parsedFiles, argv.verbose)
        await emitContent(argv.directory, output, cfg, filteredContent, argv.serve, argv.verbose)
        console.log(chalk.green(`Done rebuilding in ${perf.timeSince('rebuild')}`))
        connections.forEach(conn => conn.send('rebuild'))
      }
    }

    const watcher = chokidar.watch('.', {
      persistent: true,
      cwd: argv.directory,
      ignoreInitial: true,
    })

    watcher
      .on('add', fp => rebuild(fp, 'add'))
      .on('change', fp => rebuild(fp, 'change'))
      .on('unlink', fp => rebuild(fp, 'unlink'))

    const server = http.createServer(async (req, res) => {
      await serveHandler(req, res, {
        public: output,
        directoryListing: false,
      })
      const status = res.statusCode
      const statusString = (status >= 200 && status < 300) ?
        chalk.green(`[${status}]`) :
        (status >= 300 && status < 400) ?
          chalk.yellow(`[${status}]`) :
          chalk.red(`[${status}]`)
      console.log(statusString + chalk.grey(` ${req.url}`))
    })
    server.listen(argv.port)
    console.log(chalk.cyan(`Started a Quartz server listening at http://localhost:${argv.port}`))
    console.log('hint: exit with ctrl+c')
  }
}
