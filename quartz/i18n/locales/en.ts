import { Translation } from "./definition"

export default {
  backlinks: {
    backlinks: "Backlinks",
    noBacklinksFound: "No backlinks found",
  },
  darkmode: {
    lightMode: "Light mode",
    darkMode: "Dark mode",
  },

  footer: {
    createdWith: "Created with",
  },
  graph: {
    graphView: "Graph View",
  },
  head: {
    noDescriptionProvided: "No description provided",
    untitled: "Untitled",
  },
  recentNotes: {
    seeRemainingMore: ({ remaining }) => `See ${remaining} more`,
  },
  search: "Search",
  tableOfContent: "Table of Contents",
  pages: {
    "404": {
      notFoundMessage: "Either this page is private or doesn't exist.",
    },
    "folderContent": {
      itemsUnderFolder: ({count}) => count === 1 ? "1 item under this folder" : `${count} items under this folder`,
    },
    "tagContent": {
      itemsUnderTag: ({count}) => count === 1 ? "1 item with this tag" : `${count} items with this tag`,
      showingFirst: ({count}) => `Showing first ${count} tags.`,
      totalTags:({count}) => `Found ${count} total tags.`,
    },
  }
} as const satisfies Translation
