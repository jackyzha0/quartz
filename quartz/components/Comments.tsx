// @ts-ignore: typescript doesn't know about our inline bundling system
// so we need to silence the error
import script from "./scripts/comments.inline"
import { QuartzComponentConstructor } from "./types"

export default (() => {
    function Footer() {
        return (
            <script src="https://giscus.app/client.js"
                data-repo="carsonclarke570/quartz-blog"
                data-repo-id="R_kgDOMIfdqw"
                data-category="Blog"
                data-category-id="DIC_kwDOMIfdq84CgCqR"
                data-mapping="pathname"
                data-strict="0"
                data-reactions-enabled="1"
                data-emit-metadata="0"
                data-input-position="bottom"
                data-theme="dark"
                data-lang="en"
                crossorigin="anonymous"
                async>
            </script>
        )
    }

    Footer.beforeDOMLoaded = script

    return Footer
}) satisfies QuartzComponentConstructor
