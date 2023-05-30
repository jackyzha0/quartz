import { Node } from 'hast'
import { Data, VFile } from 'vfile/lib'

export type QuartzPluginData = Data
export type ProcessedContent = [Node<QuartzPluginData>, VFile]
