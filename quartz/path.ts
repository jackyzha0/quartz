import path from 'path'
import SlugAnchor from 'github-slugger'

export const slugAnchor = new SlugAnchor()

function slugSegment(s: string): string {
  return s.replace(/\s/g, '-')
}

export function slugify(s: string): string {
  const [fp, anchor] = s.split("#", 2)
  const sluggedAnchor = anchor === undefined ? "" : "#" + slugAnchor.slug(anchor)
  const withoutFileExt = fp.replace(new RegExp(path.extname(fp) + '$'), '')
  const rawSlugSegments = withoutFileExt.split(path.sep)
  const slugParts: string = rawSlugSegments
    .map((segment) => slugSegment(segment))
    .join(path.posix.sep)
    .replace(/\/$/, '')
  return path.normalize(slugParts) + sluggedAnchor
}

// resolve /a/b/c to ../../
export function resolveToRoot(slug: string): string {
  let fp = slug
  if (fp.endsWith("index")) {
    fp = fp.slice(0, -"index".length)
  }

  if (fp === "") {
    return "."
  }

  return "./" + fp
    .split('/')
    .filter(x => x !== '')
    .map(_ => '..')
    .join('/')
}

export function relativeToRoot(slug: string, fp: string): string {
  return path.join(resolveToRoot(slug), fp)
}

export function relative(src: string, dest: string): string {
  return path.relative(src, dest)
}

export const QUARTZ = "quartz"
