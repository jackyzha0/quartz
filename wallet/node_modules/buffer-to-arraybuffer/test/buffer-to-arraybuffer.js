var test = require('tape');
var bufferToArrayBuffer = require('../buffer-to-arraybuffer');

function bufferEqual(a, b) {
  for (var i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
  }
  return true;
}

function arrayBufferToString(b) {
  return String.fromCharCode.apply(null, new Uint8Array(b));
}

test('bufferToArrayBuffer', function (t) {
  t.plan(2);

  var str = 'abc';

  var b = new Buffer(str.length);
  b.write(str, 0);

  var ab = new ArrayBuffer(str.length);
  var v = new DataView(ab);
  str.split('').forEach(function(s, i) {
    v.setUint8(i, s.charCodeAt(0));
  });

  var cab = bufferToArrayBuffer(b);

  t.strictEqual(bufferEqual(cab, b), true);
  t.equal(arrayBufferToString(cab), str);
});
