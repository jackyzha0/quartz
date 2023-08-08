import type { ClientRectObject, Derivable, Middleware, Padding } from '../types';
export declare function getRectsByLine(rects: Array<ClientRectObject>): ClientRectObject[];
export type InlineOptions = Partial<{
    /**
     * Viewport-relative `x` coordinate to choose a `ClientRect`.
     * @default undefined
     */
    x: number;
    /**
     * Viewport-relative `y` coordinate to choose a `ClientRect`.
     * @default undefined
     */
    y: number;
    /**
     * Represents the padding around a disjoined rect when choosing it.
     * @default 2
     */
    padding: Padding;
}>;
/**
 * Provides improved positioning for inline reference elements that can span
 * over multiple lines, such as hyperlinks or range selections.
 * @see https://floating-ui.com/docs/inline
 */
export declare const inline: (options?: InlineOptions | Derivable<InlineOptions>) => Middleware;
