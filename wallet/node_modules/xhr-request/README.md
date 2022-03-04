# xhr-request

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

An extremely tiny HTTP/HTTPS request client for Node and the browser. Uses [xhr](https://www.npmjs.com/package/xhr) in the browser and [simple-get](https://www.npmjs.com/package/simple-get) in Node. 

Supported response types: JSON, ArrayBuffer, and text (default).

For streaming requests, you can just use [simple-get](https://www.npmjs.com/package/simple-get) directly. It works in Node/browser and supports true streaming in new versions of Chrome/FireFox.

## Install

```sh
npm install xhr-request --save
```

## Example

A simple example, loading JSON:

```js
var request = require('xhr-request')

request('http://foo.com/some/api', {
  json: true
}, function (err, data) {
  if (err) throw err
  
  // the JSON result
  console.log(data.foo.bar)
})
```

Another example, sending a JSON `body` with a `query` parameter. Receives binary data as the response.

```js
var request = require('xhr-request')

request('http://foo.com/some/api', {
  method: 'PUT',
  json: true,
  body: { foo: 'bar' },
  responseType: 'arraybuffer',
  query: {
    sort: 'name'
  }
}, function (err, data) {
  if (err) throw err
  console.log('got ArrayBuffer result: ', data)
})
```

## Motivation

There are a lot of HTTP clients, but most of them are Node-centric and lead to large browser bundles with builtins like `url`, `buffer`, `http`, `zlib`, streams, etc. 

With browserify, this bundles to 7kb minified. Compare to 742kb for [request](https://www.npmjs.com/package/request), 153kb for [got](https://www.npmjs.com/package/got), 74kb for [simple-get](https://www.npmjs.com/package/simple-get), and 25kb for [nets](https://www.npmjs.com/package/nets).

## Usage

#### `req = xhrRequest(url, [opt], [callback])`

Sends a request to the given `url` with optional `opt` settings, triggering `callback` on complete.

Options:

- `query` (String|Object)
  - the query parameters to use for the URL
- `headers` (Object)
  - the headers for the request
- `json` (Boolean) 
  - if true, `responseType` defaults to `'json`' and `body` will be sent as JSON
- `responseType` (String)
  - can be `'text'`, `'arraybuffer'` or `'json'`
  - defaults to `'text'` unless `json` is true
- `body` (String|JSON)
  - an optional body to send with request
  - sent as text unless `json` is true
- `method` (String)
  - an optional method to use, defaults to `'GET'`
- `timeout` (Number)
  - milliseconds to use as a timeout, defaults to 0 (no timeout)

The `callback` is called with the arguments `(error, data, response)`

- `error` on success will be null/undefined
- `data` the result of the request, either a JSON object, string, or `ArrayBuffer`
- `response` the request response, see below

The response object has the following form:

```js
{
  statusCode: Number,
  method: String,
  headers: {},
  url: String,
  rawRequest: {}
}
```

The `rawRequest` is the XMLHttpRequest in the browser, and the `http` response in Node.

Since `opt` is optional, you can specify `callback` as the second argument.

#### `req.abort()`

The returned `req` (the [ClientRequest](https://nodejs.org/api/http.html#http_class_http_clientrequest) or XMLHttpRequest) has an `abort()` method which can be used to cancel the request and send an Error to the callback.

## See Also

- [simple-get](https://www.npmjs.com/package/simple-get)
- [xhr](https://www.npmjs.com/package/xhr)
- [got](https://www.npmjs.com/package/got)
- [nets](https://www.npmjs.com/package/nets)
- [superagent](https://www.npmjs.com/package/nets)
- [axios](https://www.npmjs.com/package/axios)

## License

MIT, see [LICENSE.md](http://github.com/Jam3/xhr-request/blob/master/LICENSE.md) for details.
