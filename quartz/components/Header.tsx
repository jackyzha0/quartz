import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "../components/styles/header.scss";

const Header: QuartzComponent = ({ children }: QuartzComponentProps) => {
  return children.length > 0 ? <header>{children}</header> : null
}

Header.css = style

export default (() => Header) satisfies QuartzComponentConstructor