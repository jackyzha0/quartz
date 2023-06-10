#!/usr/bin/env node
import { promises, readFileSync } from 'fs'
import yargs from 'yargs'
import path from 'path'
import { hideBin } from 'yargs/helpers'
import esbuild from 'esbuild'
import chalk from 'chalk'
import { sassPlugin } from 'esbuild-sass-plugin'

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
  clean: {
    boolean: true,
    default: false,
    describe: 'clean the output folder before building'
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

yargs(hideBin(process.argv))
  .scriptName("quartz")
  .version(version)
  .usage('$0 <cmd> [args]')
  .command('build', 'Build Quartz into a bundle of static HTML files', BuildArgv, async (argv) => {
    await esbuild.build({
      entryPoints: [fp],
      outfile: path.join("quartz", cacheFile),
      bundle: true,
      keepNames: true,
      platform: "node",
      format: "esm",
      jsx: "automatic",
      jsxImportSource: "preact",
      packages: "external",
      plugins: [
        sassPlugin({
          type: 'css-text'
        }),
        {
          name: 'inline-script-loader',
          setup(build) {
            build.onLoad({ filter: /\.inline\.(ts|js)$/ }, async (args) => {
              let text = await promises.readFile(args.path, 'utf8')
              // remove default exports that we manually inserted
              text = text.replace('export default', '')
              text = text.replace('export', '')

              const transpiled = await esbuild.build({
                stdin: {
                  contents: text,
                  loader: 'ts',
                  resolveDir: '.',
                  sourcefile: path.relative(path.resolve('.'), args.path),
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

    const { default: init } = await import(cacheFile)
    init(argv, version)
  })
  .showHelpOnFail(false)
  .help()
  .strict()
  .demandCommand()
  .argv
