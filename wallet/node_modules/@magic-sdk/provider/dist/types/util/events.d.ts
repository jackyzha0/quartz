import EventEmitter from 'eventemitter3';
export declare type EventsDefinition = {
    [K in string | symbol]: (...args: any[]) => void;
} | void;
/**
 * An extension of `EventEmitter` (provided by `eventemitter3`) with an adjusted
 * type interface that supports the unique structure of Magic SDK modules.
 */
export declare class TypedEmitter<Events extends EventsDefinition = void> extends EventEmitter<Events extends void ? string | symbol : Events> {
}
declare type ChainingMethods = 'on' | 'once' | 'addListener' | 'off' | 'removeListener' | 'removeAllListeners';
declare type NonChainingMethods = 'emit' | 'eventNames' | 'listeners' | 'listenerCount';
declare type ReplaceReturnType<T extends (...a: any) => any, TNewReturn> = (...a: Parameters<T>) => TNewReturn;
/**
 * Creates a `TypedEmitter` instance and returns helper functions for easily
 * mixing `TypedEmitter` methods into other objects.
 */
export declare function createTypedEmitter<Events extends EventsDefinition = void>(): {
    emitter: TypedEmitter<Events>;
    createChainingEmitterMethod: <T1 extends ChainingMethods, T2>(method: T1, source: T2) => ReplaceReturnType<TypedEmitter<void>[T1], T2>;
    createBoundEmitterMethod: <T extends NonChainingMethods>(method: T) => TypedEmitter<void>[T];
};
export {};
