---
title: setTimeout
tags:
  - javascript
  - advanced
date: 2024-04-10
---
`setTimeout`和`Promise`息息相关，有关内容可见[Promise in JS](computer_sci/coding_knowledge/js/promise.md)

同时，本身`setTimeout`也值得一讲

# Working Principle

* 当调用 setTimeout 时，它启动一个计时器，并设置它在指定的延迟后运行。
* 在延迟到期后，JavaScript事件循环将指定的函数放入执行队列。
* 一旦调用堆栈为空，函数就会被执行，其中的任何相关代码都会运行。
* 如果在延迟到期之前取消了 setTimeout 函数，计划的函数将不会被执行。

```js
function delayedFunction() {
  console.log("延迟函数执行！");
}

const delay = 2000;

const timerId = setTimeout(delayedFunction, delay);

// 在延迟到期之前取消执行：
clearTimeout(timerId);
```

因此这样的一段代码可以取消`setTimeout` schedule的执行

