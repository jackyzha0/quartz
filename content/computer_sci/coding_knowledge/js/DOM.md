---
title: Document Object Model
tags:
  - javascript
  - web
  - coding-language
date: 2024-03-20
---
DOM 是指文档对象模型（Document Object Model），它是 HTML 和 XML 文档的编程接口。它提供了对文档结构、样式和内容的访问和操作。

DOM 将文档表示为一个由**节点和对象组成的树状结构**。*每个节点代表文档中的一个元素*，例如 `<div>`、`<p>` 或 `<img>`。*每个对象都包含一组属性和方法，用于访问和操作节点*。

JavaScript 可以使用 DOM 来：

- 获取和设置元素的属性
- 添加、删除和修改元素
- 绑定事件处理程序
- 操纵文档的样式
- 读取和写入文档内容

**DOM 是 JavaScript 中最重要的 API 之一，它是 Web 开发的基础。**


## Demo code

```js
// 获取元素的属性
const element = document.getElementById("my-element");
const attribute = element.getAttribute("href");

// 设置元素的属性
element.setAttribute("href", "https://www.example.com");

// 添加元素
const newElement = document.createElement("div");
document.body.appendChild(newElement);

// 删除元素
element.parentNode.removeChild(element);

// 绑定事件处理程序
element.addEventListener("click", () => {
  // 这是一个事件处理程序
});

// 操纵文档的样式
element.style.color = "red";

// 读取文档内容
const textContent = element.textContent;

// 写入文档内容
element.textContent = "Hello, world!";
```