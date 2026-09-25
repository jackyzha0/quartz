import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import { resolveBuildTheme } from "./quartz/util/themePresets"

const config = await loadQuartzConfig({ theme: resolveBuildTheme(process.env) })
export default config
export const layout = await loadQuartzLayout()
