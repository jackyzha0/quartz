import { Translation } from "./definition"

export default {
  propertyDefaults: {
    title: "غير معنون",
    description: "لم يتم تقديم أي وصف",
  },
  components: {
    callout: {
      note: "ملاحظة",
      abstract: "ملخص",
      info: "معلومات",
      todo: "للقيام",
      tip: "نصيحة",
      success: "نجاح",
      question: "سؤال",
      warning: "تحذير",
      failure: "فشل",
      danger: "خطر",
      bug: "خلل",
      example: "مثال",
      quote: "اقتباس",
    },
    backlinks: {
      title: "وصلات العودة",
      noBacklinksFound: "لا يوجد وصلات عودة",
    },
    themeToggle: {
      lightMode: "الوضع النهاري",
      darkMode: "الوضع الليلي",
    },
    explorer: {
      title: "المستعرض",
    },
    footer: {
      createdWith: "أُنشئ باستخدام",
    },
    graph: {
      title: "التمثيل التفاعلي",
    },
    recentNotes: {
      title: "آخر الملاحظات",
      seeRemainingMore: ({ remaining }) => `تصفح ${remaining} أكثر →`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `مقتبس من ${targetSlug}`,
      linkToOriginal: "وصلة للملاحظة الرئيسة",
    },
    search: {
      title: "بحث",
      searchBarPlaceholder: "ابحث عن شيء ما",
    },
    tableOfContents: {
      title: "فهرس المحتويات",
    },
    contentMeta: {
      readingTime: ({ minutes }) =>
        minutes == 1
          ? `دقيقة أو أقل للقراءة`
          : minutes == 2
            ? `دقيقتان للقراءة`
            : `${minutes} دقائق للقراءة`,
    },
  },
  pages: {
    rss: {
      recentNotes: "آخر الملاحظات",
      lastFewNotes: ({ count }) => `آخر ${count} ملاحظة`,
    },
    error: {
      title: "غير موجود",
      notFound: "إما أن هذه الصفحة خاصة أو غير موجودة.",
      home: "العوده للصفحة الرئيسية",
    },
    folderContent: {
      folder: "مجلد",
      itemsUnderFolder: ({ count }) =>
        count === 1 ? "يوجد عنصر واحد فقط تحت هذا المجلد" : `يوجد ${count} عناصر تحت هذا المجلد.`,
    },
    tagContent: {
      tag: "الوسم",
      tagIndex: "مؤشر الوسم",
      itemsUnderTag: ({ count }) =>
        count === 1 ? "يوجد عنصر واحد فقط تحت هذا الوسم" : `يوجد ${count} عناصر تحت هذا الوسم.`,
      showingFirst: ({ count }) => `إظهار أول ${count} أوسمة.`,
      totalTags: ({ count }) => `يوجد ${count} أوسمة.`,
    },
  },
} as const satisfies Translation
