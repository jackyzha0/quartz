var njsp = require("nano-json-stream-parser");
var request = require("xhr-request-promise");

var EthereumProvider = function EthereumProvider(url) {
  var api = {};
  var onResponse = {};
  var callbacks = {};
  var nextId = 0;
  var send = void 0;

  var parseResponse = njsp(function (json) {
    onResponse[json.id] && onResponse[json.id](null, json.result);
  });

  var genPayload = function genPayload(method, params) {
    return {
      jsonrpc: "2.0",
      id: ++nextId,
      method: method,
      params: params
    };
  };

  if (/^http/.test(url)) {
    api.send = async function (method, params) {
      try {
        var answer = await request(url, {
          method: "POST",
          contentType: "application/json-rpc",
          body: JSON.stringify(genPayload(method, params)) });
        var resp = JSON.parse(answer);
        if (resp.error) {
          return resp.error.message;
        } else {
          throw resp.result;
        }
      } catch (e) {
        console.log(e);
      }
    };
  };

  return api;
};

module.exports = EthereumProvider;