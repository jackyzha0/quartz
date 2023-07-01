import { Node, Parent } from 'hast'
import { Data, VFile } from 'vfile'

export type QuartzPluginData = Data
export type ProcessedContent = [Node<QuartzPluginData>, VFile]

export function defaultProcessedContent(vfileData: Partial<QuartzPluginData>): ProcessedContent {
  const root: Parent = { type: 'root', children: [] }
  const vfile = new VFile("")
  vfile.data = vfileData
  return [root, vfile]
}
