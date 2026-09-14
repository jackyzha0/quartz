import {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "../../../quartz/components/types"

/**
 * Site navigation — Blueprint §3: Research · CV · Writing · Wiki.
 * Rendered in the `header` position (injected via quartz.ts layout overrides).
 */
const links: { label: string; href: string; section: string }[] = [
  { label: "Research", href: "/research/", section: "research" },
  { label: "CV", href: "/cv/", section: "cv" },
  { label: "Writing", href: "/writing/", section: "writing" },
  { label: "Wiki", href: "/wiki/", section: "wiki" },
]

const SiteNav: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const slug = fileData.slug ?? ""
  return (
    <nav class="site-nav" aria-label="Site">
      {links.map(({ label, href, section }) => {
        const active = slug === section || slug.startsWith(`${section}/`)
        return (
          <a
            href={href}
            class={`site-nav-link${active ? " active" : ""}`}
            aria-current={active ? "page" : undefined}
          >
            {label}
          </a>
        )
      })}
    </nav>
  )
}

export default (() => SiteNav) satisfies QuartzComponentConstructor
