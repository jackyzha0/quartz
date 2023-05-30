import path from 'path'

// Replaces all whitespace with dashes and URI encodes the rest
export function pathToSlug(fp: string): string {
  const { dir, name } = path.parse(fp)
  let slug = path.join('/', dir, name)
  slug = slug.replace(/\s/g, '-')
  return slug
}

// resolve /a/b/c to ../../
export function resolveToRoot(slug: string): string {
  let fp = slug
  if (fp.endsWith("/index")) {
    fp = fp.slice(0, -"/index".length)
  }

  return "./" + path.relative(fp, path.posix.sep)
}
