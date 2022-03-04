# url-set-query

[![stable](http://badges.github.io/stability-badges/dist/stable.svg)](http://github.com/badges/stability-badges)

Small standalone function to set a query string on a URL, replacing the existing query and leaving the hash in place.

## Example

```js
var setQuery = require('url-set-query')

setQuery('http://foo.com/index.html?state=open', 'beep=true')
//=> 'http://foo.com/index.html?beep=true'

setQuery('http://foo.com/some/path#about', '?foo=5&open=true')
//=> 'http://foo.com/some/path?foo=5&open=true#about'

setQuery('http://foo.com', 'foo=5')
//=> 'http://foo.com/?foo=5'

// clears the query
setQuery('http://foo.com/index.html?filter=closed#about', '?')
//=> 'http://foo.com/index.html#about'
```

## Install

```sh
npm install url-set-query --save
```

## Usage

[![NPM](https://nodei.co/npm/url-set-query.png)](https://www.npmjs.com/package/url-set-query)

#### `url = setQuery(url, [query])`

Appends the given `query` String onto the URL, before the hash. If a query already exists, it will be replaced. Returns the new URL.

If `query` is `'?'`, it is the same as clearing the query string from the `url`.

If `query` is an empty string or undefined, no change will be made to `url`. 

## See Also

To encode/decode from an object, see one of:

- [querystring](https://www.npmjs.com/package/querystring)
- [query-string](https://www.npmjs.com/package/query-string)
- [qs](https://www.npmjs.com/package/qs)


## License

MIT, see [LICENSE.md](http://github.com/mattdesl/url-set-query/blob/master/LICENSE.md) for details.
