module.exports = function reverseInplace (buffer) {
  for (var i = 0, j = buffer.length - 1; i < j; ++i, --j) {
    var t = buffer[j]

    buffer[j] = buffer[i]
    buffer[i] = t
  }

  return buffer
}
