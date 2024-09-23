import { SatoriOptions } from "satori/wasm"
import { GlobalConfiguration } from "../cfg"
import { SocialImageOptions, UserOpts } from "./imageHelper"
import { QuartzPluginData } from "../plugins/vfile"
import { FullSlug, pathToRoot, joinSegments } from "./path"

// This file contains the template of the default social image.

export const defaultImage: SocialImageOptions["imageStructure"] = (
  cfg: GlobalConfiguration,
  userOpts: UserOpts,
  title: string,
  description: string,
  fonts: SatoriOptions["fonts"],
  fileData: QuartzPluginData,
) => {
  // How many characters are allowed before switching to smaller font
  const fontBreakPoint = 22
  const useSmallerFont = title.length > fontBreakPoint

  const { colorScheme } = userOpts

  // Setup to access image
  const iconPath = `https://${cfg.baseUrl}/static/icon.png`
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        backgroundColor: cfg.theme.colors[colorScheme].light,
        gap: "2rem",
        paddingTop: "1.5rem",
        paddingBottom: "1.5rem",
        paddingLeft: "5rem",
        paddingRight: "5rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          width: "100%",
          flexDirection: "row",
          gap: "2.5rem",
        }}
      >
        <img src={iconPath} width={135} height={135} />
        <p
          style={{
            color: cfg.theme.colors[colorScheme].dark,
            fontSize: useSmallerFont ? 70 : 82,
            fontFamily: fonts[0].name,
          }}
        >
          {title}
        </p>
      </div>
      <p
        style={{
          color: cfg.theme.colors[colorScheme].dark,
          fontSize: 44,
          lineClamp: 3,
          fontFamily: fonts[1].name,
        }}
      >
        {description}
      </p>
    </div>
  )
}
