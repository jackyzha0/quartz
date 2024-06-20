---
title: Creating your own Quartz components
---

> [!warning]
> This guide assumes you have experience writing JavaScript and are familiar with TypeScript.

Normally on the web, we write layout code using HTML which looks something like the following:

```html
<article>
  <h1>An article header</h1>
  <p>Some content</p>
</article>
```

This piece of HTML represents an article with a leading header that says "An article header" and a paragraph that contains the text "Some content". This is combined with CSS to style the page and JavaScript to add interactivity.

However, HTML doesn't let you create reusable templates. If you wanted to create a new page, you would need to copy and paste the above snippet and edit the header and content yourself. This isn't great if we have a lot of content on our site that shares a lot of similar layout. The smart people who created React also had similar complaints and invented the concept of Components -- JavaScript functions that return JSX -- to solve the code duplication problem.

In effect, components allow you to write a JavaScript function that takes some data and produces HTML as an output. **While Quartz doesn't use React, it uses the same component concept to allow you to easily express layout templates in your Quartz site.**

## An Example Component

### Constructor

Component files are written in `.tsx` files that live in the `quartz/components` folder. These are re-exported in `quartz/components/index.ts` so you can use them in layouts and other components more easily.

Each component file should have a default export that satisfies the `QuartzComponentConstructor` function signature. It's a function that takes in a single optional parameter `opts` and returns a Quartz Component. The type of the parameters `opts` is defined by the interface `Options` which you as the component creator also decide.

In your component, you can use the values from the configuration option to change the rendering behaviour inside of your component. For example, the component in the code snippet below will not render if the `favouriteNumber` option is below 0.

```tsx {11-17}
interface Options {
  favouriteNumber: number
}

const defaultOptions: Options = {
  favouriteNumber: 42,
}

export default ((userOpts?: Options) => {
  const opts = { ...userOpts, ...defaultOpts }
  function YourComponent(props: QuartzComponentProps) {
    if (opts.favouriteNumber < 0) {
      return null
    }

    return <p>My favourite number is {opts.favouriteNumber}</p>
  }

  return YourComponent
}) satisfies QuartzComponentConstructor
```

### Props

