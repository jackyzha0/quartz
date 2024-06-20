import style from "./styles/recentblog.scss"
import { i18n } from "../i18n"
import { FullSlug, resolveRelative } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { Data } from "vfile"

export default (() => {

    const RecentBlog: QuartzComponent = ({
        allFiles,
        fileData,
        cfg
    }: QuartzComponentProps) => {

        const page = allFiles.reduce((prev, curr) => {
            const isValid = (p: Data) => {
                return p.filePath?.startsWith("content/blogs/graphics/") && !p.frontmatter?.draft
            }

            if (!isValid(curr)) {
                return prev
            } else if (!isValid(prev)) {
                return curr
            }

            const prevDate = prev.dates?.published ?? new Date(1970, 1, 1)
            const currDate = curr.dates?.published ?? new Date(1970, 1, 1)
            if (currDate > prevDate) {
                return curr
            }
            return prev
        }, allFiles[0])

        const title = page.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title
        const tags = page.frontmatter?.tags ?? []

        return fileData.filePath?.startsWith("content/index") ? (
            <blockquote class="callout blog" data-callout="blog">
                <div class="callout-title">
                    <div class="callout-icon"></div>
                    <div class="callout-title-inner">
                        <p>Latest Blog </p>
                    </div>
                </div>

                <div class="preview">
                    <img class="preview-image" src={page.frontmatter?.previewImg!} width="150" height="150" />
                    <div class="preview-content">
                        <div class="preview-title">
                            <div>
                                <a href={resolveRelative(fileData.slug!, page.slug!)} class="internal">
                                    {title}
                                </a>
                            </div>

                            <i>{page.frontmatter?.publishDate!}</i>
                        </div>
                        <ul class="preview-tags tags">
                            {tags.map((tag) => (
                                <li>
                                    <a
                                        class="internal tag-link"
                                        href={resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)}
                                    >
                                        {tag}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <p>{page.description}</p>
                    </div>
                </div>
            </blockquote>
        ) : <></>
    }

    RecentBlog.css = style
    return RecentBlog
}) satisfies QuartzComponentConstructor