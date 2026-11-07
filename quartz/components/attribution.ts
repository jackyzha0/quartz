import { cloneElement, isValidElement, type VNode } from "preact"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { attributeError } from "../util/pluginErrors"
import { getPluginOrigin } from "../util/diagnostics"

/**
 * Source attribution for plugin components.
 *
 * Rendered HTML otherwise carries no hint of which plugin produced which part
 * of the page, which makes theming, debugging and bug reports harder. Plugin
 * components loaded through the component loader are wrapped so that the root
 * element they render gets two attributes:
 *
 *   data-quartz-plugin="graph"  data-quartz-component="Graph"
 *
 * The wrapper is append-only: it never removes or changes existing attributes,
 * keeps the component's static resources (css, beforeDOMLoaded,
 * afterDOMLoaded, displayName) and leaves non-element results (null, strings,
 * fragments, nested component roots) untouched.
 */

export const PLUGIN_ATTRIBUTE = "data-quartz-plugin"
export const COMPONENT_ATTRIBUTE = "data-quartz-component"

const ATTRIBUTED = Symbol.for("quartz.attributed")

export interface ComponentAttribution {
  plugin: string
  component: string
}

/** Short plugin name: "@quartz-community/graph" -> "graph", "github:a/b" -> "b". */
export function shortPluginName(pluginName: string): string {
  const cleaned = pluginName.replace(/#.*$/, "").replace(/\/+$/, "")
  return cleaned.split(/[/:]/).pop() ?? cleaned
}

/** Add attribution attributes to a rendered VNode if it is a plain DOM element. */
export function attributeVNode<T>(rendered: T, attribution: ComponentAttribution): T {
  if (!isValidElement(rendered)) return rendered
  const vnode = rendered as unknown as VNode<Record<string, unknown>>
  // Only intrinsic elements map 1:1 to a DOM node we can annotate.
  if (typeof vnode.type !== "string") return rendered
  const props = vnode.props ?? {}
  if (props[PLUGIN_ATTRIBUTE] !== undefined) return rendered
  return cloneElement(vnode, {
    [PLUGIN_ATTRIBUTE]: attribution.plugin,
    [COMPONENT_ATTRIBUTE]: attribution.component,
  }) as unknown as T
}

/** Wrap a component instance so its root element carries attribution. */
export function attributeComponent(
  component: QuartzComponent,
  attribution: ComponentAttribution,
): QuartzComponent {
  if ((component as unknown as Record<symbol, unknown>)[ATTRIBUTED]) return component
  const wrapped = ((props: QuartzComponentProps) => {
    let rendered
    try {
      rendered = component(props)
    } catch (err) {
      // name the plugin + component + page instead of "Failed to emit from PageTypeDispatcher"
      throw attributeError(err, {
        origin: getPluginOrigin(attribution.plugin) ?? {
          name: attribution.plugin,
          displayName: attribution.plugin,
          source: attribution.plugin,
        },
        stage: "render",
        component: attribution.component,
        file: props?.fileData?.slug,
      })
    }
    return attributeVNode(rendered, attribution)
  }) as QuartzComponent
  // Preserve css / beforeDOMLoaded / afterDOMLoaded / displayName and any other statics.
  Object.assign(wrapped, component)
  Object.defineProperty(wrapped, "name", { value: component.name || attribution.component })
  Object.defineProperty(wrapped, ATTRIBUTED, { value: true })
  return wrapped
}

/**
 * Wrap whatever a plugin exports for a component: a constructor
 * (`(opts) => QuartzComponent`) or, less commonly, a ready component instance
 * (recognisable by a `displayName` property, matching how the layout builder
 * distinguishes the two).
 */
export function attributeComponentExport<T extends QuartzComponent | QuartzComponentConstructor>(
  exported: T,
  attribution: ComponentAttribution,
): T {
  if (typeof exported !== "function") return exported
  if ((exported as unknown as Record<symbol, unknown>)[ATTRIBUTED]) return exported
  if ("displayName" in exported) {
    return attributeComponent(exported as QuartzComponent, attribution) as T
  }
  const ctor = exported as QuartzComponentConstructor<any>
  const wrappedCtor = ((opts: unknown) => {
    const instance = ctor(opts)
    return typeof instance === "function" ? attributeComponent(instance, attribution) : instance
  }) as QuartzComponentConstructor<any>
  Object.assign(wrappedCtor, ctor)
  Object.defineProperty(wrappedCtor, "name", { value: ctor.name || attribution.component })
  Object.defineProperty(wrappedCtor, ATTRIBUTED, { value: true })
  return wrappedCtor as T
}
