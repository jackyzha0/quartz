import { promises as fs, Dirent } from "fs"
import { join } from "path"

export async function cleanDirectory(dirPath: string): Promise<void> {
  try {
    // Check if the directory exists
    await fs.access(dirPath)
    const entries: Dirent[] = await fs.readdir(dirPath, { withFileTypes: true })
    for (const entry of entries) {
      const entryPath: string = join(dirPath, entry.name)
      if (entry.isDirectory()) {
        await fs.rm(entryPath, { recursive: true })
      } else {
        await fs.unlink(entryPath)
      }
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      // Directory does not exist; silently exit
      console.debug(`Directory ${dirPath} does not exist, skipping cleanup.`)
      return
    }
    // Re-throw the error if it is not a "directory does not exist" error
    throw error
  }
}
