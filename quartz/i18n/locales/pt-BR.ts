import { Translation } from "./definition"

export default {
  propertyDefaults: {
    title: "Sem título",
    description: "Sem descrição",
  },
  components: {
    callout: {
      note: "Nota",
      abstract: "Abstrato",
      info: "Info",
      todo: "Pendência",
      tip: "Dica",
      success: "Sucesso",
      question: "Pergunta",
      warning: "Aviso",
      failure: "Falha",
      danger: "Perigo",
      bug: "Bug",
      example: "Exemplo",
      quote: "Citação",
    },
    backlinks: {
      title: "Backlinks",
      noBacklinksFound: "Sem backlinks encontrados",
    },
    themeToggle: {
      lightMode: "Tema claro",
      darkMode: "Tema escuro",
    },
    explorer: {
      title: "Explorador",
    },
    footer: {
      createdWith: "Criado com",
    },
    graph: {
      title: "Visão de gráfico",
    },
    recentNotes: {
      title: "Notas recentes",
      seeRemainingMore: ({ remaining }) => `Veja mais ${remaining} →`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `Transcrever de ${targetSlug}`,
      linkToOriginal: "Link ao original",
    },
    search: {
      title: "Pesquisar",
      searchBarPlaceholder: "Pesquisar por algo",
    },
    tableOfContents: {
      title: "Sumário",
    },
    contentMeta: {
      readingTime: ({ minutes }) => `Leitura de ${minutes} min`,
    },
  },
  pages: {
    rss: {
      recentNotes: "Notas recentes",
      lastFewNotes: ({ count }) => `Últimas ${count} notas`,
    },
    error: {
      title: "Não encontrado",
      notFound: "Esta página é privada ou não existe.",
    },
    folderContent: {
      folder: "Arquivo",
      itemsUnderFolder: ({ count }) =>
        count === 1 ? "1 item neste arquivo." : `${count} items neste arquivo.`,
    },
    tagContent: {
      tag: "Tag",
      tagIndex: "Sumário de Tags",
      itemsUnderTag: ({ count }) =>
        count === 1 ? "1 item com esta tag." : `${count} items com esta tag.`,
      showingFirst: ({ count }) => `Mostrando as ${count} primeiras tags.`,
      totalTags: ({ count }) => `Encontradas ${count} tags.`,
    },
  },
} as const satisfies Translation