The Quartz component itself (lines 11-17 highlighted above) looks like a React component. It takes in properties (sometimes called [props](https://react.dev/learn/passing-props-to-a-component)) and returns JSX.

All Quartz components accept the same set of props:

```tsx title="quartz/components/types.ts"
// simplified for sake of demonstration
export type QuartzComponentProps = {
  fileData: QuartzPluginData
  cfg: GlobalConfiguration
  tree: Node<QuartzPluginData>
  allFiles: QuartzPluginData[]
  displayClass?: "mobile-only" | "desktop-only"
}
```

- `fileData`: Any metadata [[making plugins|plugins]] may have added to the current page.
  - `fileData.slug`: slug of the current page.
  - `fileData.frontmatter`: any frontmatter parsed.
- `cfg`: The `configuration` field in `quartz.config.ts`.
- `tree`: the resulting [HTML AST](https://github.com/syntax-tree/hast) after processing and transforming the file. This is useful if you'd like to render the content using [hast-util-to-jsx-runtime](https://github.com/syntax-tree/hast-util-to-jsx-runtime) (you can find an example of this in `quartz/components/pages/Content.tsx`).
- `allFiles`: Metadata for all files that have been parsed. Useful for doing page listings or figuring out the overall site structure.
- `displayClass`: a utility class that indicates a preference from the user about how to render it in a mobile or desktop setting. Helpful if you want to conditionally hide a component on mobile or desktop.

### Styling

Quartz components can also define a `.css` property on the actual function component which will get picked up by Quartz. This is expected to be a CSS string which can either be inlined or imported from a `.scss` file.

Note that inlined styles **must** be plain vanilla CSS:

```tsx {6-10} title="quartz/components/YourComponent.tsx"
export default (() => {
  function YourComponent() {
    return <p class="red-text">Example Component</p>
  }

  YourComponent.css = `
  p.red-text {
    color: red;
  }
  `

  return YourComponent
}) satisfies QuartzComponentConstructor
```

Imported styles, however, can be from SCSS files:

```tsx {1-2,9} title="quartz/components/YourComponent.tsx"
// assuming your stylesheet is in quartz/components/styles/YourComponent.scss
import styles from "./styles/YourComponent.scss"

export default (() => {
  function YourComponent() {
    return <p>Example Component</p>
  }

  YourComponent.css = styles
  return YourComponent
}) satisfies QuartzComponentConstructor
```

> [!warning]
> Quartz does not use CSS modules so any styles you declare here apply _globally_. If you only want it to apply to your component, make sure you use specific class names and selectors.

### Scripts and Interactivity

What about interactivity? Suppose you want to add an-click handler for example. Like the `.css` property on the component, you can also declare `.beforeDOMLoaded` and `.afterDOMLoaded` properties that are strings that contain the script.

```tsx title="quartz/components/YourComponent.tsx"
export default (() => {
  function YourComponent() {
    return <button id="btn">Click me</button>
  }

  YourComponent.beforeDOMLoaded = `
  console.log("hello from before the page loads!")
  `

  YourComponent.afterDOMLoaded = `
  document.getElementById('btn').onclick = () => {
    alert('button clicked!')
  }
  `
  return YourComponent
}) satisfies QuartzComponentConstructor
```

> [!hint]
> For those coming from React, Quartz components are different from React components in that it only uses JSX for templating and layout. Hooks like `useEffect`, `useState`, etc. are not rendered and other properties that accept functions like `onClick` handlers will not work. Instead, do it using a regular JS script that modifies the DOM element directly.

As the names suggest, the `.beforeDOMLoaded` scripts are executed _before_ the page is done loading so it doesn't have access to any elements on the page. This is mostly used to prefetch any critical data.

The `.afterDOMLoaded` script executes once the page has been completely loaded. This is a good place to setup anything that should last for the duration of a site visit (e.g. getting something saved from local storage).

If you need to create an `afterDOMLoaded` script that depends on _page specific_ elements that may change when navigating to a new page, you can listen for the `"nav"` event that gets fired whenever a page loads (which may happen on navigation if [[SPA Routing]] is enabled).

```ts
document.addEventListener("nav", () => {
  // do page specific logic here
  // e.g. attach event listeners
  const toggleSwitch = document.querySelector("#switch") as HTMLInputElement
  toggleSwitch.addEventListener("change", switchTheme)
  window.addCleanup(() => toggleSwitch.removeEventListener("change", switchTheme))
})
```

It is best practice to track any event handlers via `window.addCleanup` to prevent memory leaks.
This will get called on page navigation.

#### Importing Code

Of course, it isn't always practical (nor desired!) to write your code as a string literal in the component.

Quartz supports importing component code through `.inline.ts` files.

```tsx title="quartz/components/YourComponent.tsx"
// @ts-ignore: typescript doesn't know about our inline bundling system
// so we need to silence the error
import script from "./scripts/graph.inline"

export default (() => {
  function YourComponent() {
    return <button id="btn">Click me</button>
  }

  YourComponent.afterDOMLoaded = script
  return YourComponent
}) satisfies QuartzComponentConstructor
```

```ts title="quartz/components/scripts/graph.inline.ts"
// any imports here are bundled for the browser
import * as d3 from "d3"

document.getElementById("btn").onclick = () => {
  alert("button clicked!")
}
```

Additionally, like what is shown in the example above, you can import packages in `.inline.ts` files. This will be bundled by Quartz and included in the actual script.

### Using a Component

After creating your custom component, re-export it in `quartz/components/index.ts`:

```ts title="quartz/components/index.ts" {4,10}
import ArticleTitle from "./ArticleTitle"
import Content from "./pages/Content"
import Darkmode from "./Darkmode"
import YourComponent from "./YourComponent"

export { ArticleTitle, Content, Darkmode, YourComponent }
```

Then, you can use it like any other component in `quartz.layout.ts` via `Component.YourComponent()`. See the [[configuration#Layout|layout]] section for more details.

As Quartz components are just functions that return React components, you can compositionally use them in other Quartz components.

```tsx title="quartz/components/AnotherComponent.tsx"
import YourComponent from "./YourComponent"

export default (() => {
  function AnotherComponent(props: QuartzComponentProps) {
    return (
      <div>
        <p>It's nested!</p>
        <YourComponent {...props} />
      </div>
    )
  }

  return AnotherComponent
}) satisfies QuartzComponentConstructor
```

> [!hint]
> Look in `quartz/components` for more examples of components in Quartz as reference for your own components!
