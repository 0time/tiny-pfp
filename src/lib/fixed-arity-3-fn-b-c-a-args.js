const UNSET = Symbol();

module.exports = fn => (b, c = UNSET, a = UNSET) => {
  if (c !== UNSET && a !== UNSET) {
    return fn(a, b, c);
  } else if (c !== UNSET) {
    return a2 => fn(a2, b, c);
  } else {
    return (c2, a2 = UNSET) => {
      if (a2 !== UNSET) {
        return fn(a2, b, c2);
      } else {
        return a3 => fn(a3, b, c2);
      }
    };
  }
};
