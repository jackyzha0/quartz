#!/usr/bin/env node
import { promises, readFileSync } from 'fs'
import yargs from 'yargs'
import path from 'path'
import { hideBin } from 'yargs/helpers'
import esbuild from 'esbuild'
import chalk from 'chalk'
import { sassPlugin } from 'esbuild-sass-plugin'
import fs from 'fs'
import { intro, isCancel, outro, select, text } from '@clack/prompts'
import { rimraf } from 'rimraf'
import prettyBytes from 'pretty-bytes'

const cacheFile = "./.quartz-cache/transpiled-build.mjs"
const fp = "./quartz/build.ts"
const { version } = JSON.parse(readFileSync("./package.json").toString())

export const BuildArgv = {
  output: {
    string: true,
    alias: ['o'],
    default: 'public',
    describe: 'output folder for files'
  },
  serve: {
    boolean: true,
    default: false,
    describe: 'run a local server to preview your Quartz'
  },
  port: {
    number: true,
    default: 8080,
    describe: 'port to serve Quartz on'
  },
  directory: {
    string: true,
    alias: ['d'],
    default: 'content',
    describe: 'directory to look for content files'
  },
  verbose: {
    boolean: true,
    alias: ['v'],
    default: false,
    describe: 'print out extra logging information'
  }
}

function escapePath(fp) {
  return fp
    .replace(/\\ /g, " ") // unescape spaces
    .replace(/^".*"$/, "$1")
    .replace(/^'.*"$/, "$1")
    .trim()
}

function exitIfCancel(val) {

  if (isCancel(val)) {
    outro(chalk.red("Exiting"))
    process.exit(0)
  } else {
    return val
  }
}

yargs(hideBin(process.argv))
  .scriptName("quartz")
  .version(version)
  .usage('$0 <cmd> [args]')
  .command('create', 'Initialize Quartz', async (_argv) => {
    console.log()
    intro(chalk.bgGreen.black(` Quartz v${version} `))
    const cwd = process.cwd()
    const contentFolder = path.join(cwd, "content")
    const setupStrategy = exitIfCancel(await select({
      message: `Choose how to initialize the content in \`${contentFolder}\``,
      options: [
        { value: 'new', label: "Empty Quartz" },
        { value: 'copy', label: "Replace with an existing folder", hint: "overwrites `content`" },
        { value: 'symlink', label: "Symlink an existing folder", hint: "don't select this unless you know what you are doing!" },
        { value: 'keep', label: "Keep the existing files" },
      ]
    }))

    // TODO
    const linkResolutionStrategy = exitIfCancel(await select({
      message: `Choose how Quartz should resolve links in your content. You can change this later in \`quartz.config.ts\`.`,
      options: [
        { value: 'absolute', label: "Treat links as absolute path", hint: "for content made for Quartz 3 and Hugo" },
        { value: 'shortest', label: "Treat links as shortest path", hint: "for most Obsidian vaults" },
        { value: 'relative', label: "Treat links as relative paths", hint: "for just normal Markdown files" },
      ]
    }))

    async function rmContentFolder() {
      const contentStat = await fs.promises.lstat(contentFolder)
      if (contentStat) {
        if (contentStat.isSymbolicLink()) {
          await fs.promises.unlink(contentFolder)
        } else {
          await rimraf(contentFolder)
        }
      }
    }

    if (setupStrategy === 'copy' || setupStrategy === 'symlink') {
      const originalFolder = escapePath(exitIfCancel(await text({
        message: "Enter the full path to existing content folder",
        placeholder: 'On most terminal emulators, you can drag and drop a folder into the window and it will paste the full path',
        validate(fp) {
          const fullPath = escapePath(fp)
          if (!fs.existsSync(fullPath)) {
            return "The given path doesn't exist"
          } else if (!fs.lstatSync(fullPath).isDirectory()) {
            return "The given path is not a folder"
          }
        }
      })))

      await rmContentFolder()
      if (setupStrategy === 'copy') {
        await fs.promises.cp(originalFolder, contentFolder, { recursive: true })
      } else if (setupStrategy === 'symlink') {
        await fs.promises.symlink(originalFolder, contentFolder, 'dir')
      }
    } else if (setupStrategy === 'new') {
      await rmContentFolder()
      await fs.promises.mkdir(contentFolder)
      await fs.promises.writeFile(path.join(contentFolder, "index.md"),
        `---
title: Welcome to Quartz
---

This is a blank Quartz installation.
See the [documentation](https://quartz.jzhao.xyz) for how to get started.
`
      )
    }

    // now, do config changes
    const configFilePath = path.join(cwd, "quartz.config.ts")
    let configContent = await fs.promises.readFile(configFilePath, { encoding: 'utf-8' })
    configContent = configContent.replace(/markdownLinkResolution: '(.+)'/, `markdownLinkResolution: '${linkResolutionStrategy}'`)
    await fs.promises.writeFile(configFilePath, configContent)

    outro(`You're all set! Not sure what to do next? Try:
   • Customizing Quartz a bit more by editing \`quartz.config.ts\`
   • Running \`npx quartz build --serve\` to preview your Quartz locally
   • Hosting your Quartz online (see: https://quartz.jzhao.xyz/setup/hosting)
`)
  })
  .command('update', 'Get the latest Quartz updates', () => {
    // TODO
  })
  .command('push', 'Push your Quartz updates to GitHub', () => {
    // TODO
  })
  .command('build', 'Build Quartz into a bundle of static HTML files', BuildArgv, async (argv) => {
    const result = await esbuild.build({
      entryPoints: [fp],
      outfile: path.join("quartz", cacheFile),
      bundle: true,
      keepNames: true,
      platform: "node",
      format: "esm",
      jsx: "automatic",
      jsxImportSource: "preact",
      packages: "external",
      metafile: true,
      sourcemap: true,
      plugins: [
        sassPlugin({
          type: 'css-text',
        }),
        {
          name: 'inline-script-loader',
          setup(build) {
            build.onLoad({ filter: /\.inline\.(ts|js)$/ }, async (args) => {
              let text = await promises.readFile(args.path, 'utf8')
              // remove default exports that we manually inserted
              text = text.replace('export default', '')
              text = text.replace('export', '')

              const sourcefile = path.relative(path.resolve('.'), args.path)
              const resolveDir = path.dirname(sourcefile)
              const transpiled = await esbuild.build({
                stdin: {
                  contents: text,
                  loader: 'ts',
                  resolveDir,
                  sourcefile,
                },
                write: false,
                bundle: true,
                platform: "browser",
                format: "esm",
              })
              const rawMod = transpiled.outputFiles[0].text
              return {
                contents: rawMod,
                loader: 'text',
              }
            })
          }
        }
      ]
    }).catch(err => {
      console.error(`${chalk.red("Couldn't parse Quartz configuration:")} ${fp}`)
      console.log(`Reason: ${chalk.grey(err)}`)
      console.log("hint: make sure all the required dependencies are installed (run `npm install`)")
      process.exit(1)
    })

    if (argv.verbose) {
      const outputFileName = 'quartz/.quartz-cache/transpiled-build.mjs'
      const meta = result.metafile.outputs[outputFileName]
      console.log(chalk.gray(`[debug] Successfully transpiled ${Object.keys(meta.inputs).length} files (${prettyBytes(meta.bytes)})`))
    }

    const { default: init } = await import(cacheFile)
    init(argv, version)
  })
  .showHelpOnFail(false)
  .help()
  .strict()
  .demandCommand()
  .argv
