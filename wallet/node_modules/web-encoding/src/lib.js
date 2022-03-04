"use strict"

exports.TextEncoder =
  typeof TextEncoder !== "undefined" ? TextEncoder : require("util").TextEncoder

exports.TextDecoder =
  typeof TextDecoder !== "undefined" ? TextDecoder : require("util").TextDecoder
