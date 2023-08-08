import { Options as DetectOverflowOptions } from '../detectOverflow';
import type { Derivable, Middleware, MiddlewareState } from '../types';
export type SizeOptions = Partial<DetectOverflowOptions & {
    /**
     * Function that is called to perform style mutations to the floating element
     * to change its size.
     * @default undefined
     */
    apply(args: MiddlewareState & {
        availableWidth: number;
        availableHeight: number;
    }): void | Promise<void>;
}>;
/**
 * Provides data that allows you to change the size of the floating element —
 * for instance, prevent it from overflowing the clipping boundary or match the
 * width of the reference element.
 * @see https://floating-ui.com/docs/size
 */
export declare const size: (options?: SizeOptions | Derivable<SizeOptions>) => Middleware;
