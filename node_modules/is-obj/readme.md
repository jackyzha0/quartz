# is-obj

> Check if a value is an object

Keep in mind that array, function, regexp, etc, are objects in JavaScript.

See [`is-plain-obj`](https://github.com/sindresorhus/is-plain-obj) if you want to check for plain objects.

## Install

```
$ npm install is-obj
```

## Usage

```js
import isObject from 'is-obj';

isObject({foo: 'bar'});
//=> true

isObject([1, 2, 3]);
//=> true

isObject('foo');
//=> false
```

## Related

- [is](https://github.com/sindresorhus/is) - Type check values

---

<div align="center">
	<b>
		<a href="https://tidelift.com/subscription/pkg/npm-is-obj?utm_source=npm-is-obj&utm_medium=referral&utm_campaign=readme">Get professional support for this package with a Tidelift subscription</a>
	</b>
	<br>
	<sub>
		Tidelift helps make open source sustainable for maintainers while giving companies<br>assurances about security, maintenance, and licensing for their dependencies.
	</sub>
</div>
