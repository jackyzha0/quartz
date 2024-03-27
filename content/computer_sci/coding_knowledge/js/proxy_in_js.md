---
title: Proxy in JavaScript
tags:
  - coding-language
  - javascript
date: 2024-03-27
---

# Intro

**Proxy** 对象用于创建一个对象的代理，**从而实现基本操作的拦截和自定义**（如属性查找、赋值、枚举、函数调用等）。

使用 `Proxy()` 构造函数来创建一个新的 Proxy 对象。 构造函数接收两个必须的参数：

- **target**：要创建代理的对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
- **handler**：定义了代理的自定义行为的对象。


# Example


```js
const target = {
  name: "John Doe",
  age: 30,
};

const handler = {
  get: function(target, property) {
    console.log(`Getting property "${property}" from target`);
    return Reflect.get(target, property);
  },
  set: function(target, property, value) {
    console.log(`Setting property "${property}" to "${value}" on target`);
    return Reflect.set(target, property, value);
  },
};

const proxy = new Proxy(target, handler);
```

**拦截操作**

`handler` 对象可以包含以下属性，用于拦截对代理对象的各种操作：

- **get**：拦截属性读取操作。
- **set**：拦截属性赋值操作。
- **has**：拦截 `in` 操作。
- **deleteProperty**：拦截 `delete` 操作。
- **apply**：拦截函数调用操作。
- **construct**：拦截构造函数调用操作。
- **getOwnPropertyDescriptor**：拦截 `Object.getOwnPropertyDescriptor` 操作。
- **defineProperty**：拦截 `Object.defineProperty` 操作。
- **preventExtensions**：拦截 `Object.preventExtensions` 操作。
- **isExtensible**：拦截 `Object.isExtensible` 操作。
- **ownKeys**：拦截 `Object.getOwnPropertyNames` 和 `Object.getOwnPropertySymbols` 操作。

# Demo

## 数据验证

```js
const handler = {
  set: function(target, property, value) {
    if (typeof value !== "number") {
      throw new Error("Invalid value: " + value);
    }

    return Reflect.set(target, property, value);
  },
};

const proxy = new Proxy({}, handler);

proxy.age = 30; // 成功
proxy.name = "John Doe"; // 抛出错误
```

## 数据格式化

```js
const handler = {
  get: function(target, property) {
    const value = Reflect.get(target, property);
    if (property === "name") {
      return value.toUpperCase();
    }

    return value;
  },
};

const proxy = new Proxy({ name: "John Doe" }, handler);

console.log(proxy.name); // 输出 "JOHN DOE"
```

## 权限控制


```js
const handler = {
  get: function(target, property) {
    if (currentUser.hasPermission(property)) {
      return Reflect.get(target, property);
    }

    return undefined;
  },
};

const proxy = new Proxy(user, handler);

console.log(proxy.age); // 成功
console.log(proxy.salary); // undefined
```
