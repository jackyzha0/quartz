/**
Check if a value is an object.

Keep in mind that array, function, regexp, etc, are objects in JavaScript.

@example
```
import isObject from 'is-obj';

isObject({foo: 'bar'});
//=> true

isObject([1, 2, 3]);
//=> true

isObject('foo');
//=> false
```
*/
export default function isObject(value: unknown): value is object; // eslint-disable-line @typescript-eslint/ban-types
