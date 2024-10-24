import { Translation } from "./definition"

export default {
  propertyDefaults: {
    title: "无题",
    description: "无描述",
  },
  components: {
    callout: {
      note: "笔记",
      abstract: "摘要",
      info: "提示",
      todo: "待办",
      tip: "提示",
      success: "成功",
      question: "问题",
      warning: "警告",
      failure: "失败",
      danger: "危险",
      bug: "错误",
      example: "示例",
      quote: "引用",
    },
    backlinks: {
      title: "反向链接",
      noBacklinksFound: "无法找到反向链接",
    },
    themeToggle: {
      lightMode: "亮色模式",
      darkMode: "暗色模式",
    },
    explorer: {
      title: "探索",
    },
    footer: {
      createdWith: "Created with",
    },
    graph: {
      title: "关系图谱",
    },
    recentNotes: {
      title: "最近的笔记",
      seeRemainingMore: ({ remaining }) => `查看更多${remaining}篇笔记 →`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `包含${targetSlug}`,
      linkToOriginal: "指向原始笔记的链接",
    },
    search: {
      title: "搜索",
      searchBarPlaceholder: "搜索些什么",
    },
    tableOfContents: {
      title: "目录",
    },
    contentMeta: {
      readingTime: ({ minutes }) => `${minutes}分钟阅读`,
    },
  },
  pages: {
    rss: {
      recentNotes: "最近的笔记",
      lastFewNotes: ({ count }) => `最近的${count}条笔记`,
    },
    error: {
      title: "无法找到",
      notFound: "私有笔记或笔记不存在。",
      home: "返回首页",
    },
    folderContent: {
      folder: "文件夹",
      itemsUnderFolder: ({ count }) => `此文件夹下有${count}条笔记。`,
    },
    tagContent: {
      tag: "标签",
      tagIndex: "标签索引",
      itemsUnderTag: ({ count }) => `此标签下有${count}条笔记。`,
      showingFirst: ({ count }) => `显示前${count}个标签。`,
      totalTags: ({ count }) => `总共有${count}个标签。`,
    },
    encryptedContent: {
      loading: "正在加载...",
      password: "密码",
      submit: "提交",
      enterPassword: "此页面默认锁定。请输入密码解锁：",
      modernBrowser: "请使用现代浏览器。",
      wrongPassword: "密码错误。请重新输入密码解锁：",
      noPayload: "没有加密的有效负载。",
      decrypting: "解密中...",
    },
  },
} as const satisfies Translation
