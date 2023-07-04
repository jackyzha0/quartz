import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import readingTime from "reading-time"

function ReadingTime({ fileData }: QuartzComponentProps) {
  const text = fileData.text
  if (text) {
    const { text: timeTaken, words } = readingTime(text)
    return <p class="reading-time">{words} words, {timeTaken}</p>
  } else {
    return null
  }
}

ReadingTime.css = `
.reading-time {
  margin-top: 0;
  color: var(--gray);
}
`

export default (() => ReadingTime) satisfies QuartzComponentConstructor
