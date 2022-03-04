var request = require('simple-get')
var toArrayBuffer = require('buffer-to-arraybuffer')
var normalize = require('./normalize-response')
var timeout = require('timed-out')
var ensureHeader = require('./ensure-header')

// supported types
var responseTypes = [ 'text', 'arraybuffer', 'json' ]

module.exports = xhrRequest
function xhrRequest (opt, cb) {
  var responseType = opt.responseType
  if (responseType && responseTypes.indexOf(responseType) === -1) {
    throw new TypeError('invalid responseType for node: ' + responseType)
  }

  // set a default user agent for Node
  ensureHeader(opt.headers, 'User-Agent', 'https://github.com/Jam3/xhr-request')
  var req = request.concat(opt, function xhrRequestResult (err, resp, data) {
    if (!err) {
      if (responseType === 'arraybuffer') {
        data = toArrayBuffer(data)
      } else if (responseType === 'json') {
        try {
          data = JSON.parse(data.toString())
        } catch (e) {
          err = e
        }
      } else { // 'text' response
        data = data.toString()
      }
    }

    resp = normalize(opt, resp)
    if (err) {
      cb(err, null, resp)
    } else {
      cb(null, data, resp)
    }
  })

  if (typeof opt.timeout === 'number' && opt.timeout !== 0) {
    timeout(req, opt.timeout)
  }

  return req
}
