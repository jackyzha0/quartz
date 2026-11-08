import type { ChangeEvent } from "../plugins/types"
import type { FilePath } from "./path"

export type ChangeRecord = Record<FilePath, ChangeEvent["type"]>

export function clearChangeRecord(changes: ChangeRecord) {
  for (const fp of Object.keys(changes)) {
    delete changes[fp as FilePath]
  }
}
