import { defaultTranslation, i18n, TRANSLATIONS } from "../../i18n"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const NotFound: QuartzComponent = ({ cfg, ctx }: QuartzComponentProps) => {
  const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
  const baseDir = ctx.argv.serve ? "/" : url.pathname
  const randomWanderTitle = (
    i18n(cfg.locale).components.randomWander ??
    TRANSLATIONS[defaultTranslation].components.randomWander
  )?.title

  return (
    <article class="popover-hint">
      <h1>404</h1>
      <p>{i18n(cfg.locale).pages.error.notFound}</p>
      <a href={baseDir}>{i18n(cfg.locale).pages.error.home}</a>
      <a href={baseDir} data-random-note hidden>
        <span aria-hidden="true">{" · "}</span>
        {randomWanderTitle}
      </a>
      <script
        dangerouslySetInnerHTML={{
          __html: `
          if (typeof fetchData !== "undefined") {
            fetchData.then(function(index) {
              var basePath = document.body.dataset.basepath || "";
              if (basePath.length > 1 && basePath.endsWith("/")) {
                basePath = basePath.slice(0, -1);
              }
              var pathname = window.location.pathname;
              var hasBasePrefix = basePath.length > 1 && pathname.startsWith(basePath);
              if (hasBasePrefix) {
                pathname = pathname.slice(basePath.length);
              }
              if (pathname.startsWith("/")) {
                pathname = pathname.slice(1);
              }
              if (pathname.endsWith("/")) {
                pathname = pathname.slice(0, -1);
              }
              if (pathname.endsWith(".html")) {
                pathname = pathname.slice(0, -5);
              }
              if (pathname.endsWith("/index")) {
                pathname = pathname.slice(0, -6);
              }
              var lowered = pathname.toLowerCase();
              if (lowered !== pathname && index[lowered] != null) {
                var prefix = hasBasePrefix ? basePath : "";
                var target = prefix + (prefix.endsWith("/") ? "" : "/") + lowered;
                window.location.replace(target);
              }
              var randomLink = document.querySelector("[data-random-note]");
              var noteSlugs = Object.keys(index).filter(function(slug) {
                var item = index[slug];
                return slug !== "404" && slug !== "index" && item.content.trim().length > 0;
              });
              if (randomLink != null && noteSlugs.length > 0) {
                var randomSlug = noteSlugs[Math.floor(Math.random() * noteSlugs.length)];
                var randomPrefix = basePath.length > 1 ? basePath : "";
                randomLink.href = randomPrefix + "/" + randomSlug;
                randomLink.hidden = false;
              }
            });
          }
          `,
        }}
      />
    </article>
  )
}

export default (() => NotFound) satisfies QuartzComponentConstructor
