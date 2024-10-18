import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/banner.scss"

export default (() => {
  function Banner({ fileData }: QuartzComponentProps) {
    if (fileData.frontmatter?.banner && typeof fileData.frontmatter?.banner === "string") {
      const src = fileData.frontmatter.banner.startsWith("http")
        ? fileData.frontmatter.banner
        : "/" + fileData.frontmatter.banner
      const banner_x = fileData.frontmatter.banner_x
        ? Number(fileData.frontmatter.banner_x) * 100 + "%"
        : "50%"
      const banner_y = fileData.frontmatter.banner_y
        ? Number(fileData.frontmatter.banner_y) * 100 + "%"
        : "50%"
      return (
        <div class="banner">
          <img src={src} style={"object-position: " + banner_x + " " + banner_y}></img>
        </div>
      )
    } else {
      return <></>
    }
  }
  Banner.css = style

  return Banner
}) satisfies QuartzComponentConstructor
