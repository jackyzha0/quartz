import { resolveToRoot } from "../path"

export interface HeaderProps {
  title: string
  slug: string
}

export function Component({ title, slug }: HeaderProps) {
  const baseDir = resolveToRoot(slug)
  return <header>
    <h1><a href={baseDir}>{title}</a></h1>
  </header>
}

