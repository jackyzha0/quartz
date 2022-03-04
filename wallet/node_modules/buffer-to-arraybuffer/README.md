# buffer-to-arraybuffer

> Convert Buffer to ArrayBuffer

# Install

```bash
npm install buffer-to-arraybuffer
```

# Usage

```javascript
var bufferToArrayBuffer = require('buffer-to-arraybuffer');

var b = new Buffer(12);
b.write('abc', 0);

var ab = bufferToArrayBuffer(b);
String.fromCharCode.apply(null, new Uint8Array(ab)); // 'abc'
```

NOTE: If you only target node `v4.3+`, you can simply just do:

```javascript
new Buffer([12]).buffer
```

# License

MIT
