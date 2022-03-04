try {
  module.exports = require("stream/web")
} catch (error) {
  module.exports = require("web-streams-polyfill/ponyfill")
}
