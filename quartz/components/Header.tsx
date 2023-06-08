import style from './styles/header.scss'
import { QuartzComponentProps } from "./types"

export default function Header({ children }: QuartzComponentProps) {
  return <header>
    {children}
  </header>
}

Header.css = style
