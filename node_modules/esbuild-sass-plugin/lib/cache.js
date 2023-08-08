"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCache = void 0;
const fs_1 = require("fs");
function collectStats(watchFiles) {
    return Promise.all(watchFiles.map(filename => fs_1.promises.stat(filename)));
}
function maxMtimeMs(stats) {
    return stats.reduce((max, { mtimeMs }) => Math.max(max, mtimeMs), 0);
}
function getCache(options) {
    var _a;
    if ((_a = options.cache) !== null && _a !== void 0 ? _a : true) {
        if (typeof options.cache === 'object') {
            return options.cache;
        }
        else {
            return new Map();
        }
    }
}
function useCache(options = {}, loadCallback) {
    const cache = getCache(options);
    if (cache) {
        return async ({ path }) => {
            try {
                let cached = cache.get(path);
                if (cached) {
                    let watchFiles = cached.result.watchFiles;
                    let stats = await collectStats(watchFiles);
                    for (const { mtimeMs } of stats) {
                        if (mtimeMs > cached.mtimeMs) {
                            cached.result = await loadCallback(watchFiles[0]);
                            cached.mtimeMs = maxMtimeMs(stats);
                            break;
                        }
                    }
                }
                else {
                    let result = await loadCallback(path);
                    cached = {
                        mtimeMs: maxMtimeMs(await collectStats(result.watchFiles)),
                        result
                    };
                    cache.set(path, cached);
                }
                if (cached.result.errors) {
                    cache.delete(path);
                }
                return cached.result;
            }
            catch (error) {
                cache.delete(path);
                throw error;
            }
        };
    }
    else {
        return ({ path }) => loadCallback(path);
    }
}
exports.useCache = useCache;
//# sourceMappingURL=cache.js.map