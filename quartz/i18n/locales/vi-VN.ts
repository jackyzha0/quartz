import { Translation } from "./definition"

export default {
  propertyDefaults: {
    title: "Không có tiêu đề",
    description: "Không có mô tả được cung cấp",
  },
  components: {
    callout: {
      note: "Ghi Chú",
      abstract: "Tóm Tắt",
      info: "Thông tin",
      todo: "Cần Làm",
      tip: "Gợi Ý",
      success: "Thành Công",
      question: "Nghi Vấn",
      warning: "Cảnh Báo",
      failure: "Thất Bại",
      danger: "Nguy Hiểm",
      bug: "Lỗi",
      example: "Ví Dụ",
      quote: "Trích Dẫn",
    },
    backlinks: {
      title: "Liên Kết Ngược",
      noBacklinksFound: "Không có liên kết ngược được tìm thấy",
    },
    themeToggle: {
      lightMode: "Sáng",
      darkMode: "Tối",
    },
    explorer: {
      title: "Trong bài này",
    },
    footer: {
      createdWith: "Được tạo bởi",
    },
    graph: {
      title: "Biểu Đồ",
    },
    recentNotes: {
      title: "Bài viết gần đây",
      seeRemainingMore: ({ remaining }) => `Xem ${remaining} thêm →`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `Bao gồm ${targetSlug}`,
      linkToOriginal: "Liên Kết Gốc",
    },
    search: {
      title: "Tìm Kiếm",
      searchBarPlaceholder: "Tìm kiếm thông tin",
    },
    tableOfContents: {
      title: "Bảng Nội Dung",
    },
    contentMeta: {
      readingTime: ({ minutes }) => `đọc ${minutes} phút`,
    },
  },
  pages: {
    rss: {
      recentNotes: "Những bài gần đây",
      lastFewNotes: ({ count }) => `${count} Bài gần đây`,
    },
    error: {
      title: "Không Tìm Thấy",
      notFound: "Trang này được bảo mật hoặc không tồn tại.",
    },
    folderContent: {
      folder: "Thư Mục",
      itemsUnderFolder: ({ count }) =>
        count === 1 ? "1 mục trong thư mục này." : `${count} mục trong thư mục này.`,
    },
    tagContent: {
      tag: "Thẻ",
      tagIndex: "Thẻ Mục Lục",
      itemsUnderTag: ({ count }) =>
        count === 1 ? "1 mục gắn thẻ này." : `${count} mục gắn thẻ này.`,
      showingFirst: ({ count }) => `Hiển thị trước ${count} thẻ.`,
      totalTags: ({ count }) => `Tìm thấy ${count} thẻ tổng cộng.`,
    },
  },
} as const satisfies Translation
