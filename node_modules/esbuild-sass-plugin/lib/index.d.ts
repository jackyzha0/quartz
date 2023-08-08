import { OnLoadResult } from 'esbuild';
import { StringOptions } from 'sass';
import { sassPlugin } from './plugin';
export type Type = 'css' | 'style' | 'css-text' | 'lit-css';
export type SassPluginOptions = StringOptions<'sync'> & {
    filter?: RegExp;
    importMapper?: (url: string) => string;
    includePaths?: string[];
    basedir?: string;
    type?: Type;
    cache?: Map<string, CachedResult> | boolean;
    transform?: (this: SassPluginOptions, css: string, resolveDir: string, filePath: string) => string | OnLoadResult | Promise<string | OnLoadResult>;
    precompile?: (source: string, path: string, isRoot?: boolean) => string;
    cssImports?: boolean;
    nonce?: string;
    prefer?: 'sass' | 'style' | 'main';
};
export default sassPlugin;
export { sassPlugin };
export { makeModule, postcssModules } from './utils';
export type CachedResult = {
    mtimeMs: number;
    result: OnLoadResult;
};
