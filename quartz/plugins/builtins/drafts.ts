import { QuartzFilterPlugin } from "../types"
import { DraftsConfig } from "../../cfg"

/**
 * Built-in draft handling (formerly `@quartz-community/remove-draft`): pages whose frontmatter
 * has `draft: true` (or `"true"`) are not published. Set `configuration.drafts.publish: true` to
 * publish them anyway (e.g. for a preview deployment).
 */
export function isDraft(frontmatter: Record<string, unknown> | undefined): boolean {
  const draft = frontmatter?.draft
  return draft === true || draft === "true"
}

export const Drafts: QuartzFilterPlugin<DraftsConfig> = () => ({
  name: "Drafts",
  shouldPublish(_ctx, [_tree, vfile]) {
    return !isDraft(vfile.data?.frontmatter as Record<string, unknown> | undefined)
  },
})
