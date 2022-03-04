const genericMessage = "Invariant Violation";

const {
  setPrototypeOf = function (obj: any, proto: any) {
    obj.__proto__ = proto;
    return obj;
  },
} = Object as any;

/**
 * Error that may get thrown when an invariant assummption fails.
 * @public
 */
export class InvariantError extends Error {
  /**
   * @internal
   */
  framesToPop = 1;
  /**
   * @internal
   */
  name = genericMessage;
  /**
   * @internal
   */
  constructor(message: string = genericMessage) {
    super(
      typeof message === "number"
        ? `${genericMessage}: ${message} (see https://github.com/apollographql/invariant-packages)`
        : message,
    );
    setPrototypeOf(this, InvariantError.prototype);
  }
}
/**
 * @internal
 * @param condition - any truthy condition to assert
 * @param message  - optional message to use if the condition is falsy
 */
export function invariant(condition: any, message?: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}
