import { QuartzPluginData } from "../plugins/vfile"

export type DateType = "created" | "modified" | "published"

declare module "vfile" {
  interface DataMap {
    /**
     * Dates in `dates` that no source gave, so the date plugin filled them with the build time
     * (created-modified-date ≥ 1.0.5). Absent with older versions.
     */
    fallbackDates: DateType[]
  }
}

const DATE_ONLY = /^\d{4}-\d{2}-\d{2}$/

/**
 * Whether the page's `dates[type]` is the one its frontmatter sets for that type (after the
 * frontmatter built-in's aliases such as `date` or `lastmod`), rather than one from git or the
 * file system. Compared by value, so it holds whatever `priority` the date plugin uses.
 * Date-only values (`2024-01-02`) are local midnight, as the date plugin reads them.
 */
export function dateIsFromFrontmatter(
  data: QuartzPluginData,
  date: Date | undefined,
  type: string | undefined = data.defaultDateType as string | undefined,
): boolean {
  if (!(date instanceof Date) || isNaN(date.getTime())) return false
  const frontmatter = data.frontmatter as Record<string, unknown> | undefined
  if (!type || !frontmatter) return false
  let raw = frontmatter[type]
  if (raw === undefined || raw === null || raw === "") return false
  if (typeof raw === "string" && DATE_ONLY.test(raw)) raw = `${raw}T00:00:00`
  if (!(raw instanceof Date) && typeof raw !== "string" && typeof raw !== "number") return false
  const fromFrontmatter = new Date(raw)
  return !isNaN(fromFrontmatter.getTime()) && fromFrontmatter.getTime() === date.getTime()
}

/**
 * The page's date of this type when it is a real one, `undefined` when it is missing, invalid
 * or a stand-in (the build time the date plugin fills in for a date no source gave).
 *
 * The date plugin lists stand-ins in `fallbackDates`. Older versions don't, so without that
 * list a `published` date only counts when it is the frontmatter's (frontmatter is its only
 * source); `created` and `modified` are taken as they are.
 */
export function realDate(data: QuartzPluginData, type: string | undefined): Date | undefined {
  if (!type) return undefined
  const date = (data.dates as Record<string, unknown> | undefined)?.[type]
  if (!(date instanceof Date) || isNaN(date.getTime())) return undefined
  const fallbacks = data.fallbackDates
  if (Array.isArray(fallbacks)) return fallbacks.includes(type as DateType) ? undefined : date
  if (type === "published" && !dateIsFromFrontmatter(data, date, "published")) return undefined
  return date
}
