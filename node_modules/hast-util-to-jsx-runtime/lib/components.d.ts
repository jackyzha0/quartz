import type {Element} from 'hast'

/**
 * Basic functional component: given props, returns an element.
 *
 * @typeParam ComponentProps
 *   Props type.
 * @param props
 *   Props.
 * @returns
 *   Result.
 */
export type FunctionComponent<ComponentProps> = (
  props: ComponentProps
  // eslint-disable-next-line @typescript-eslint/ban-types
) => JSX.Element | string | null | undefined

/**
 * Class component: given props, returns an instance.
 *
 * @typeParam ComponentProps
 *   Props type.
 * @param props
 *   Props.
 * @returns
 *   Instance.
 */
export type ClassComponent<ComponentProps> = new (
  props: ComponentProps
) => JSX.ElementClass

/**
 * Function or class component.
 *
 * You can access props at `JSX.IntrinsicElements`.
 * For example, to find props for `a`, use `JSX.IntrinsicElements['a']`.
 *
 * @typeParam ComponentProps
 *   Props type.
 */
export type Component<ComponentProps> =
  | FunctionComponent<ComponentProps>
  | ClassComponent<ComponentProps>

export type ExtraProps = {node?: Element | undefined}

/**
 * Possible components to use.
 *
 * Each key is a tag name typed in `JSX.IntrinsicElements`.
 * Each value is either a different tag name, or a component accepting the
 * corresponding props (and an optional `node` prop if `passNode` is on).
 *
 * You can access props at `JSX.IntrinsicElements`.
 * For example, to find props for `a`, use `JSX.IntrinsicElements['a']`.
 */
// Note: this type has to be in `.ts` or `.d.ts`, otherwise TSC hardcodes
// react into the `.d.ts` file.
export type Components = {
  [TagName in keyof JSX.IntrinsicElements]:
    | Component<JSX.IntrinsicElements[TagName] & ExtraProps>
    | keyof JSX.IntrinsicElements
}
