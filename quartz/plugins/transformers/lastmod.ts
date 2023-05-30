import { PluggableList } from "unified"
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

export class CreatedModifiedDate extends QuartzTransformerPlugin {
  name = "CreatedModifiedDate"
  opts: Options

  constructor(opts?: Options) {
    super()
    this.opts = {
      ...defaultOptions,
      ...opts,
    }
  }

  markdownPlugins(): PluggableList {
    return [
      () => {
        let repo: Repository | undefined = undefined
        return async (_tree, file) => {
          let created: undefined | Date = undefined
          let modified: undefined | Date = undefined
          let published: undefined | Date = undefined

          const fp = path.join(file.cwd, file.data.filePath as string)
          for (const source of this.opts.priority) {
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
              console.log(file)
              if (!repo) {
                repo = new Repository(file.cwd)
              }

              modified ||= new Date(await repo.getFileLatestModifiedDateAsync(fp))
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
  }

  htmlPlugins(): PluggableList {
    return []
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
