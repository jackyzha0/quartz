import { Options as DetectOverflowOptions } from '../detectOverflow';
import type { Alignment, Derivable, Middleware, Placement } from '../types';
export declare function getPlacementList(alignment: Alignment | null, autoAlignment: boolean, allowedPlacements: Array<Placement>): Placement[];
export type AutoPlacementOptions = Partial<DetectOverflowOptions & {
    /**
     * The axis that runs along the alignment of the floating element. Determines
     * whether to check for most space along this axis.
     * @default false
     */
    crossAxis: boolean;
    /**
     * Choose placements with a particular alignment.
     * @default undefined
     */
    alignment: Alignment | null;
    /**
     * Whether to choose placements with the opposite alignment if the preferred
     * alignment does not fit.
     * @default true
     */
    autoAlignment: boolean;
    /**
     * Which placements are allowed to be chosen. Placements must be within the
     * `alignment` option if explicitly set.
     * @default allPlacements (variable)
     */
    allowedPlacements: Array<Placement>;
}>;
/**
 * Optimizes the visibility of the floating element by choosing the placement
 * that has the most space available automatically, without needing to specify a
 * preferred placement. Alternative to `flip`.
 * @see https://floating-ui.com/docs/autoPlacement
 */
export declare const autoPlacement: (options?: AutoPlacementOptions | Derivable<AutoPlacementOptions>) => Middleware;
