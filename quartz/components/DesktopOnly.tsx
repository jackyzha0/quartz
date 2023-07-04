import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default ((component?: QuartzComponent) => {
  if (component) {
    const Component = component
    function DesktopOnly(props: QuartzComponentProps) {
      return <div class="desktop-only">
        <Component {...props} />
      </div>
    }

    DesktopOnly.displayName = component.displayName
    DesktopOnly.afterDOMLoaded = component?.afterDOMLoaded
    DesktopOnly.beforeDOMLoaded = component?.beforeDOMLoaded
    DesktopOnly.css = component?.css
    return DesktopOnly
  } else {
    return () => <></>
  }
}) satisfies QuartzComponentConstructor
