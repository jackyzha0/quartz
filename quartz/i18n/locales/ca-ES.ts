import { Translation } from "./definition"

export default {
  propertyDefaults: {
    title: "Sense títol",
    description: "Sense descripció",
  },
  components: {
    callout: {
      note: "Nota",
      abstract: "Resum",
      info: "Informació",
      todo: "Per fer",
      tip: "Consell",
      success: "Èxit",
      question: "Pregunta",
      warning: "Advertència",
      failure: "Fall",
      danger: "Perill",
      bug: "Error",
      example: "Exemple",
      quote: "Cita",
    },
    backlinks: {
      title: "Retroenllaç",
      noBacklinksFound: "No s'han trobat retroenllaços",
    },
    themeToggle: {
      lightMode: "Mode clar",
      darkMode: "Mode fosc",
    },
    explorer: {
      title: "Explorador",
    },
    footer: {
      createdWith: "Creat amb",
    },
    graph: {
      title: "Vista Gràfica",
    },
    recentNotes: {
      title: "Notes Recents",
      seeRemainingMore: ({ remaining }) => `Vegi ${remaining} més →`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `Transcluit de ${targetSlug}`,
      linkToOriginal: "Enllaç a l'original",
    },
    search: {
      title: "Cercar",
      searchBarPlaceholder: "Cerca alguna cosa",
    },
    tableOfContents: {
      title: "Taula de Continguts",
    },
    contentMeta: {
      readingTime: ({ minutes }) => `Es llegeix en ${minutes} min`,
    },
  },
  pages: {
    rss: {
      recentNotes: "Notes recents",
      lastFewNotes: ({ count }) => `Últimes ${count} notes`,
    },
    error: {
      title: "No s'ha trobat.",
      notFound: "Aquesta pàgina és privada o no existeix.",
      home: "Torna a la pàgina principal",
    },
    folderContent: {
      folder: "Carpeta",
      itemsUnderFolder: ({ count }) =>
        count === 1 ? "1 article en aquesta carpeta." : `${count} articles en esta carpeta.`,
    },
    tagContent: {
      tag: "Etiqueta",
      tagIndex: "índex d'Etiquetes",
      itemsUnderTag: ({ count }) =>
        count === 1 ? "1 article amb aquesta etiqueta." : `${count} article amb aquesta etiqueta.`,
      showingFirst: ({ count }) => `Mostrant les primeres ${count} etiquetes.`,
      totalTags: ({ count }) => `S'han trobat ${count} etiquetes en total.`,
    },
  },
} as const satisfies Translation
