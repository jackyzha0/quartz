import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import readingTime from "reading-time"

function ReadingTime({ fileData }: QuartzComponentProps) {
  const text = fileData.text
  const isHomePage = fileData.slug === "index"
  if (text && !isHomePage) {
    const { text: timeTaken, words } = readingTime(text)
    return <p class="reading-time">{words} words, {timeTaken}</p>
  } else {
    return null
  }
}

ReadingTime.css = `
.reading-time {
  margin-top: 0;
  opacity: 0.5;
}
`

export default (() => ReadingTime) satisfies QuartzComponentConstructor
