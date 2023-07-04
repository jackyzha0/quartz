import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default ((component?: QuartzComponent) => {
  if (component) {
    const Component = component
    function MobileOnly(props: QuartzComponentProps) {
      return <div class="mobile-only">
        <Component {...props} />
      </div>
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
