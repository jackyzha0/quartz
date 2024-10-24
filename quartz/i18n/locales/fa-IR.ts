import { Translation } from "./definition"

export default {
  propertyDefaults: {
    title: "بدون عنوان",
    description: "توضیح خاصی اضافه نشده است",
  },
  components: {
    callout: {
      note: "یادداشت",
      abstract: "چکیده",
      info: "اطلاعات",
      todo: "اقدام",
      tip: "نکته",
      success: "تیک",
      question: "سؤال",
      warning: "هشدار",
      failure: "شکست",
      danger: "خطر",
      bug: "باگ",
      example: "مثال",
      quote: "نقل قول",
    },
    backlinks: {
      title: "بک‌لینک‌ها",
      noBacklinksFound: "بدون بک‌لینک",
    },
    themeToggle: {
      lightMode: "حالت روشن",
      darkMode: "حالت تاریک",
    },
    explorer: {
      title: "مطالب",
    },
    footer: {
      createdWith: "ساخته شده با",
    },
    graph: {
      title: "نمای گراف",
    },
    recentNotes: {
      title: "یادداشت‌های اخیر",
      seeRemainingMore: ({ remaining }) => `${remaining} یادداشت دیگر →`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `از ${targetSlug}`,
      linkToOriginal: "پیوند به اصلی",
    },
    search: {
      title: "جستجو",
      searchBarPlaceholder: "مطلبی را جستجو کنید",
    },
    tableOfContents: {
      title: "فهرست",
    },
    contentMeta: {
      readingTime: ({ minutes }) => `زمان تقریبی مطالعه: ${minutes} دقیقه`,
    },
  },
  pages: {
    rss: {
      recentNotes: "یادداشت‌های اخیر",
      lastFewNotes: ({ count }) => `${count} یادداشت اخیر`,
    },
    error: {
      title: "یافت نشد",
      notFound: "این صفحه یا خصوصی است یا وجود ندارد",
      home: "بازگشت به صفحه اصلی",
    },
    folderContent: {
      folder: "پوشه",
      itemsUnderFolder: ({ count }) =>
        count === 1 ? ".یک مطلب در این پوشه است" : `${count} مطلب در این پوشه است.`,
    },
    tagContent: {
      tag: "برچسب",
      tagIndex: "فهرست برچسب‌ها",
      itemsUnderTag: ({ count }) =>
        count === 1 ? "یک مطلب با این برچسب" : `${count} مطلب با این برچسب.`,
      showingFirst: ({ count }) => `در حال نمایش ${count} برچسب.`,
      totalTags: ({ count }) => `${count} برچسب یافت شد.`,
    },
    encryptedContent: {
      loading: "در حال بارگذاری...",
      password: "رمز عبور",
      submit: "ارسال کردن",
      enterPassword:
        "این صفحه به طور پیش فرض قفل شده است. لطفا رمز عبور را برای باز کردن قفل وارد کنید:",
      modernBrowser: "لطفا از یک مرورگر مدرن استفاده کنید.",
      wrongPassword: "رمز عبور اشتباه است. لطفا رمز عبور را دوباره وارد کنید تا قفل باز شود:",
      noPayload: "هیچ محموله رمزگذاری شده ای وجود ندارد.",
      decrypting: "در حال رمزگشایی...",
    },
  },
} as const satisfies Translation
