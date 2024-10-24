import { Translation } from "./definition"

export default {
  propertyDefaults: {
    title: "Bez názvu",
    description: "Nebyl uveden žádný popis",
  },
  components: {
    callout: {
      note: "Poznámka",
      abstract: "Abstract",
      info: "Info",
      todo: "Todo",
      tip: "Tip",
      success: "Úspěch",
      question: "Otázka",
      warning: "Upozornění",
      failure: "Chyba",
      danger: "Nebezpečí",
      bug: "Bug",
      example: "Příklad",
      quote: "Citace",
    },
    backlinks: {
      title: "Příchozí odkazy",
      noBacklinksFound: "Nenalezeny žádné příchozí odkazy",
    },
    themeToggle: {
      lightMode: "Světlý režim",
      darkMode: "Tmavý režim",
    },
    explorer: {
      title: "Procházet",
    },
    footer: {
      createdWith: "Vytvořeno pomocí",
    },
    graph: {
      title: "Graf",
    },
    recentNotes: {
      title: "Nejnovější poznámky",
      seeRemainingMore: ({ remaining }) => `Zobraz ${remaining} dalších →`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `Zobrazení ${targetSlug}`,
      linkToOriginal: "Odkaz na původní dokument",
    },
    search: {
      title: "Hledat",
      searchBarPlaceholder: "Hledejte něco",
    },
    tableOfContents: {
      title: "Obsah",
    },
    contentMeta: {
      readingTime: ({ minutes }) => `${minutes} min čtení`,
    },
  },
  pages: {
    rss: {
      recentNotes: "Nejnovější poznámky",
      lastFewNotes: ({ count }) => `Posledních ${count} poznámek`,
    },
    error: {
      title: "Nenalezeno",
      notFound: "Tato stránka je buď soukromá, nebo neexistuje.",
      home: "Návrat na domovskou stránku",
    },
    folderContent: {
      folder: "Složka",
      itemsUnderFolder: ({ count }) =>
        count === 1 ? "1 položka v této složce." : `${count} položek v této složce.`,
    },
    tagContent: {
      tag: "Tag",
      tagIndex: "Rejstřík tagů",
      itemsUnderTag: ({ count }) =>
        count === 1 ? "1 položka s tímto tagem." : `${count} položek s tímto tagem.`,
      showingFirst: ({ count }) => `Zobrazují se první ${count} tagy.`,
      totalTags: ({ count }) => `Nalezeno celkem ${count} tagů.`,
    },
  },
} as const satisfies Translation
