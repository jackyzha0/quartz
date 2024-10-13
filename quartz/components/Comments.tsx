import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
// @ts-ignore
import script from "./scripts/comments.inline"

function boolToStringBool(b: boolean): string {
  return b ? "1" : "0"
}

export default (() => {
  const Comments: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
    switch (cfg.comments?.provider) {
      case "giscus":
        return (
          <div id="comment" data-provider={cfg.comments.provider}>
            <div
              class={classNames(displayClass, "giscus")}
              data-repo={cfg.comments?.repo}
              data-repo-id={cfg.comments?.repoId}
              data-category={cfg.comments?.category}
              data-category-id={cfg.comments?.categoryId}
              data-mapping={cfg.comments?.mapping ?? "url"}
              data-strict={boolToStringBool(cfg.comments?.strict ?? true)}
              data-reactions-enabled={boolToStringBool(cfg.comments?.reactionsEnabled ?? true)}
              data-input-position={cfg.comments?.inputPosition ?? "bottom"}
            ></div>
          </div>
        )
      case "commento":
        return (
          <div id="comment" data-provider={cfg.comments.provider}>
            <div
              id="commento"
              data-host={cfg.comments?.host ?? "cdn.commento.io"}
              data-css-override={cfg.comments?.cssOverride ?? ""}
              data-no-fonts={cfg.comments?.noFonts ?? true}
              data-hide-deleted={cfg.comments?.hideDeleted ?? false}
            ></div>
          </div>
        )
      case "disqus":
        return (
          <div id="comment" data-provider={cfg.comments.provider}>
            <div id="disqus_thread" data-short-name={cfg.comments?.shortName}></div>
          </div>
        )
      default:
        return <></>
    }
  }

  Comments.afterDOMLoaded = script

  return Comments
}) satisfies QuartzComponentConstructor
