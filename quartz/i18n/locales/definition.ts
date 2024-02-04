export interface Translation {
  head: {}
  backlinks: {
    backlinks: string
    noBacklinksFound: string
  }
  darkmode: {
    lightMode: string
    darkMode: string
  }
  footer: {}
  graph: {}
  recentNotes: {
    seeRemainingMore: (variables: { remaining: number }) => string
  }
  search: {}
  tableOfContents: {}
  pages: {
    "404": {
      notFoundMessage: string
    }
    folderContent: {
        itemsUnderFolder: (variables: { count: number}) => string,
    }
    tagContent: {
        itemsUnderTag: (variables: { count: number}) => string,
        showingFirst: (variables: { count: number}) => string,
        totalTags: (variables: { count: number}) => string,
    }
  }
}

export type TranslationString = string | ((variables: object) => string)
export type TranslationEntry = {
  [key: string]: TranslationString | TranslationEntry
}

type TerminalKeys<T extends object> = {
  [K in keyof T]: K extends string
    ? T[K] extends string | ((...args: any[]) => any)
      ? `${K}` // terminus for both strings and functions
      : T[K] extends object // nested object
        ? `${K}.${TerminalKeys<T[K]>}`
        : never
    : never
}[keyof T]
export type ValidTranslationKey = TerminalKeys<Translation>

export type VariableType<
  Key = ValidTranslationKey,
  Obj = Translation,
> = Key extends `${infer Parent}.${infer Rest}`
  ? Parent extends keyof Obj
    ? VariableType<Rest, Obj[Parent]> // recursive
    : never
  : Key extends keyof Obj // base case
    ? Obj[Key] extends (...args: any[]) => any
      ? Parameters<Obj[Key]>[0]
      : never
    : never
