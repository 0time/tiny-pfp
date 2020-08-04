const UNSET = Symbol();

module.exports = fn => (b, a = UNSET) => {
  if (a !== UNSET) {
    return fn(a, b);
  } else {
    return a2 => {
      return fn(a2, b);
    };
  }
};
