import { formatDate, getDate } from "./Date"
import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import readingTime from "reading-time"

export default (() => {
  function ContentMetadata({ cfg, fileData }: QuartzComponentProps) {
    const text = fileData.text
    if (text) {
      const segments: string[] = []
      const { text: timeTaken, words: _words } = readingTime(text)

      if (fileData.dates) {
        const createdDate = formatDate(getDate(cfg, fileData)!)
        const modifiedDate = formatDate(fileData.dates.modified) // Assuming fileData contains a 'dates' object with 'modified' property

        segments.push(`Created: ${createdDate}, Modified: ${modifiedDate}`)
      }

      // segments.push(timeTaken)
      return <div className="content-meta"><br />{segments.join(", ")}<br />{timeTaken}</div>
    } else {
      return null
    }
  }

  ContentMetadata.css = `
  .content-meta {
    margin-top: 0;
    color: var(--gray);
  }
  `
  return ContentMetadata
}) satisfies QuartzComponentConstructor