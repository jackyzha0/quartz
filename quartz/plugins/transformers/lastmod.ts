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

type MaybeDate = undefined | string | number
export const CreatedModifiedDate: QuartzTransformerPlugin<Partial<Options> | undefined> = (userOpts) => {
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

            const fp = path.join(file.cwd, file.data.filePath as string)
            for (const source of opts.priority) {
              if (source === "filesystem") {
                const st = await fs.promises.stat(fp)
                created ||= st.birthtimeMs
                modified ||= st.mtimeMs
              } else if (source === "frontmatter" && file.data.frontmatter) {
                created ||= file.data.frontmatter.date
                modified ||= file.data.frontmatter.lastmod
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
              created: created ? new Date(created) : new Date(),
              modified: modified ? new Date(modified) : new Date(),
              published: published ? new Date(published) : new Date(),
            }
          }
        }
      ]
    },
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
