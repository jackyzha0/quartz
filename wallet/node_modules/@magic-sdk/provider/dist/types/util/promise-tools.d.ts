import { TypedEmitter, EventsDefinition } from './events';
/**
 * Extends `Promise` with a polymorphic `this` type to accomodate arbitrary
 * `Promise` API extensions.
 */
interface ExtendedPromise<T> extends Promise<T> {
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): ExtendedPromise<TResult1 | TResult2> & this;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): ExtendedPromise<T | TResult> & this;
    finally(onfinally?: (() => void) | undefined | null): ExtendedPromise<T> & this;
}
/**
 * A `Promise` and `EventEmitter` all in one!
 */
export declare type PromiEvent<TResult, TEvents extends EventsDefinition = void> = ExtendedPromise<TResult> & TypedEmitter<TEvents extends void ? DefaultEvents<TResult> : TEvents & DefaultEvents<TResult>>;
/**
 * Default events attached to every `PromiEvent`.
 */
declare type DefaultEvents<TResult> = {
    done: (result: TResult) => void;
    error: (reason: any) => void;
    settled: () => void;
};
/**
 * A `Promise` executor with can be optionally asynchronous.
 */
declare type AsyncPromiseExecutor<TResult> = (resolve: (value: TResult | PromiseLike<TResult>) => void, reject: (reason?: any) => void) => void | Promise<void>;
/**
 * Returns `true` if the given `value` is a `PromiEvent`.
 */
export declare function isPromiEvent(value: any): value is PromiEvent<any>;
/**
 * Create a native JavaScript `Promise` overloaded with strongly-typed methods
 * from `EventEmitter`.
 */
export declare function createPromiEvent<TResult, TEvents extends EventsDefinition = void>(executor: AsyncPromiseExecutor<TResult>): PromiEvent<TResult, TEvents extends void ? DefaultEvents<TResult> : TEvents & DefaultEvents<TResult>>;
/**
 * Creates a `Promise` with an **async executor** that automatically catches
 * errors occurring within the executor. Nesting promises in this way is usually
 * deemed an _anti-pattern_, but it's useful and clean when promisifying the
 * event-based code that's inherent to JSON RPC.
 *
 * So, here we solve the issue of nested promises by ensuring that no errors
 * mistakenly go unhandled!
 */
export declare function createPromise<TResult>(executor: AsyncPromiseExecutor<TResult>): Promise<TResult>;
export {};
