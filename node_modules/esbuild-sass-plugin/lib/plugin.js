"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sassPlugin = void 0;
const path_1 = require("path");
const utils_1 = require("./utils");
const cache_1 = require("./cache");
const render_1 = require("./render");
const DEFAULT_FILTER = /\.(s[ac]ss|css)$/;
function sassPlugin(options = {}) {
    var _a;
    if (!options.basedir) {
        options.basedir = process.cwd();
    }
    if (options.includePaths) {
        console.log(`'includePaths' option is deprecated, please use 'loadPaths' instead`);
    }
    const type = (_a = options.type) !== null && _a !== void 0 ? _a : 'css';
    if (options['picomatch'] || options['exclude'] || typeof type !== 'string') {
        console.log('The type array, exclude and picomatch options are no longer supported, please refer to the README for alternatives.');
    }
    const nonce = (0, utils_1.parseNonce)(options.nonce);
    return {
        name: 'sass-plugin',
        setup({ initialOptions, onResolve, onLoad, resolve }) {
            var _a, _b;
            options.loadPaths = Array.from(new Set([
                ...options.loadPaths || (0, utils_1.modulesPaths)(initialOptions.absWorkingDir),
                ...options.includePaths || []
            ]));
            const { sourcemap, watched } = (0, utils_1.getContext)(initialOptions);
            if (options.cssImports) {
                onResolve({ filter: /^~.*\.css$/ }, ({ path, importer, resolveDir }) => {
                    return resolve(path.slice(1), { importer, resolveDir, kind: 'import-rule' });
                });
            }
            const transform = options.transform ? options.transform.bind(options) : null;
            const cssChunks = {};
            if (transform) {
                const namespace = 'esbuild-sass-plugin';
                onResolve({ filter: /^css-chunk:/ }, ({ path }) => ({
                    path,
                    namespace
                }));
                onLoad({ filter: /./, namespace }, ({ path }) => ({
                    contents: cssChunks[path],
                    loader: 'css'
                }));
            }
            const renderSync = (0, render_1.createRenderer)(options, (_a = options.sourceMap) !== null && _a !== void 0 ? _a : sourcemap);
            onLoad({ filter: (_b = options.filter) !== null && _b !== void 0 ? _b : DEFAULT_FILTER }, (0, cache_1.useCache)(options, async (path) => {
                var _a;
                try {
                    let { cssText, watchFiles, warnings } = renderSync(path);
                    if (!warnings) {
                        warnings = [];
                    }
                    watched[path] = watchFiles;
                    const resolveDir = (0, path_1.dirname)(path);
                    if (transform) {
                        const out = await transform(cssText, resolveDir, path);
                        if (typeof out !== 'string') {
                            if (out.loader && out.loader !== 'js') {
                                return {
                                    ...out,
                                    resolveDir,
                                    watchFiles: [...watchFiles, ...(out.watchFiles || [])],
                                    watchDirs: out.watchDirs || []
                                };
                            }
                            let { contents, pluginData } = out;
                            if (type === 'css') {
                                let name = (0, utils_1.posixRelative)(path);
                                cssChunks[name] = contents;
                                contents = `import '${name}';`;
                            }
                            else if (type === 'style') {
                                contents = (0, utils_1.makeModule)(String(contents), 'style', nonce);
                            }
                            else {
                                return {
                                    errors: [{ text: `unsupported type '${type}' for postCSS modules` }]
                                };
                            }
                            return {
                                contents: `${contents}export default ${pluginData.exports};`,
                                loader: 'js',
                                resolveDir,
                                watchFiles: [...watchFiles, ...(out.watchFiles || [])],
                                watchDirs: out.watchDirs || []
                            };
                        }
                        else {
                            cssText = out;
                        }
                    }
                    return type === 'css' ? {
                        contents: cssText,
                        loader: 'css',
                        resolveDir,
                        warnings,
                        watchFiles
                    } : {
                        contents: (0, utils_1.makeModule)(cssText, type, nonce),
                        loader: 'js',
                        resolveDir,
                        warnings,
                        watchFiles
                    };
                }
                catch (err) {
                    return {
                        errors: [{ text: err.message }],
                        watchFiles: (_a = watched[path]) !== null && _a !== void 0 ? _a : [path]
                    };
                }
            }));
        }
    };
}
exports.sassPlugin = sassPlugin;
//# sourceMappingURL=plugin.js.map