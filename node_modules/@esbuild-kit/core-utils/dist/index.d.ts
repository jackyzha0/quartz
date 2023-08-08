import { UrlAndMap } from 'source-map-support';
import { TransformOptions } from 'esbuild';

type Transformed = {
    code: string;
    map: RawSourceMap;
    warnings?: any[];
};

type RawSourceMap = UrlAndMap['map'];
declare function installSourceMapSupport(): ({ code, map }: Transformed, filePath: string) => string;

declare function transformDynamicImport(filePath: string, code: string): {
    code: string;
    map: any;
} | undefined;

declare function transformSync(code: string, filePath: string, extendOptions?: TransformOptions): Transformed;
declare function transform(code: string, filePath: string, extendOptions?: TransformOptions): Promise<Transformed>;

declare function resolveTsPath(filePath: string): string | undefined;

type Version = [number, number, number];
declare const compareNodeVersion: (version: Version) => number;

export { RawSourceMap, compareNodeVersion, installSourceMapSupport, resolveTsPath, transform, transformDynamicImport, transformSync };
