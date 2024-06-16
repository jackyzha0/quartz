import style from "./styles/recentblog.scss"

// @ts-ignore: typescript doesn't know about our inline bundling system
// so we need to silence the error
import script from "./scripts/graphicsblog.inline"

import { i18n } from "../i18n"
import { FullSlug, resolveRelative } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { Data } from "vfile"

export default (() => {

    const GraphicsBlogs: QuartzComponent = ({
        allFiles,
        fileData,
        cfg
    }: QuartzComponentProps) => {

        const pages = allFiles.filter(curr => {
            const isValid = (p: Data) => {
                return p.filePath?.startsWith("content/blogs/graphics/") && !p.frontmatter?.draft
            }
            return isValid(curr)
        })

        const parseDate = (date: Date) => {
            return date.toLocaleDateString('en-US') //`${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`
        }

        return (
            <div class="preview-graphics">
                <h2 id="graphics-blog">
                    Graphics Blogs
                </h2>

                {pages.map(page => {
                    const title = page.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title
                    const tags = page.frontmatter?.tags ?? []

                    return (<div class="preview">
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
                    </div>)
                })}
            </div>
        )
    }

    GraphicsBlogs.afterDOMLoaded = script;
    GraphicsBlogs.css = style


    return GraphicsBlogs
}) satisfies QuartzComponentConstructor