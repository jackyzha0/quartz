import { QuartzComponentConstructor, QuartzComponentProps } from "./types"

function Spacer({ displayClass }: QuartzComponentProps) {
  const className = displayClass ? `spacer ${displayClass}` : "spacer"
  return <div class={className}></div>
}

export default (() => Spacer) satisfies QuartzComponentConstructor
