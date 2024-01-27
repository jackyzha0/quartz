import { resources } from "./i18next"

declare module "i18next" {
  interface CustomTypeOptions {
    readonly resources: (typeof resources)["en-US"]
    readonly returnNull: false
  }
}
