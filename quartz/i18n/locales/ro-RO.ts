import { Translation } from "./definition"

export default {
  propertyDefaults: {
    title: "Fără titlu",
    description: "Nici o descriere furnizată",
  },
  components: {
    callout: {
      note: "Notă",
      abstract: "Rezumat",
      info: "Informație",
      todo: "De făcut",
      tip: "Sfat",
      success: "Succes",
      question: "Întrebare",
      warning: "Avertisment",
      failure: "Eșec",
      danger: "Pericol",
      bug: "Bug",
      example: "Exemplu",
      quote: "Citat",
    },
    backlinks: {
      title: "Legături înapoi",
      noBacklinksFound: "Nu s-au găsit legături înapoi",
    },
    themeToggle: {
      lightMode: "Modul luminos",
      darkMode: "Modul întunecat",
    },
    explorer: {
      title: "Explorator",
    },
    footer: {
      createdWith: "Creat cu",
    },
    graph: {
      title: "Graf",
    },
    recentNotes: {
      title: "Notițe recente",
      seeRemainingMore: ({ remaining }) => `Vezi încă ${remaining} →`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `Extras din ${targetSlug}`,
      linkToOriginal: "Legătură către original",
    },
    search: {
      title: "Căutare",
      searchBarPlaceholder: "Introduceți termenul de căutare...",
    },
    tableOfContents: {
      title: "Cuprins",
    },
    contentMeta: {
      readingTime: ({ minutes }) =>
        minutes == 1 ? `lectură de 1 minut` : `lectură de ${minutes} minute`,
    },
  },
  pages: {
    rss: {
      recentNotes: "Notițe recente",
      lastFewNotes: ({ count }) => `Ultimele ${count} notițe`,
    },
    error: {
      title: "Pagina nu a fost găsită",
      notFound: "Fie această pagină este privată, fie nu există.",
    },
    folderContent: {
      folder: "Dosar",
      itemsUnderFolder: ({ count }) =>
        count === 1 ? "1 articol în acest dosar." : `${count} elemente în acest dosar.`,
    },
    tagContent: {
      tag: "Etichetă",
      tagIndex: "Indexul etichetelor",
      itemsUnderTag: ({ count }) =>
        count === 1 ? "1 articol cu această etichetă." : `${count} articole cu această etichetă.`,
      showingFirst: ({ count }) => `Se afișează primele ${count} etichete.`,
      totalTags: ({ count }) => `Au fost găsite ${count} etichete în total.`,
    },
  },
} as const satisfies Translation
