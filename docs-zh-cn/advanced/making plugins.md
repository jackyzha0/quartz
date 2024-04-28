---
title: 定义你自己的插件
---

> [!warning]
> 这部分文档将假设您具有TypeScript的工作知识，并将包括描述Quartz插件的界面的代码片段。

Quartz的插件是对内容的一系列转换。这在下面的处理管道图中进行了说明：

![[quartz transform pipeline.png]]

所有插件都被定义为一个函数，该函数接受选项`type OptionType = object | undefined` 的单个参数，并返回与插件类型相对应的对象。

```ts
type OptionType = object | undefined
type QuartzPlugin<Options extends OptionType = undefined> = (opts?: Options) => QuartzPluginInstance
type QuartzPluginInstance =
  | QuartzTransformerPluginInstance
  | QuartzFilterPluginInstance
  | QuartzEmitterPluginInstance
```

以下部分将详细介绍每种插件类型可以实现的方法。在此之前，让我们先澄清几个更模糊的类型：

- `BuildCtx`是在 `quartz/ctx.ts`中定义的。它包括
  - `argv`: 传递给Quartz[[build]] 命令的命令行参数
  - `cfg`: Quartz全部[[configuration]]
  - `allSlugs`: 所有有效内容的slugs的列表（有关“ServerSlug”的详细信息，请参阅[[paths]] ）
- `StaticResources`在`quartz/resources.tsx`.中定义。它包括
  - `css`: 应加载的样式表的URL列表
  - `js`: 应该加载的脚本列表。脚本是用 `JSResource` 类型描述的，该类型也在 `quartz/resources.tsx`中定义。它允许您定义加载时间（在加载DOM之前或之后），它是否应该是一个模块，以及脚本的地址URL或内联内容。

## Transformers

在内容上的转换（Transformers）映射，获取Markdown文件并输出修改后的内容或向文件本身添加元数据。

```ts
export type QuartzTransformerPluginInstance = {
  name: string
  textTransform?: (ctx: BuildCtx, src: string | Buffer) => string | Buffer
  markdownPlugins?: (ctx: BuildCtx) => PluggableList
  htmlPlugins?: (ctx: BuildCtx) => PluggableList
  externalResources?: (ctx: BuildCtx) => Partial<StaticResources>
}
```

所有转换器插件都必须至少定义一个`name` 字段来注册插件和一些可选函数，这些函数允许您转换单个Markdown文件的各个部分。

