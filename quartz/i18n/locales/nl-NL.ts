import { Translation } from "./definition"

export default {
  propertyDefaults: {
    title: "Naamloos",
    description: "Geen beschrijving gegeven.",
  },
  components: {
    backlinks: {
      title: "Backlinks",
      noBacklinksFound: "Geen backlinks gevonden",
    },
    themeToggle: {
      lightMode: "Lichte modus",
      darkMode: "Donkere modus",
    },
    explorer: {
      title: "Verkenner",
    },
    footer: {
      createdWith: "Gemaakt met",
    },
    graph: {
      title: "Grafiekweergave",
    },
    recentNotes: {
      title: "Recente notities",
      seeRemainingMore: ({ remaining }) => `Zie ${remaining} meer →`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `Invoeging van ${targetSlug}`,
      linkToOriginal: "Link naar origineel",
    },
    search: {
      title: "Zoeken",
      searchBarPlaceholder: "Doorzoek de website",
    },
    tableOfContents: {
      title: "Inhoudsopgave",
    },
  },
  pages: {
    rss: {
      recentNotes: "Recente notities",
      lastFewNotes: ({ count }) => `Laatste ${count} notities`,
    },
    error: {
      title: "Niet gevonden",
      notFound: "Deze pagina is niet zichtbaar of bestaat niet.",
    },
    folderContent: {
      folder: "Map",
      itemsUnderFolder: ({ count }) =>
        count === 1 ? "1 item in deze map" : `${count} items in deze map.`,
    },
    tagContent: {
      tag: "Label",
      tagIndex: "Label-index",
      itemsUnderTag: ({ count }) =>
        count === 1 ? "1 item met dit label." : `${count} items met dit label.`,
      showingFirst: ({ count }) =>
        count === 1 ? "Eerste label tonen." : `Eerste ${count} labels tonen.`,
      totalTags: ({ count }) => `${count} labels gevonden.`,
    },
  },
} as const satisfies Translation
