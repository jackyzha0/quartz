import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

function Spacer({ displayClass }: QuartzComponentProps) {
  return <div class={`spacer ${displayClass ?? ""}`}></div>
}

export default (() => Spacer) satisfies QuartzComponentConstructor
