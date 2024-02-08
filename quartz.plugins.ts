import { PluginStore } from "./quartz/plugin-store"
import * as Plugin from "./quartz/plugins"

// Put the plugins you want in here
// Automatically edited by `quartz plugin add <url>`
const communityPlugins: PluginStore = {
  available: [
    // Example
    // {
    //   url: 'OCDkirby/remark42',
    //   enabled: true,
    //   cfg: Plugin.Remark42({ host: 'https://comments.my-host.com', site_id: 'remark', theme: 'light', no_footer: true }),
    // },
  ],
}

export default communityPlugins
