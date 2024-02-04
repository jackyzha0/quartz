import {
  QuartzEmitterPluginInstance,
  QuartzFilterPluginInstance,
  QuartzTransformerPluginInstance,
} from "./plugins/types"

// A single plugin imported from Git
// TODO refactor config ts to look for a config: QuartzPluginType var in here ig
export interface RemotePlugin {
  url: String // Acceptable values: "https://codeberg.org/user/plugin", [https://github.com/]"user/plugin"
  enabled: boolean
  cfg: QuartzEmitterPluginInstance | QuartzFilterPluginInstance | QuartzTransformerPluginInstance
}

// Code representation of your plugins/ folder
export interface PluginStore {
  available: RemotePlugin[]
}

export function pluginConfigurations(plugins: PluginStore) {
  let configs = plugins.available.filter((p) => p.enabled).map((p) => p.cfg)

  return {
    filters: configs.filter((p) =>
      p.hasOwnProperty("shouldPublish)"),
    ) as QuartzFilterPluginInstance[],
    emitters: configs.filter((p) => p.hasOwnProperty("emit")) as QuartzEmitterPluginInstance[],
    transformers: configs.filter(
      (p) => !p.hasOwnProperty("shouldPublish") && !p.hasOwnProperty("emit"),
    ) as QuartzTransformerPluginInstance[],
  }
}
