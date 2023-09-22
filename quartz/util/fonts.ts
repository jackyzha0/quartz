import { FontWeight, SatoriOptions } from "satori/wasm"

/**
 * Get an array of `FontOptions` (for satori) given google font names
 * @param headerFontName name of google font used for header
 * @param bodyFontName name of google font used for body
 * @returns FontOptions for header and body
 */
export async function getSatoriFont(headerFontName: string, bodyFontName: string) {
  const headerFont = await fetchTtf(headerFontName, 700)
  const bodyFont = await fetchTtf(bodyFontName, 400)

  const fonts: SatoriOptions["fonts"] = [headerFont, bodyFont]
  return fonts
}

function fetchTtf(
  fontName: string,
  weight: FontWeight,
): Promise<GetElementType<SatoriOptions["fonts"]>> {
  return new Promise(async (resolve, reject) => {
    const css = await (
      await fetch(`https://fonts.googleapis.com/css?family=${fontName}:${weight}`)
    ).text()
    const urlRegex = /url\((https:\/\/fonts.gstatic.com\/s\/.*?.ttf)\)/g
    const match = urlRegex.exec(css)
    if (match) {
      // fontData is an ArrayBuffer containing the .ttf file data
      const fontTtf = await (await fetch(match[1])).arrayBuffer()
      resolve({ name: fontName, data: fontTtf, weight: weight as FontWeight, style: "normal" })
    } else {
      reject("Could not fetch font")
    }
  })
}

// Type helper
type GetElementType<T extends any[]> = T extends (infer U)[] ? U : never
