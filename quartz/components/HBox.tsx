// @ts-ignore: this is safe, we don't want to actually make darkmode.inline.ts a module as
// modules are automatically deferred and we don't want that to happen for critical beforeDOMLoads
// see: https://v8.dev/features/modules#defer
import darkmodeScript from "./scripts/darkmode.inline"
import styles from "./styles/hbox.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types";

export default ((components?: QuartzComponent[]) => {
	if (components && components.length > 0) {
		function HBox(props: QuartzComponentProps) {
			// otherwise it complains that components
			// could be undefined even though we already checked
			if (!components) return null
			return (
				<div class="hbox" {...props} >
					{components.map((Component) => (
						<Component {...props} />
					))}
				</div>
			)
		}

    // hacky - for some reason it doesn't get loaded otherwise
    HBox.beforeDOMLoaded = darkmodeScript;
		HBox.css = styles;
		return HBox
	} else {
		return () => <></>
	}

}) satisfies QuartzComponentConstructor