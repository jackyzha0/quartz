---
title: Closure in JS
tags:
  - basic
  - javascript
date: 2024-04-10
---
在 JavaScript 中，闭包是函数和函数被声明时的词法环境的组合。词法环境包括在闭包创建时可用的变量、函数和作用域。

当一个函数定义在另一个函数内部时，就创建了一个闭包。内部函数保留对外部函数的变量和作用域的引用。
当外部函数执行完成并返回时，闭包仍然保持其捕获的变量和作用域链的引用。
闭包允许内部函数访问和操作其外部函数的变量，即使外部函数的执行已经完成。

这种行为是可能的，因为闭包保持对其外部函数的变量和作用域链的引用，防止它们被垃圾回收。

# Learn by Code

```js
function init() {
  var name = "Mozilla"; // name 是一个被 init 创建的局部变量
  function displayName() {
    // displayName() 是内部函数，一个闭包
    console.log(name); // 使用了父函数中声明的变量
  }
  displayName();
}
init();
```

`init()` 创建了一个局部变量 `name` 和一个名为 `displayName()` 的函数。`displayName()` 是定义在 `init()` 里的内部函数，并且仅在 `init()` 函数体内可用。请注意，`displayName()` 没有自己的局部变量。然而，因为它可以访问到外部函数的变量，所以 `displayName()` 可以使用父函数 `init()` 中声明的变量 `name` 。


```js
function makeFunc() {
  var name = "Mozilla";
  function displayName() {
    console.log(name);
  }
  return displayName;
}

var myFunc = makeFunc();
myFunc();
```

闭包是由函数以及声明该函数的词法环境组合而成的。该环境包含了这个闭包创建时作用域内的任何局部变量。在本例子中，`myFunc` 是执行 `makeFunc` 时创建的 `displayName` 函数实例的引用。`displayName` 的实例维持了一个对它的词法环境（变量 `name` 存在于其中）的引用。因此，当 `myFunc` 被调用时，变量 `name` 仍然可用，其值 `Mozilla` 就被传递到`alert`中。


```js
function makeAdder(x) {
  return function (y) {
    return x + y;
  };
}

var add5 = makeAdder(5);
var add10 = makeAdder(10);

console.log(add5(2)); // 7
console.log(add10(2)); // 12
```

这个代码段展示了利用闭包形成了一个函数工厂。`add5` 和 `add10` 都是闭包。它们共享相同的函数定义，但是保存了不同的词法环境。在 `add5` 的环境中，`x` 为 5。而在 `add10` 中，`x` 则为 10。



# Example

## closure in DOM

```css
/* base.css */

body {
  font-family: Helvetica, Arial, sans-serif;
  font-size: 12px;
}

h1 {
  font-size: 1.5em;
}

h2 {
  font-size: 1.2em;
}
```

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <link rel="stylesheet" href="./base.css">
    <script src="./tmp.js" defer></script>
</head>

<body>

    <p>Some paragraph text</p>
    <h1>some heading 1 text</h1>
    <h2>some heading 2 text</h2>

    <a href="#" id="size-12">12</a>
    <a href="#" id="size-14">14</a>
    <a href="#" id="size-16">16</a>

</body> 
</html> 
```

```js
// tmp.js

function makeSizer(size) {
  return function() {
    document.body.style.fontSize = size + 'px';
  };
}

var size12 = makeSizer(12);
var size14 = makeSizer(14);
var size16 = makeSizer(16);

document.getElementById('size-12').onclick = size12;
document.getElementById('size-14').onclick = size14;
document.getElementById('size-16').onclick = size16;
```

利用闭包更改页面字体大小



## 闭包模拟私有化方法


```js
var Counter = (function () {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function () {
      changeBy(1);
    },
    decrement: function () {
      changeBy(-1);
    },
    value: function () {
      return privateCounter;
    },
  };
})();

console.log(Counter.value()); /* logs 0 */
Counter.increment();
Counter.increment();
console.log(Counter.value()); /* logs 2 */
Counter.decrement();
console.log(Counter.value()); /* logs 1 */
```


在之前的示例中，每个闭包都有它自己的词法环境；而这次我们只创建了一个词法环境，为三个函数所共享：`Counter.increment`，`Counter.decrement` 和 `Counter.value`。

该共享环境创建于一个立即执行的匿名函数体内。这个环境中包含两个私有项：名为 `privateCounter` 的变量和名为 `changeBy` 的函数。这两项都无法在这个匿名函数外部直接访问。必须通过匿名函数返回的三个公共函数访问。

这三个公共函数是共享同一个环境的闭包。多亏 JavaScript 的词法作用域，它们都可以访问 `privateCounter` 变量和 `changeBy` 函数。


```js
var makeCounter = function () {
  var privateCounter = 0;
  function changeBy(val) {
    privateCounter += val;
  }
  return {
    increment: function () {
      changeBy(1);
    },
    decrement: function () {
      changeBy(-1);
    },
    value: function () {
      return privateCounter;
    },
  };
};

