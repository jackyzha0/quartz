const times = (n, f, x) => {
  for (let i = 0; i < n; ++i) {
    x = f(x);
  }
  return x;
}

module.exports = {
  times
}
