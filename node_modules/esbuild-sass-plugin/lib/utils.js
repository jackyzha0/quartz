"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createResolver = exports.postcssModules = exports.parseNonce = exports.makeModule = exports.sourceMappingURL = exports.getContext = exports.fileSyntax = exports.modulesPaths = exports.posixRelative = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const cwd = process.cwd();
exports.posixRelative = require('path').sep === '/'
    ? (path) => `css-chunk:${(0, path_1.relative)(cwd, path)}`
    : (path) => `css-chunk:${(0, path_1.relative)(cwd, path).replace(/\\/g, '/')}`;
function modulesPaths(absWorkingDir) {
    let path = absWorkingDir || process.cwd();
    let { root } = (0, path_1.parse)(path);
    let found = [];
    while (path !== root) {
        const filename = (0, path_1.resolve)(path, 'node_modules');
        if ((0, fs_1.existsSync)(filename)) {
            found.push(filename);
        }
        path = (0, path_1.resolve)(path, '..');
    }
    return [...found];
}
exports.modulesPaths = modulesPaths;
function fileSyntax(filename) {
    if (filename.endsWith('.scss')) {
        return 'scss';
    }
    else if (filename.endsWith('.css')) {
        return 'css';
    }
    else {
        return 'indented';
    }
}
exports.fileSyntax = fileSyntax;
const SASS_PLUGIN_CONTEXT = Symbol();
function getContext(buildOptions) {
    let descriptor = Object.getOwnPropertyDescriptor(buildOptions, SASS_PLUGIN_CONTEXT);
    if (descriptor === undefined) {
        Object.defineProperty(buildOptions, SASS_PLUGIN_CONTEXT, descriptor = {
            value: {
                instances: 0
            }
        });
    }
    const instance = descriptor.value.instances++;
    return {
        instance,
        namespace: `sass-plugin-${instance}`,
        sourcemap: !!buildOptions.sourcemap,
        watched: {}
    };
}
exports.getContext = getContext;
function sourceMappingURL(sourceMap) {
    const data = Buffer.from(JSON.stringify(sourceMap), 'utf-8').toString('base64');
    return `/*# sourceMappingURL=data:application/json;charset=utf-8;base64,${data} */`;
}
exports.sourceMappingURL = sourceMappingURL;
function requireTool(module, basedir) {
    try {
        return require(module);
    }
    catch (ignored) {
    }
    if (basedir)
        try {
            return require(require.resolve(module, { paths: [basedir] }));
        }
        catch (ignored) {
        }
    try {
        return require(require.resolve(module, { paths: [process.cwd()] }));
    }
    catch (e) {
        try {
            return require(module);
        }
        catch (ignored) {
            console.error(`Cannot find module '${module}', make sure it's installed. e.g. yarn add -D ${module}`, e);
            process.exit(1);
        }
    }
}
const cssTextModule = cssText => `\
export default \`
${cssText.replace(/([$`\\])/g, '\\$1')}\`;
`;
const cssResultModule = cssText => `\
import {css} from "lit-element/lit-element.js";
export default css\`
${cssText.replace(/([$`\\])/g, '\\$1')}\`;
`;
const styleModule = (cssText, nonce) => nonce ? `\
const css = \`${cssText.replace(/([$`\\])/g, '\\$1')}\`;
const style = document.createElement("style");
style.setAttribute("nonce", ${nonce});
style.appendChild(document.createTextNode(css));
document.head.appendChild(style);
export {css};
` : `\
const css = \`${cssText.replace(/([$`\\])/g, '\\$1')}\`;
document.head
    .appendChild(document.createElement("style"))
    .appendChild(document.createTextNode(css));
export {css};
`;
function makeModule(contents, type, nonce) {
    switch (type) {
        case 'style':
            return styleModule(contents, nonce);
        case 'lit-css':
            return cssResultModule(contents);
        case 'css-text':
            return cssTextModule(contents);
        default:
            return contents;
    }
}
exports.makeModule = makeModule;
function parseNonce(nonce) {
    if (nonce) {
        if (nonce.startsWith('window.') || nonce.startsWith('process.') || nonce.startsWith('globalThis.')) {
            return nonce;
        }
        else {
            return JSON.stringify(nonce);
        }
    }
    else {
        return nonce;
    }
}
exports.parseNonce = parseNonce;
function postcssModules(options, plugins = []) {
    const postcss = requireTool('postcss', options.basedir);
    const postcssModulesPlugin = requireTool('postcss-modules', options.basedir);
    return async function (source, dirname, path) {
        let cssModule;
        const { css } = await postcss([
            postcssModulesPlugin({
                ...options,
                getJSON(cssFilename, json, outputFileName) {
                    var _a;
                    cssModule = JSON.stringify(json, null, 2);
                    (_a = options.getJSON) === null || _a === void 0 ? void 0 : _a.call(options, cssFilename, json, outputFileName);
                }
            }),
            ...plugins
        ]).process(source, { from: path, map: false });
        return {
            contents: css,
            pluginData: { exports: cssModule },
            loader: 'js'
        };
    };
}
exports.postcssModules = postcssModules;
function createResolver(options = {}, loadPaths) {
    if (options.prefer) {
        const resolve = require('resolve');
        const cache = {};
        const prefer = options.prefer;
        const opts = {
            paths: ['.', ...loadPaths],
            readPackageSync(readFileSync, pkgfile) {
                let cached = cache[pkgfile];
                if (!cached) {
                    const pkg = JSON.parse(readFileSync(pkgfile));
                    cached = cache[pkgfile] = { main: pkg[prefer] || pkg.main };
                }
                return cached;
            }
        };
        return (id, basedir) => {
            try {
                opts.basedir = basedir;
                return resolve.sync(id, opts);
            }
            catch (ignored) {
                return id;
            }
        };
    }
    else {
        const opts = {
            paths: ['.', ...loadPaths]
        };
        return (id, basedir) => {
            try {
                opts.paths[0] = basedir;
                let resolved = require.resolve(id, opts);
                if (resolved.endsWith('.js')) {
                    resolved = resolved.slice(0, -3) + '.scss';
                    if (!(0, fs_1.existsSync)(resolved)) {
                        resolved = resolved.slice(0, -5) + '.sass';
                        if (!(0, fs_1.existsSync)(resolved)) {
                            resolved = resolved.slice(0, -5) + '.css';
                        }
                    }
                }
                return resolved;
            }
            catch (ignored) {
                return id;
            }
        };
    }
}
exports.createResolver = createResolver;
//# sourceMappingURL=utils.js.map