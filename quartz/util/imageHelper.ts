import satori, { FontWeight, SatoriOptions } from "satori/wasm"
import { GlobalConfiguration } from "../cfg"
import { JSXInternal } from "preact/src/jsx"

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

export type SocialImageOptions = {
  /**
   * What color scheme to use for image generation (uses colors from config theme)
   */
  colorScheme: "lightMode" | "darkMode"
  /**
   * Height to generate image with in pixels (should be around 630px)
   */
  height: number
  /**
   * Width to generate image with in pixels (should be around 1200px)
   */
  width: number
  /**
   * JSX to use for generating image. See satori docs for more info (https://github.com/vercel/satori)
   * @param cfg global quartz config
   * @param userOpts options that can be set by user
   * @param title title of current page
   * @param description description of current page
   * @param fonts global font that can be used for styling
   * @returns prepared jsx to be used for generating image
   */
  imageStructure: (
    cfg: GlobalConfiguration,
    userOpts: UserOpts,
    title: string,
    description: string,
    fonts: SatoriOptions["fonts"],
  ) => JSXInternal.Element
}

export type UserOpts = Omit<SocialImageOptions, "imageStructure">

export type ImageOptions = {
  /**
   * what title to use as header in image
   */
  title: string
  /**
   * what description to use as body in image
   */
  description: string
  /**
   * what fileName to use when writing to disk
   */
  fileName: string
  /**
   * what directory to store image in
   */
  fileDir: string
  /**
   * what file extension to use (should be `webp` unless you also change sharp conversion)
   */
  fileExt: string
  /**
   * header + body font to be used when generating satori image (as promise to work around sync in component)
   */
  fontsPromise: Promise<SatoriOptions["fonts"]>
  /**
   * `GlobalConfiguration` of quartz (used for theme/typography)
   */
  cfg: GlobalConfiguration
}
