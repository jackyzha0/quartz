"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRenderer = void 0;
const path_1 = require("path");
const fs_1 = __importStar(require("fs"));
const utils_1 = require("./utils");
const sass = __importStar(require("sass"));
const url_1 = require("url");
function createRenderer(options = {}, sourcemap) {
    const loadPaths = options.loadPaths;
    const resolveModule = (0, utils_1.createResolver)(options, loadPaths);
    function resolveImport(pathname, ext) {
        if (ext) {
            let filename = pathname + ext;
            if (fs_1.default.existsSync(filename)) {
                return filename;
            }
            const index = filename.lastIndexOf(path_1.sep);
            filename = index >= 0 ? filename.slice(0, index) + path_1.sep + '_' + filename.slice(index + 1) : '_' + filename;
            if (fs_1.default.existsSync(filename)) {
                return filename;
            }
            return null;
        }
        else {
            if (!fs_1.default.existsSync((0, path_1.dirname)(pathname))) {
                return null;
            }
            return resolveImport(pathname, '.scss')
                || resolveImport(pathname, '.css')
                || resolveImport(pathname, '.sass')
                || resolveImport(pathname + path_1.sep + 'index');
        }
    }
    function resolveRelativeImport(loadPath, filename) {
        const absolute = (0, path_1.resolve)(loadPath, filename);
        const pathParts = (0, path_1.parse)(absolute);
        if (pathParts.ext) {
            return resolveImport(pathParts.dir + path_1.sep + pathParts.name, pathParts.ext);
        }
        else {
            return resolveImport(absolute);
        }
    }
    const sepTilde = `${path_1.sep}~`;
    return function (path) {
        var _a;
        const basedir = (0, path_1.dirname)(path);
        let source = fs_1.default.readFileSync(path, 'utf-8');
        if (options.precompile) {
            source = options.precompile(source, path, true);
        }
        const syntax = (0, utils_1.fileSyntax)(path);
        if (syntax === 'css') {
            return { cssText: (0, fs_1.readFileSync)(path, 'utf-8'), watchFiles: [path] };
        }
        if (options.quietDeps) {
            options.url = (0, url_1.pathToFileURL)(path);
        }
        const warnings = [];
        const logger = (_a = options.logger) !== null && _a !== void 0 ? _a : {
            warn: function (message, opts) {
                var _a, _b;
                if (!opts.span) {
                    warnings.push({ text: `sass warning: ${message}` });
                }
                else {
                    const filename = (_b = (_a = opts.span.url) === null || _a === void 0 ? void 0 : _a.pathname) !== null && _b !== void 0 ? _b : path;
                    const esbuildMsg = {
                        text: message,
                        location: {
                            file: filename,
                            line: opts.span.start.line,
                            column: opts.span.start.column,
                            lineText: opts.span.text
                        },
                        detail: {
                            deprecation: opts.deprecation,
                            stack: opts.stack
                        }
                    };
                    warnings.push(esbuildMsg);
                }
            }
        };
        const { css, loadedUrls, sourceMap } = sass.compileString(source, {
            sourceMapIncludeSources: true,
            ...options,
            logger,
            syntax,
            importer: {
                load(canonicalUrl) {
                    const pathname = (0, url_1.fileURLToPath)(canonicalUrl);
                    let contents = fs_1.default.readFileSync(pathname, 'utf8');
                    if (options.precompile) {
                        contents = options.precompile(contents, pathname, false);
                    }
                    return {
                        contents,
                        syntax: (0, utils_1.fileSyntax)(pathname),
                        sourceMapUrl: sourcemap ? canonicalUrl : undefined
                    };
                },
                canonicalize(url) {
                    let filename;
                    if (url.startsWith('~')) {
                        filename = resolveModule(decodeURI(url.slice(1)), basedir);
                    }
                    else if (url.startsWith('file://')) {
                        filename = (0, url_1.fileURLToPath)(url);
                        let joint = filename.lastIndexOf(sepTilde);
                        if (joint >= 0) {
                            filename = resolveModule(filename.slice(joint + 2), filename.slice(0, joint));
                        }
                    }
                    else {
                        filename = decodeURI(url);
                    }
                    if (options.importMapper) {
                        filename = options.importMapper(filename);
                    }
                    let resolved = resolveRelativeImport(basedir, filename);
                    if (resolved) {
                        return (0, url_1.pathToFileURL)(resolved);
                    }
                    for (const loadPath of loadPaths) {
                        resolved = resolveRelativeImport(loadPath, filename);
                        if (resolved) {
                            return (0, url_1.pathToFileURL)(resolved);
                        }
                    }
                    return null;
                }
            },
            sourceMap: sourcemap
        });
        let cssText = css.toString();
        if (sourceMap) {
            sourceMap.sourceRoot = basedir;
            sourceMap.sources = sourceMap.sources.map(source => {
                return (0, path_1.relative)(basedir, source.startsWith('data:') ? path : (0, url_1.fileURLToPath)(source));
            });
            cssText += '\n' + (0, utils_1.sourceMappingURL)(sourceMap);
        }
        return {
            cssText,
            warnings: warnings,
            watchFiles: [path, ...loadedUrls.map(url_1.fileURLToPath)]
        };
    };
}
exports.createRenderer = createRenderer;
//# sourceMappingURL=render.js.map