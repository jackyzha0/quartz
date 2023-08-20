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
        <center>
        <h2>ᜇ The Long Walk</h2>
        <p><b>A newsletter about philosophical and contemplative living through walking and writing.</b></p>
        <p>Every Sunday, I ask myself, is there something in the forest garden worth sharing?</p>
        <p>If there is I send one. It could be a poem, a vignette, an insight, or an essay.</p>
        <p>It's free and you can unsubscribe anytime.</p>
        <p>
          <a href="https://vinceimbat.com/newsletter">Subscribe here.</a>
        </p>
        <hr />
        <p>
          Follow all changes in the forest garden via <a href="https://vinceimbat.com/index.xml">RSS.</a>
        </p>
        <p>
          This forest garden of the mind was explored and cultivated using <a href="https://quartz.jzhao.xyz/">Quartz v{version}</a>, © {year}
        </p>
        </center>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor
