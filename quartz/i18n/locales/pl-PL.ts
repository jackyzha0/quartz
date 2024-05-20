import { Translation } from "./definition"

export default {
  propertyDefaults: {
    title: "Bez nazwy",
    description: "Brak opisu",
  },
  components: {
    callout: {
      note: "Notatka",
      abstract: "Streszczenie",
      info: "informacja",
      todo: "Do zrobienia",
      tip: "Wskazówka",
      success: "Zrobione",
      question: "Pytanie",
      warning: "Ostrzeżenie",
      failure: "Usterka",
      danger: "Niebiezpieczeństwo",
      bug: "Błąd w kodzie",
      example: "Przykład",
      quote: "Cytat",
    },
    backlinks: {
      title: "Odnośniki zwrotne",
      noBacklinksFound: "Brak połączeń zwrotnych",
    },
    themeToggle: {
      lightMode: "Trzyb jasny",
      darkMode: "Tryb ciemny",
    },
    explorer: {
      title: "Przeglądaj",
    },
    footer: {
      createdWith: "Stworzone z użyciem",
    },
    graph: {
      title: "Graf",
    },
    recentNotes: {
      title: "Najnowsze notatki",
      seeRemainingMore: ({ remaining }) => `Zobacz ${remaining} nastepnych →`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `Osadzone ${targetSlug}`,
      linkToOriginal: "Łącze do oryginału",
    },
    search: {
      title: "Szukaj",
      searchBarPlaceholder: "Search for something",
    },
    tableOfContents: {
      title: "Spis treści",
    },
    contentMeta: {
      readingTime: ({ minutes }) => `${minutes} min. czytania `,
    },
  },
  pages: {
    rss: {
      recentNotes: "Najnowsze notatki",
      lastFewNotes: ({ count }) => `Ostatnie ${count} notatek`,
    },
    error: {
      title: "Nie znaleziono",
      notFound: "Ta strona jest prywatna lub nie istnieje.",
    },
    folderContent: {
      folder: "Folder",
      itemsUnderFolder: ({ count }) =>
        count === 1 ? "W tym folderze jest 1 element." : `Elementów w folderze: ${count}.`,
    },
    tagContent: {
      tag: "Znacznik",
      tagIndex: "Spis znaczników",
      itemsUnderTag: ({ count }) =>
        count === 1 ? "Oznaczony 1 element." : `Elementów z tym znacznikiem: ${count}.`,
      showingFirst: ({ count }) => `Pokazuje ${count} pierwszych znaczników.`,
      totalTags: ({ count }) => `Znalezionych wszystkich znaczników: ${count}.`,
    },
  },
} as const satisfies Translation
