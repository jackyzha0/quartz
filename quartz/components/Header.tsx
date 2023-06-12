import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

function Header({ children }: QuartzComponentProps) {
  return <header>
    {children}
  </header>
}

Header.css = `
header {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 1em 0 2em 0;
  & > h1 {
  }
}

header > h1 {
  margin: 0;
  flex: auto;
}
`

export default (() => Header) satisfies QuartzComponentConstructor
