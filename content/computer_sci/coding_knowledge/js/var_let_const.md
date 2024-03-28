---
title: var, let, const in JS
tags:
  - javascript
  - coding-language
  - basic
date: 2024-03-28
---
ES2015(ES6) 附带的功能之一是添加了`let`和`const`

在JavaScript中，`let`、`const`和`var`是用于声明变量的关键字，它们之间存在一些关键的区别，这些区别对于编写高效、可维护的代码至关重要。


# Difference

1. **作用域（Scope）**
    
    - `var`声明的变量具有函数作用域。这意味着，如果你在函数内部声明了一个`var`变量，它只能在该函数内部访问。但是，如果你在函数外部声明了一个`var`变量，它将在整个文件或模块中全局可见。
    - `let`和`const`声明的变量具有块级作用域，这意味着它们只能在包含它们的代码块（例如if语句、for循环等）内部访问。

2. **提升（Hoisting）**
    
    - `var`声明的变量会被提升到它们所在作用域的顶部，但是它们会被初始化为`undefined`。
    - `let`和`const`也会被提升，但它们不会被初始化。在声明之前访问它们会导致`ReferenceError`。这个区域被称为“暂时性死区”（Temporal Dead Zone, TDZ）。

3. **重复声明（Re-declaration）**
    
    - 使用`var`声明的变量可以在同一作用域内被重复声明。
    - `let`和`const`声明的变量不能在同一作用域内被重复声明。

4. **可变性（Mutability）**
    
    - 使用`var`和`let`声明的变量是可变的，这意味着它们的值可以在声明后被修改。
    - 使用`const`声明的变量是不可变的，一旦被赋值后就不能再改变。如果尝试修改一个`const`变量的值，将会导致`TypeError`。
    - `const`声明对象的情况下，虽然不能更改对象，但是可以更改对象的属性

5. **最佳实践（Best Practices）**
    
    - 通常建议使用`let`和`const`来替代`var`，因为它们提供了更好的作用域控制和更少的潜在错误。
    - 当你需要声明一个不会被重新赋值的值时，应该使用`const`。
    - 当你需要声明一个可能会改变的变量时，应该使用`let`。

在现代JavaScript编程中，`let`和`const`是首选的变量声明方式，因为它们提供了更清晰和更安全的方式来管理变量的作用域和可变性。使用`var`的情况越来越少，主要是因为它的函数作用域和提升行为可能会导致一些难以追踪的错误。


# Why `var` is not good

## Demo code

```js
var greeter = "hey hi";
var times = 4;
if (times &gt; 3) {
    var greeter = "say Hello instead";
}

console.log(greeter) // "say Hello instead"
```

由于`times> 3`返回 true，因此将`greeter`重新定义为`say Hello`。如果你有是故意重新定义`greeter`，这段代码是问题的，**是当你不知道之前已经定义了变量`greeter`时，这将成为产生问题**。

**如果在代码的其他部分使用了`greeter`，这可能会导致代码中出现许多错误。这就是为什么需要`let`和`const`的原因**。
# Reference

* https://www.freecodecamp.org/chinese/news/javascript-var-let-and-const/