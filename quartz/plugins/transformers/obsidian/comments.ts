const commentRegex = /%%[\s\S]*?%%/g

// do comments at text level
export const commentsTextTransform = (src: string | Buffer) => {
  if (src instanceof Buffer) {
    src = src.toString()
  }

  src = src.replace(commentRegex, "")
}
