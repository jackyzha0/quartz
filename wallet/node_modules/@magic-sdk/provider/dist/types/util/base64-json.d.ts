/**
 * Given a JSON-serializable object, encode as a Base64 string.
 */
export declare function encodeJSON<T>(options: T): string;
/**
 * Given a Base64 JSON string, decode a JavaScript object.
 */
export declare function decodeJSON<T>(queryString: string): T;
