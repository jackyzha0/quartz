/**
 * Get the `.ttf` file (as ArrayBuffer) of a font by google font name
 * @param font a valid google font
 */
export async function getTtfFromGfont(font: string) {
  const css = await (await fetch(`https://fonts.googleapis.com/css?family=${font}`)).text()
  const urlRegex = /url\((https:\/\/fonts.gstatic.com\/s\/.*?.ttf)\)/g
  const match = urlRegex.exec(css)
  if (match) {
    // fontData is an ArrayBuffer containing the .ttf file data
    const fontTtf = await (await fetch(match[1])).arrayBuffer()
    return fontTtf
  }
}
