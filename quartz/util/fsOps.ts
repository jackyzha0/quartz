import { promises as fs, Dirent } from 'fs';
import { join } from 'path';

export async function cleanDirectory(dirPath: string): Promise<void> {
    const entries: Dirent[] = await fs.readdir(dirPath, { withFileTypes: true });
    for (const entry of entries) {
        const entryPath: string = join(dirPath, entry.name);
        if (entry.isDirectory()) {
            await fs.rm(entryPath, { recursive: true });
        } else {
            await fs.unlink(entryPath);
        }
    }
}