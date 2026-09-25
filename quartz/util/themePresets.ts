import type { ColorScheme, Theme } from "./theme"

export const themePresetNames = ["oldwinter", "ink", "mist", "ember", "atlas", "sakura"] as const
export type ThemePresetName = (typeof themePresetNames)[number]

type ThemePresetEnvironment = Readonly<Record<string, string | undefined>>

export class UnknownThemePresetError extends Error {
  constructor(name: string) {
    super(`Unknown Quartz theme preset "${name}". Expected one of: ${themePresetNames.join(", ")}`)
    this.name = "UnknownThemePresetError"
  }
}

const typography = {
  header: {
    name: "Schibsted Grotesk",
    weights: [400, 600, 700],
  },
  body: {
    name: "LXGW WenKai",
    weights: [400, 600],
    includeItalic: true,
  },
  code: {
    name: "IBM Plex Mono",
    weights: [400, 600],
  },
} satisfies Theme["typography"]

function createTheme(lightMode: ColorScheme, darkMode: ColorScheme): Theme {
  return {
    fontOrigin: "googleFonts",
    cdnCaching: true,
    typography,
    colors: {
      lightMode,
      darkMode,
    },
  }
}

export const quartzThemePresets: Record<ThemePresetName, Theme> = {
  oldwinter: createTheme(
    {
      light: "#faf8f7",
      lightgray: "#e6e0dd",
      gray: "#817671",
      darkgray: "#4b4542",
      dark: "#24211f",
      secondary: "#28546a",
      tertiary: "#4f785f",
      highlight: "rgba(143, 159, 169, 0.15)",
      textHighlight: "#fff23688",
    },
    {
      light: "#151716",
      lightgray: "#2d3430",
      gray: "#87938c",
      darkgray: "#d3d8d2",
      dark: "#f3f0ea",
      secondary: "#8ab2c4",
      tertiary: "#9dbb91",
      highlight: "rgba(143, 159, 169, 0.15)",
      textHighlight: "#b3aa0288",
    },
  ),
  ink: createTheme(
    {
      light: "#fbfbf7",
      lightgray: "#e4e1d8",
      gray: "#7c776b",
      darkgray: "#46443f",
      dark: "#1f211f",
      secondary: "#3f5f48",
      tertiary: "#8a4d3a",
      highlight: "rgba(63, 95, 72, 0.14)",
      textHighlight: "#eadf7a88",
    },
    {
      light: "#121414",
      lightgray: "#2b302d",
      gray: "#8d958e",
      darkgray: "#dce1d9",
      dark: "#f2f0e8",
      secondary: "#9abf98",
      tertiary: "#d89a74",
      highlight: "rgba(154, 191, 152, 0.16)",
      textHighlight: "#d4a44166",
    },
  ),
  mist: createTheme(
    {
      light: "#f7faf9",
      lightgray: "#dbe5e1",
      gray: "#6e7f79",
      darkgray: "#3e4c49",
      dark: "#1b2826",
      secondary: "#2c6b5f",
      tertiary: "#7b4f6f",
      highlight: "rgba(44, 107, 95, 0.13)",
      textHighlight: "#bfe9db88",
    },
    {
      light: "#101819",
      lightgray: "#273739",
      gray: "#8b9c9a",
      darkgray: "#d4dfdc",
      dark: "#f0f5f2",
      secondary: "#82c7b8",
      tertiary: "#d6a1c8",
      highlight: "rgba(130, 199, 184, 0.16)",
      textHighlight: "#6bbba066",
    },
  ),
  ember: createTheme(
    {
      light: "#fbfaf8",
      lightgray: "#e6e0d9",
      gray: "#7f7770",
      darkgray: "#4c4640",
      dark: "#211d1a",
      secondary: "#8d382e",
      tertiary: "#4f6f4a",
      highlight: "rgba(141, 56, 46, 0.12)",
      textHighlight: "#f1c45d88",
    },
    {
      light: "#181514",
      lightgray: "#352d2a",
      gray: "#a0928b",
      darkgray: "#e0d5cf",
      dark: "#fff7f0",
      secondary: "#f08a78",
      tertiary: "#a9c184",
      highlight: "rgba(240, 138, 120, 0.16)",
      textHighlight: "#ca7a3566",
    },
  ),
  atlas: createTheme(
    {
      light: "#f8f9fb",
      lightgray: "#dfe3e8",
      gray: "#6d7885",
      darkgray: "#404852",
      dark: "#191f26",
      secondary: "#365d86",
      tertiary: "#7a5b1d",
      highlight: "rgba(54, 93, 134, 0.12)",
      textHighlight: "#d9c16f88",
    },
    {
      light: "#12161c",
      lightgray: "#2a313b",
      gray: "#8b95a2",
      darkgray: "#d6dde5",
      dark: "#f4f7fb",
      secondary: "#8bb7e0",
      tertiary: "#d5ad4c",
      highlight: "rgba(139, 183, 224, 0.16)",
      textHighlight: "#aa823c66",
    },
  ),
  sakura: createTheme(
    {
      light: "#fffafa",
      lightgray: "#eadfe1",
      gray: "#817478",
      darkgray: "#4d4145",
      dark: "#261d20",
      secondary: "#8a3f5a",
      tertiary: "#2f6b68",
      highlight: "rgba(138, 63, 90, 0.12)",
      textHighlight: "#f4c1cf88",
    },
    {
      light: "#171416",
      lightgray: "#332a2f",
      gray: "#9c8d93",
      darkgray: "#e3d5dc",
      dark: "#fff5f8",
      secondary: "#eba0be",
      tertiary: "#8ac9be",
      highlight: "rgba(235, 160, 190, 0.16)",
      textHighlight: "#c86f9166",
    },
  ),
}

export function isThemePresetName(name: string): name is ThemePresetName {
  return themePresetNames.some((presetName) => presetName === name)
}

export function getThemePreset(name: string): Theme {
  if (isThemePresetName(name)) {
    return quartzThemePresets[name]
  }

  throw new UnknownThemePresetError(name)
}

export function getThemePresetFromEnvironment(env: ThemePresetEnvironment): Theme | undefined {
  const presetName = env["QUARTZ_THEME"]
  return presetName ? getThemePreset(presetName) : undefined
}

export function resolveBuildTheme(env: ThemePresetEnvironment): Theme {
  return getThemePresetFromEnvironment(env) ?? quartzThemePresets.oldwinter
}
