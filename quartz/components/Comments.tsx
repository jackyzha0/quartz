import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
// @ts-ignore
import script from "./scripts/comments.inline"

type Options = {
  provider: "giscus"
  options: {
    repo: `${string}/${string}`
    repoId: string
    category: string
    categoryId: string
    mapping?: "url" | "title" | "og:title" | "specific" | "number" | "pathname"
    strict?: boolean
    reactionsEnabled?: boolean
    inputPosition?: "top" | "bottom"
  }
}

function boolToStringBool(b: boolean): string {
  return b ? "1" : "0"
}

export default ((opts: Options) => {
  const Comments: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    return (
      <div
        class={classNames(displayClass, "giscus")}
        data-repo={opts.options.repo}
        data-repo-id={opts.options.repoId}
        data-category={opts.options.category}
        data-category-id={opts.options.categoryId}
        data-mapping={opts.options.mapping ?? "url"}
        data-strict={boolToStringBool(opts.options.strict ?? true)}
        data-reactions-enabled={boolToStringBool(opts.options.reactionsEnabled ?? true)}
        data-input-position={opts.options.inputPosition ?? "bottom"}
      ></div>
    )
  }

  Comments.afterDOMLoaded = script

  return Comments
}) satisfies QuartzComponentConstructor<Options>
