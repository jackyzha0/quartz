import fs from "fs"
import path from 'path'
import { Repository } from "@napi-rs/simple-git"
import { QuartzTransformerPlugin } from "../types"

export interface Options {
  priority: ('frontmatter' | 'git' | 'filesystem')[],
}

const defaultOptions: Options = {
  priority: ['frontmatter', 'git', 'filesystem']
}

export const CreatedModifiedDate: QuartzTransformerPlugin<Partial<Options> | undefined> = (userOpts) => {
  const opts = { ...defaultOptions, ...userOpts }
  return {
    name: "CreatedModifiedDate",
    markdownPlugins() {
      return [
        () => {
          let repo: Repository | undefined = undefined
          return async (_tree, file) => {
            let created: undefined | Date = undefined
            let modified: undefined | Date = undefined
            let published: undefined | Date = undefined

            const fp = path.join(file.cwd, file.data.filePath as string)
            for (const source of opts.priority) {
              if (source === "filesystem") {
                const st = await fs.promises.stat(fp)
                created ||= new Date(st.birthtimeMs)
                modified ||= new Date(st.mtimeMs)
              } else if (source === "frontmatter" && file.data.frontmatter) {
                created ||= file.data.frontmatter.date
                modified ||= file.data.frontmatter.lastmod
                modified ||= file.data.frontmatter["last-modified"]
                published ||= file.data.frontmatter.publishDate
              } else if (source === "git") {
                if (!repo) {
                  repo = new Repository(file.cwd)
                }

                modified ||= new Date(await repo.getFileLatestModifiedDateAsync(file.data.filePath!))
              }
            }

            file.data.dates = {
              created: created ?? new Date(),
              modified: modified ?? new Date(),
              published: published ?? new Date()
            }
          }
        }
      ]
    },
    htmlPlugins() {
      return []
    }
  }
}

declare module 'vfile' {
  interface DataMap {
    dates: {
      created: Date
      modified: Date
      published: Date
    }
  }
}
