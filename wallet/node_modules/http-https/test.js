var hh = require('./http-https.js')
var assert = require('assert')

assert.equal(hh.getModule('https://foo'), hh.https)
assert.equal(hh.getModule('http://foo'), hh.http)
console.log('ok')
