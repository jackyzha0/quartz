import fs from "fs"
import path from "path"
import { Repository } from "@napi-rs/simple-git"
import { QuartzTransformerPlugin } from "../types"

export interface Options {
  priority: ("frontmatter" | "git" | "filesystem")[]
}

const defaultOptions: Options = {
  priority: ["frontmatter", "git", "filesystem"],
}

function coerceDate(d: any): Date {
  const dt = new Date(d)
  return isNaN(dt.getTime()) ? new Date() : dt
}

type MaybeDate = undefined | string | number
export const CreatedModifiedDate: QuartzTransformerPlugin<Partial<Options> | undefined> = (
  userOpts,
) => {
  const opts = { ...defaultOptions, ...userOpts }
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

            const fp = path.posix.join(file.cwd, file.data.filePath as string)
            for (const source of opts.priority) {
              if (source === "filesystem") {
                const st = await fs.promises.stat(fp)
                created ||= st.birthtimeMs
                modified ||= st.mtimeMs
              } else if (source === "frontmatter" && file.data.frontmatter) {
                created ||= file.data.frontmatter.date
                modified ||= file.data.frontmatter.lastmod
                modified ||= file.data.frontmatter.updated
                modified ||= file.data.frontmatter["last-modified"]
                published ||= file.data.frontmatter.publishDate
              } else if (source === "git") {
                if (!repo) {
                  repo = new Repository(file.cwd)
                }

                modified ||= await repo.getFileLatestModifiedDateAsync(file.data.filePath!)
              }
            }

            file.data.dates = {
              created: coerceDate(created),
              modified: coerceDate(modified),
              published: coerceDate(published),
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
