export function satisfies(e: any, r: any, t: any): any;
export function coerce(e: any, r: any): SemVer | null;
declare class SemVer {
    constructor(e: any, r: any);
    options: any;
    loose: boolean | undefined;
    includePrerelease: boolean | undefined;
    raw: any;
    major: number | undefined;
    minor: number | undefined;
    patch: number | undefined;
    prerelease: any;
    build: any;
    format(): string;
    version: string | undefined;
    toString(): string | undefined;
    compare(e: any): 1 | 0 | -1 | undefined;
    compareMain(e: any): 1 | 0 | -1;
    comparePre(e: any): 1 | 0 | -1 | undefined;
    compareBuild(e: any): 1 | 0 | -1 | undefined;
    inc(e: any, r: any): SemVer;
}
export {};
