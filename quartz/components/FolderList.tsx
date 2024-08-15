import path from "path"
import { resolveRelative, SimpleSlug } from "../util/path"
import { QuartzComponent, QuartzComponentProps } from "./types"

type Props = {
  limit?: number
} & QuartzComponentProps

export const FolderList: QuartzComponent = ({ cfg, fileData, allFolders, limit }: Props) => {
  let list: SimpleSlug[] = allFolders.sort(_alphabetical)
  if (limit) {
    list = list.slice(0, limit)
  }

  return (
    <ul>
      {list.map((folderSlug) => {
        const title = _getTitle(folderSlug)

        return (
          <li>
            <a href={resolveRelative(fileData.slug!, folderSlug!)}>{title}</a>
          </li>
        )
      })}
    </ul>
  )
}

function _alphabetical(f1: SimpleSlug, f2: SimpleSlug): number {
  const f1Title = _getTitle(f1)
  const f2Title = _getTitle(f2)
  return f1Title.localeCompare(f2Title)
}

function _getTitle(folderSlug: SimpleSlug): string {
  return folderSlug.split(path.posix.sep).at(-1)!
}
