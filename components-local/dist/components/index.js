// components-local/src/components/Nav.tsx
import { jsx } from "preact/jsx-runtime";
var links = [
  { label: "Research", href: "/research/", section: "research" },
  { label: "CV", href: "/cv/", section: "cv" },
  { label: "Writing", href: "/writing/", section: "writing" },
  { label: "Wiki", href: "/wiki/", section: "wiki" }
];
var SiteNav = ({ fileData }) => {
  const slug = fileData.slug ?? "";
  return /* @__PURE__ */ jsx("nav", { class: "site-nav", "aria-label": "Site", children: links.map(({ label, href, section }) => {
    const active = slug === section || slug.startsWith(`${section}/`);
    return /* @__PURE__ */ jsx(
      "a",
      {
        href,
        class: `site-nav-link${active ? " active" : ""}`,
        "aria-current": active ? "page" : void 0,
        children: label
      }
    );
  }) });
};
var Nav_default = (() => SiteNav);
export {
  Nav_default as SiteNav
};
