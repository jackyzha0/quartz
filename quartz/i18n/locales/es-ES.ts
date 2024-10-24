import { Translation } from "./definition"

export default {
  propertyDefaults: {
    title: "Sin título",
    description: "Sin descripción",
  },
  components: {
    callout: {
      note: "Nota",
      abstract: "Resumen",
      info: "Información",
      todo: "Por hacer",
      tip: "Consejo",
      success: "Éxito",
      question: "Pregunta",
      warning: "Advertencia",
      failure: "Fallo",
      danger: "Peligro",
      bug: "Error",
      example: "Ejemplo",
      quote: "Cita",
    },
    backlinks: {
      title: "Retroenlaces",
      noBacklinksFound: "No se han encontrado retroenlaces",
    },
    themeToggle: {
      lightMode: "Modo claro",
      darkMode: "Modo oscuro",
    },
    explorer: {
      title: "Explorador",
    },
    footer: {
      createdWith: "Creado con",
    },
    graph: {
      title: "Vista Gráfica",
    },
    recentNotes: {
      title: "Notas Recientes",
      seeRemainingMore: ({ remaining }) => `Vea ${remaining} más →`,
    },
    transcludes: {
      transcludeOf: ({ targetSlug }) => `Transcluido de ${targetSlug}`,
      linkToOriginal: "Enlace al original",
    },
    search: {
      title: "Buscar",
      searchBarPlaceholder: "Busca algo",
    },
    tableOfContents: {
      title: "Tabla de Contenidos",
    },
    contentMeta: {
      readingTime: ({ minutes }) => `Se lee en ${minutes} min`,
    },
  },
  pages: {
    rss: {
      recentNotes: "Notas recientes",
      lastFewNotes: ({ count }) => `Últimas ${count} notas`,
    },
    error: {
      title: "No se ha encontrado.",
      notFound: "Esta página es privada o no existe.",
      home: "Regresa a la página principal",
    },
    folderContent: {
      folder: "Carpeta",
      itemsUnderFolder: ({ count }) =>
        count === 1 ? "1 artículo en esta carpeta." : `${count} artículos en esta carpeta.`,
    },
    tagContent: {
      tag: "Etiqueta",
      tagIndex: "Índice de Etiquetas",
      itemsUnderTag: ({ count }) =>
        count === 1 ? "1 artículo con esta etiqueta." : `${count} artículos con esta etiqueta.`,
      showingFirst: ({ count }) => `Mostrando las primeras ${count} etiquetas.`,
      totalTags: ({ count }) => `Se han encontrado ${count} etiquetas en total.`,
    },
    encryptedContent: {
      loading: "Cargando...",
      password: "Contraseña",
      submit: "Enviar",
      enterPassword:
        "Esta página está bloqueada por defecto. Introduzca la contraseña para desbloquearla:",
      modernBrowser: "Utilice un navegador moderno.",
      wrongPassword: "Contraseña incorrecta. Vuelva a introducir la contraseña para desbloquear:",
      noPayload: "No hay ninguna carga útil cifrada.",
      decrypting: "Descifrando...",
    },
  },
} as const satisfies Translation
