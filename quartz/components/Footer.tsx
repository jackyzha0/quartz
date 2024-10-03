import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"
import { i18n } from "../i18n"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    const beginYear = 2022
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    return (
      <footer class={`${displayClass ?? ""}`}>
        <hr />
        <script src="https://utteranc.es/client.js"
          repo="jyje/docs"
          issue-term="url"
          label="💬 comment"
          theme="github-light"
          crossorigin="anonymous"
          async>
        </script>
        <hr />
        <p>
          {i18n(cfg.locale).components.footer.createdWith}{" "}
          <a href="https://jyje.live">jyje.live</a>
          {" "}©{" "}{beginYear}-{year}.{" "}
          {i18n(cfg.locale).components.footer.poweredBy}{" "}
          <a href="https://quartz.jzhao.xyz">Quartz v{version}</a>
          {" "}and{" "}
          <a href="https://pages.github.com">GitHub Pages</a>
          {" "}with ♥️.
        </p>
        <ul>
          {Object.entries(links).map(([text, link]) => (
            <li>
              <a href={link}>{text}</a>
            </li>
          ))}
        </ul>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
