import { Translation } from "./definition"

export default {
  propertyDefaults: {
    title: "Без названия",
    description: "Описание отсутствует",
  },
  components: {
    callout: {
      note: "Заметка",
      abstract: "Резюме",
      info: "Инфо",
      todo: "Сделать",
      tip: "Подсказка",
      success: "Успех",
      question: "Вопрос",
      warning: "Предупреждение",
      failure: "Неудача",
      danger: "Опасность",
      bug: "Баг",
      example: "Пример",
      quote: "Цитата",
    },
    backlinks: {
      title: "Обратные ссылки",
      noBacklinksFound: "Обратные ссылки отсутствуют",
    },
    themeToggle: {
      lightMode: "Светлый режим",
      darkMode: "Тёмный режим",
    },
    explorer: {
      title: "Проводник",
    },
    footer: {
      createdWith: "Создано с помощью",
    },
    graph: {
      title: "Вид графа",
    },
    recentNotes: {
      title: "Недавние заметки",
      seeRemainingMore: ({ remaining }) =>
        `Посмотреть оставш${getForm(remaining, "уюся", "иеся", "иеся")} ${remaining} →`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `Переход из ${targetSlug}`,
      linkToOriginal: "Ссылка на оригинал",
    },
    search: {
      title: "Поиск",
      searchBarPlaceholder: "Найти что-нибудь",
    },
    tableOfContents: {
      title: "Оглавление",
    },
    contentMeta: {
      readingTime: ({ minutes }) => `время чтения ~${minutes} мин.`,
    },
  },
  pages: {
    rss: {
      recentNotes: "Недавние заметки",
      lastFewNotes: ({ count }) =>
        `Последн${getForm(count, "яя", "ие", "ие")} ${count} замет${getForm(count, "ка", "ки", "ок")}`,
    },
    error: {
      title: "Страница не найдена",
      notFound: "Эта страница приватная или не существует",
      home: "Вернуться на главную страницу",
    },
    folderContent: {
      folder: "Папка",
      itemsUnderFolder: ({ count }) =>
        `в этой папке ${count} элемент${getForm(count, "", "а", "ов")}`,
    },
    tagContent: {
      tag: "Тег",
      tagIndex: "Индекс тегов",
      itemsUnderTag: ({ count }) => `с этим тегом ${count} элемент${getForm(count, "", "а", "ов")}`,
      showingFirst: ({ count }) =>
        `Показыва${getForm(count, "ется", "ются", "ются")} ${count} тег${getForm(count, "", "а", "ов")}`,
      totalTags: ({ count }) => `Всего ${count} тег${getForm(count, "", "а", "ов")}`,
    },
  },
} as const satisfies Translation

function getForm(number: number, form1: string, form2: string, form5: string): string {
  const remainder100 = number % 100
  const remainder10 = remainder100 % 10

  if (remainder100 >= 10 && remainder100 <= 20) return form5
  if (remainder10 > 1 && remainder10 < 5) return form2
  if (remainder10 == 1) return form1
  return form5
}
