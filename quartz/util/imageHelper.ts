import { FontWeight, SatoriOptions } from "satori/wasm"

/**
 * Get an array of `FontOptions` (for satori) given google font names
 * @param headerFontName name of google font used for header
 * @param bodyFontName name of google font used for body
 * @returns FontOptions for header and body
 */
export async function getSatoriFont(headerFontName: string, bodyFontName: string) {
  const headerWeight = 700 as FontWeight
  const bodyWeight = 400 as FontWeight

  // Fetch fonts
  const headerFont = await fetchTtf(headerFontName, headerWeight)
  const bodyFont = await fetchTtf(bodyFontName, bodyWeight)

  // Convert fonts to satori font format and return
  const fonts: SatoriOptions["fonts"] = [
    { name: headerFontName, data: headerFont, weight: headerWeight, style: "normal" },
    { name: bodyFontName, data: bodyFont, weight: bodyWeight, style: "normal" },
  ]
  return fonts
}

/**
 * Get the `.ttf` file of a google font
 * @param fontName name of google font
 * @param weight what font weight to fetch font
 * @returns `.ttf` file of google font
 */
function fetchTtf(fontName: string, weight: FontWeight): Promise<ArrayBuffer> {
  return new Promise(async (resolve, reject) => {
    // Get css file from google fonts
    const css = await (
      await fetch(`https://fonts.googleapis.com/css?family=${fontName}:${weight}`)
    ).text()

    // Extract .ttf url from css file
    const urlRegex = /url\((https:\/\/fonts.gstatic.com\/s\/.*?.ttf)\)/g
    const match = urlRegex.exec(css)
    if (match) {
      // fontData is an ArrayBuffer containing the .ttf file data
      const fontData = await (await fetch(match[1])).arrayBuffer()
      resolve(fontData)
    } else {
      reject("Could not fetch font")
    }
  })
}
