import { QuartzTransformerPlugin } from "../types"

export interface Options {
  orComponent: boolean
  TODOComponent: boolean
  DONEComponent: boolean
  videoComponent: boolean
  audioComponent: boolean
  pdfComponent: boolean
  blockquoteComponent: boolean
  tableComponent: boolean
  attributeComponent: boolean
}

const defaultOptions: Options = {
  orComponent: true,
  TODOComponent: true,
  DONEComponent: true,
  videoComponent: true,
  audioComponent: true,
  pdfComponent: true,
  blockquoteComponent: true,
  tableComponent: true,
  attributeComponent: true,
}

const orRegex = new RegExp(/{{or:(.*?)}}/, "g")
const TODORegex = new RegExp(/{{.*?\bTODO\b.*?}}/, "g")
const DONERegex = new RegExp(/{{.*?\bDONE\b.*?}}/, "g")
const videoRegex = new RegExp(/{{.*?\bvideo\b.*?\:(.*?)}}/, "g")
const youtubeRegex = new RegExp(/{{.*?\bvideo\b.*?(\bhttp.*?\byoutu.*?)watch\?v=(.*?)}}/, "g")

const audioRegex = new RegExp(/{{.*?\baudio\b.*?\:(.*?)}}/, "g")
const pdfRegex = new RegExp(/{{.*?\bpdf\b.*?\:(.*?)}}/, "g")
const blockquoteRegex = new RegExp(/\[\[>\]\]/, "g")
const roamHighlightRegex = new RegExp(/\^\^(.+)\^\^/, "g")
const roamItalicRegex = new RegExp(/__(.+)__/, "g")
const tableRegex = new RegExp(/- {{.*?\btable\b.*?}}/, "g") /* TODO */
const attributeRegex = new RegExp(/\b\w+(?:\s+\w+)*::/, "g") /* TODO */

export const RoamFlavoredMarkdown: QuartzTransformerPlugin<Partial<Options> | undefined> = (
  userOpts,
) => {
  const opts = { ...defaultOptions, ...userOpts }

  return {
    name: "RoamFlavoredMarkdown",
    textTransform(_ctx, src) {
      if (opts.orComponent) {
        src = src.toString()
        src = src.replaceAll(orRegex, (value, ...capture) => {
          const [match, text] = capture
          const options = match.split("|")
          const id = Math.random().toString(36).substring(2, 15) // Generate a unique ID
          const dropdown = `<select class="roam-or-component">${options.map((option: string) => `<option>${option}</option>`).join("")}</select>`
          return dropdown
        })
      }
      if (opts.TODOComponent) {
        src = src.toString()
        src = src.replaceAll(TODORegex, (value, ...capture) => {
          const checkbox = '<input type="checkbox" disabled>'
          return checkbox
        })
      }
      if (opts.DONEComponent) {
        src = src.toString()
        src = src.replaceAll(DONERegex, (value, ...capture) => {
          const checkbox = '<input type="checkbox" checked disabled>'
          return checkbox
        })
      }
      if (opts.videoComponent) {
        //youtube first then regular video links
        src = src.toString()
        src = src.replaceAll(youtubeRegex, (value, ...capture) => {
          const [match, text] = capture
          const video = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${text}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
          return video
        })
        src = src.replaceAll(videoRegex, (value, ...capture) => {
          const [match, text] = capture
          const video = `<video controls><source src="{${match}}" type="video/mp4"><source src="${match}" type="video/webm"></video>`
          return video
        })
      }
      if (opts.audioComponent) {
        src = src.toString()
        src = src.replaceAll(audioRegex, (value, ...capture) => {
          const [match, text] = capture
          const audio = `<audio controls>
            <source src="${match}" type="audio/mpeg">
            <source src="${match}" type="audio/ogg">
            Your browser does not support the audio tag.
          </audio>`
          return audio
        })
      }
      if (opts.pdfComponent) {
        src = src.toString()
        src = src.replaceAll(pdfRegex, (value, ...capture) => {
          const [match, text] = capture
          const pdf = `<embed src="${match}" type="application/pdf" width="600" height="800">`
          return pdf
        })
      }
      if (opts.blockquoteComponent) {
        src = src.toString()
        src = src.replaceAll(blockquoteRegex, (value, ...capture) => {
          const bq = `>`
          return bq
        })
      }
      // TODO attributes in roam are sort of like block level frontmatter or tags

      src = src.toString()
      src = src.replaceAll(roamHighlightRegex, (value, ...capture) => {
        const [match, text] = capture
        const highlight = `==${match}==`
        return highlight
      })
      // roam italics
      src = src.replaceAll(roamItalicRegex, (value, ...capture) => {
        const [match, text] = capture
        const italic = `*${match}*`
        return italic
      })

      return src
    },
  }
}
