var http = exports.http = require('http')
var https = exports.https = require('https')
var url = require('url')

exports.get = function(opt, cb) {
  return getMod(opt).get(opt, cb)
}

exports.request = function(opt, cb) {
  return getMod(opt).request(opt, cb)
}

exports.getModule = getMod
function getMod(opt) {
  if (typeof opt === 'string')
    opt = url.parse(opt)

  return opt.protocol === 'https:' ? https : http
}
