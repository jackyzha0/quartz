export interface ColorScheme {
  light: string
  lightgray: string
  gray: string
  darkgray: string
  dark: string
  secondary: string
  tertiary: string
  highlight: string
  textHighlight: string
}

interface Colors {
  lightMode: ColorScheme
  darkMode: ColorScheme
}

interface FontInfo {
  /**
   * e.g. "ital,wght@0,400;1,200"
   */
  features: string,
}

export interface Theme {
  fonts?: Record<string, FontInfo>,
  typography: {
    header: string | string[]
    body: string | string[]
    code: string | string[]
  }
  cdnCaching: boolean
  colors: Colors
  fontOrigin: "googleFonts" | "local"
}

export type ThemeKey = keyof Colors

const DEFAULT_SANS_SERIF =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif'
const DEFAULT_MONO = "ui-monospace, SFMono-Regular, SF Mono, Menlo, monospace"

function makeFamilySection(theme: Theme, family: string | string[], defaultFeatures: string) {
  const families = Array.isArray(family) ? family : [family]
  return "family=" + families.map(f => {
    const features = theme.fonts?.[f]?.features ?? defaultFeatures
    if(features === "") {
      return `${f}:wght@400` // matches unplugin-fonts; should be a sane default
    } else {
      return `${f}:${features}`
    }
  }).join("&family=")
}

export function googleFontHref(theme: Theme) {
  const { code, header, body } = theme.typography

  const codeSection = makeFamilySection(theme, code, "")
  const headerSection = makeFamilySection(theme, header, "wght@400;700")
  const bodySection = makeFamilySection(theme, body, "ital,wght@0,400;0,600;1,400;1,600")

  return `https://fonts.googleapis.com/css2?${codeSection}&${headerSection}&${bodySection}&display=swap`
}

function renderFonts(fonts: string | string[]) {
  if(Array.isArray(fonts)) {
    return fonts.map(s => `"${s}"`).join(", ")
  } else {
    return `"${fonts}"`
  }
}

export function joinStyles(theme: Theme, ...stylesheet: string[]) {
  return `
${stylesheet.join("\n\n")}

:root {
  --light: ${theme.colors.lightMode.light};
  --lightgray: ${theme.colors.lightMode.lightgray};
  --gray: ${theme.colors.lightMode.gray};
  --darkgray: ${theme.colors.lightMode.darkgray};
  --dark: ${theme.colors.lightMode.dark};
  --secondary: ${theme.colors.lightMode.secondary};
  --tertiary: ${theme.colors.lightMode.tertiary};
  --highlight: ${theme.colors.lightMode.highlight};
  --textHighlight: ${theme.colors.lightMode.textHighlight};

  --headerFont: ${renderFonts(theme.typography.header)}, ${DEFAULT_SANS_SERIF};
  --bodyFont: ${renderFonts(theme.typography.body)}, ${DEFAULT_SANS_SERIF};
  --codeFont: ${renderFonts(theme.typography.code)}, ${DEFAULT_MONO};
}

:root[saved-theme="dark"] {
  --light: ${theme.colors.darkMode.light};
  --lightgray: ${theme.colors.darkMode.lightgray};
  --gray: ${theme.colors.darkMode.gray};
  --darkgray: ${theme.colors.darkMode.darkgray};
  --dark: ${theme.colors.darkMode.dark};
  --secondary: ${theme.colors.darkMode.secondary};
  --tertiary: ${theme.colors.darkMode.tertiary};
  --highlight: ${theme.colors.darkMode.highlight};
  --textHighlight: ${theme.colors.darkMode.textHighlight};
}
`
}
