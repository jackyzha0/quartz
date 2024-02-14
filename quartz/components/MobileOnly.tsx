import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default ((component?: QuartzComponent) => {
  if (component) {
    const Component = component
    const MobileOnly: QuartzComponent = (props: QuartzComponentProps) => {
      return <Component displayClass="mobile-only" {...props} />
    }

    MobileOnly.displayName = component.displayName
    MobileOnly.afterDOMLoaded = component?.afterDOMLoaded
    MobileOnly.beforeDOMLoaded = component?.beforeDOMLoaded
    MobileOnly.css = component?.css
    return MobileOnly
  } else {
    return () => <></>
  }
}) satisfies QuartzComponentConstructor
