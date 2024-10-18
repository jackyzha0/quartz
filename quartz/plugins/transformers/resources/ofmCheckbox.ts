import { ExternalResourcePlugin } from "../../types"
import { JSResource } from "../../../util/resources"
// @ts-ignore
import checkboxScript from "../../../components/scripts/checkbox.inline.ts"

export const ObsidianFlavoredMarkdownCheckbox: ExternalResourcePlugin = () => {
  return {
    name: "ObsidianFlavoredMarkdownCheckbox",
    transformation() {
      const js: JSResource[] = []

      js.push({
        script: checkboxScript,
        loadTime: "afterDOMReady",
        contentType: "inline",
      })

      return { js }
    },
  }
}
