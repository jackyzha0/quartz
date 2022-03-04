"use strict"

import { Blob } from "./package.js"
import { File as WebFile } from "./file.js"

// Electron-renderer should get the browser implementation instead of node
// Browser configuration is not enough

// Marking export as a DOM File object instead of custom class.
/** @type {typeof globalThis.File} */
const File = typeof globalThis.File === "function" ? globalThis.File : WebFile

export { File, Blob }
