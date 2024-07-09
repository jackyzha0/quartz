import { formatDate, getDate } from "./Date"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import readingTime from "reading-time"
import { classNames } from "../util/lang"
import { i18n } from "../i18n"
import { JSX } from "preact"
import style from "./styles/contentMeta.scss"

interface ContentMetaOptions {
  showReadingTime: boolean
  showBacklinkLink: boolean
  showFootnoteLink: boolean
  showComma: boolean
}

const defaultOptions: ContentMetaOptions = {
  showReadingTime: true,
  showBacklinkLink: true,
  showFootnoteLink: true,
  showComma: true,
}

export default ((opts?: Partial<ContentMetaOptions>) => {
  // Merge options with defaults
  const options: ContentMetaOptions = { ...defaultOptions, ...opts }

  function getGithubLink(filePath: string): string {
    const githubBaseUrl = "https://raw.githubusercontent.com/brickfrog/notes.justin.vc/v4/"
    return `${githubBaseUrl}${filePath}`
  }

  function ContentMetadata({ cfg, fileData, displayClass }: QuartzComponentProps) {
    const text = fileData.text

    if (text) {
      const segments: (string | JSX.Element)[] = []

      let segment: JSX.Element | null = null

      if (fileData.dates?.created) {
        const createdDate = formatDate(getDate(cfg, fileData)!, cfg.locale)
        const githubLink = fileData.filePath ? getGithubLink(fileData.filePath) : "#"

        const createdDateSegment = (
          <a href={githubLink} title="This is the date the note was created.">
            {createdDate}
          </a>
        )

        if (fileData.frontmatter?.lastmod) {
          const modifiedDate = formatDate(getDate(cfg, fileData, "modified")!, cfg.locale)
          if (createdDate !== modifiedDate) {
            const createdDateSegment = (
              <span title="This is the date the note was created.">{createdDate}</span>
            )

            const modifiedDateSegment = (
              <a href={githubLink} title="The date of the last modification.">
                {modifiedDate}
              </a>
            )
            segment = (
              <span>
                {createdDateSegment}–{modifiedDateSegment}
              </span>
            )
          } else {
            segment = createdDateSegment
          }
        } else {
          segment = createdDateSegment
        }
      }

      if (segment) {
        segments.push(segment)
      }

      // Display reading time if enabled
      if (options.showReadingTime) {
        const { minutes, words: _words } = readingTime(text)
        const displayedTime = i18n(cfg.locale).components.contentMeta.readingTime({
          minutes: Math.ceil(minutes),
        })
        segments.push(displayedTime)
      }

      // Display link to footnotes if enabled
      if (options.showFootnoteLink) {
        const footnoteLinkSegment = (
          <a href="#footnotes" title="Convenience link to the footnotes.">
            footnotes
          </a>
        )
        segments.push(footnoteLinkSegment)
      }

      // Display link to backlinks if enabled
      if (options.showBacklinkLink) {
        const backlinkSegment = (
          <a href="#backlinks" title="Convenience link to the footnotes.">
            backlinks
          </a>
        )
        segments.push(backlinkSegment)
      }

      const segmentsElements = segments.map((segment) => <span>{segment}</span>)

      return (
        <p show-comma={options.showComma} class={classNames(displayClass, "content-meta")}>
          {segmentsElements}
        </p>
      )
    } else {
      return null
    }
  }

  ContentMetadata.css = style

  return ContentMetadata
}) satisfies QuartzComponentConstructor
