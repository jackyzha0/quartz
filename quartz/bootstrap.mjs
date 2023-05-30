#!/usr/bin/env node
import { readFileSync } from 'fs'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import esbuild from 'esbuild'
import chalk from 'chalk'
import requireFromString from 'require-from-string'

const fp = "./quartz.config.ts"
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
    const out = await esbuild.build({
      entryPoints: [fp],
      write: false,
      minifySyntax: true,
      minifyWhitespace: true,
      bundle: true,
      keepNames: true,
      platform: "node",
      format: "cjs",
      jsx: "automatic",
      jsxImportSource: "preact",
      external: ["@napi-rs/simple-git"]
    }).catch(err => {
      console.error(`${chalk.red("Couldn't parse Quartz configuration:")} ${fp}`)
      console.log(`Reason: ${chalk.grey(err)}`)
      console.log("hint: make sure all the required dependencies are installed (run `npm install`)")
      process.exit(1)
    })

    const mod = out.outputFiles[0].text
    const init = requireFromString(mod, fp).default
    init(argv, version)
  })
  .showHelpOnFail(false)
  .help()
  .strict()
  .demandCommand()
  .argv
