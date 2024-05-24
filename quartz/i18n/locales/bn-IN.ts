import { Translation } from "./definition";

export default {
  propertyDefaults: {
    title: "শিরোনামহীন",
    description: "বর্ণনা অনুপস্থিত",
  },
  components: {
    callout: {
      note: "নোট",
      abstract: "অ্যাবস্ট্রাক্ট",
      info: "তত্ত্ব",
      todo: "টু ডু",
      tip: "টিপ",
      success: "সফল",
      question: "প্রশ্ন",
      warning: "সাবধান",
      failure: "অসফল",
      danger: "বিপদ",
      bug: "বাগ",
      example: "উদাহরণ",
      quote: "কোট",
    },
    backlinks: {
      title: "ব্যাক-লিঙ্ক",
      noBacklinksFound: "কোনো ব্যাক-লিঙ্ক পাওয়া যায়নি।",
    },
    themeToggle: {
      lightMode: "উজ্জ্বল স্থিতি",
      darkMode: "সন্ধ্যা স্থিতি",
    },
    explorer: {
      title: "এক্সপ্লোরার",
    },
    footer: {
      createdWith: "দ্বারা গঠিত",
    },
    graph: {
      title: "গ্রাফ গঠন",
    },
    recentNotes: {
      title: "এইমাত্র দেখা নোটস",
      seeRemainingMore: ({ remaining }) => `আরো বাকি ${remaining} দেখুন →`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `${targetSlug}-র অন্তর্ভুক্ত অংশ`,
      linkToOriginal: "মূল অংশের লিংক",
    },
    search: {
      title: "খোজ করুন",
      searchBarPlaceholder: "খোজ বার্তা",
    },
    tableOfContents: {
      title: "সূচিপত্র",
    },
    contentMeta: {
      readingTime: ({ minutes }) => `${minutes} মিনিট-এর পাঠ্য`,
    },
  },
  pages: {
    rss: {
      recentNotes: "এই মাত্র দেখা নোটস",
      lastFewNotes: ({ count }) => `গত ${count} নোটস`,
    },
    error: {
      title: "উৎস অনুপস্থিত",
      notFound: "এই পৃষ্ঠা ব্যক্তিগত বা অস্তিত্বহীন।",
      home: "হোমপেজে ফিরে যান",
    },
    folderContent: {
      folder: "ফোল্ডার",
      itemsUnderFolder: ({ count }) =>
        count === 1
          ? "এই ফোল্ডার এ মাত্র একটি বস্তু আছে।"
          : `এই ফোল্ডার এ মোট ${count}-টি বস্তু আছে।`,
    },
    tagContent: {
      tag: "ট্যাগ",
      tagIndex: "ট্যাগ ইনডেক্স",
      itemsUnderTag: ({ count }) =>
        count === 1
          ? "এই ট্যাগ এর নিয়ে মাত্র একটি জিনিস আছে।"
          : `এই ট্যাগতির নিয়ে মাত্র ${count}-টি জিনিস আছে।`,
      showingFirst: ({ count }) => `প্রথম ${count}-টি ট্যাগ দেখানো হচ্ছে।`,
      totalTags: ({ count }) => `মোট ${count}-টি ট্যাগ পাওয়া গেছে।`,
    },
  },
} as const satisfies Translation;
