import fs from "fs"
import path from "path"
import { Repository } from "@napi-rs/simple-git"
import { QuartzTransformerPlugin } from "../types"
import chalk from "chalk"

export interface Options {
  priority: ("frontmatter" | "git" | "filesystem")[]
  properties: Partial<{
    created: string[]
    modified: string[]
    published: string[]
  }>
}

const defaultOptions: Options = {
  priority: ["frontmatter", "git", "filesystem"],
  properties: {
    created: ["date"],
    modified: ["lastmod", "updated", "last-modified"],
    published: ["publishDate"],
  },
}

function coerceDate(fp: string, d: any): Date {
  const dt = new Date(d)
  const invalidDate = isNaN(dt.getTime()) || dt.getTime() === 0
  if (invalidDate && d !== undefined) {
    console.log(
      chalk.yellow(
        `\nWarning: found invalid date "${d}" in \`${fp}\`. Supported formats: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format`,
      ),
    )
  }

  return invalidDate ? new Date() : dt
}

type MaybeDate = undefined | string | number
export const CreatedModifiedDate: QuartzTransformerPlugin<Partial<Options> | undefined> = (
  userOpts,
) => {
  const opts = {
    ...defaultOptions,
    ...userOpts,
    properties: {
      ...defaultOptions.properties,
      ...userOpts?.properties,
    },
  }
  return {
    name: "CreatedModifiedDate",
    markdownPlugins() {
      return [
        () => {
          let repo: Repository | undefined = undefined
          return async (_tree, file) => {
            let created: MaybeDate = undefined
            let modified: MaybeDate = undefined
            let published: MaybeDate = undefined

            const fp = file.data.filePath!
            const fullFp = path.isAbsolute(fp) ? fp : path.posix.join(file.cwd, fp)
            for (const source of opts.priority) {
              if (source === "filesystem") {
                const st = await fs.promises.stat(fullFp)
                created ||= st.birthtimeMs
                modified ||= st.mtimeMs
              } else if (source === "frontmatter" && opts.properties && file.data.frontmatter) {
                if (opts.properties.created) {
                  for (const createdProperty of opts.properties.created) {
                    created ||= file.data.frontmatter[createdProperty] as MaybeDate
                  }
                }
                if (opts.properties.modified) {
                  for (const modifiedProperty of opts.properties.modified) {
                    modified ||= file.data.frontmatter[modifiedProperty] as MaybeDate
                  }
                }
                if (opts.properties.published) {
                  for (const publishedProperty of opts.properties.published) {
                    published ||= file.data.frontmatter[publishedProperty] as MaybeDate
                  }
                }
              } else if (source === "git") {
                if (!repo) {
                  // Get a reference to the main git repo.
                  // It's either the same as the workdir,
                  // or 1+ level higher in case of a submodule/subtree setup
                  repo = Repository.discover(file.cwd)
                }

                try {
                  modified ||= await repo.getFileLatestModifiedDateAsync(file.data.filePath!)
                } catch {
                  console.log(
                    chalk.yellow(
                      `\nWarning: ${file.data
                        .filePath!} isn't yet tracked by git, last modification date is not available for this file`,
                    ),
                  )
                }
              }
            }

            file.data.dates = {
              created: coerceDate(fp, created),
              modified: coerceDate(fp, modified),
              published: coerceDate(fp, published),
            }
          }
        },
      ]
    },
  }
}

declare module "vfile" {
  interface DataMap {
    dates: {
      created: Date
      modified: Date
      published: Date
    }
  }
}
