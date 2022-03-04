/**
 * @implements {globalThis.File}
 */
export class File extends Blob implements globalThis.File {
    /**
     *
     * @param {BlobPart[]} init
     * @param {string} name - A USVString representing the file name or the path
     * to the file.
     * @param {FilePropertyBag} [options]
     */
    constructor(init: BlobPart[], name?: string, options?: FilePropertyBag | undefined);
    /** @private */
    private _name;
    /** @private */
    private _lastModified;
    /**
     * The name of the file referenced by the File object.
     * @type {string}
     */
    get name(): string;
    /**
     * The path the URL of the File is relative to.
     * @type {string}
     */
    get webkitRelativePath(): string;
    /**
     * Returns the last modified time of the file, in millisecond since the UNIX
     * epoch (January 1st, 1970 at Midnight).
     * @returns {number}
     */
    get lastModified(): number;
    get [Symbol.toStringTag](): string;
}
//# sourceMappingURL=file.d.ts.map