import style from "./styles/recentblog.scss"
import { i18n } from "../i18n"
import { resolveRelative } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default (() => {

    const RecentBlog: QuartzComponent = ({
        allFiles,
        fileData,
        cfg
    }: QuartzComponentProps) => {

        const page = allFiles.reduce((prev, curr) => {
            console.log(fileData.filePath)
            if (!curr.filePath?.startsWith("content/blogs/")) {
                return prev
            } else if (!prev.filePath?.startsWith("content/blogs/")) {
                return curr
            }

            const prevDate = prev.dates?.created ?? new Date(1970, 1, 1)
            const currDate = curr.dates?.created ?? new Date(1970, 1, 1)
            if (currDate > prevDate) {
                return curr
            }
            return prev
        }, allFiles[0])

        const title = page.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title
        const parseDate = (date: Date) => {
            return date.toLocaleDateString('en-US') //`${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`
        }


        return fileData.filePath?.startsWith("content/index") ? (
            <blockquote class="callout blog" data-callout="blog">
                <div class="callout-title">
                    <div class="callout-icon"></div>
                    <div class="callout-title-inner">
                        <p>Latest Blog </p>
                    </div>
                </div>

                <div class="preview">
                    <img class="preview-image" src="./Resources/crepuscular_rays_fake.png" width="150" height="150" />
                    <div class="preview-content">
                        <div class="preview-title">
                            <div>
                                <a href={resolveRelative(fileData.slug!, page.slug!)} class="internal">
                                    {title}
                                </a>
                            </div>

                            <i>{parseDate(page.dates?.published!)}</i>
                        </div>

                        <p>{page.description}</p>
                    </div>
                </div>
            </blockquote>
        ) : <></>
    }

    RecentBlog.css = style
    return RecentBlog
}) satisfies QuartzComponentConstructor