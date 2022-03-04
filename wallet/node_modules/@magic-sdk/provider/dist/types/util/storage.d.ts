export declare const getItem: <T>(key: string, callback?: ((err: any, value: T) => void) | undefined) => Promise<T>;
export declare const setItem: <T>(key: string, value: T, callback?: ((err: any, value: T) => void) | undefined) => Promise<T>;
export declare const removeItem: (key: string, callback?: ((err: any) => void) | undefined) => Promise<void>;
export declare const clear: (callback?: ((err: any) => void) | undefined) => Promise<void>;
export declare const length: (callback?: ((err: any, numberOfKeys: number) => void) | undefined) => Promise<number>;
export declare const key: (keyIndex: number, callback?: ((err: any, key: string) => void) | undefined) => Promise<string>;
export declare const keys: (callback?: ((err: any, keys: string[]) => void) | undefined) => Promise<string[]>;
export declare const iterate: <T, U>(iteratee: (value: T, key: string, iterationNumber: number) => U, callback?: ((err: any, result: U) => void) | undefined) => Promise<U>;
