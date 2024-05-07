import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const Discussion: QuartzComponent = ({ cfg }: QuartzComponentProps) => {
  const discussion = cfg.discussion

  const configuration = discussion?.configuration
  const src = configuration?.src ? configuration.src : "https://giscus.app/client.js"
  const dataStrict = configuration?.dataStrict ? configuration.dataStrict : "0"
  const dataMapping = configuration?.dataMapping ? configuration.dataMapping : "pathname"
  const dataReactionsEnabled = configuration?.dataReactionsEnabled
    ? configuration.dataReactionsEnabled
    : "1"
  const dataEmitMetadata = configuration?.dataEmitMetadata ? configuration.dataEmitMetadata : "1"
  const dataInputPosition = configuration?.dataInputPosition
    ? configuration.dataInputPosition
    : "top"
  const dataTheme = configuration?.dataTheme ? configuration.dataTheme : "preferred_color_scheme"
  const dataLang = configuration?.dataLang ? configuration.dataLang : "en"
  const dataLoading = configuration?.dataLoading ? configuration.dataLoading : "lazy"
  const crossOrigin = configuration?.crossorigin ? configuration.crossorigin : "anonymous"

  if (discussion?.provider === "giscus") {
    return (
      <>
        <script
          src={src}
          data-repo={discussion.configuration.dataRepo}
          data-repo-id={discussion.configuration.dataRepoId}
          data-category={discussion.configuration.dataCategory}
          data-category-id={discussion.configuration.dataCategoryId}
          data-mapping={dataMapping}
          data-strict={dataStrict}
          data-reactions-enabled={dataReactionsEnabled}
          data-emit-metadata={dataEmitMetadata}
          data-input-position={dataInputPosition}
          data-theme={dataTheme}
          data-lang={dataLang}
          data-loading={dataLoading}
          crossorigin={crossOrigin}
          async
        ></script>
        <div id="disqus_thread"></div>
      </>
    )
  } else {
    return null
  }
}

export default (() => Discussion) satisfies QuartzComponentConstructor
