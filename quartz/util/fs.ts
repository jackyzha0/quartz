import os from "os"
import { rimraf, RimrafAsyncOptions } from "rimraf"

export async function rmrf(
  path: string | string[],
  opt?: RimrafAsyncOptions | undefined,
): Promise<boolean> {
  if (os.platform() == "win32") {
    return rimraf.windows(path, opt)
  } else {
    return rimraf(path, opt)
  }
}
