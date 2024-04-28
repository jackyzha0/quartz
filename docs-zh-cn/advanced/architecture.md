---
title: 架构设计
---

Quartz是一种静态网站生成器。它是如何工作的？

最好通过跟踪用户（您！）在命令行中运行`npx quartz build` 时发生的情况来回答这个问题：

## 服务器端

1. 在运行`npx quartz build`,后，npm将查看“package.json”，以找到入口文件 `./quartz/bootstrap-cli.mjs` 。
2. 这个文件有一个[解释器](<https://en.wikipedia.org/wiki/Shebang_(Unix)>) 行，告诉npm使用Node执行它。
3. `bootstrap-cli.mjs`负责以下几件事：
   1. 使用[yargs](http://yargs.js.org/).分析命令行参数。
   2. 使用[esbuild](https://esbuild.github.io/) 将Quartz的其余部分（位于Typescript中）转换并绑定到常规JavaScript. 这里的`esbuild` 配置有点特殊，因为它还使用[esbuild-sass-plugin v2](https://www.npmjs.com/package/esbuild-sass-plugin)处理`.scss` 文件导入. 此外，我们捆绑组件使用自定义`esbuild` 插件声明的“inline”客户端脚本（任何`.inline.ts` 文件），该插件运行另一个`esbuild` 实例，该实例是浏览器而不是`node`环境。这两种类型的模块都以纯文本形式导入。
   3. 如果设置了`--serve`，则运行本地预览服务器。这将启动两个服务器：
      1. 端口3001上的WebSocket服务器，用于处理热更新加载信号。这会跟踪所有入站连接，并在检测到服务器端更改（内容或配置）时发送“rebuild”消息。
      2. 用户定义端口（通常为8080）上的HTTP文件服务器，用于提供实际的网站文件。
   4. 如果设置了`--serve` 标志，它还会启动文件观察器来检测源代码更改（例如，任何`.ts`、`.tsx、.scss`或打包程序文件）。在更改时，我们使用`esbuild`的[rebuild API](https://esbuild.github.io/api/#rebuild) 重新生成模块（上面的第2步），这大大减少了构建时间。
   5. 在传输主Quartz构建模块（`quartz/build.ts`）后，我们将其写入缓存文件`.quartz-cache/transpiled-build.mjs` ，然后使用`await import(cacheFile)`动态导入。然而，我们需要非常聪明地了解如何避免Node的[导入缓存](https://github.com/nodejs/modules/issues/307)。因此，我们添加了一个随机查询字符串去欺骗Node，以为它是一个新模块。然而，这确实会导致内存泄漏，所以我们只希望用户不要在一个会话中多次热重新加载他们的配置 :)) （每次重新加载时会泄漏约350kB的内存）。导入模块后，我们调用它，传入我们之前解析的命令行参数以及一个回调函数，以向客户端发出刷新信号。
5. 在`build.ts`中，我们首先手动安装 source map 支持，以解决我们之前介绍的查询字符串缓存破解问题。然后，我们开始处理内容：
   1. 清理输出目录。
   2. 按照`.gitignore`递归遍历 `content`文件夹中的所有文件。
   3. 分析Markdown文件。
      1. Quartz检测可用线程的数量，如果要解析的内容超过128条，则选择生成工作线程（粗略启发式）。如果需要派生worker，它将再次调用esbuild来转换worker脚本`quartz/worker.ts`。然后，主线程[workerpool](https://www.npmjs.com/package/workerpool) 创建128个文件的批，并将其分配给工作线程。
      2. 每个工作线程（如果没有并发，则仅为主线程）创建一个[统一](https://github.com/unifiedjs/unified)基于定义的插件的解析器[[configuration]].
      3. 解析有三个步骤：
         1. 将文件读取到[vfile](https://github.com/vfile/vfile)中。
         2. 对内容应用插件定义的文本转换。
         3. Slugify文件路径并将其存储在文件的数据中。有关路径逻辑如何在Quartz中工作的更多详细信息，请参阅[[paths]]页面（剧透：它很复杂）。
         4. 使用[备注解析](https://www.npmjs.com/package/remark-parse) 进行标记解析（从文本到[mdast](https://github.com/syntax-tree/mdast)).
         5. 使用插件定义的Markdown-to-Markdown转换器。
         6. 使用[remark-rehype](https://github.com/remarkjs/remark-rehype)将Markdown转换为HTML（从[mdast](https://github.com/syntax-tree/mdast)到[hast](https://github.com/syntax-tree/hast)）.
         8. 使用插件定义的HTML-to-HTML转换器。
   5. 使用插件过滤掉不需要的内容。
   6. 使用插件输出文件。
      1. 收集每个emitter插件声明的所有静态资源（例如外部CSS、JS模块等）。
      2. 转换HTML文件的emitters在这里需要做一些额外的工作，因为它们需要转换[hast](https://github.com/syntax-tree/hast)并在在解析步骤中生成到JSX。在[Precact](https://preactjs.com/)运行时，使用[hast-util-to-jsx-runtime](https://github.com/syntax-tree/hast-util-to-jsx-runtime)完成。最后，使用[preact-render-to-string](https://github.com/preactjs/preact-render-to-string)将JSX呈现为HTML。它静态地将JSX呈现为HTML（即不关心“useState”、“useEffect”或任何其他React/Precact交互位）。在这里，我们还做了一些有趣的事情，比如从`quartz.layout.ts`组装页面[[layout]] ，组装所有实际发送到客户端的内联脚本，以及所有transpiled样式。这个逻辑的大部分可以在`quartz/components/renderPage.tsx`中找到。其他有趣的事情值得注意：
         1. CSS使用[Lightning CSS](https://github.com/parcel-bundler/lightningcss) 进行缩小和转换，去添加浏览器前缀并向下兼容。
         2. 脚本分为`beforeDOMLoaded` 和`afterDOMLoaded` ，并分别插入 `<head>`和 `<body>`中。
      3. 最后，每个emitter插件都负转换并将自己转换的文件写入磁盘。
   7.  如果检测到`--serve` 标志，我们还会设置另一个文件观察程序来检测内容更改（仅限“.md”文件）。我们保留了一个内容映射，用于跟踪每个阶段的解析AST和插件数据，并在文件更改时进行更新。新添加或修改的路径将重新生成并添加到内容映射中。然后，所有过滤器和发射器都在生成的内容映射上运行。此文件观察程序以250ms的阈值防止抖动。成功后，我们使用传入的回调函数发送客户端刷新信号。

## 客户端

1. 浏览器打开Quartz页面并加载HTML。`<head>` 还链接到页面样式（关联到`public/index.css`）和页面关键JS（关联到`public/prescript.js`）
2. 然后，一旦加载了主体，浏览器就会加载非关键JS（关联到`public/postscript.js`）
3. 页面加载完成后，页面将发送一个自定义合成浏览器事件`"nav"`。这样，组件声明的客户端脚本就可以 'setup' 任何需要访问页面DOM的内容。
   1. 如果在中启用了[[SPA Routing|enableSPA option]][[configuration]], 这个`"nav"`事件也会在任何客户端导航上触发，以允许组件注销和重新注册任何事件处理程序和状态。
   2. 如果不是，我们将`"nav"`事件连接到页面加载后只触发一次，以允许在SPA和非SPA上下文中设置状态的方式保持一致。

插件系统的架构和设计在这里故意留下了模糊的地方，因为这在[[makeing plugins|makeing your own plugin]]指南中有更深入的描述。
