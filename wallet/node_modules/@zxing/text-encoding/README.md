text-encoding
==============

This is a fork of https://github.com/inexorabletash/text-encoding, which
has been marked as deprecated in the npm registry.

```
npm info text-encoding

text-encoding@0.7.0 | (Unlicense OR Apache-2.0) | deps: none | versions: 11
Polyfill for the Encoding Living Standard's API.
https://github.com/inexorabletash/text-encoding

DEPRECATED ⚠️  - no longer maintained

keywords: encoding, decoding, living standard

dist
.tarball: https://registry.npmjs.org/text-encoding/-/text-encoding-0.7.0.tgz
.shasum: f895e836e45990624086601798ea98e8f36ee643
.integrity: sha512-oJQ3f1hrOnbRLOcwKz0Liq2IcrvDeZRHXhd9RgLrsT+DjWY/nty1Hi7v3dtkaEYbPYe0mUoOfzRrMwfXXwgPUA==
.unpackedSize: 649.6 kB

maintainers:
- inexorabletash <inexorabletash@gmail.com>

dist-tags:
latest: 0.7.0

published a year ago by inexorabletash <inexorabletash@gmail.com>
```

This fork is published as `@zxing/text-encoding` and will be available as long
as it is in use by `@zxing` packages.

<hr />

This is a polyfill for the [Encoding Living
Standard](https://encoding.spec.whatwg.org/) API for the Web, allowing
encoding and decoding of textual data to and from Typed Array buffers
for binary data in JavaScript.

By default it adheres to the spec and does not support *encoding* to
legacy encodings, only *decoding*. It is also implemented to match the
specification's algorithms, rather than for performance. The intended
use is within Web pages, so it has no dependency on server frameworks
or particular module schemes.

Basic examples and tests are included.

### Install ###

There are a few ways you can get and use the `@zxing/text-encoding` library.

### HTML Page Usage ###

Clone the repo and include the files directly:

```html
  <!-- Required for non-UTF encodings -->
  <script src="encoding-indexes.js"></script>
  <script src="encoding.js"></script>
```

This is the only use case the developer cares about. If you want those
fancy module and/or package manager things that are popular these days
you should probably use a different library.

#### Package Managers ####

The package is published to **npm** as `@zxing/text-encoding`.
Use through these is not really supported, since they aren't used by
the developer of the library. Using `require()` in interesting ways
probably breaks. Patches welcome, as long as they don't break the
basic use of the files via `<script>`.

### API Overview ###

Basic Usage

```js
  var uint8array = new TextEncoder().encode(string);
  var string = new TextDecoder(encoding).decode(uint8array);
```

Streaming Decode

```js
  var string = "", decoder = new TextDecoder(encoding), buffer;
  while (buffer = next_chunk()) {
    string += decoder.decode(buffer, {stream:true});
  }
  string += decoder.decode(); // finish the stream
```

### Encodings ###

All encodings from the Encoding specification are supported:

utf-8 ibm866 iso-8859-2 iso-8859-3 iso-8859-4 iso-8859-5 iso-8859-6
iso-8859-7 iso-8859-8 iso-8859-8-i iso-8859-10 iso-8859-13 iso-8859-14
iso-8859-15 iso-8859-16 koi8-r koi8-u macintosh windows-874
windows-1250 windows-1251 windows-1252 windows-1253 windows-1254
windows-1255 windows-1256 windows-1257 windows-1258 x-mac-cyrillic
gb18030 hz-gb-2312 big5 euc-jp iso-2022-jp shift_jis euc-kr
replacement utf-16be utf-16le x-user-defined

(Some encodings may be supported under other names, e.g. ascii,
iso-8859-1, etc. See [Encoding](https://encoding.spec.whatwg.org/) for
additional labels for each encoding.)

Encodings other than **utf-8**, **utf-16le** and **utf-16be** require
an additional `encoding-indexes.js` file to be included. It is rather
large (596kB uncompressed, 188kB gzipped); portions may be deleted if
support for some encodings is not required.

### Non-Standard Behavior ###

As required by the specification, only encoding to **utf-8** is
supported. If you want to try it out, you can force a non-standard
behavior by passing the `NONSTANDARD_allowLegacyEncoding` option to
TextEncoder and a label. For example:

```js
var uint8array = new TextEncoder(
  'windows-1252', { NONSTANDARD_allowLegacyEncoding: true }).encode(text);
```

But note that the above won't work if you're using the polyfill in a
browser that natively supports the TextEncoder API natively, since the
polyfill won't be used!

You can force the polyfill to be used by using this before the polyfill:

```html
<script>
window.TextEncoder = window.TextDecoder = null;
</script>
```

To support the legacy encodings (which may be stateful), the
TextEncoder `encode()` method accepts an optional dictionary and
`stream` option, e.g. `encoder.encode(string, {stream: true});` This
is not needed for standard encoding since the input is always in
complete code points.
