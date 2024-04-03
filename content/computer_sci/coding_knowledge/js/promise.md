---
title: Promise in JS
tags:
  - advanced
  - javascript
  - coding-language
date: 2024-03-31
---
**Promise** 是 JavaScript 中用来处理异步操作的类。它提供了一种更简洁、更易于理解的方式来处理异步操作的结果。


# Asynchronous coding


在前端编程中（甚至后端有时也是这样），我们在处理一些简短、快速的操作时，例如计算 1 + 1 的结果，往往在主线程中就可以完成。主线程作为一个线程，不能够同时接受多方面的请求。所以，当一个事件没有结束时，界面将无法处理其他请求。

现在有一个按钮，如果我们设置它的 onclick 事件为一个死循环，那么当这个按钮按下，整个网页将失去响应。

为了避免这种情况的发生，我们常常用子线程来完成一些可能消耗时间足够长以至于被用户察觉的事情，比如读取一个大文件或者发出一个网络请求。因为子线程独立于主线程，所以即使出现阻塞也不会影响主线程的运行。但是子线程有一个局限：一旦发射了以后就会与主线程失去同步，我们无法确定它的结束，如果结束之后需要处理一些事情，比如处理来自服务器的信息，我们是无法将它合并到主线程中去的。

为了解决这个问题，JavaScript 中的异步操作函数往往通过回调函数来实现异步任务的结果处理。

![](computer_sci/coding_knowledge/js/attachments/Pasted%20image%2020240402114110.png)




# How `Promise` work

`Promise`是一个对象，它代表了一个异步操作的最终完成或者失败。

本质上`Promise`是一个函数返回的对象，我们可以在它上面绑定回调函数，这样我们就不需要在一开始把回调函数作为参数传入这个函数了。

## Demo

假设现在有一个名为 `createAudioFileAsync()` 的函数，它接收一些配置和两个回调函数，然后异步地生成音频文件。一个回调函数在文件成功创建时被调用，另一个则在出现异常时被调用。

```js
function successCallback(result) {
  console.log("音频文件创建成功：" + result);
}

// 失败的回调函数
function failureCallback(error) {
  console.log("音频文件创建失败：" + error);
}

createAudioFileAsync(audioSettings, successCallback, failureCallback);
```

如果使用Promise的写法，可以把回调函数附加到它上面，

```js
createAudioFileAsync(audioSettings).then(successCallback, failureCallback);
```


一个完整的template：

```js
const userLeft = false
const userWatchingCatMeme = false

function watchTutorialPromise() = {
	return new Promise((resolve, reject) => {
		if (userLeft) {
			reject({
				name: 'User Left',
				message: ':('
			})
		} else if (userWatchCatMeme) {
			reject({
				name: 'User Watching Cat Meme',
				message: 'WedDevSimplified < Cat'
			})
		} else {
			resove('Thumbs up and Subscribe')
		}
	})
}

watchTutorialPromise().then((message) => {
	conolse.log('Success:' + message)
}).catch((error) => {
	console.log(error.name = '' + error.message)
})
```

这样的写法形式有若干优点


# `Promise` 的优点
## 链式调用

连续执行两个或者多个异步操作是一个常见的需求，在上一个操作执行成功之后，开始下一个的操作，并带着上一步操作所返回的结果。在旧的回调风格中，这种操作会导致经典的回调地狱

```js
doSomething(function (result) {
  doSomethingElse(result, function (newResult) {
    doThirdThing(newResult, function (finalResult) {
      console.log(`得到最终结果：${finalResult}`);
    }, failureCallback);
  }, failureCallback);
}, failureCallback);
```


有了`Promise`，我们就可以通过一个`Promise`链来解决这个问题。这就是`Promise` API 的优势，因为回调函数是附加到返回的`Promise`对象上的，而不是传入一个函数中。

`then()` 函数会返回一个和原来不同的**新的 Promise**：

```js
const promise = doSomething()
const promise2 = promise.then(successCallback, failureCallback)
```

`promise2` 不仅表示 `doSomething()` 函数的完成，也代表了你传入的 `successCallback` 或者 `failureCallback` 的完成，这两个函数也可以返回一个 Promise 对象，从而形成另一个异步操作，这样的话，在 `promise2` 上新增的回调函数会排在这个 Promise 对象的后面。

就像这样，每一个 Promise 都代表了链中另一个异步过程的完成。此外，`then` 的参数是可选的，`catch(failureCallback)` 等同于 `then(null, failureCallback)`——所以如果你的错误处理代码对所有步骤都是一样的，你可以把它附加到链的末尾：

```js
doSomething()
  .then(function (result) {
    return doSomethingElse(result);
  })
  .then(function (newResult) {
    return doThirdThing(newResult);
  })
  .then(function (finalResult) {
    console.log(`得到最终结果：${finalResult}`);
  })
  .catch(failureCallback);

doSomething()
  .then((result) => doSomethingElse(result))
  .then((newResult) => doThirdThing(newResult))
  .then((finalResult) => {
    console.log(`得到最终结果：${finalResult}`);
  })
  .catch(failureCallback);


```

> [!note] 
> **注意**：一定要有返回值，否则，回调将无法获取上一个 Promise 的结果。（如果使用箭头函数，`() => x` 比 `() => { return x; }` 更简洁一些，但后一种保留 `return` 的写法才支持使用多个语句）。如果上一个处理程序启动了一个 Promise 但并没有返回它，那就没有办法再追踪它的状态了，这个 Promise 就是“漂浮”的。
> 



# key in `Promise`

## async && await

**async**：用于定义异步函数，确保函数始终返回一个 Promise。当在函数声明或函数表达式前使用 async 关键字时，它变成一个异步函数。从异步函数返回的非 Promise 对象会自动包装成 Promise 对象。


**await**: 用于暂停异步函数的执行，直到 Promise 解析。它只能在异步函数内部使用。当在 Promise 之前使用 await 时，它等待 Promise 解析或拒绝。如果已解析，它继续执行下一行代码；如果等待的 Promise 被拒绝，将抛出异常。使用 await 允许您以更顺序且可读的方式编写异步代码，而无需使用 .then() 显式链接 Promise。

### demo code

```js
async function example() {
    console.log('Before await');
    const result = await someAsyncOperation().then((message) => {
        console.log('Inside then', message);
    }); // 等待 Promise 解决
    console.log('After await', result);
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('FUCK');
        }, 10);
    });
  }
  
  function someAsyncOperation() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('Hello');
      }, 10);
    });
  }

var a = example(); 
console.log(a)
setTimeout(() => {
    a.then((message) => {
        console.log('Inside then', message);
    });
}, 1000)
```

## `Promise.all()`

当需要同时执行多个异步操作并等待它们全部完成后，通常会使用 `Promise.all()` 方法。


# Reference

* https://www.youtube.com/watch?v=DHvZLI7Db8E&t=85s
* https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Using_promises