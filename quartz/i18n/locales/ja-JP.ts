import { Translation } from "./definition"

export default {
  propertyDefaults: {
    title: "無題",
    description: "説明なし",
  },
  components: {
    backlinks: {
      title: "バックリンク",
      noBacklinksFound: "バックリンクはありません",
    },
    themeToggle: {
      lightMode: "ライトモード",
      darkMode: "ダークモード",
    },
    explorer: {
      title: "エクスプローラー",
    },
    footer: {
      createdWith: "作成",
    },
    graph: {
      title: "グラフビュー",
    },
    recentNotes: {
      title: "最近の記事",
      seeRemainingMore: ({ remaining }) => `さらに${remaining}件 →`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `${targetSlug}のまとめ`,
      linkToOriginal: "元記事へのリンク",
    },
    search: {
      title: "検索",
      searchBarPlaceholder: "検索ワードを入力",
    },
    tableOfContents: {
      title: "目次",
    },
  },
  pages: {
    rss: {
      recentNotes: "最近の記事",
      lastFewNotes: ({ count }) => `最新の${count}件`,
    },
    error: {
      title: "Not Found",
      notFound: "ページが存在しないか、非公開設定になっています。",
    },
    folderContent: {
      folder: "フォルダ",
      itemsUnderFolder: ({ count }) => `${count}件のページ`,
    },
    tagContent: {
      tag: "タグ",
      tagIndex: "タグ一覧",
      itemsUnderTag: ({ count }) => `${count}件のページ`,
      showingFirst: ({ count }) => `のうち最初の${count}件を表示しています`,
      totalTags: ({ count }) => `全${count}個のタグを表示中`,
    },
  },
} as const satisfies Translation
