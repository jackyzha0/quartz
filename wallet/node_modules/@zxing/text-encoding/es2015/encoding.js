import { TextDecoder } from './common/TextDecoder';
import { TextEncoder } from './common/TextEncoder';
// Polyfills browser
if (typeof window !== 'undefined') {
    const checkUndefined = key => !(key in window)
        || typeof window[key] === 'undefined'
        || window[key] === null;
    if (checkUndefined('TextDecoder'))
        window['TextDecoder'] = TextDecoder;
    if (checkUndefined('TextEncoder'))
        window['TextEncoder'] = TextEncoder;
}
export { TextDecoder, TextEncoder };
//# sourceMappingURL=encoding.js.map