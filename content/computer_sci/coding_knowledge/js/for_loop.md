---
title: for...in, for...of, forEach
tags:
  - coding-language
  - basic
  - javascript
date: 2024-03-29
---
在 JavaScript 中，**for...in**、**for...of** 和 **forEach** 都是用于遍历对象的循环语句。但是，它们之间存在一些关键的区别。

## 遍历对象类型

- **for...in**：用于遍历对象的 **可枚举属性**，包括原型链上的属性。
- **for...of**：用于遍历 **可迭代对象**，包括数组、字符串、Set、Map 等。
- **forEach**：只能用于遍历 **数组**。

## 遍历顺序

- **for...in**：遍历对象的属性的 **键名** 顺序。
- **for...of**：遍历对象的 **元素值** 顺序。
- **forEach**：遍历数组的 **元素值** 顺序。

## 终止循环

- **for...in**：可以使用 **break** 语句终止循环。
- **for...of**：可以使用 **break** 语句终止循环。
- **forEach**：**不能** 使用 **break** 语句终止循环。

## 回调函数

- **for...in**：没有回调函数。
- **for...of**：没有回调函数。
- **forEach**：需要传入一个回调函数，该函数会在每个元素上调用一次。

## 总结

|循环语句|遍历对象类型|遍历顺序|终止循环|回调函数|
|---|---|---|---|---|
|**for...in**|可枚举属性|键名|支持|无|
|**for...of**|可迭代对象|元素值|支持|无|
|**forEach**|数组|元素值|不支持|支持|

**示例**

JavaScript

```js
// 遍历对象的可枚举属性
const obj = {
  a: 1,
  b: 2,
  c: 3,
};

for (const key in obj) {
  console.log(key); // a, b, c
}

// 遍历数组的元素值
const arr = [1, 2, 3];

for (const value of arr) {
  console.log(value); // 1, 2, 3
}

// 遍历数组的元素值，并对每个元素执行操作
arr.forEach((value) => {
  console.log(value * 2); // 2, 4, 6
});
```

## 使用建议

- **for...in**：适合遍历对象的属性名或键。
- **for...of**：适合遍历可迭代对象的元素值。
- **forEach**：适合遍历数组并对每个元素执行相同操作。