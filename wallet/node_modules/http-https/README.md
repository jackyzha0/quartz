# http-https

A wrapper that chooses http or https for requests

## USAGE

```javascript
var hh = require('http-https')

var req = hh.request('http://example.com/bar')
var secureReq = hh.request('https://secure.example.com/foo')

// or with a parsed object...
var opt = url.parse(someUrlMaybeHttpMaybeHttps)
opt.headers = {
  'user-agent': 'flergy mc flerg'
}
opt.method = 'HEAD'
var req = hh.request(opt, function (res) {
  console.log('got response!', res.statusCode, res.headers)
})
req.end()
```
