---
title: 高亮显示语法
tags:
  - feature/transformer
---

Quartz中的语法高亮显示完全是在构建时完成的。这意味着Quartz只提供预先计算的CSS来突出显示正确的单词，因此没有繁重的客户端捆绑包来突出显示语法。

而且，与一些客户端荧光笔不同，它有一个完整的TextMate语法分析器，而不是使用Regex，允许高度准确的代码高亮显示。

In short, it generates HTML that looks exactly like your code in an editor like VS Code. Under the hood, it's powered by [Rehype Pretty Code](https://rehype-pretty-code.netlify.app/) which uses [Shiki](https://github.com/shikijs/shiki).
简而言之，它生成的HTML与VS code等编辑器中的代码完全相似。在引擎盖下，它由[Rehype Pretty Code](https://rehype-pretty-code.netlify.app/) 使用[Shiki](https://github.com/shikijs/shiki)提供动力。

> [!warning]
> 如果你的笔记中有很多代码片段，语法高亮显示确实会影响构建速度。

## 格式化

一行中`backticks`内的文本的格式将类似于代码。

````
```ts
export function trimPathSuffix(fp: string): string {
  fp = clientSideSlug(fp)
  let [cleanPath, anchor] = fp.split("#", 2)
  anchor = anchor === undefined ? "" : "#" + anchor

  return cleanPath + anchor
}
```
````

```ts
export function trimPathSuffix(fp: string): string {
  fp = clientSideSlug(fp)
  let [cleanPath, anchor] = fp.split("#", 2)
  anchor = anchor === undefined ? "" : "#" + anchor

  return cleanPath + anchor
}
```

### Titles

将文件标题添加到代码块中，文本位于双引号（`“”`）内：

````
```js title="..."

```
````

```ts title="quartz/path.ts"
export function trimPathSuffix(fp: string): string {
  fp = clientSideSlug(fp)
  let [cleanPath, anchor] = fp.split("#", 2)
  anchor = anchor === undefined ? "" : "#" + anchor

  return cleanPath + anchor
}
```

### 线条高亮显示

将数字范围放在`{}`内。

````
```js {1-3,4}

```
````

```ts {2-3,6}
export function trimPathSuffix(fp: string): string {
  fp = clientSideSlug(fp)
  let [cleanPath, anchor] = fp.split("#", 2)
  anchor = anchor === undefined ? "" : "#" + anchor

  return cleanPath + anchor
}
```

### 单词高亮显示

一系列字符，如字面正则表达式。

````
```js /useState/
const [age, setAge] = useState(50);
const [name, setName] = useState('Taylor');
```
````

```js /useState/
const [age, setAge] = useState(50)
const [name, setName] = useState("Taylor")
```

### 行号

语法高亮显示具有自动配置的行号。如果要以特定数字开始行号，请使用`showLineNumbers{number}`：

````
```js showLineNumbers{number}

```
````

```ts showLineNumbers{20}
export function trimPathSuffix(fp: string): string {
  fp = clientSideSlug(fp)
  let [cleanPath, anchor] = fp.split("#", 2)
  anchor = anchor === undefined ? "" : "#" + anchor

  return cleanPath + anchor
}
```

### 超越代码块

您可以在代码块内部格式化代码块，方法是用比前一个栅栏多出一个倒勾的另一级倒勾栅栏包裹它。

`````
````
```js /useState/
const [age, setAge] = useState(50);
const [name, setName] = useState('Taylor');
```
````
`````

## 自定义

语法高亮显示是[[SyntaxHighlighting]]插件的一项功能。有关自定义选项，请参阅插件页面。
