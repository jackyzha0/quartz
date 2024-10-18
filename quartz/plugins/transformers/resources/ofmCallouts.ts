import { ExternalResourcePlugin } from "../../types"
import { JSResource } from "../../../util/resources"
// @ts-ignore
import calloutScript from "../../../components/scripts/callout.inline.ts"

export const ObsidianFlavoredMarkdownCallouts: ExternalResourcePlugin = () => {
  return {
    name: "ObsidianFlavoredMarkdownCallouts",
    transformation() {
      const js: JSResource[] = []

      js.push({
        script: calloutScript,
        loadTime: "afterDOMReady",
        contentType: "inline",
      })

      return { js }
    },
  }
}
