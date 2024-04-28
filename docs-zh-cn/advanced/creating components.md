---
title: 创建自己的 Quartz组件
---

> [!warning]
> 本指南假设您有编写JavaScript的经验，并且熟悉TypeScript。

通常在网页上，我们使用HTML编写布局代码，如下所示：

```html
<article>
  <h1>An article header</h1>
  <p>Some content</p>
</article>
```

这段HTML表示一篇文章，其前导标题为“文章标题”，段落包含文本“某些内容”。这与CSS相结合来设计页面样式，与JavaScript相结合来增加交互性。

然而，HTML不允许您创建可重复使用的模板。如果你想创建一个新页面，你需要复制并粘贴上面的片段，并自己编辑标题和内容。如果我们的网站上有很多内容共享很多类似的布局，那就不太好了。创建React的聪明人也有类似的抱怨，他们发明了组件的概念——返回JSX的JavaScript函数——来解决代码重复问题。

实际上，组件允许您编写一个JavaScript函数，该函数接受一些数据并生成HTML作为输出**虽然Quartz不使用React，但它使用了相同的组件概念，允许您在Quartz网站中轻松表达布局模板**

## 示例组件

### Constructor

组件文件是在`quartz/components`文件夹中的`.tsx` 文件中编写的。这些内容以`quartz/components/index.ts` 的形式重新导出，因此您可以更容易地在布局和其他组件中使用它们。

每个组件文件都应有一个满足`QuartzComponentConstructor` 函数签名的默认导出。这是一个接受单个可选参数`opts`并返回Quartz组件的函数。参数`opts`的类型由接口`Options`定义，您作为组件创建者也可以自定义。

在组件中，可以使用配置选项中的值来更改组件内部的渲染行为。例如，如果`favouriteNumber`选项低于0，则不会呈现下面代码段中的组件。

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

Quartz组件本身（上面突出显示的第11-17行）看起来像React组件。它接受属性（有时称为[props](https://react.dev/learn/passing-props-to-a-component))并返回JSX。

所有Quartz组件都接受相同的props：

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

- `fileData`: 任何元数据[[makeing plugins|插件]]都可能已添加到当前页面。
  - `fileData.slug`: 当前页面的唯一标识。
  - `fileData.frontmatter`: 任何已解析的模版（frontmatter）。
- `cfg`: `quartz.config.ts`中的 `configuration` 字段。
- `tree`: 在处理和转换文件之后的[HTML AST](https://github.com/syntax-tree/hast)结果。如果您想使用[hast-util-to-jsx-runtime](https://github.com/syntax-tree/hast-util-to-jsx-runtime) 来呈现内容，这将非常有用（您可以在`quarter/components/pages/Content.tsx`中找到一个例子）。
- `allFiles`: 已分析的所有文件的元数据。用于列出页面或了解整个网站结构。
- `displayClass`: 一个实用的class，指示用户关于如何在移动或桌面设置中渲染它的偏好。如果你想有条件地隐藏移动设备或桌面上的组件，这很有帮助。一个实用程序类，指示用户关于如何在移动或桌面设置中渲染它的偏好。如果你想有条件地隐藏移动设备或桌面上的组件，这很有帮助。

### Styling

Quartz组件还可以在实际功能组件上定义一个`.css` 属性，该属性将由Quartz获取。这应该是一个CSS字符串，可以内联，也可以从`.scss` 文件导入。

请注意，内联样式**必须**为普通CSS：

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

但是，导入的样式可以来自SCSS文件：

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
> Quartz不使用CSS模块，所以您在这里声明的任何样式都应用于_全局_。如果您只希望它应用于您的组件，请确保使用特定的类名和选择器。

### Scripts 和交互

互动性呢？例如，假设您想要添加一个点击处理程序。与组件上的`.css` 属性一样，您也可以声明 `.beforeDOMLoaded` 和 `.afterDOMLoaded` 属性，它们是包含脚本的字符串。

```tsx title="quartz/components/YourComponent.tsx"
export default (() => {
  function YourComponent() {
    return <button id="btn">Click me</button>
  }

  YourComponent.beforeDOM = `
  console.log("hello from before the page loads!")
  `

  YourComponent.afterDOM = `
  document.getElementById('btn').onclick = () => {
    alert('button clicked!')
  }
  `
  return YourComponent
}) satisfies QuartzComponentConstructor
```

> [!hint]
> 对于来自React的组件，Quartz组件与React组件的不同之处在于，它只使用JSX进行模板和布局。 `useEffect`、 `useState`,等挂钩不会被呈现，接受`onClick` 处理程序等函数的其他属性也不会工作。相反，可以使用直接修改DOM元素的常规JS脚本来完成。

顾名思义，`.beforeDOMLoaded` 脚本是在页面加载完成之前执行的，因此它无法访问页面上的任何元素。这主要用于预取任何关键数据。

页面完全加载后，将执行`.afterDOMLoaded`脚本。这是一个很好的地方，可以设置任何应该在访问期间持续存在的东西（例如，从本地存储中获得一些东西）。

如果您需要创建一个`afterDOMLoaded` 脚本，该脚本依赖于导航到新页面时可能更改的特定元素，则可以侦听每当加载页面时触发的 `"nav"` 事件（如果启用了[[SPA Routing]]，则可能在导航时发生）。

```ts
document.addEventListener("nav", () => {
  // do page specific logic here
  // e.g. attach event listeners
  const toggleSwitch = document.querySelector("#switch") as HTMLInputElement
  toggleSwitch.addEventListener("change", switchTheme)
  window.addCleanup(() => toggleSwitch.removeEventListener("change", switchTheme))
})
```

最佳做法是通过`window.addCleanup` 跟踪任何事件处理程序，以防止内存泄漏。
这将在页面导航中调用。

#### 导入代码

当然，在组件中将代码写成字符串文字并不总是实用的（也不可取！）。

Quartz支持通过 `.inline.ts`文件导入组件代码。

```tsx title="quartz/components/YourComponent.tsx"
// @ts-ignore: typescript doesn't know about our inline bundling system
// so we need to silence the error
import script from "./scripts/graph.inline"

export default (() => {
  function YourComponent() {
    return <button id="btn">Click me</button>
  }

  YourComponent.afterDOM = script
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

此外，与上面的示例一样，您可以导入`.inline.ts'文件中的包。这将由Quartz绑定并包含在实际脚本中。

### 使用组件

创建自定义组件后，将其重新导出到 `quartz/components/index.ts`中：

```ts title="quartz/components/index.ts" {4,10}
import ArticleTitle from "./ArticleTitle"
import Content from "./pages/Content"
import Darkmode from "./Darkmode"
import YourComponent from "./YourComponent"

export { ArticleTitle, Content, Darkmode, YourComponent }
```

Then, you can use it like any other component in `quartz.layout.ts` via `Component.YourComponent()`. See the [[configuration#Layout|layout]] section for more details.
然后，您可以通过`Component.YourComponent()`像使用`quartz.layout.ts`中的任何其他组件一样使用它。请参阅[[configuration#常规配置|布局]]部分了解更多详细信息。

由于Quartz组件只是返回React组件的函数，您可以在其他Quartz部件中使用它们。

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
> 在 `quartz/components`中查找更多石英组件示例，作为您自己组件的参考！
