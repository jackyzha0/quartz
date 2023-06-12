import { QuartzComponentConstructor } from "./types"

function Spacer() {
  return <div class="spacer"></div>
}

export default (() => Spacer) satisfies QuartzComponentConstructor
