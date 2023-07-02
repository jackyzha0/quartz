import { QuartzComponentConstructor } from "./types"
import style from "./styles/footer.scss"

interface Options {
  authorName: string,
  links: Record<string, string>
}

export default ((opts?: Options) => {
  function Footer() {
    const year = new Date().getFullYear()
    const name = opts?.authorName ?? "someone"
    const links = opts?.links ?? []
    return <>
      <hr />
      <footer>
        <p>Made by {name} using <a href="https://quartz.jzhao.xyz/">Quartz</a>, © {year}</p>
        <ul>{Object.entries(links).map(([text, link]) => <li>
          <a href={link}>{text}</a>
        </li>)}</ul>
      </footer>
    </>
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
