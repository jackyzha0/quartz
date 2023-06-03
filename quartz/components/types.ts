import { ComponentType } from "preact"

export type QuartzComponent<Props> = {
  Component: ComponentType<Props>
  css?: string,
  beforeDOMLoaded?: string,
  afterDOMLoaded?: string,
}
