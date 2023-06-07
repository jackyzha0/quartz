import { resolveToRoot } from "../path"
import Darkmode from "./Darkmode"
import style from '../styles/header.scss'

export interface HeaderProps {
  title: string
  slug: string
}

export default function Header({ title, slug }: HeaderProps) {
  const baseDir = resolveToRoot(slug)
  return <header>
    <h1><a href={baseDir}>{title}</a></h1>
    <div class="spacer"></div>
    <Darkmode />
  </header>
}

Header.beforeDOMLoaded = Darkmode.beforeDOMLoaded
Header.css = style + Darkmode.css