var Counter1 = makeCounter();
var Counter2 = makeCounter();
console.log(Counter1.value()); /* logs 0 */
Counter1.increment();
Counter1.increment();
console.log(Counter1.value()); /* logs 2 */
Counter1.decrement();
console.log(Counter1.value()); /* logs 1 */
console.log(Counter2.value()); /* logs 0 */
```



两个计数器 `Counter1` 和 `Counter2` 可以维护它们各自的独立性的。每个闭包都是引用自己词法作用域内的变量 `privateCounter` 。

每次调用其中一个计数器时，通过改变这个变量的值，会改变这个闭包的词法环境。然而在一个闭包内对变量的修改，不会影响到另外一个闭包中的变量。

## A common mistake, make closure in loop

```html
<p id="help">Helpful notes will appear here</p>
<p>E-mail: <input type="text" id="email" name="email" /></p>
<p>Name: <input type="text" id="name" name="name" /></p>
<p>Age: <input type="text" id="age" name="age" /></p>
```


```js
function showHelp(help) {
  document.getElementById("help").innerHTML = help;
}

function setupHelp() {
  var helpText = [
    { id: "email", help: "Your e-mail address" },
    { id: "name", help: "Your full name" },
    { id: "age", help: "Your age (you must be over 16)" },
  ];

  for (var i = 0; i < helpText.length; i++) {
    var item = helpText[i];
    document.getElementById(item.id).onfocus = function () {
      showHelp(item.help);
    };
  }
}

setupHelp();
```

很明显，这个用意是为了在用户点击input框的时候给提示，但是结果所有的提示都是跟age有关，并没有对应。

在function `setupHelp`里，数组 `helpText` 中定义了三个有用的提示信息，每一个都关联于对应的文档中的 `input` 的 ID。通过循环这三项定义，依次为相应 `input` 添加了一个 `onfocus` 事件处理函数，以便显示帮助信息。但是因为赋值给 `onfocus` 的是**闭包**。这些闭包是由他们的函数定义和在 `setupHelp` 作用域中捕获的环境所组成的。这三个闭包在循环中被创建，但他们**共享了同一个词法作用域**，在这个作用域中存在一个变量 item。这是因为变量 `item` 使用 `var` 进行声明，由于**变量提升**，所以具有函数作用域。当 `onfocus` 的回调执行时，`item.help` 的值被决定。由于循环在事件触发之前早已执行完毕，变量对象 `item`（被三个闭包所共享）已经指向了 `helpText` 的最后一项。

这样的问题可以通过两种方法解决，

### Method 1. 使用更多的闭包构建函数工厂

```js
function showHelp(help) {
  document.getElementById("help").innerHTML = help;
}

function makeHelpCallback(help) {
  return function () {
    showHelp(help);
  };
}

function setupHelp() {
  var helpText = [
    { id: "email", help: "Your e-mail address" },
    { id: "name", help: "Your full name" },
    { id: "age", help: "Your age (you must be over 16)" },
  ];

  for (var i = 0; i < helpText.length; i++) {
    var item = helpText[i];
    document.getElementById(item.id).onfocus = makeHelpCallback(item.help);
  }
}

setupHelp();
```

这段代码可以如我们所期望的那样工作。**所有的回调不再共享同一个环境**， `makeHelpCallback` **函数为每一个回调创建一个新的词法环境**。在这些环境中，`help` 指向 `helpText` 数组中对应的字符串。


### Method 2. 使用匿名闭包

```js
function showHelp(help) {
  document.getElementById("help").innerHTML = help;
}

function setupHelp() {
  var helpText = [
    { id: "email", help: "Your e-mail address" },
    { id: "name", help: "Your full name" },
    { id: "age", help: "Your age (you must be over 16)" },
  ];

  for (var i = 0; i < helpText.length; i++) {
    (function () {
      var item = helpText[i];
      document.getElementById(item.id).onfocus = function () {
        showHelp(item.help);
      };
    })(); // 马上把当前循环项的 item 与事件回调相关联起来
  }
}

setupHelp();
```

这里使用了一种叫做Immediately Invoked Function Expression(IIFE)的innner function。This inner function is **anonymous** because it doesn't have a name explicitly assigned to it. It's defined using the pattern:

```js
(function () { // Function body })();
```

### Method 3. 使用 `let` or `const`

```js
function showHelp(help) {
  document.getElementById("help").textContent = help;
}

function setupHelp() {
  const helpText = [
    { id: "email", help: "Your e-mail address" },
    { id: "name", help: "Your full name" },
    { id: "age", help: "Your age (you must be over 16)" },
  ];

  for (let i = 0; i < helpText.length; i++) {
    const item = helpText[i];
    document.getElementById(item.id).onfocus = () => {
      showHelp(item.help);
    };
  }
}

setupHelp();
```


# 性能问题

如果不是某些特定任务需要使用闭包，在其他函数中创建函数是不明智的，因为闭包在处理速度和内存消耗方面对脚本性能具有负面影响。

例如，在创建新的对象或者类时，方法通常应该关联于对象的原型，而不是定义到对象的构造器中。原因是这将导致每次构造器被调用时，方法都会被重新赋值一次（也就是说，对于每个对象的创建，方法都会被重新赋值）。

```js
function MyObject(name, message) {
  this.name = name.toString();
  this.message = message.toString();
  this.getName = function () {
    return this.name;
  };

  this.getMessage = function () {
    return this.message;
  };
}

\\ ==>

function MyObject(name, message) {
  this.name = name.toString();
  this.message = message.toString();
}
MyObject.prototype = {
  getName() {
    return this.name;
  },
  getMessage() {
    return this.message;
  },
};
```

# Reference

* https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures