import { Options as DetectOverflowOptions } from '../detectOverflow';
import type { Derivable, Middleware } from '../types';
export type HideOptions = Partial<DetectOverflowOptions & {
    /**
     * The strategy used to determine when to hide the floating element.
     */
    strategy: 'referenceHidden' | 'escaped';
}>;
/**
 * Provides data to hide the floating element in applicable situations, such as
 * when it is not in the same clipping context as the reference element.
 * @see https://floating-ui.com/docs/hide
 */
export declare const hide: (options?: HideOptions | Derivable<HideOptions>) => Middleware;