- `textTransform` 在文件解析到[Markdown AST](https://github.com/syntax-tree/mdast)之前执行`text-to-text`的转换。
- `markdownPlugins` 定义了一个 [remark plugins](https://github.com/remarkjs/remark/blob/main/doc/plugins.md)列表。 `remark`是一种以结构化方式将Markdown转换为Markdown的工具。
- `htmlPlugins` 定义[rehype plugins](https://github.com/rehypejs/rehype/blob/main/doc/plugins.md)的列表。 类似于`remark` 的工作原理，`rehype` 是一种以结构化方式将HTML转换为HTML的工具。
- `externalResources` 定义插件可能需要在客户端加载的任何外部资源，以使其正常工作。

通常，对于`remark` 和`rehype`，您可以找到并使用的现有插件。如果你想创建自己的`remark` 或`rehype`插件，请查看[创建插件指南](https://unifiedjs.com/learn/guide/create-a-plugin/)使用 `unified` （底层AST解析器和转换器库）。

借用`remark` 和 `rehype` 生态系统的转换器插件的一个很好的例子是[[plugins/Latex|Late]]插件：

```ts title="quartz/plugins/transformers/latex.ts"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import rehypeMathjax from "rehype-mathjax/svg"
import { QuartzTransformerPlugin } from "../types"

interface Options {
  renderEngine: "katex" | "mathjax"
}

export const Latex: QuartzTransformerPlugin<Options> = (opts?: Options) => {
  const engine = opts?.renderEngine ?? "katex"
  return {
    name: "Latex",
    markdownPlugins() {
      return [remarkMath]
    },
    htmlPlugins() {
      if (engine === "katex") {
        // if you need to pass options into a plugin, you
        // can use a tuple of [plugin, options]
        return [[rehypeKatex, { output: "html" }]]
      } else {
        return [rehypeMathjax]
      }
    },
    externalResources() {
      if (engine === "katex") {
        return {
          css: [
            // base css
            "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/katex.min.css",
          ],
          js: [
            {
              // fix copy behaviour: https://github.com/KaTeX/KaTeX/blob/main/contrib/copy-tex/README.md
              src: "https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.16.9/contrib/copy-tex.min.js",
              loadTime: "afterDOMReady",
              contentType: "external",
            },
          ],
        }
      } else {
        return {}
      }
    },
  }
}
```

transformer插件会做的另一件常见的事情是解析一个文件并为该文件添加额外的数据：

```ts
export const AddWordCount: QuartzTransformerPlugin = () => {
  return {
    name: "AddWordCount",
    markdownPlugins() {
      return [
        () => {
          return (tree, file) => {
            // tree is an `mdast` root element
            // file is a `vfile`
            const text = file.value
            const words = text.split(" ").length
            file.data.wordcount = words
          }
        },
      ]
    },
  }
}

// tell typescript about our custom data fields we are adding
// other plugins will then also be aware of this data field
declare module "vfile" {
  interface DataMap {
    wordcount: number
  }
}
```

最后，您还可以使用`unist-util-visit` 包中的`visit` 函数或`mdast-util-find-and-replace` 包的`findAndReplace`函数对Markdown或HTML AST执行转换。

```ts
export const TextTransforms: QuartzTransformerPlugin = () => {
  return {
    name: "TextTransforms",
    markdownPlugins() {
      return [() => {
        return (tree, file) => {
          // replace _text_ with the italics version
          findAndReplace(tree, /_(.+)_/, (_value: string, ...capture: string[]) => {
            // inner is the text inside of the () of the regex
            const [inner] = capture
            // return an mdast node
            // https://github.com/syntax-tree/mdast
            return {
              type: "emphasis",
              children: [{ type: 'text', value: inner }]
            }
          })

         // remove all links (replace with just the link content)
         // match by 'type' field on an mdast node
         // https://github.com/syntax-tree/mdast#link in this example
          visit(tree, "link", (link: Link) => {
            return {
              type: "paragraph"
              children: [{ type: 'text', value: link.title }]
            }
          })
        }
      }]
    }
  }
}
```

所有转换插件都可以在 `quartz/plugins/transformers`下找到。如果您决定编写自己的transformer插件，请不要忘记在`quartz/plugins/transformers/index.ts`下重新导出它。

临别之词：transformer插件非常复杂，所以如果你不能马上得到它们，不要担心。看看内置的转换器，看看它们是如何对内容进行操作的，以便更好地了解如何完成您想要做的事情。

## Filters

Filters用于**过滤**内容，获取所有转换器的输出，并确定实际保留哪些文件和丢弃哪些文件。

```ts
export type QuartzFilterPlugin<Options extends OptionType = undefined> = (
  opts?: Options,
) => QuartzFilterPluginInstance

export type QuartzFilterPluginInstance = {
  name: string
  shouldPublish(ctx: BuildCtx, content: ProcessedContent): boolean
}
```

过滤器插件必须定义一个`name`字段和一个`shouldPublish` 函数，该函数接收已由所有转换器处理的一段内容，并根据是否应将其传递给发射器插件返回`true` 或 `false` 。

例如，这里有一个用于删除草稿的内置插件：

```ts title="quartz/plugins/filters/draft.ts"
import { QuartzFilterPlugin } from "../types"

export const RemoveDrafts: QuartzFilterPlugin<{}> = () => ({
  name: "RemoveDrafts",
  shouldPublish(_ctx, [_tree, vfile]) {
    // uses frontmatter parsed from transformers
    const draftFlag: boolean = vfile.data?.frontmatter?.draft ?? false
    return !draftFlag
  },
})
```

## Emitters

Emitters**减少内容**，获取所有转换和过滤内容的列表，并创建输出文件。

```ts
export type QuartzEmitterPlugin<Options extends OptionType = undefined> = (
  opts?: Options,
) => QuartzEmitterPluginInstance

export type QuartzEmitterPluginInstance = {
  name: string
  emit(ctx: BuildCtx, content: ProcessedContent[], resources: StaticResources): Promise<FilePath[]>
  getQuartzComponents(ctx: BuildCtx): QuartzComponent[]
}
```

emitter插件必须定义一个`name` 字段、一个`emit` 函数和一个 `getQuartzComponents` 函数，`emit`负责查看所有解析和过滤的内容，然后适当地创建文件，并返回插件创建的文件的路径列表。

可以通过常规节点[fs module](https://nodejs.org/api/fs.html)创建新文件（即`fs.cp` 或 `fs.writeFile`），或者如果您正在创建包含文本的文件，则通过`quartz/plugins/emitters/helpers.ts`中的`write`函数。`write`具有以下签名：

```ts
export type WriteOptions = (data: {
  // the build context
  ctx: BuildCtx
  // the name of the file to emit (not including the file extension)
  slug: ServerSlug
  // the file extension
  ext: `.${string}` | ""
  // the file content to add
  content: string
}) => Promise<FilePath>
```

这是一个关于写入适当的输出文件夹并确保中间目录存在的精简包装。如果您选择使用本机节点`fs`API，请确保也向`argv.output`文件夹发出。

如果您正在创建一个需要渲染组件的emitter插件，还需要注意三件事：

- 您的组件应该使用`getQuartzComponents` 来声明用于构造页面的`QuartzComponents` 列表。请参阅上的页面[[创建组件]] 了解更多信息。
- 您可以使用`quartz/components/renderPage.tsx` 中定义的 `renderPage` 函数将quartz组件渲染为HTML。
- 如果需要将HTML AST呈现到JSX，可以使用`quartz/util/jsx.ts`.中的`htmlToJsx`函数。这方面的一个例子可以在`quartz/components/pages/Content.tsx`.中找到。

例如，以下是内容页面插件的简化版本，用于呈现每个页面。

```tsx title="quartz/plugins/emitters/contentPage.tsx"
export const ContentPage: QuartzEmitterPlugin = () => {
  // construct the layout
  const layout: FullPageLayout = {
    ...sharedPageComponents,
    ...defaultContentPageLayout,
    pageBody: Content(),
  }
  const { head, header, beforeBody, pageBody, left, right, footer } = layout
  return {
    name: "ContentPage",
    getQuartzComponents() {
      return [head, ...header, ...beforeBody, pageBody, ...left, ...right, footer]
    },
    async emit(ctx, content, resources, emit): Promise<FilePath[]> {
      const cfg = ctx.cfg.configuration
      const fps: FilePath[] = []
      const allFiles = content.map((c) => c[1].data)
      for (const [tree, file] of content) {
        const slug = canonicalizeServer(file.data.slug!)
        const externalResources = pageResources(slug, resources)
        const componentData: QuartzComponentProps = {
          fileData: file.data,
          externalResources,
          cfg,
          children: [],
          tree,
          allFiles,
        }

        const content = renderPage(cfg, slug, componentData, opts, externalResources)
        const fp = await emit({
          content,
          slug: file.data.slug!,
          ext: ".html",
        })

        fps.push(fp)
      }
      return fps
    },
  }
}
```

请注意，它采用了`FullPageLayout`作为选项。它是通过将`SharedLayout` 和`PageLayout` 组合而成的，两者都是通过`quartz.layout.ts` 文件提供的。

> [!hint]
> 在`quartz/plugins`中查找更多石英中的插件示例，作为您自己插件的参考！
