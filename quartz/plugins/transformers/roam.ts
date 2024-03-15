import { QuartzTransformerPlugin } from "../types"
import { PluggableList } from "unified"
import { SKIP, visit } from "unist-util-visit"
import { Root, Html, BlockContent, DefinitionContent, Paragraph, Code } from "mdast"
import { FilePath, pathToRoot, slugTag, slugifyFilePath } from "../../util/path"
import { ReplaceFunction, findAndReplace as mdastFindReplace } from "mdast-util-find-and-replace"

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

// const multimediaRegex = new RegExp(/{{.*?\b(video|audio)\b.*?\:(.*?)}}/, "g")


const audioRegex = new RegExp(/{{.*?\baudio\b.*?\:(.*?)}}/, "g")
const pdfRegex = new RegExp(/{{.*?\bpdf\b.*?\:(.*?)}}/, "g")
const blockquoteRegex = new RegExp(/(\[\[>\]\])\s*(.*)/, "g");
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
      // if (opts.videoComponent) {
      //   //youtube first then regular video links
      //   src = src.toString()
      //   src = src.replaceAll(youtubeRegex, (value, ...capture) => {
      //     const [match, text] = capture
      //     const video = `<iframe width="600px" height="350px" src="https://www.youtube.com/embed/${text}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
      //     return video
      //   })
      //   src = src.replaceAll(videoRegex, (value, ...capture) => {
      //     const [match, text] = capture
      //     const video = `<video controls><source src="{${match}}" type="video/mp4"><source src="${match}" type="video/webm"></video>`
      //     return video
      //   })
      // }
      // if (opts.audioComponent) {
      //   src = src.toString()
      //   src = src.replaceAll(audioRegex, (value, ...capture) => {
      //     const [match, text] = capture
      //     const audio = `<audio controls>
      //       <source src="${match}" type="audio/mpeg">
      //       <source src="${match}" type="audio/ogg">
      //       Your browser does not support the audio tag.
      //     </audio>`
      //     return audio
      //   })
      // }
      // if (opts.pdfComponent) {
      //   src = src.toString()
      //   src = src.replaceAll(pdfRegex, (value, ...capture) => {
      //     const [match, text] = capture
      //     const pdf = `<embed src="${match}" type="application/pdf" width="600" height="800">`
      //     return pdf
      //   })
      // }
      // if (opts.blockquoteComponent) {
      //   src = src.toString()
      //   src = src.replaceAll(blockquoteRegex, (value, ...capture) => {
      //     const bq = `>`
      //     return bq
      //   })
      // }
      // TODO attributes in roam are sort of like block level frontmatter or tags

      // roam italics
      if (src instanceof Buffer) {
        src = src.toString()        
      }

      src = src.replaceAll(roamItalicRegex, (value, ...capture) => {
        const [match, text] = capture
        const italic = `*${match}*`
        return italic
      })
      

      return src
    },

    markdownPlugins(ctx) {
      const plugins: PluggableList = []
      const cfg = ctx.cfg.configuration

      plugins.push(() => {
        return (tree: Root, file) => {
          const replacements: [RegExp, string | ReplaceFunction][] = []
          const base = pathToRoot(file.data.slug!)
          // roam highlight syntax
          replacements.push([
            roamHighlightRegex,
            (_value: string, ...capture: string[]) => {
              const [inner] = capture
              return {
                type: "html",
                value: `<span class="text-highlight"> ${inner} </span>`,
              }
            },
          ])
          if (opts.orComponent) {
            replacements.push([
              orRegex,
              (match: string) => {
                // Attempt to extract the content within the curly braces and split by '|'
                const matchResult = match.match(/{{or:(.*?)}}/);
                if (matchResult === null) {
                  // Handle the case where no match is found, e.g., return an empty string or some default value
                  return { type: "html", value: "" };
                }
          
                const optionsString: string = matchResult[1];
                const options: string[] = optionsString.split("|");
          
                // Generate the HTML <select> element with options
                const selectHtml: string = `<select>${options.map((option: string) => `<option value="${option}">${option}</option>`).join("")}</select>`;
          
                return {
                  type: "html",
                  value: selectHtml,
                };
              },
            ]);
          }
          if (opts.TODOComponent) {
            replacements.push([
              TODORegex,
              (match) => {
                return {
                  type: "html",
                  value: `<input type="checkbox" disabled>`,
                }
              },
            ])
          }
          if (opts.DONEComponent) {
            replacements.push([
              DONERegex,
              (match) => {
                return {
                  type: "html",
                  value: `<input type="checkbox" checked disabled>`,
                }
              },
            ])
          }
          if (opts.blockquoteComponent) {
            replacements.push([
              blockquoteRegex,
              (match, marker, content) => {
                const blockquoteHtml = `<blockquote>${content.trim()}</blockquote>`;
                return {
                  type: "html",
                  value: blockquoteHtml,
                };
              },
            ]);
          }
          if (opts.audioComponent) {            
            replacements.push([
              audioRegex,
              (_value: string, ...capture: string[]) => {
                const [url] = capture;
                console.log("");
                console.log(" ~", capture);
                
                const audioHtml = `<audio controls>
                    <source src="${url}" type="audio/mpeg">
                    <source src="${url}" type="audio/ogg">
                    Your browser does not support the audio tag.
                </audio>`;
        
                return {
                  type: "html",
                  value: audioHtml,
                };
              }
            ]);
          }
          
          mdastFindReplace(tree, replacements)
        }
      })
      return plugins
    },
  }
}
