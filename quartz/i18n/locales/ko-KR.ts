import { Translation } from "./definition"

export default {
  propertyDefaults: {
    title: "제목 없음",
    description: "설명 없음",
  },
  components: {
    callout: {
      note: "노트",
      abstract: "개요",
      info: "정보",
      todo: "할일",
      tip: "팁",
      success: "성공",
      question: "질문",
      warning: "주의",
      failure: "실패",
      danger: "위험",
      bug: "버그",
      example: "예시",
      quote: "인용",
    },
    backlinks: {
      title: "백링크",
      noBacklinksFound: "백링크가 없습니다.",
    },
    themeToggle: {
      lightMode: "라이트 모드",
      darkMode: "다크 모드",
    },
    explorer: {
      title: "탐색기",
    },
    footer: {
      createdWith: "Created with",
    },
    graph: {
      title: "그래프 뷰",
    },
    recentNotes: {
      title: "최근 게시글",
      seeRemainingMore: ({ remaining }) => `${remaining}건 더보기 →`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `${targetSlug}의 포함`,
      linkToOriginal: "원본 링크",
    },
    search: {
      title: "검색",
      searchBarPlaceholder: "검색어를 입력하세요",
    },
    tableOfContents: {
      title: "목차",
    },
    contentMeta: {
      readingTime: ({ minutes }) => `${minutes} min read`,
    },
  },
  pages: {
    rss: {
      recentNotes: "최근 게시글",
      lastFewNotes: ({ count }) => `최근 ${count} 건`,
    },
    error: {
      title: "Not Found",
      notFound: "페이지가 존재하지 않거나 비공개 설정이 되어 있습니다.",
    },
    folderContent: {
      folder: "폴더",
      itemsUnderFolder: ({ count }) => `${count}건의 페이지`,
    },
    tagContent: {
      tag: "태그",
      tagIndex: "태그 목록",
      itemsUnderTag: ({ count }) => `${count}건의 페이지`,
      showingFirst: ({ count }) => `처음 ${count}개의 태그`,
      totalTags: ({ count }) => `총 ${count}개의 태그를 찾았습니다.`,
    },
  },
} as const satisfies Translation
