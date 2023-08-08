import { SassPluginOptions, Type } from './index';
import { AcceptedPlugin } from 'postcss';
import PostcssModulesPlugin from 'postcss-modules';
import { BuildOptions, OnLoadResult } from 'esbuild';
import { Syntax } from 'sass';
export declare const posixRelative: (path: string) => string;
export declare function modulesPaths(absWorkingDir?: string): string[];
export declare function fileSyntax(filename: string): Syntax;
export type PluginContext = {
    instance: number;
    namespace: string;
    sourcemap: boolean;
    watched: {
        [path: string]: string[];
    };
};
export declare function getContext(buildOptions: BuildOptions): PluginContext;
export declare function sourceMappingURL(sourceMap: any): string;
export declare function makeModule(contents: string, type: Type, nonce?: string): string;
export declare function parseNonce(nonce: string | undefined): string | undefined;
export type PostcssModulesParams = Parameters<PostcssModulesPlugin>[0] & {
    basedir?: string;
};
export declare function postcssModules(options: PostcssModulesParams, plugins?: AcceptedPlugin[]): (source: string, dirname: string, path: string) => Promise<OnLoadResult>;
export declare function createResolver(options: SassPluginOptions | undefined, loadPaths: string[]): (id: string, basedir: string) => any;
