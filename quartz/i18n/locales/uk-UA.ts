import { Translation } from "./definition"

export default {
  propertyDefaults: {
    title: "Без назви",
    description: "Опис не надано",
  },
  components: {
    backlinks: {
      title: "Зворотні посилання",
      noBacklinksFound: "Зворотних посилань не знайдено",
    },
    themeToggle: {
      lightMode: "Світлий режим",
      darkMode: "Темний режим",
    },
    explorer: {
      title: "Провідник",
    },
    footer: {
      createdWith: "Створено за допомогою",
    },
    graph: {
      title: "Вигляд графа",
    },
    recentNotes: {
      title: "Останні нотатки",
      seeRemainingMore: ({ remaining }) => `Переглянути ще ${remaining} →`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `Видобуто з ${targetSlug}`,
      linkToOriginal: "Посилання на оригінал",
    },
    search: {
      title: "Пошук",
      searchBarPlaceholder: "Шукати щось",
    },
    tableOfContents: {
      title: "Зміст",
    },
  },
  pages: {
    rss: {
      recentNotes: "Останні нотатки",
      lastFewNotes: ({ count }) => `Останні нотатки: ${count}`,
    },
    error: {
      title: "Не знайдено",
      notFound: "Ця сторінка або приватна, або не існує.",
    },
    folderContent: {
      folder: "Папка",
      itemsUnderFolder: ({ count }) =>
        count === 1 ? "У цій папці 1 елемент" : `Елементів у цій папці: ${count}.`,
    },
    tagContent: {
      tag: "Тег",
      tagIndex: "Індекс тегу",
      itemsUnderTag: ({ count }) =>
        count === 1 ? "1 елемент з цим тегом" : `Елементів з цим тегом: ${count}.`,
      showingFirst: ({ count }) => `Показ перших ${count} тегів.`,
      totalTags: ({ count }) => `Всього знайдено тегів: ${count}.`,
    },
  },
} as const satisfies Translation
