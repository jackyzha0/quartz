import { SassPluginOptions } from './index';
import { OnLoadArgs, OnLoadResult } from 'esbuild';
type OnLoadCallback = (args: OnLoadArgs) => (OnLoadResult | Promise<OnLoadResult>);
type PluginLoadCallback = (path: string) => (OnLoadResult | Promise<OnLoadResult>);
export declare function useCache(options: SassPluginOptions | undefined, loadCallback: PluginLoadCallback): OnLoadCallback;
export {};
