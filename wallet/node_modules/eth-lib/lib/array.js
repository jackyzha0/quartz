const generate = (num, fn) => {
  let a = [];
  for (var i = 0; i < num; ++i) a.push(fn(i));
  return a;
};

const replicate = (num, val) => generate(num, () => val);

const concat = (a, b) => a.concat(b);

const flatten = a => {
  let r = [];
  for (let j = 0, J = a.length; j < J; ++j) for (let i = 0, I = a[j].length; i < I; ++i) r.push(a[j][i]);
  return r;
};

const chunksOf = (n, a) => {
  let b = [];
  for (let i = 0, l = a.length; i < l; i += n) b.push(a.slice(i, i + n));
  return b;
};

module.exports = {
  generate,
  replicate,
  concat,
  flatten,
  chunksOf
};