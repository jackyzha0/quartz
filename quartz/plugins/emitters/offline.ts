import {QuartzEmitterPlugin} from "../types";
import {FilePath, FullSlug} from "../../util/path"
import path from "path"
import {readFileSync} from "node:fs";

export const Offline: QuartzEmitterPlugin = () => {
    return {
        name: "Offline",
        getQuartzComponents() {
            return []
        },
        async emit({cfg}, _content, _resources, emit): Promise<FilePath[]> {
            const manifest = {
                short_name: cfg.configuration.pageTitle,
                name: cfg.configuration.pageTitle,
                description: cfg.configuration.description,
                background_color: cfg.configuration.theme.colors.lightMode.light,
                theme_color: cfg.configuration.theme.colors.lightMode.light,
                display: "minimal-ui",
                icons: [
                    {
                        src: "static/icon.svg",
                        sizes: "any",
                        purpose: "maskable",
                    },
                    {
                        src: "static/icon.svg",
                        sizes: "any",
                        purpose: "any",
                    },
                    ],
                start_url: "/",
            }
            
            /*const manifestRes = await emit({
                content: JSON.stringify(manifest),
                slug: path.join("manifest") as FullSlug,
                ext: ".json"
            })*/
            
            // writeFileSync(process.cwd() + "/public/manifest.json", JSON.stringify(manifest))
            // execSync("npx workbox generateSW workbox.config.ts")
            // copyFileSync(process.cwd() + "/sw.js", process.cwd() + "/public/sw.js")
            // console.log("Made Quartz offline aviable")
            
            return [
                await emit({
                    content: JSON.stringify(manifest),
                    slug: path.join("manifest") as FullSlug,
                    ext: ".json"
                }),
                await emit({
                    content: readFileSync(process.cwd() + "/sw.js").toString(),
                    slug: path.join("sw") as FullSlug,
                    ext: ".js"
                })
            ]
        },
    }
}