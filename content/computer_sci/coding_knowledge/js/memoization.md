---
title: Memoization
tags:
  - javascript
  - advanced
  - coding-language
date: 2024-03-31
---
**记忆化**（Memoization）是一种优化技术，通过存储函数的计算结果，避免重复计算相同参数的函数值，从而提高代码的执行效率。


> [!note] 
>  值得注意的是，记忆化 仅对 纯函数 有效。纯函数的定义为：给定相同的输入，始终返回相同的输出，并且没有任何副作用的函数。
>  
>  例如，假设你尝试记忆化不纯的函数 Date.now，它返回自 Unix 时间戳以来的当前时间（以毫秒为单位）。
>  
>  第一次调用时会正确返回当前时间。但每次后续调用时，它都会错误地返回和第一次相同的值。

# Example

记忆化有在React中运用

```js
const TitleComponent = (props) => {
  return <h1>{props.title}</h1>;
};
```

上面的函数将在每次父组件渲染时调用，即使 `title` 没有更改。通过在其上调用 `React.memo`，可以提高性能，避免不必要的渲染。

```js
const TitleComponent = React.memo((props) => {
  return <h1>{props.title}</h1>;
});
```


# How to build memoization

## `Fib` function as example

在计算斐波那契数中使用记忆化可以大幅度提高效率

```js
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
fib(100); // 耗时多年

const cache = new Map();
function fib(n) {
	if (n <= 1) return n;
	if (cache.has(n)) {
		return cache.get(n)
	}
	const result = fib(n - 1) + fib(n - 2)
	cache.set(n, result)
	return result
}
fib(100) //几乎立即解决
```


