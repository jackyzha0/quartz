---
title: Rest Parameters, Argument Objects, Spread Syntax
tags:
  - coding-language
  - javascript
  - basic
date: 2024-03-30
---
```js
function sum(...numbers) {
  let total = 0;
  for (const num of numbers) {
    total += num;
  }
  return total;
}

console.log(sum(1, 2, 3, 4, 5)); // 15
```

在JS函数声明中，使用三个点（...）作为最后一个参数名前缀，即可将剩余参数收集到该参数中，作为数组存储。


## Difference

### Rest Parameters vs. Argument Object

> [!note] 
> Rest Parameters vs. Arguments Object
> 
> - 剩余参数只包含那些没有对应形参的实参，而 **arguments** 对象包含了传给函数的所有实参。
>   
> - 剩余参数是真正的 **Array** 实例，可以使用所有数组方法，例如 `sort`、`map`、`forEach` 或 `pop`。而 **arguments** 对象不是真正的数组，只是一个类数组对象。 
>   
> - 参数对象在函数内部自动可用，并保存传递给函数的参数



### Spread Syntax vs. Rest Parameters


展开运算符可以将一个可迭代对象（如数组、字符串、Set等）转换为数组。其实现原理是遍历该可迭代对象，并将其中的每个元素依次添加到新的数组中。它通常在需要组合或克隆数组、将数组的单个元素作为参数传递给函数或将可迭代对象转换为数组的情况下使用。而剩余参数在你想要编写可以接受可变数量参数的函数时非常有用，即它允许你处理动态数量的函数参数，而无需明确定义单独的参数。


## For job interview

![](computer_sci/coding_knowledge/js/attachments/Pasted%20image%2020240330164937.png)