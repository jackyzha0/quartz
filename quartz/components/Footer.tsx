import { QuartzComponentConstructor } from "./types"
import style from "./styles/footer.scss"
import { version } from "../../package.json"

interface Options {
  links: Record<string, string>
}

export default ((opts?: Options) => {
  function Footer() {
    const year = new Date().getFullYear()
    const links = opts?.links ?? []
    return (
      <footer>
        <hr />
        <p>
          Created with <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a>, © {year}
        </p>
        <div>
        <ul>
          {Object.entries(links).map(([text, link]) => (
            <li>
              <a href={link}>{text}</a>
            </li>
          ))}
        </ul>
        </div>
        <div>
          <ul>
            <li>
              <a href="https://beian.miit.gov.cn/" target="_blank">粤ICP备2023005911号</a>
            </li>
            <li>
              <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44011302003870"><img src="./public/001.png"/>粤公网安备 44011302003870号</a>
            </li>
          </ul>
        </div>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
