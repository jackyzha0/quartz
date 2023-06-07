import { ComponentType } from "preact"

export type QuartzComponent<Props> = ComponentType<Props> & {
  css?: string,
  beforeDOMLoaded?: string,
  afterDOMLoaded?: string,
}
